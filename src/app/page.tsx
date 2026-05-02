'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

const Hero = dynamic(() => import('@/components/sections/Hero').then(mod => mod.Hero), {
  loading: () => <div className="min-h-[80vh] flex items-center justify-center animate-pulse bg-white/[0.02] rounded-3xl m-8" />
});

const Features = dynamic(() => import('@/components/sections/Features').then(mod => mod.Features), {
  loading: () => <div className="h-96 flex items-center justify-center animate-pulse bg-white/[0.02] rounded-3xl m-8" />
});

const Stats = dynamic(() => import('@/components/sections/Stats').then(mod => mod.Stats), {
  loading: () => <div className="h-48 flex items-center justify-center animate-pulse bg-white/[0.02] m-8" />
});

const HowItWorks = dynamic(() => import('@/components/sections/HowItWorks').then(mod => mod.HowItWorks), {
  loading: () => <div className="h-48 flex items-center justify-center animate-pulse bg-white/[0.02] m-8" />
});

const InteractivePreview = dynamic(() => import('@/components/sections/InteractivePreview').then(mod => mod.InteractivePreview), {
  loading: () => <div className="h-96 flex items-center justify-center animate-pulse bg-white/[0.02] rounded-3xl m-8" />
});

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-brand-dark overflow-hidden">
      
      <Hero />
      <InteractivePreview />
      <Features />
      <HowItWorks />
      <Stats />

      <section className="py-24 px-8 text-center bg-white/[0.01]">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase">READY TO STACK <span className="text-brand-purple">YOUR SUCCESS?</span></h2>
          <Link href="/dashboard" className="inline-block">
            <Button variant="primary" size="lg" className="px-16 py-8 text-lg font-black shadow-[8px_8px_0px_0px_rgba(168,85,247,0.3)]">START BUILDING NOW</Button>
          </Link>
        </div>
      </section>

    </div>
  );
}
