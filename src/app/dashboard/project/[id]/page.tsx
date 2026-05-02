'use client';

import { useState, useEffect, use } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  assigneeId: string | null;
  assignee: { name: string; email: string } | null;
}

interface Project {
  id: string;
  name: string;
  description: string;
  ownerId: string;
  tasks: Task[];
  members: { id: string; name: string; email: string }[];
}

export default function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;
  
  const { data: session, status } = useSession();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('MEDIUM');
  const [newTaskAssignee, setNewTaskAssignee] = useState('');
  const [allUsers, setAllUsers] = useState<{id: string, name: string, email: string}[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    } else if (status === 'authenticated') {
      fetchProject();
    }
  }, [status]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      if (res.ok) {
        const data = await res.json();
        setProject(data);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Failed to fetch project');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users');
      if (res.ok) {
        const data = await res.json();
        setAllUsers(data);
      }
    } catch (err) {
      console.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUsers();
    }
  }, [status]);

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTaskTitle,
          description: newTaskDesc,
          priority: newTaskPriority,
          projectId: projectId,
          status: 'TODO',
          assigneeId: newTaskAssignee || session?.user?.id
        }),
      });
      if (res.ok) {
        setNewTaskTitle('');
        setNewTaskDesc('');
        setNewTaskPriority('MEDIUM');
        setNewTaskAssignee('');
        setIsTaskModalOpen(false);
        fetchProject();
      }
    } catch (err) {
      console.error('Failed to create task');
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      // Optimistic UI update
      if (project) {
        const updatedTasks = project.tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t);
        setProject({ ...project, tasks: updatedTasks });
      }

      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!res.ok) {
        fetchProject(); // Revert on failure
      }
    } catch (err) {
      console.error('Failed to update task');
      fetchProject();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
          <div className="space-y-2 border-b border-white/5 pb-8">
            <div className="h-10 w-64 bg-white/5 rounded-lg"></div>
            <div className="h-4 w-48 bg-white/5 rounded-lg"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-white/[0.02] border border-white/5 rounded-3xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!project) return null;

  const isAdmin = session?.user?.role === 'ADMIN';

  const filteredTasks = isAdmin 
    ? project.tasks 
    : project.tasks.filter(t => t.assigneeId === (session?.user as any)?.id);

  const tasksByStatus = {
    TODO: filteredTasks.filter(t => t.status === 'TODO'),
    IN_PROGRESS: filteredTasks.filter(t => t.status === 'IN_PROGRESS'),
    DONE: filteredTasks.filter(t => t.status === 'DONE'),
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Project Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
               <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">{project.name}</h1>
               <span className="text-xs font-black bg-white/10 text-white px-2 py-1 rounded uppercase tracking-widest">{project.members.length} Members</span>
            </div>
            <p className="text-white/50 font-medium">{project.description || 'No description provided.'}</p>
          </div>
          <Button 
            onClick={() => setIsTaskModalOpen(true)}
            variant="primary" 
            className="px-8 py-4 font-black uppercase tracking-widest text-xs"
          >
            + New Task
          </Button>
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
              <TaskCard key={task.id} task={task} isAdmin={isAdmin} onMove={() => updateTaskStatus(task.id, 'IN_PROGRESS')} moveLabel="Start" />
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
               <TaskCard key={task.id} task={task} isAdmin={isAdmin} onMove={() => updateTaskStatus(task.id, 'DONE')} moveLabel="Complete" />
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
               <TaskCard key={task.id} task={task} isAdmin={isAdmin} onMove={() => updateTaskStatus(task.id, 'TODO')} moveLabel="Reopen" />
            ))}
          </div>

        </div>
      </div>

      {/* CREATE TASK MODAL */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
           <Card className="w-full max-w-lg border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-black italic uppercase tracking-tighter">Deploy <span className="text-brand-purple">Task</span></CardTitle>
                  <button onClick={() => setIsTaskModalOpen(false)} className="text-white/30 hover:text-white transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={createTask} className="space-y-6">
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-white/50">Task Title</label>
                     <input 
                       required
                       autoFocus
                       value={newTaskTitle}
                       onChange={(e) => setNewTaskTitle(e.target.value)}
                       placeholder="e.g. Design Login Flow"
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-white/50">Description</label>
                     <textarea 
                       value={newTaskDesc}
                       onChange={(e) => setNewTaskDesc(e.target.value)}
                       rows={3}
                       placeholder="Task objectives..."
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors resize-none"
                     />
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-white/50">Priority</label>
                     <select 
                       value={newTaskPriority}
                       onChange={(e) => setNewTaskPriority(e.target.value)}
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors appearance-none"
                     >
                       <option value="LOW" className="bg-[#0a0a0a]">LOW</option>
                       <option value="MEDIUM" className="bg-[#0a0a0a]">MEDIUM</option>
                       <option value="HIGH" className="bg-[#0a0a0a]">HIGH</option>
                     </select>
                   </div>
                   <div className="space-y-2">
                     <label className="text-xs font-black uppercase tracking-widest text-white/50">Assignee</label>
                     <select 
                       value={newTaskAssignee}
                       onChange={(e) => setNewTaskAssignee(e.target.value)}
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors appearance-none"
                     >
                       <option value="" className="bg-[#0a0a0a]">Unassigned (Defaults to You)</option>
                       {allUsers.map(user => (
                         <option key={user.id} value={user.id} className="bg-[#0a0a0a]">{user.name}</option>
                       ))}
                     </select>
                   </div>
                   <div className="flex gap-4 pt-4">
                     <Button type="button" onClick={() => setIsTaskModalOpen(false)} variant="glass" className="flex-1 font-bold uppercase tracking-widest text-xs py-4">Cancel</Button>
                     <Button type="submit" variant="primary" className="flex-[2] font-black uppercase tracking-widest text-xs py-4">Deploy Task</Button>
                   </div>
                </form>
              </CardContent>
           </Card>
        </div>
      )}
    </div>
  );
}

// Sub-component for Task Card
const TaskCard = ({ task, isAdmin, onMove, moveLabel }: { task: Task, isAdmin: boolean, onMove: () => void, moveLabel: string }) => {
  const priorityColors: Record<string, string> = {
    HIGH: 'text-red-400 bg-red-400/10 border-red-400/20',
    MEDIUM: 'text-brand-purple bg-brand-purple/10 border-brand-purple/20',
    LOW: 'text-white/50 bg-white/5 border-white/10',
  };

  return (
    <Card className="bg-white/[0.02] border-white/5 hover:border-brand-purple/30 transition-all cursor-default group">
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
        <div className="pt-4 border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white font-bold">
              {task.assignee ? task.assignee.name.charAt(0).toUpperCase() : '?'}
            </div>
            <span className="text-xs text-white/40 truncate max-w-[80px]">
              {task.assignee ? task.assignee.name : 'Unassigned'}
            </span>
          </div>
          {!isAdmin && (
            <button 
              onClick={onMove}
              className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-brand-purple transition-colors"
            >
              {moveLabel} →
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
