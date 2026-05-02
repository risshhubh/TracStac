'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  project: { name: string };
  assignee: { name: string; email: string } | null;
  dueDate: string | null;
}

export const EmployeeDashboard = () => {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch('/api/tasks/me');
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (err) {
      console.error('Failed to fetch my tasks');
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      // Optimistic UI update
      setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t));

      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!res.ok) {
        fetchTasks(); // Revert on failure
      }
    } catch (err) {
      fetchTasks();
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse" />
        ))}
      </div>
    );
  }

  const tasksByStatus = {
    TODO: tasks.filter(t => t.status === 'TODO'),
    IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS'),
    DONE: tasks.filter(t => t.status === 'DONE'),
  };

  const isAdmin = session?.user?.role === 'ADMIN';

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">
            {isAdmin ? 'Global ' : 'Your '} 
            <span className="text-brand-purple">Workload</span>
          </h1>
          <p className="text-white/50 font-medium">
            {isAdmin ? 'Monitoring all active tasks across the organization.' : 'Manage your assigned tasks across all projects.'}
          </p>
        </div>
        <div className="flex space-x-4">
            <div className="bg-white/5 px-4 py-2 rounded-xl text-center border border-white/10">
                <span className="block text-xl font-black text-white">{tasksByStatus.TODO.length + tasksByStatus.IN_PROGRESS.length}</span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Open Tasks</span>
            </div>
            <div className="bg-emerald-400/10 px-4 py-2 rounded-xl text-center border border-emerald-400/20">
                <span className="block text-xl font-black text-emerald-400">{tasksByStatus.DONE.length}</span>
                <span className="text-[10px] uppercase tracking-widest text-emerald-400/70 font-bold">Completed</span>
            </div>
        </div>
      </header>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        
        {/* TODO Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <h3 className="text-white/70 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-white/20"></span> TO DO
             </h3>
             <span className="bg-white/5 text-white/50 text-xs px-2 py-1 rounded font-bold">{tasksByStatus.TODO.length}</span>
          </div>
          {tasksByStatus.TODO.map(task => (
            <TaskCard key={task.id} task={task} isAdmin={isAdmin} onUpdateStatus={(status) => updateTaskStatus(task.id, status)} />
          ))}
        </div>

        {/* IN PROGRESS Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <h3 className="text-brand-purple font-bold uppercase tracking-widest text-sm flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span> IN PROGRESS
             </h3>
             <span className="bg-brand-purple/10 text-brand-purple text-xs px-2 py-1 rounded font-bold">{tasksByStatus.IN_PROGRESS.length}</span>
          </div>
          {tasksByStatus.IN_PROGRESS.map(task => (
             <TaskCard key={task.id} task={task} isAdmin={isAdmin} onUpdateStatus={(status) => updateTaskStatus(task.id, status)} />
          ))}
        </div>

        {/* DONE Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
               <span className="w-2 h-2 rounded-full bg-emerald-400"></span> DONE
             </h3>
             <span className="bg-emerald-400/10 text-emerald-400 text-xs px-2 py-1 rounded font-bold">{tasksByStatus.DONE.length}</span>
          </div>
          {tasksByStatus.DONE.map(task => (
             <TaskCard key={task.id} task={task} isAdmin={isAdmin} onUpdateStatus={(status) => updateTaskStatus(task.id, status)} />
          ))}
        </div>

      </div>
    </div>
  );
};

const TaskCard = ({ task, isAdmin, onUpdateStatus }: { task: Task, isAdmin: boolean, onUpdateStatus: (status: string) => void }) => {
  const priorityColors: Record<string, string> = {
    HIGH: 'text-red-400 bg-red-400/10 border-red-400/20 shadow-[0_0_15px_rgba(248,113,113,0.1)]',
    MEDIUM: 'text-brand-purple bg-brand-purple/10 border-brand-purple/20',
    LOW: 'text-white/50 bg-white/5 border-white/10',
  };

  // Check if overdue (simulated for now, could be real logic)
  const isOverdue = false; 

  return (
    <Card className={`bg-white/[0.02] border-white/5 hover:border-brand-purple/30 transition-all cursor-default group ${isOverdue ? 'border-red-400/50 shadow-[0_0_20px_rgba(248,113,113,0.15)]' : ''}`}>
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between items-start gap-4">
          <h4 className="text-white font-bold text-sm leading-tight">{task.title}</h4>
          <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${priorityColors[task.priority] || priorityColors.LOW}`}>
            {task.priority}
          </span>
        </div>
        {task.description && (
          <p className="text-white/40 text-xs line-clamp-2">{task.description}</p>
        )}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Project</span>
            <span className="text-xs text-brand-purple font-bold truncate max-w-[120px]">
              {task.project.name}
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest text-right">Assignee</span>
            <span className="text-xs text-white/70 font-bold truncate max-w-[100px]">
              {task.assignee ? task.assignee.name : 'Unassigned'}
            </span>
          </div>
        </div>
        {!isAdmin && (
          <div className="pt-4 mt-4 border-t border-white/5 flex gap-2">
            <button 
              onClick={() => onUpdateStatus('TODO')}
              className={`flex-1 text-[9px] font-black uppercase tracking-widest px-2 py-2 transition-colors ${task.status === 'TODO' ? 'bg-white/20 text-white shadow-inner' : 'bg-[#0a0a0a] border border-white/10 text-white/40 hover:text-white hover:border-white/30'}`}
            >
              To Do
            </button>
            <button 
              onClick={() => onUpdateStatus('IN_PROGRESS')}
              className={`flex-1 text-[9px] font-black uppercase tracking-widest px-2 py-2 transition-colors ${task.status === 'IN_PROGRESS' ? 'bg-brand-purple text-white shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)]' : 'bg-[#0a0a0a] border border-white/10 text-white/40 hover:text-brand-purple hover:border-brand-purple/50'}`}
            >
              Ongoing
            </button>
            <button 
              onClick={() => onUpdateStatus('DONE')}
              className={`flex-1 text-[9px] font-black uppercase tracking-widest px-2 py-2 transition-colors ${task.status === 'DONE' ? 'bg-emerald-400 text-brand-dark shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]' : 'bg-[#0a0a0a] border border-white/10 text-white/40 hover:text-emerald-400 hover:border-emerald-400/50'}`}
            >
              Completed
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
