// import React from "react";

// const SpotifyPlayer: React.FC = () => {
//   return (
//     <div className="mt-8 w-full max-w-xl mx-auto rounded-xl overflow-hidden shadow-lg">
//       <iframe
//         src="https://open.spotify.com/embed/playlist/14KtkIpsvzDSCXR24EqHCL?utm_source=generator"
//         width="100%"
//         height="80"
//         allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
//         loading="lazy"
//         className="rounded-lg"
//         title="Spotify Player"
//       ></iframe>
//     </div>
//   );
// };

// export default SpotifyPlayer;


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SpotifyPlayer: React.FC = () => {
  const playlists = {
    focus: "https://open.spotify.com/embed/playlist/14KtkIpsvzDSCXR24EqHCL?utm_source=generator",
    chill: "https://open.spotify.com/embed/playlist/42eLtt8RUBboyXLmNQWU5a?utm_source=generator",
    upbeat: "https://open.spotify.com/embed/playlist/6WOJ6TUmamvZteNIjBks9r?utm_source=generator",
  };

  const [selectedPlaylist, setSelectedPlaylist] = useState("focus");

  return (
    <div className="flex flex-col items-center w-full mt-8">
      {/* Playlist Buttons */}
      <div className="flex gap-4 mb-4">
        {Object.keys(playlists).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedPlaylist(key)}
            className={`px-4 py-2 rounded-lg text-white font-semibold shadow-md backdrop-blur-sm transition duration-200 ${
              selectedPlaylist === key
                ? "bg-blue-500"
                : "bg-white/20 hover:bg-white/30"
            }`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      {/* Animated Spotify Player */}
      <div className="w-full max-w-xl rounded-xl overflow-hidden shadow-lg">
        <AnimatePresence mode="wait">
          <motion.iframe
            key={selectedPlaylist}
            src={playlists[selectedPlaylist]}
            width="100%"
            height="80"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-lg"
            title="Spotify Player"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SpotifyPlayer;
