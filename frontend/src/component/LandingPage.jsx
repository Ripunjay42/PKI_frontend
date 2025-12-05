import React, { useState } from "react";
import reepImage from "../assets/auto0.png";
import { FaShieldAlt, FaCertificate, FaLock } from 'react-icons/fa';

// Simple feature metadata with descriptions for interactivity
const FEATURE_META = [
  { id: 'pki', title: 'PKI-Based Security', icon: <FaShieldAlt size={18} />, desc: 'Root + intermediate CA trust chain securing in-vehicle endpoints.' },
  { id: 'validation', title: 'Certificate Validation', icon: <FaCertificate size={18} />, desc: 'Live validation of device certificates with revocation awareness.' },
  { id: 'secure-comms', title: 'Secure Communication', icon: <FaLock size={18} />, desc: 'Authenticated messaging leveraging validated identities over MQTT.' }
];

const LandingPage = ({ onModeSelect }) => {
  const [activeFeature, setActiveFeature] = useState(null);

  const toggleFeature = (id) => {
    setActiveFeature(prev => prev === id ? null : id);
  };

  return (
    <div className="h-screen flex flex-col overflow-y-auto">
      {/* Background Section */}
      <div
        className="flex-1 relative"
        style={{
          // backgroundImage: `url(${reepImage})`,
          backgroundColor: '#DBDBDB',
        }}
      >
        {/* Dark gradient overlay */}
        {/* <div className="absolute inset-0 bg-linear-to-br from-black/75 via-black/80 to-black/85" /> */}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-start gap-4 md:gap-5 h-full px-2 py-2 md:py-2 overflow-y-auto">
          {/* Hero */}
          <div className="text-center px-1 py-1 md:py-1 ">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-clip-text text-cyan-800">
              PKI Security Demonstration
            </h1>
            <p className="text-base md:text-xl font-medium text-black max-w-3xl mx-auto leading-relaxed">
              A modern, certificate-driven trust framework for secure automotive endpoints.
            </p>
          </div>

          {/* Featured Image Section */}
          <div className="w-full flex justify-center px-2 mt-2 md:mt-4">
            <div className="relative max-w-xl w-full group">
              {/* Decorative corner accents */}
              <div className="absolute -top-2 -left-2 w-12 h-12 border-t-4 border-l-4 border-cyan-600 rounded-tl-xl"></div>
              <div className="absolute -top-2 -right-2 w-12 h-12 border-t-4 border-r-4 border-teal-600 rounded-tr-xl"></div>
              <div className="absolute -bottom-2 -left-2 w-12 h-12 border-b-4 border-l-4 border-teal-600 rounded-bl-xl"></div>
              <div className="absolute -bottom-2 -right-2 w-12 h-12 border-b-4 border-r-4 border-cyan-600 rounded-br-xl"></div>
              
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-linear-to-br from-cyan-600/30 via-transparent to-teal-600/30 rounded-2xl blur-2xl scale-110"></div>
              
              {/* Inner frame with gradient border */}
              <div className="relative p-1 rounded-2xl bg-linear-to-br from-cyan-600/50 via-slate-800/50 to-teal-600/50 shadow-2xl">
                <div className="bg-cyan-200/45 rounded-xl p-2">
                  <img 
                    src={reepImage} 
                    alt="PKI Security Automotive" 
                    className="w-full h-auto max-h-96 object-contain rounded-lg"
                  />
                </div>
              </div>
              
              {/* Subtle animated pulse rings */}
              <div className="absolute inset-0 rounded-2xl border border-cyan-500/20 animate-pulse"></div>
            </div>
          </div>

          {/* Bottom container: keep middle and last sections at bottom */}
          <div className="w-full flex flex-col items-center gap-3 md:gap-4 mt-2">
            {/* Interactive Features (middle) */}
            <div className="w-full lg:w-3/4 xl:w-3/7">
              <h2 className="text-center text-xl md:text-2xl font-semibold text-black mb-2 md:mb-3 tracking-wide">In-Vehicle Network Security</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                {FEATURE_META.map(f => {
                  const expanded = activeFeature === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => toggleFeature(f.id)}
                      className={`group relative flex flex-col items-start rounded-2xl px-4 py-3 text-center`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="p-2 rounded-xl bg-linear-to-br from-cyan-600 to-teal-600 text-white shadow-inner shadow-black/40 group-hover:scale-105 transition-transform">{f.icon}</span>
                        <span className="text-sm font-semibold text-black tracking-wide">{f.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action Panels (last) */}
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-center w-full max-w-6xl">
              {/* Static Demo Card */}
              <div className="w-full lg:w-auto flex justify-center">
                <div
                  onClick={() => onModeSelect('static')}
                  className="relative w-full max-w-sm p-3 rounded-3xl cursor-pointer bg-linear-to-br from-indigo-900 via-blue-900 to-slate-900 shadow-xl hover:shadow-2xl transition group overflow-hidden border border-white/10"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent_60%)] transition" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    {/* <h4 className="text-xl font-bold text-white tracking-wide">Static Demo</h4> */}
                  </div>
                  <p className="text-white/85 leading-relaxed text-sm mb-5">
                    Inspect certificate validation and PKI security for the Light Control Unit.
                  </p>
                  <div className="relative">
                    <span className="absolute inset-0 rounded-xl bg-linear-to-r from-cyan-500/0 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition" />
                    <button className="w-full py-3 bg-black/70 hover:bg-black text-white font-semibold rounded-xl transition-colors text-sm tracking-wide">
                      Enter PKI Demonstration →
                    </button>
                  </div>
                </div>
              </div>

              {/* Live Demo Card */}
              <div className="w-full lg:w-auto flex justify-center">
                <div
                  onClick={() => onModeSelect('realtime')}
                  className="relative w-full max-w-sm p-3 rounded-3xl cursor-pointer bg-linear-to-br from-teal-800 via-emerald-800 to-cyan-900 shadow-xl hover:shadow-2xl transition group overflow-hidden border border-white/10"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4),transparent_60%)] transition" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center backdrop-blur">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    {/* <h4 className="text-xl font-bold text-white tracking-wide">Live Demo</h4> */}
                  </div>
                  <p className="text-white/85 leading-relaxed text-sm mb-5">
                    Observe indicators validated against PKI, published securely over MQTT channels.
                  </p>
                  <div className="relative">
                    <span className="absolute inset-0 rounded-xl bg-linear-to-r from-teal-400/0 via-teal-300/10 to-transparent opacity-0 group-hover:opacity-100 blur-sm transition" />
                    <button className="w-full py-3 bg-black/70 hover:bg-black text-white font-semibold rounded-xl transition-colors text-sm tracking-wide">
                      Launch Vehicle Dashboard →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
export default LandingPage;
