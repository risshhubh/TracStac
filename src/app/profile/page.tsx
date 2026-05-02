'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchProfileStats();
    }
  }, [status]);

  const fetchProfileStats = async () => {
    try {
      const res = await fetch('/api/progress');
      if (res.ok) {
        const data = await res.json();
        setStats(data.stats);
      }
    } catch (err) {
      console.error('Failed to fetch profile stats');
    }
  };

  if (status === 'loading') return null;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">User <span className="text-brand-purple">Identity</span></h1>
            <p className="text-white/50 font-medium">Manage your personal stack and credentials.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Info */}
          <Card className="md:col-span-1 bg-white/[0.02] border-white/5">
            <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 bg-brand-purple flex items-center justify-center text-white text-4xl font-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] border border-brand-purple/50">
                {session.user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-black text-white uppercase italic tracking-tight">{session.user?.name}</h2>
                <p className="text-white/40 text-sm font-medium">{session.user?.email}</p>
              </div>
              <div className="pt-4 w-full">
                <span className="inline-block w-full py-2 bg-brand-purple/10 border border-brand-purple/20 text-brand-purple text-[10px] font-black uppercase tracking-widest rounded">
                  {(session.user as any).role || 'MEMBER'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Activity/Stats */}
          <Card className="md:col-span-2 bg-white/[0.02] border-white/5">
            <CardHeader>
              <CardTitle className="text-sm font-black uppercase tracking-widest text-white/70">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="p-8 pt-0">
               <div className="grid grid-cols-2 gap-6">
                  <div className="bg-white/5 p-6 border border-white/10 rounded-2xl">
                     <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-1">Tasks Assigned</span>
                     <span className="text-3xl font-black text-white">{stats ? (stats.totalAssigned || stats.totalTasks || 0) : '...'}</span>
                  </div>
                  <div className="bg-emerald-400/10 p-6 border border-emerald-400/20 rounded-2xl">
                     <span className="text-[10px] text-emerald-400/70 font-bold uppercase tracking-widest block mb-1">Completed</span>
                     <span className="text-3xl font-black text-emerald-400">{stats ? (stats.completed || stats.completedTasks || 0) : '...'}</span>
                  </div>
                  <div className="bg-brand-purple/10 p-6 border border-brand-purple/20 rounded-2xl col-span-2">
                     <div className="flex justify-between items-end mb-2">
                        <span className="text-[10px] text-brand-purple font-bold uppercase tracking-widest">Efficiency Rate</span>
                        <span className="text-2xl font-black text-white">{stats ? (stats.progress || stats.overallProgress || 0) : '0'}%</span>
                     </div>
                     <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                        <div 
                           className="h-full bg-brand-purple transition-all duration-1000" 
                           style={{ width: `${stats ? (stats.progress || stats.overallProgress || 0) : 0}%` }}
                        />
                     </div>
                  </div>
               </div>
               
               <div className="mt-8">
                  <Button variant="outline" className="w-full py-4 border-white/10 text-white hover:bg-white/5 font-bold uppercase tracking-widest text-xs">
                     Download Identity Report
                  </Button>
               </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
