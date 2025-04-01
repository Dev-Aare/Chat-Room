import React, { useState, useEffect } from 'react';
import { db, collection, onSnapshot, updateDoc, doc } from '../firebase/firebase';

const Admin = () => {
  const [reportedPolls, setReportedPolls] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'polls'), (snapshot) => {
      const polls = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((poll) => poll.reports > 0);
      setReportedPolls(polls);
    });
    return () => unsubscribe();
  }, []);

  const closePoll = async (pollId) => {
    const pollRef = doc(db, 'polls', pollId);
    await updateDoc(pollRef, { isActive: false });
  };

  return (
    <div className="p-4">
      <h2 className="text-xl">Admin - Reported Polls</h2>
      {reportedPolls.map((poll) => (
        <div key={poll.id} className="p-2 bg-red-100 rounded">
          <p>{poll.title} (Reports: {poll.reports})</p>
          <button
            onClick={() => closePoll(poll.id)}
            className="p-1 bg-red-500 text-white"
          >
            Close Poll
          </button>
        </div>
      ))}
    </div>
  );
};

export default Admin;