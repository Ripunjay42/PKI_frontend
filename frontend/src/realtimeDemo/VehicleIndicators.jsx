import React from 'react';
import { 
  TbArrowBigLeftLinesFilled, 
  TbArrowBigRightLinesFilled 
} from 'react-icons/tb';
import { PiSeatbeltFill } from 'react-icons/pi';

const VehicleIndicators = ({ leftTurnActive = false, rightTurnActive = false }) => {
  return (
    <>
      {/* Left Side Indicators - Top Left Arc */}
      <div className="absolute left-10 sm:left-28 top-12 sm:-top-14 flex items-center gap-3 sm:gap-4 z-10">
        {/* Left Turn Signal */}
        <div className="flex flex-col items-center" title="Left Turn Signal">
          <TbArrowBigLeftLinesFilled 
            className={`text-2xl sm:text-7xl transition-all duration-150 ${
              leftTurnActive 
                ? 'text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)] animate-pulse' 
                : 'text-gray-400'
            }`} 
          />
        </div>
        
        {/* Parking Brake */}
        <div className="flex flex-col items-center" title="Parking Brake">
          <div className="text-gray-400 text-base sm:text-5xl font-bold border-2 border-gray-400 rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center">
            P
          </div>
        </div>
      </div>

      {/* Right Side Indicators - Top Right Arc */}
      <div className="absolute right-12 sm:right-28 top-12 sm:-top-14 flex items-center gap-3 sm:gap-4 z-10">
        
        {/* Seatbelt */}
        <div className="flex flex-col items-center" title="Seatbelt">
          <PiSeatbeltFill className="text-gray-400 text-4xl sm:text-6xl" />
        </div>
        
        {/* Right Turn Signal */}
        <div className="flex flex-col items-center" title="Right Turn Signal">
          <TbArrowBigRightLinesFilled 
            className={`text-3xl sm:text-7xl transition-all duration-150 ${
              rightTurnActive 
                ? 'text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.8)] animate-pulse' 
                : 'text-gray-400'
            }`} 
          />
        </div>
      </div>
    </>
  );
};

export default VehicleIndicators;
