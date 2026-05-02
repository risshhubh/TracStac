'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Authentication handled by middleware

  if (status === 'loading') return null;
  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-8">
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <header className="border-b border-white/5 pb-8 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter italic uppercase">Security <span className="text-brand-purple">& Config</span></h1>
            <p className="text-white/50 font-medium">Refine your account security and workspace notifications.</p>
          </div>
          <div className="text-[10px] font-black bg-white/5 text-white/40 px-3 py-1 rounded border border-white/10 uppercase tracking-widest">
            v1.0.4-stable
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Navigation Sidebar (Simulated) */}
          <div className="md:col-span-1 space-y-2">
             <div className="p-4 bg-brand-purple/10 border-l-4 border-brand-purple text-brand-purple font-black uppercase tracking-widest text-xs cursor-pointer">
                General & Security
             </div>
             <div className="p-4 hover:bg-white/5 transition-colors text-white/40 font-bold uppercase tracking-widest text-xs cursor-pointer">
                Integrations
             </div>
             <div className="p-4 hover:bg-white/5 transition-colors text-white/40 font-bold uppercase tracking-widest text-xs cursor-pointer">
                Billing & Plan
             </div>
             <div className="p-4 hover:bg-white/5 transition-colors text-white/40 font-bold uppercase tracking-widest text-xs cursor-pointer">
                API Access
             </div>
          </div>

          <div className="md:col-span-2 space-y-8">
            
            {/* SECURITY SECTION */}
            <section className="space-y-4">
               <h3 className="text-xs font-black uppercase tracking-widest text-white/30 ml-1">Authentication</h3>
               <Card className="bg-white/[0.02] border-white/5">
                  <CardContent className="p-0">
                     <div className="p-6 flex items-center justify-between border-b border-white/5">
                        <div>
                           <p className="text-white font-bold">Password Encryption</p>
                           <p className="text-sm text-white/40">Change your portal access key.</p>
                        </div>
                        <Button variant="glass" className="px-6 py-2 text-[10px] font-black uppercase tracking-widest">Update</Button>
                     </div>
                     <div className="p-6 flex items-center justify-between">
                        <div>
                           <p className="text-white font-bold">Two-Factor (2FA)</p>
                           <p className="text-sm text-white/40">Add a secondary layer of security.</p>
                        </div>
                        <div className="flex items-center space-x-2">
                           <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest mr-2">Disabled</span>
                           <Button variant="primary" className="px-6 py-2 text-[10px] font-black uppercase tracking-widest">Enable</Button>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </section>

            {/* NOTIFICATIONS SECTION */}
            <section className="space-y-4">
               <h3 className="text-xs font-black uppercase tracking-widest text-white/30 ml-1">Notifications</h3>
               <Card className="bg-white/[0.02] border-white/5">
                  <CardContent className="p-6 space-y-6">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                           </div>
                           <div>
                              <p className="text-white font-bold">Email Alerts</p>
                              <p className="text-xs text-white/30">Get notified about task deadlines.</p>
                           </div>
                        </div>
                        <div className="w-12 h-6 bg-brand-purple rounded-full relative p-1 cursor-pointer">
                           <div className="w-4 h-4 bg-white rounded-full absolute right-1"></div>
                        </div>
                     </div>
                     <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                           <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/40">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                           </div>
                           <div>
                              <p className="text-white font-bold">Browser Push</p>
                              <p className="text-xs text-white/30">Real-time desktop notifications.</p>
                           </div>
                        </div>
                        <div className="w-12 h-6 bg-white/10 rounded-full relative p-1 cursor-pointer">
                           <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                        </div>
                     </div>
                  </CardContent>
               </Card>
            </section>

            {/* DANGER ZONE */}
            <Card className="bg-red-500/5 border-red-500/20">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-red-500 font-bold uppercase tracking-tight italic">Purge Workspace</p>
                  <p className="text-xs text-red-500/60 font-medium">Remove all data associated with this identity.</p>
                </div>
                <Button variant="outline" className="border-red-500/30 text-red-500 hover:bg-red-500/10 font-black uppercase tracking-widest text-[10px] px-8">
                  Execute
                </Button>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </div>
  );
}
