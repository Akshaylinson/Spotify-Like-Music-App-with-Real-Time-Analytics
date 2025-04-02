import React from "react";

const YouTubePlayer = ({ videoId, onPlay }) => {
  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        onLoad={onPlay}
      ></iframe>
    </div>
  );
};

export default YouTubePlayer;
