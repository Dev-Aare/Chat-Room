function Message({ message, user }) {
  const isOwnMessage = message.userId === user.uid;

  return (
    <div className={`mb-2 ${isOwnMessage ? 'text-right' : 'text-left'}`}>
      <div className={`inline-block p-2 rounded ${isOwnMessage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
        <p className="font-bold">{message.userName}</p>
        {message.text && <p>{message.text}</p>}
        {message.fileUrl && (
          <a href={message.fileUrl} target="_blank" rel="noopener noreferrer" className="text-blue-300 underline">
            View File
          </a>
        )}
      </div>
    </div>
  );
}

export default Message;