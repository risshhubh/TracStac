'use client';

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-8 flex items-center justify-center">
      <div className="max-w-xl w-full animate-in fade-in zoom-in-95 duration-500">
        
        <div className="text-center mb-12">
           <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase">Support <span className="text-brand-purple">Portal</span></h1>
           <p className="text-white/40 font-medium mt-2 uppercase tracking-widest text-xs">Reach out to the command center.</p>
        </div>

        <Card className="bg-white/[0.02] border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <CardContent className="p-10">
            {submitted ? (
              <div className="text-center space-y-6 py-12">
                <div className="w-20 h-20 bg-emerald-400/10 rounded-full flex items-center justify-center mx-auto border border-emerald-400/20">
                   <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                   </svg>
                </div>
                <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Message <span className="text-brand-purple">Transmitted</span></h2>
                <p className="text-white/50">Our team has received your signal. Expect a response within 24 standard hours.</p>
                <Button onClick={() => setSubmitted(false)} variant="glass" className="px-10 py-4 font-black uppercase tracking-widest text-xs">Send Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Subject</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors appearance-none font-bold uppercase tracking-widest text-xs">
                    <option className="bg-[#0a0a0a]">Technical Support</option>
                    <option className="bg-[#0a0a0a]">Billing Inquiry</option>
                    <option className="bg-[#0a0a0a]">Feature Request</option>
                    <option className="bg-[#0a0a0a]">Security Report</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Message Content</label>
                  <textarea 
                    required
                    rows={5}
                    placeholder="Describe your situation in detail..."
                    className="w-full bg-white/5 border border-white/10 rounded-none px-4 py-3 text-white focus:outline-none focus:border-brand-purple transition-colors resize-none placeholder:text-white/20"
                  />
                </div>

                <Button 
                  disabled={loading}
                  type="submit" 
                  variant="primary" 
                  className="w-full py-5 font-black uppercase tracking-widest text-sm shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]"
                >
                  {loading ? 'Transmitting Signal...' : 'Dispatch Message'}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="mt-12 grid grid-cols-2 gap-4">
           <div className="bg-white/5 p-4 border border-white/10 text-center">
              <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Global HQ</p>
              <p className="text-xs text-white/70 font-bold">New Delhi, IN</p>
           </div>
           <div className="bg-white/5 p-4 border border-white/10 text-center">
              <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">Emergency Line</p>
              <p className="text-xs text-white/70 font-bold">ops@tracstac.com</p>
           </div>
        </div>

      </div>
    </div>
  );
}
