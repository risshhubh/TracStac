'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

export const Footer = () => {
  const { data: session } = useSession();

  return (
    <footer className="bg-[#0a0a0a] border-t border-white/5 py-16 px-8 overflow-hidden relative">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-purple/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        
        {/* Brand Section */}
        <div className="md:col-span-1 space-y-6">
           <Link href="/" className="cursor-pointer group">
              <div className="flex items-center space-x-1">
                <div className="w-8 h-8 bg-brand-purple flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] border border-brand-purple/50 group-hover:scale-105 transition-transform">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                    <rect x="2" y="4" width="8" height="3" />
                    <rect x="4.5" y="7" width="3" height="13" />
                    <rect x="14" y="4" width="8" height="3" />
                    <rect x="14" y="7" width="3" height="3" />
                    <rect x="14" y="10" width="8" height="3" />
                    <rect x="19" y="13" width="3" height="4" />
                    <rect x="14" y="17" width="8" height="3" />
                  </svg>
                </div>
                <h1 className="text-xl font-black text-white tracking-tighter">
                  TRAC<span className="text-brand-purple">STAC</span>
                </h1>
              </div>
           </Link>
           <p className="text-white/40 text-xs font-medium leading-relaxed max-w-xs">
              Absolute precision in project execution. Built for elite teams who demand high-impact design and automated synchronization.
           </p>
        </div>

        {/* Platform Links */}
        <div className="space-y-6">
           <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Platform</h4>
           <ul className="space-y-4">
              <li><Link href="/" className="text-sm font-bold text-white/60 hover:text-brand-purple transition-colors">Home Portal</Link></li>
              <li><Link href="/tasks" className="text-sm font-bold text-white/60 hover:text-brand-purple transition-colors">Global Tasks</Link></li>
              <li><Link href="/progress" className="text-sm font-bold text-white/60 hover:text-brand-purple transition-colors">Analytics & Sync</Link></li>
              {(session?.user as any)?.role === 'ADMIN' && (
                <li><Link href="/dashboard" className="text-sm font-bold text-white/60 hover:text-brand-purple transition-colors">Admin Command</Link></li>
              )}
           </ul>
        </div>

        {/* Support Links */}
        <div className="space-y-6">
           <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Organization</h4>
           <ul className="space-y-4">
              <li><Link href="/profile" className="text-sm font-bold text-white/60 hover:text-brand-purple transition-colors">Member Identity</Link></li>
              <li><Link href="/settings" className="text-sm font-bold text-white/60 hover:text-brand-purple transition-colors">System Preferences</Link></li>
              <li><Link href="/contact" className="text-sm font-bold text-white/60 hover:text-brand-purple transition-colors">Dispatch Support</Link></li>
           </ul>
        </div>

        {/* Status Section */}
        <div className="space-y-6">
           <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">System Status</h4>
           <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Network</span>
                 <div className="flex items-center space-x-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Operational</span>
                 </div>
              </div>
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Version</span>
                 <span className="text-[10px] font-black text-white/80 uppercase tracking-widest">v1.0.4-STABLE</span>
              </div>
           </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
         <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">
            © 2026 TRACSTAC INC. | ALL SYSTEMS SECURED
         </p>
         <div className="flex space-x-8">
            <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest cursor-pointer hover:text-white/40 transition-colors">Legal Protocol</span>
            <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest cursor-pointer hover:text-white/40 transition-colors">Data Encryption</span>
         </div>
      </div>
    </footer>
  );
};
