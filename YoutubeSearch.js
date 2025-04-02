import React, { useState } from "react";
import axios from "axios";

const API_KEY = "_____________________________________jw"; 
const SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

const YouTubeSearch = ({ onSelectVideo }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const response = await axios.get(SEARCH_URL, {
        params: {
          part: "snippet",
          maxResults: 5,
          q: query,
          key: API_KEY,
          type: "video",
        },
      });

      setResults(response.data.items);
    } catch (error) {
      console.error("Error fetching YouTube search results", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a song..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <ul>
        {results.map((video) => (
          <li key={video.id.videoId} onClick={() => onSelectVideo(video.id.videoId)}>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            {video.snippet.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeSearch;
