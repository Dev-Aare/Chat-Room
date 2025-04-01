import { useState } from 'react';
import ChatRoom from '../components/ChatRoom';
import UserList from '../components/UserList';

function Home({ user }) {
  const [selectedRoom, setSelectedRoom] = useState('general');

  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-bold">Chat Rooms</h2>
        <button
          onClick={() => setSelectedRoom('general')}
          className={`w-full p-2 my-1 rounded ${selectedRoom === 'general' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          General
        </button>
        <button
          onClick={() => setSelectedRoom('random')}
          className={`w-full p-2 my-1 rounded ${selectedRoom === 'random' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
        >
          Random
        </button>
        <UserList room={selectedRoom} user={user} />
      </div>
      <ChatRoom room={selectedRoom} user={user} />
    </div>
  );
}

export default Home;