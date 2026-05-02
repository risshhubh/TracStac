import { Card, CardContent } from '@/components/ui/Card';

export const HowItWorks = () => (
  <section className="py-32 px-8 max-w-7xl mx-auto border-t border-white/5">
    <div className="text-center mb-20">
      <h3 className="text-3xl font-black uppercase tracking-widest mb-4 text-white">How It Works</h3>
      <p className="text-white/50 font-medium max-w-2xl mx-auto">The entire lifecycle of a project from inception to global analytics, designed to eliminate friction and maximize velocity.</p>
    </div>

    <div className="relative">
      <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-white/5 -translate-y-1/2 z-0" />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        
        <Card className="bg-[#0a0a0a] border-white/10 relative overflow-visible">
          <div className="absolute -top-6 -left-6 w-12 h-12 rounded-none bg-brand-purple flex items-center justify-center text-white font-black text-xl shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">1</div>
          <CardContent className="p-8 pt-10">
            <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">Admin Creates Project</h4>
            <p className="text-white/40 text-xs">The Admin logs into the Dashboard and creates a new project. The system automatically provisions the workspace and invites the team.</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-white/10 relative overflow-visible">
          <div className="absolute -top-6 -left-6 w-12 h-12 rounded-none bg-white flex items-center justify-center text-black font-black text-xl shadow-[4px_4px_0px_0px_rgba(168,85,247,0.3)]">2</div>
          <CardContent className="p-8 pt-10">
            <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">Tasks Auto-Assigned</h4>
            <p className="text-white/40 text-xs">The core execution tasks are instantly generated and appear exclusively on the Employee's personalized Task Kanban board.</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-white/10 relative overflow-visible">
          <div className="absolute -top-6 -left-6 w-12 h-12 rounded-none bg-brand-purple flex items-center justify-center text-white font-black text-xl shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">3</div>
          <CardContent className="p-8 pt-10">
            <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">Employee Executes</h4>
            <p className="text-white/40 text-xs">Employees execute the work, simply ticking the 'Completed' button on their task cards as they finish their assignments.</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0a0a0a] border-white/10 relative overflow-visible">
          <div className="absolute -top-6 -left-6 w-12 h-12 rounded-none bg-white flex items-center justify-center text-black font-black text-xl shadow-[4px_4px_0px_0px_rgba(168,85,247,0.3)]">4</div>
          <CardContent className="p-8 pt-10">
            <h4 className="text-white font-bold mb-2 uppercase tracking-widest text-sm">Analytics Update</h4>
            <p className="text-white/40 text-xs">As tasks turn green, the Progress tab updates in real-time, giving Admins a bird's-eye view of team workload and project velocity.</p>
          </CardContent>
        </Card>

      </div>
    </div>
  </section>
);
