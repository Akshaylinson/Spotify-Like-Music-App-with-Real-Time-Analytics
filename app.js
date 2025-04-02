import React, { useState, useEffect } from "react";
import { auth, signInWithGoogle, logout, db, ref, push, onValue } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import YouTubePlayer from "./YouTubePlayer";
import YouTubeSearch from "./YouTubeSearch";
import UserProfile from "./UserProfile";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const App = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([]);
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ");
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    onValue(ref(db, "playbackHistory"), (snapshot) => {
      const data = snapshot.val();
      setStats(Object.values(data || {}));
    });
  }, []);

  const handlePlay = () => {
    if (!user) {
      alert("Please sign in to track your playback history.");
      return;
    }

    const songData = {
      user_id: user.uid,
      song_id: videoId,
      duration_played: Math.floor(Math.random() * 200),
      played_at: new Date().toISOString(),
    };

    push(ref(db, "playbackHistory"), songData);
  };

  return (
    <div>
      <h2>Music App with YouTube & Real-Time Analytics</h2>

      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={() => setShowProfile(!showProfile)}>
            {showProfile ? "Back to Music" : "View Profile"}
          </button>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}

      {showProfile ? <UserProfile /> : (
        <>
          <YouTubeSearch onSelectVideo={setVideoId} />
          <YouTubePlayer videoId={videoId} onPlay={handlePlay} />
        </>
      )}

      <h3>Analytics</h3>
      <ResponsiveContainer width="80%" height={300}>
        <BarChart data={stats}>
          <XAxis dataKey="song_id" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="duration_played" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;
