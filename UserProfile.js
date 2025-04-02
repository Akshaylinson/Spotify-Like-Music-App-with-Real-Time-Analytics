import React, { useState, useEffect } from "react";
import { auth, db, ref, onValue } from "./firebase";

const UserProfile = () => {
  const [history, setHistory] = useState([]);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      onValue(ref(db, `playbackHistory`), (snapshot) => {
        const data = snapshot.val();
        setHistory(data ? Object.values(data).filter(item => item.user_id === user.uid) : []);
      });
    }
  }, [user]);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user?.displayName}</p>
      <h3>Playback History</h3>
      <ul>
        {history.map((song, index) => (
          <li key={index}>{song.song_id} - {new Date(song.played_at).toLocaleString()}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
