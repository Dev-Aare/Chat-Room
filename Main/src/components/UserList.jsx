import { useState, useEffect } from 'react';
import { db, doc, onSnapshot, updateDoc } from '../firebase/firebase';

function UserList({ room, user }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Update presence
    const presenceRef = doc(db, 'rooms', room);
    updateDoc(presenceRef, {
      [`presence.${user.uid}`]: { name: user.displayName, online: true },
    });

    const unsubscribe = onSnapshot(presenceRef, (doc) => {
      const data = doc.data();
      if (data?.presence) {
        setUsers(Object.entries(data.presence).map(([uid, info]) => ({ uid, ...info })));
      }
    });

    // Cleanup on unmount
    return () => {
      updateDoc(presenceRef, {
        [`presence.${user.uid}`]: { name: user.displayName, online: false },
      });
      unsubscribe();
    };
  }, [room, user]);

  return (
    <div className="mt-4">
      <h3 className="text-lg font-bold">Online Users</h3>
      {users.map((u) => (
        <div key={u.uid} className={`p-1 ${u.online ? 'text-green-500' : 'text-gray-500'}`}>
          {u.name} {u.online ? '(Online)' : '(Offline)'}
        </div>
      ))}
    </div>
  );
}

export default UserList;