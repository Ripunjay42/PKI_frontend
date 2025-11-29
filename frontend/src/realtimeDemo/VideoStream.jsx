import React from 'react';

const VideoStream = () => {
  // Local video file path (place your video in src/assets/ and update the filename below)
  const localVideoPath = '/assets/demo.mp4'; // Example: demo.mp4

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Video Stream Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Local Video Stream */}
        <video
          src={localVideoPath}
          controls
          autoPlay
          muted
          loop
          className="w-full h-full object-contain rounded-2xl"
          style={{ minHeight: '320px', minWidth: '320px', maxHeight: '100%', maxWidth: '100%' }}
        >
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Corner Frame Decorations */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-cyan-500/50 rounded-tl-lg pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-cyan-500/50 rounded-tr-lg pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-cyan-500/50 rounded-bl-lg pointer-events-none"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-cyan-500/50 rounded-br-lg pointer-events-none"></div>
    </div>
  );
};

export default VideoStream;
