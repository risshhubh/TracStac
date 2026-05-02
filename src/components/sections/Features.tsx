import { Card } from '@/components/ui/Card';

export const Features = () => (
  <section id="features" className="py-32 px-8 max-w-7xl mx-auto">
    <div className="text-center mb-20">
      <h3 className="text-3xl font-black uppercase tracking-widest mb-4 text-white">The Ultimate Workflow.</h3>
      <p className="text-white/50 font-medium">Three distinct views, perfectly automated together.</p>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="space-y-4 border-t-4 border-t-brand-purple">
        <div className="w-12 h-12 bg-brand-purple flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] text-white border border-brand-purple/50">👑</div>
        <h4 className="text-xl font-black italic">ADMIN COMMAND</h4>
        <p className="text-white/70 text-sm leading-relaxed">
          Log in as an Administrator to create projects. The system automatically creates tracking tasks and assigns your entire team.
        </p>
      </Card>
      <Card className="space-y-4 border-t-4 border-t-white">
        <div className="w-12 h-12 bg-white flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(168,85,247,0.3)] text-black border border-white">📋</div>
        <h4 className="text-xl font-black italic">EMPLOYEE EXECUTION</h4>
        <p className="text-white/70 text-sm leading-relaxed">
          Employees log in to a personalized Kanban board. Simply click "Completed" on a task and watch it turn green instantly.
        </p>
      </Card>
      <Card className="space-y-4 border-t-4 border-t-brand-purple">
        <div className="w-12 h-12 bg-brand-purple flex items-center justify-center text-2xl shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] text-white border border-brand-purple/50">📊</div>
        <h4 className="text-xl font-black italic">LIVE ANALYTICS</h4>
        <p className="text-white/70 text-sm leading-relaxed">
          As employees tick off tasks, the Progress dashboard automatically updates the entire company's global velocity in real-time.
        </p>
      </Card>
    </div>
  </section>
);
