'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

export default function ProgressPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProgress();
    }
  }, [status]);

  const fetchProgress = async () => {
    try {
      const res = await fetch('/api/progress');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to fetch progress');
    } finally {
      setLoading(false);
    }
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
          <div className="space-y-2">
            <div className="h-10 w-64 bg-white/5 rounded-lg"></div>
            <div className="h-4 w-48 bg-white/5 rounded-lg"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-white/[0.02] border border-white/5 rounded-2xl"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-48 bg-white/[0.02] border border-white/5 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const isAdmin = data.role === 'ADMIN';

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">
              {isAdmin ? "Team " : "Personal "}<span className="text-brand-purple">Analytics</span>
            </h1>
            <p className="text-white/50 font-medium">
              {isAdmin ? "High-level overview of team workload and velocity." : "Track your performance and recent activity."}
            </p>
          </div>
        </header>

        {isAdmin ? (
          /* ADMIN VIEW */
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              <StatCard title="Total Projects" value={data.stats.totalProjects} />
              <StatCard title="Total Tasks" value={data.stats.totalTasks} />
              <StatCard title="Ongoing" value={data.stats.ongoingTasks} color="text-brand-purple" />
              <StatCard title="Completed" value={data.stats.completedTasks} color="text-emerald-400" />
              <StatCard title="Global Velocity" value={`${data.stats.overallProgress}%`} color="text-white" />
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span> GLOBAL ACTIVITY
              </h3>
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 space-y-6">
                {data.activities.length === 0 ? (
                  <p className="text-white/40 text-sm italic">No team activity found.</p>
                ) : (
                  data.activities.map((act: any) => (
                    <div key={act.id} className="flex items-start space-x-4">
                      <div className="w-2 h-2 rounded-full bg-brand-purple mt-2" />
                      <div>
                        <p className="text-sm font-bold text-white">
                          <span className="text-brand-purple">{act.user?.name || 'User'}</span> {act.details}
                        </p>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">
                          {new Date(act.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span> TEAM WORKLOAD
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.team.map((member: any) => {
                  const isOverloaded = member._count.tasks > 5;
                  const isIdle = member._count.tasks === 0;
                  
                  return (
                    <Card key={member.id} className={`bg-white/[0.02] border-white/5 transition-all ${isOverloaded ? 'border-red-400/50 shadow-[0_0_20px_rgba(248,113,113,0.15)]' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                           <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                                {member.name ? member.name.charAt(0).toUpperCase() : 'U'}
                              </div>
                              <div>
                                <p className="text-white font-bold">{member.name || 'Unnamed User'}</p>
                                <p className="text-xs text-white/40">{member.email}</p>
                              </div>
                           </div>
                           <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${member.role === 'ADMIN' ? 'text-brand-purple border-brand-purple/20 bg-brand-purple/10' : 'text-white/50 border-white/10 bg-white/5'}`}>
                             {member.role}
                           </span>
                        </div>
                        <div className="mt-6 pt-4 border-t border-white/5 flex items-end justify-between">
                          <div>
                            <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest block mb-1">Open Tasks</span>
                            <span className={`text-3xl font-black ${isOverloaded ? 'text-red-400' : isIdle ? 'text-white/20' : 'text-white'}`}>
                              {member._count.tasks}
                            </span>
                          </div>
                          {isOverloaded && <span className="text-[10px] text-red-400 font-bold uppercase tracking-widest bg-red-400/10 px-2 py-1 rounded">Overloaded</span>}
                          {isIdle && <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Idle</span>}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          /* EMPLOYEE VIEW */
          <div className="space-y-8">
             <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <StatCard title="Assigned Tasks" value={data.stats.totalAssigned} />
              <StatCard title="Ongoing" value={data.stats.ongoing} color="text-brand-purple" />
              <StatCard title="Completed" value={data.stats.completed} color="text-emerald-400" />
              <StatCard title="Completion Rate" value={`${data.stats.progress}%`} color="text-white" />
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-bold uppercase tracking-widest text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white/20"></span> RECENT ACTIVITY
              </h3>
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 space-y-6">
                {data.activities.length === 0 ? (
                  <p className="text-white/40 text-sm italic">No recent activity found.</p>
                ) : (
                  data.activities.map((act: any) => (
                    <div key={act.id} className="flex items-start space-x-4">
                      <div className="w-2 h-2 rounded-full bg-brand-purple mt-2" />
                      <div>
                        <p className="text-sm font-bold text-white">{act.details}</p>
                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest mt-1">
                          {new Date(act.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}

const StatCard = ({ title, value, color = "text-white" }: { title: string, value: string | number, color?: string }) => (
  <Card className="bg-white/[0.02] border-white/5">
    <CardContent className="p-6">
      <h4 className="text-[10px] text-white/40 font-bold uppercase tracking-widest mb-2">{title}</h4>
      <p className={`text-4xl font-black ${color}`}>{value}</p>
    </CardContent>
  </Card>
);
