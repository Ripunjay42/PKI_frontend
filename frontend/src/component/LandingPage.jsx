import React from "react";
import reepImage from "../assets/reep.png";

const LandingPage = ({ onModeSelect }) => {
  const features = [
    { icon: "🔐", text: "PKI-Based Security" },
    { icon: "✓", text: "Certificate Validation" },
    { icon: "🔒", text: "Secure Communication" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="py-4 px-6 border-b border-gray-100">
        <div className="text-3xl md:text-4xl font-extrabold text-center text-gray-800">
          PKI Based Automotive Security
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-8 lg:px-16 xl:px-24 py-4 mt-10">
        <div className="flex flex-col gap-8 max-w-[1500px] mx-auto">
          {/* Top Row - Image and Cards */}
          <div className="flex flex-col lg:flex-row gap-16 items-center justify-center">
            
            {/* Left Side - Image */}
            <div className="flex flex-col items-center">
              {/* Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-[1px] border-gray-300 shadow-sm">
                <img
                  src={reepImage}
                  alt="PKI Automotive System"
                  className="w-7xl h-auto rounded-2xl"
                />
              </div>
            </div>

            {/* Right Side - Mode Selection */}
            <div className="flex flex-row lg:flex-col items-center justify-center gap-6">

              {/* Static Mode Card */}
              <div
                onClick={() => onModeSelect("static")}
                className="w-full max-w-md p-3 rounded-2xl cursor-pointer bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg"
              >
                <div className="flex items-center gap-1 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Static Demo</h4>
                    {/* <span className="inline-block mt-1 px-2 py-0.5 bg-white/25 text-white text-xs font-semibold rounded-full">
                      Available
                    </span> */}
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed text-sm">
                  Explore PKI-based HCU certificate 
                  validation inside secure hardware devices.
                </p>
                <button className="w-full mt-4 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl">
                  Enter Static Demo →
                </button>
              </div>

              {/* Real-time Mode Card */}
              <div 
                onClick={() => onModeSelect("realtime")}
                className="w-full max-w-md p-3 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg relative overflow-hidden cursor-pointer"
              >
                <div className="flex items-center gap-1 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white">Live Demo</h4>
                    {/* <span className="inline-block mt-1 px-2 py-0.5 bg-white/25 text-white text-xs font-semibold rounded-full">
                      Available
                    </span> */}
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed text-sm">
                  Live demonstration with Instrument Cluster display showing 
                  real-time headlight and indicator status via MQTT.
                </p>
                <button 
                  className="w-full mt-4 py-3 bg-black hover:bg-gray-800 text-white font-semibold rounded-xl"
                >
                  Enter Live Demo →
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section - Info (Centered below both) */}
          <div className="text-center mt-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
              In-Vehicle Network Security
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto leading-relaxed text-sm md:text-base">
              Demonstrating PKI-based security for automotive HCU with certificate validation and secure communication.
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              {features.map((feature, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  <span>{feature.icon}</span>
                  {feature.text}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>

     
    </div>
  );
};
export default LandingPage;
