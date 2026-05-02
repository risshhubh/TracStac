'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';

// Specified Lazy Loading using dynamic imports
const ProjectCard = dynamic(() => import('@/components/dashboard/ProjectCard').then(mod => mod.ProjectCard), {
  loading: () => <div className="h-48 bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse" />
});

const CreateProjectModal = dynamic(() => import('@/components/dashboard/CreateProjectModal').then(mod => mod.CreateProjectModal), {
  ssr: false
});

interface Project {
  id: string;
  name: string;
  description: string;
  _count: {
    tasks: number;
  };
  tasks: { status: string }[];
  updatedAt: string;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');

  // Authentication handled by middleware

  useEffect(() => {
    if (status === 'authenticated') {
      fetchProjects();
    }
  }, [status]);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newProjectName, description: newProjectDesc }),
      });
      if (res.ok) {
        setNewProjectName('');
        setNewProjectDesc('');
        setIsModalOpen(false);
        fetchProjects();
      }
    } catch (err) {
      console.error('Failed to create project');
    }
  };

  if (status === 'loading') {
    return null; // Handled by loading.tsx
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">Your <span className="text-brand-purple">Projects</span></h1>
            <p className="text-white/50 font-medium">Real-time status of your active stacks.</p>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            variant="primary" 
            className="px-8 py-4 font-black uppercase tracking-widest text-xs"
          >
            + Create New Project
          </Button>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
               <div key={i} className="h-48 bg-white/[0.02] border border-white/5 rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/5 rounded-3xl bg-white/[0.02]">
            <div className="w-20 h-20 bg-brand-purple/10 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">No Active Stacks</h2>
            <p className="text-white/40 mt-2 font-medium">Deploy your first project to start tracking progress.</p>
            <Button 
              onClick={() => setIsModalOpen(true)}
              variant="outline" 
              className="mt-8 px-10 border-white/20 text-white hover:bg-white/5"
            >
              Get Started
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      <CreateProjectModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={createProject}
        name={newProjectName}
        setName={setNewProjectName}
        desc={newProjectDesc}
        setDesc={setNewProjectDesc}
      />
    </div>
  );
}
