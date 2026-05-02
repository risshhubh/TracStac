import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

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

export const ProjectCard = ({ project }: { project: Project }) => {
  const isOngoing = project.tasks.some(t => t.status === 'IN_PROGRESS');
  const isCompleted = project.tasks.length > 0 && project.tasks.every(t => t.status === 'DONE');

  return (
    <Link href={`/dashboard/project/${project.id}`}>
      <Card key={project.id} className="group hover:border-brand-purple/50 transition-all cursor-pointer border-white/5 bg-white/[0.02]">

      <CardHeader>
         <div className="flex justify-between items-start">
           <CardTitle className="text-xl font-black italic uppercase tracking-tighter group-hover:text-brand-purple transition-colors">{project.name}</CardTitle>
           {isCompleted ? (
             <span className="text-[10px] font-black bg-emerald-400/20 text-emerald-400 px-2 py-0.5 rounded uppercase tracking-widest">Completed</span>
           ) : isOngoing ? (
             <span className="text-[10px] font-black bg-brand-purple/20 text-brand-purple px-2 py-0.5 rounded uppercase tracking-widest">Ongoing</span>
           ) : (
             <span className="text-[10px] font-black bg-white/10 text-white/40 px-2 py-0.5 rounded uppercase tracking-widest">Planned</span>
           )}
         </div>
         <p className="text-white/40 text-sm line-clamp-2 mt-2">{project.description || 'No description provided.'}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex items-center space-x-2">
             <div className={`w-2 h-2 rounded-full ${isOngoing ? 'bg-brand-purple animate-pulse' : isCompleted ? 'bg-emerald-400' : 'bg-white/20'}`}></div>
             <span className="text-xs font-bold text-white/60 uppercase tracking-widest">{project._count.tasks} Tasks</span>
          </div>
          <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Updated {new Date(project.updatedAt).toLocaleDateString()}</span>
        </div>
      </CardContent>
    </Card>
    </Link>
  );
};
