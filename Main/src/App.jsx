import { useState, useEffect } from 'react';
import { auth } from './firebase/firebase';
import Home from './pages/Home';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {user ? <Home user={user} /> : <Login />}
    </div>
  );
}

export default App;