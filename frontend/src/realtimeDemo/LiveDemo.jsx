import React, { useState, useEffect } from 'react';
import Speedometer from './Speedometer';
import BatteryMeter from './BatteryMeter';
import StatusBar from './StatusBar';
import VehicleIndicators from './VehicleIndicators';
import Car3DView from './Car3DView';
import VideoStream from './VideoStream';

const LiveDemo = ({ onBack, isValidated = false }) => {
  // const [isValidated, setIsValidated] = useState(propValidated);
  const [time, setTime] = useState(new Date());
  const [speed, setSpeed] = useState(0);
  const [battery, setBattery] = useState(100);
  const [isThrottling, setIsThrottling] = useState(false);
  const [leftTurnActive, setLeftTurnActive] = useState(false);
  const [rightTurnActive, setRightTurnActive] = useState(false);
  const [tripDistance, setTripDistance] = useState(1000);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update trip distance based on speed
  useEffect(() => {
    if (speed === 0) return;

    const updateInterval = setInterval(() => {
      setTripDistance(prev => {
        const distancePerSecond = speed / 3600;
        const newDistance = prev + distancePerSecond;
        if (newDistance >= 10000) {
          return 1000;
        }
        return newDistance;
      });
    }, 1000);

    return () => clearInterval(updateInterval);
  }, [speed]);

  // Throttle effect - increase speed while holding, decrease when released
  useEffect(() => {
    let throttleInterval;
    let releaseInterval;
    let batteryInterval;

    if (isThrottling) {
      throttleInterval = setInterval(() => {
        setSpeed(prev => Math.min(prev + 5, 180));
      }, 50);

      batteryInterval = setInterval(() => {
        setBattery(prev => Math.max(prev - 0.1, 0));
      }, 1000);
    } else {
      releaseInterval = setInterval(() => {
        setSpeed(prev => {
          const newSpeed = prev - 8;
          return newSpeed < 0 ? 0 : newSpeed;
        });
      }, 50);
    }

    return () => {
      clearInterval(throttleInterval);
      clearInterval(releaseInterval);
      clearInterval(batteryInterval);
    };
  }, [isThrottling]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' && !e.repeat) {
        e.preventDefault();
        setIsThrottling(true);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSpeed(prev => Math.max(prev - 10, 0));
      } else if (e.key === 'ArrowRight' && !e.repeat && isValidated) {
        e.preventDefault();
        setRightTurnActive(true);
      } else if (e.key === 'ArrowLeft' && !e.repeat && isValidated) {
        e.preventDefault();
        setLeftTurnActive(true);
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setIsThrottling(false);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setRightTurnActive(false);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setLeftTurnActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isValidated]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-2 sm:p-4">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg flex items-center gap-2 transition-colors"
        >
          <span>←</span>
          <span>Exit</span>
        </button>
      </div>

      {/* Test Validation Button */}
        {/* <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => setIsValidated(!isValidated)}
            className="px-4 py-2 bg-cyan-700 hover:bg-cyan-600 text-white rounded-lg flex items-center gap-2 transition-colors"
          >
            <span>Test Validate</span>
          </button>
        </div> */}

      {/* Oval Dashboard Container */}
      <div className="relative w-full max-w-[1220px] aspect-16/7.6">
        {/* Outer Decorative Border with Car Dashboard Shape */}
        <div className="absolute inset-0" style={{
          borderRadius: '45% 45% 40% 40% / 35% 35% 30% 30%',
          border: '4.4px solid #1f2937',
          boxShadow: '0 0 44px rgba(6, 182, 212, 0.3), inset 0 0 55px rgba(0, 0, 0, 0.5)',
          background: 'linear-gradient(180deg, rgba(17, 24, 39, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%)'
        }}></div>

        {/* Middle decorative ring */}
        <div className="absolute inset-3" style={{
          borderRadius: '45% 45% 40% 40% / 35% 35% 30% 30%',
          border: '1.1px solid rgba(6, 182, 212, 0.2)',
          pointerEvents: 'none'
        }}></div>

        {/* Inner Content Container */}
        <div className="relative w-full h-full flex items-center justify-center px-1 sm:px-8 py-2 sm:py-8">
          {/* Vehicle Indicators */}
          <VehicleIndicators 
            leftTurnActive={leftTurnActive} 
            rightTurnActive={rightTurnActive}
            isValidated={isValidated}
          />

          {/* Main Content Area - Vertically stacked with bars */}
          <div className="flex flex-col items-center gap-2 w-full max-w-[1760px]">
            {/* Main Dashboard Container - Meters and Center Display */}
            <div className="flex flex-col lg:flex-row items-center justify-center w-full -mx-2 lg:-mx-4">
              {/* Left - Speedometer */}
              <div className="w-full max-w-[418px] shrink-0 flex justify-center lg:-mr-6">
                <Speedometer value={speed} max={180} />
              </div>

              {/* Center Display */}
              <div className="w-full max-w-[880px] shrink-0 flex justify-center z-10">
                <div className="bg-gray-900/90 backdrop-blur-sm border-2 border-gray-700 rounded-3xl overflow-hidden p-2 shadow-2xl w-full" style={{ minHeight: '352px', height: '528px', maxWidth: '990px' }}>
                  <div className="h-full w-full">
                    <div className="bg-gray-900 border-0 rounded-2xl h-full w-full overflow-hidden relative">
                      {isValidated ? <VideoStream /> : <Car3DView />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Battery Meter */}
              <div className="w-full max-w-[418px] shrink-0 flex justify-center lg:-ml-6">
                <BatteryMeter value={battery} max={100} />
              </div>
            </div>

            {/* Bottom Status Bar */}
            <StatusBar 
              time={time} 
              tripDistance={tripDistance}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDemo;
