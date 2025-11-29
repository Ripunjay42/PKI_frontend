import React from 'react';

const VideoStream = () => {
  // Video stream URL - update this to your actual video stream URL
  const videoStreamUrl = 'https://www.youtube.com/watch?v=RpeMddO7NMQ';

  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-900 relative overflow-hidden">
      {/* Video Stream Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Video Stream */}
        <img 
          src={videoStreamUrl}
          alt="Live Video Stream"
          className="w-full h-full object-contain"
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
          }}
          onError={(e) => {
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        
        {/* Fallback when stream is unavailable */}
        <div 
          className="absolute inset-0 flex-col items-center justify-center bg-gray-800 text-white hidden"
          style={{ display: 'none' }}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">📹</div>
            <h3 className="text-xl font-semibold mb-2">Video Stream</h3>
            <p className="text-gray-400 text-sm">Connecting to live feed...</p>
            <p className="text-gray-500 text-xs mt-2">Stream URL: {videoStreamUrl}</p>
          </div>
        </div>

        {/* Live indicator */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-semibold">LIVE</span>
        </div>

        {/* Validation status indicator */}
        <div className="absolute top-4 right-4 flex items-center gap-2 bg-green-600/80 px-3 py-1.5 rounded-full">
          <span className="text-white text-sm font-semibold">✓ Validated</span>
        </div>
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
