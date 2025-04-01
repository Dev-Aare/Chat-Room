function TypingIndicator({ users }) {
  if (users.length === 0) return null;

  return (
    <div className="text-sm text-gray-500 mb-2">
      {users.length === 1 ? `${users[0]} is typing...` : 'Multiple users are typing...'}
    </div>
  );
}

export default TypingIndicator;