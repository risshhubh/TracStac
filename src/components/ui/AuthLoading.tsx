'use client';

import React, { useEffect, useState } from 'react';

interface AuthLoadingProps {
  message?: string;
  onComplete?: () => void;
}

export const AuthLoading: React.FC<AuthLoadingProps> = ({ 
  message = "Logging you into TracStac", 
  onComplete 
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 20; // 20ms update rate
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete?.(), 200);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[200] bg-brand-dark flex flex-col items-center justify-center p-8 animate-in fade-in duration-500">
      <div className="max-w-md w-full space-y-12 text-center">
        
        {/* Brand Icon */}
        <div className="flex justify-center mb-8 animate-bounce">
          <div className="w-16 h-16 bg-brand-purple flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] border border-brand-purple/50">
            <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor">
              <rect x="2" y="4" width="8" height="3" />
              <rect x="4.5" y="7" width="3" height="13" />
              <rect x="14" y="4" width="8" height="3" />
              <rect x="14" y="7" width="3" height="3" />
              <rect x="14" y="10" width="8" height="3" />
              <rect x="19" y="13" width="3" height="4" />
              <rect x="14" y="17" width="8" height="3" />
            </svg>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white animate-pulse">
            {message}
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
            Initializing Secure Session... {Math.round(progress)}%
          </p>
        </div>

        {/* Game-like Progress Bar */}
        <div className="relative h-4 w-full bg-white/5 border border-white/10 p-1">
          <div 
            className="h-full bg-brand-purple transition-all duration-75 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            style={{ width: `${progress}%` }}
          />
          
          {/* Decorative Corner Marks */}
          <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-white/40" />
          <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-white/40" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-white/40" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-white/40" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className={`h-1 transition-colors duration-300 ${progress > 30 ? 'bg-brand-purple' : 'bg-white/5'}`} />
          <div className={`h-1 transition-colors duration-300 ${progress > 60 ? 'bg-brand-purple' : 'bg-white/5'}`} />
          <div className={`h-1 transition-colors duration-300 ${progress > 90 ? 'bg-brand-purple' : 'bg-white/5'}`} />
        </div>
      </div>

      {/* Decorative background scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
    </div>
  );
};
