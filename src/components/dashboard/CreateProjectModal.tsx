import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  name: string;
  setName: (val: string) => void;
  desc: string;
  setDesc: (val: string) => void;
}

export const CreateProjectModal = ({ isOpen, onClose, onSubmit, name, setName, desc, setDesc }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
       <Card className="w-full max-w-lg border-white/10 shadow-2xl animate-in zoom-in-95 duration-300">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-black italic uppercase tracking-tighter">New <span className="text-brand-purple">Project</span></CardTitle>
              <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-6">
               <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-white/50">Project Name</label>
                 <input 
                   required
                   autoFocus
                   value={name}
                   onChange={(e) => setName(e.target.value)}
                   placeholder="e.g. Phoenix Launch"
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-black uppercase tracking-widest text-white/50">Description</label>
                 <textarea 
                   value={desc}
                   onChange={(e) => setDesc(e.target.value)}
                   rows={4}
                   placeholder="What is the objective of this stack?"
                   className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors resize-none"
                 />
               </div>
               <div className="flex gap-4 pt-4">
                 <Button type="button" onClick={onClose} variant="glass" className="flex-1 font-bold uppercase tracking-widest text-xs py-4">Cancel</Button>
                 <Button type="submit" variant="primary" className="flex-[2] font-black uppercase tracking-widest text-xs py-4">Initialize Project</Button>
               </div>
            </form>
          </CardContent>
       </Card>
    </div>
  );
};
