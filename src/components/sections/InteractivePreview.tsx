'use client';

import { useState } from 'react';
import { Card, CardContent } from '../ui/Card';

const MOCK_TASKS = [
  { id: 1, title: 'Identity System Redesign', status: 'TODO', priority: 'HIGH', user: 'RD' },
  { id: 2, title: 'Database Migration v2', status: 'IN_PROGRESS', priority: 'MEDIUM', user: 'AK' },
  { id: 3, title: 'OAuth Flow Integration', status: 'TODO', priority: 'HIGH', user: 'SM' },
];

export const InteractivePreview = () => {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [activeTab, setActiveTab] = useState('ADMIN');

  const moveTask = (id: number) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        if (t.status === 'TODO') return { ...t, status: 'IN_PROGRESS' };
        if (t.status === 'IN_PROGRESS') return { ...t, status: 'DONE' };
        return { ...t, status: 'TODO' };
      }
      return t;
    }));
  };

  return (
    <section className="py-24 px-8 bg-brand-dark">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <div className="text-center space-y-4">
           <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
             LIVE <span className="text-brand-purple">WORKFLOW</span> SYNC
           </h2>
           <p className="text-white/40 font-medium max-w-xl mx-auto">
             Experience the instant interaction between Administrators and Employees. 
             Click tasks to simulate a real-world update cycle.
           </p>
        </div>

        <div className="bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
          {/* Header */}
          <div className="border-b border-white/5 bg-white/[0.02] p-4 flex items-center justify-between">
             <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/20" />
             </div>
             <div className="flex bg-black/40 rounded-full p-1 border border-white/10">
                <button 
                  onClick={() => setActiveTab('ADMIN')}
                  className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${activeTab === 'ADMIN' ? 'bg-brand-purple text-white' : 'text-white/40 hover:text-white'}`}
                >
                  Admin View
                </button>
                <button 
                  onClick={() => setActiveTab('EMPLOYEE')}
                  className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full transition-all ${activeTab === 'EMPLOYEE' ? 'bg-brand-purple text-white' : 'text-white/40 hover:text-white'}`}
                >
                  Employee View
                </button>
             </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 min-h-[400px]">
            {['TODO', 'IN_PROGRESS', 'DONE'].map((status) => (
              <div key={status} className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                    {status.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] font-black bg-white/5 px-2 py-0.5 rounded text-white/40">
                    {tasks.filter(t => t.status === status).length}
                  </span>
                </div>
                
                <div className="space-y-4">
                  {tasks.filter(t => t.status === status).map((task) => (
                    <div 
                      key={task.id}
                      onClick={() => activeTab === 'EMPLOYEE' && moveTask(task.id)}
                      className={`group p-4 bg-white/[0.03] border border-white/5 rounded-xl transition-all ${activeTab === 'EMPLOYEE' ? 'cursor-pointer hover:border-brand-purple/50 hover:bg-white/[0.05] active:scale-95' : 'cursor-default'}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-widest ${task.priority === 'HIGH' ? 'bg-red-500/20 text-red-400' : 'bg-brand-purple/20 text-brand-purple'}`}>
                          {task.priority}
                        </span>
                        <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center text-[10px] font-black text-white/40 border border-white/5">
                          {task.user}
                        </div>
                      </div>
                      <h4 className="text-sm font-bold text-white/90 mb-4 group-hover:text-white transition-colors">{task.title}</h4>
                      
                      {activeTab === 'EMPLOYEE' && status !== 'DONE' && (
                        <div className="flex items-center space-x-2 text-[8px] font-black text-brand-purple uppercase tracking-widest animate-pulse">
                           <span>Click to Update</span>
                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                           </svg>
                        </div>
                      )}
                    </div>
                  ))}

                  {tasks.filter(t => t.status === status).length === 0 && (
                    <div className="h-24 border-2 border-dashed border-white/5 rounded-xl flex items-center justify-center">
                       <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest">No Tasks</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Overlay */}
          <div className="bg-brand-purple/5 p-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
             <div className="flex items-center space-x-3 text-xs">
                <div className={`w-2 h-2 rounded-full bg-brand-purple ${activeTab === 'EMPLOYEE' ? 'animate-ping' : ''}`} />
                <span className="text-white/60 font-bold uppercase tracking-widest">
                  {activeTab === 'ADMIN' ? 'Monitoring Global Activity...' : 'You are currently in Executor Mode'}
                </span>
             </div>
             <p className="text-[10px] text-white/30 font-medium italic">
                {activeTab === 'ADMIN' 
                  ? 'Real-time telemetry showing employee progress across the organization.'
                  : 'Updating a task here will instantly notify the administrator dashboard.'}
             </p>
          </div>
        </div>

      </div>
    </section>
  );
};
