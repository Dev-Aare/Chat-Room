import { useState, useEffect, useRef } from 'react';
import { db, collection, addDoc, onSnapshot, query, orderBy, doc, updateDoc, serverTimestamp, storage, ref, uploadBytes, getDownloadURL } from '../firebase/firebase';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

function ChatRoom({ room, user }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [file, setFile] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, `rooms/${room}/messages`), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    });

    // Typing status listener
    const typingRef = doc(db, 'rooms', room);
    const typingUnsubscribe = onSnapshot(typingRef, (doc) => {
      const data = doc.data();
      if (data?.typing) {
        setTypingUsers(Object.keys(data.typing).filter((uid) => uid !== user.uid && data.typing[uid]));
      } else {
        setTypingUsers([]);
      }
    });

    return () => {
      unsubscribe();
      typingUnsubscribe();
    };
  }, [room, user.uid]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage && !file) return;

    let fileUrl = null;
    if (file) {
      const storageRef = ref(storage, `files/${file.name}`);
      await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, `rooms/${room}/messages`), {
      text: newMessage,
      fileUrl,
      userId: user.uid,
      userName: user.displayName,
      timestamp: serverTimestamp(),
    });

    setNewMessage('');
    setFile(null);
    stopTyping();
  };

  const handleTyping = async () => {
    const typingRef = doc(db, 'rooms', room);
    await updateDoc(typingRef, {
      [`typing.${user.uid}`]: true,
    });
    setTimeout(stopTyping, 2000); // Stop typing after 2s of inactivity
  };

  const stopTyping = async () => {
    const typingRef = doc(db, 'rooms', room);
    await updateDoc(typingRef, {
      [`typing.${user.uid}`]: false,
    });
  };

  return (
    <div className="flex-1 flex flex-col p-4">
      <h2 className="text-xl font-bold mb-4">{room} Room</h2>
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg) => (
          <Message key={msg.id} message={msg} user={user} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <TypingIndicator users={typingUsers} />
      <form onSubmit={sendMessage} className="mt-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="p-2"
        />
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;