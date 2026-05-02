'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useSession } from 'next-auth/react';

export const Hero = () => {
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <section className="relative pt-40 pb-20 px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-brand-purple/20 blur-[120px] -z-10" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-brand-purple/10 blur-[120px] -z-10" />

      <div className="max-w-2xl space-y-8 text-left z-10">
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-tight">
          THE ULTIMATE <br />
          <span className="text-brand-purple uppercase">
            COMMAND CENTER.
          </span>
        </h2>
        <p className="text-xl text-white/70 max-w-xl font-medium">
          Ship faster with a high-performance, distraction-free environment. Automate task tracking and watch your global velocity update in real-time.
        </p>
        <div className="pt-4 flex justify-start space-x-6">
          {!session ? (
            <Link href="/signup">
              <Button variant="primary" size="lg" className="px-10">Get Started</Button>
            </Link>
          ) : isAdmin ? (
            <Link href="/dashboard">
              <Button variant="primary" size="lg" className="px-10">Admin Dashboard</Button>
            </Link>
          ) : (
            <Link href="/tasks">
              <Button variant="primary" size="lg" className="px-10">My Tasks</Button>
            </Link>
          )}
          <Link href="#features">
            <Button variant="glass" size="lg" className="px-10">Explore Features</Button>
          </Link>
        </div>
      </div>

    <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[500px] border border-white/10 bg-[#0a0a0a] overflow-hidden shadow-[8px_8px_0px_0px_rgba(168,85,247,0.2)] animate-in fade-in slide-in-from-right-10 duration-1000 mt-12 lg:mt-0">
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      {/* Animated Task Card (Floating Left) */}
      <div className="absolute top-16 left-8 md:left-20 w-48 md:w-64 bg-[#0a0a0a] border border-brand-purple/50 p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(168,85,247,0.5)] animate-[bounce_4s_infinite] z-10">
        <div className="flex justify-between items-center mb-4">
          <div className="h-2 w-12 bg-brand-purple"></div>
          <span className="text-[8px] md:text-[10px] font-black text-brand-purple uppercase tracking-widest px-2 border border-brand-purple/20 bg-brand-purple/10">High</span>
        </div>
        <div className="h-3 w-3/4 bg-white/20 mb-2"></div>
        <div className="h-3 w-1/2 bg-white/20 mb-6"></div>
        <div className="h-8 w-full border border-brand-purple border-dashed flex items-center justify-center text-brand-purple text-xs font-black uppercase tracking-widest">
          IN PROGRESS
        </div>
      </div>

      {/* Animated Progress Card (Floating Right) */}
      <div className="absolute bottom-16 right-8 md:right-20 w-56 md:w-80 bg-[#0a0a0a] border border-emerald-400/50 p-4 md:p-6 shadow-[4px_4px_0px_0px_rgba(52,211,153,0.5)] animate-[pulse_3s_infinite] z-10">
        <div className="flex justify-between mb-4">
          <span className="text-[10px] md:text-xs uppercase font-black text-emerald-400 tracking-widest">Global Velocity</span>
          <span className="text-[10px] md:text-xs uppercase font-black text-emerald-400">92%</span>
        </div>
        <div className="h-2 w-full bg-white/10">
          <div className="h-full bg-emerald-400 w-[92%] relative">
             <div className="absolute top-0 right-0 w-2 h-full bg-white animate-pulse"></div>
          </div>
        </div>
        <p className="mt-4 text-[9px] text-white/30 uppercase tracking-widest font-bold">14 Tasks Completed Today</p>
      </div>

      {/* Central Pulsing Core */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        {/* Radar circles */}
        <div className="w-32 h-32 md:w-64 md:h-64 border border-brand-purple/20 rounded-full animate-[ping_4s_infinite] absolute"></div>
        <div className="w-24 h-24 md:w-48 md:h-48 border border-brand-purple/40 rounded-full animate-[ping_2s_infinite] absolute delay-700"></div>
        
        {/* Core block */}
        <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-purple flex items-center justify-center shadow-[0_0_50px_rgba(168,85,247,0.6)] z-10 border border-white/20 hover:scale-105 transition-transform cursor-pointer">
          <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor">
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
    </div>
  </section>
  );
};
