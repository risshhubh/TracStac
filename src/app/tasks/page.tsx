'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const EmployeeDashboard = dynamic(() => import('@/components/dashboard/EmployeeDashboard').then(mod => mod.EmployeeDashboard), {
  loading: () => (
    <div className="space-y-8 animate-pulse">
      <div className="space-y-2">
        <div className="h-10 w-64 bg-white/5 rounded-lg"></div>
        <div className="h-4 w-48 bg-white/5 rounded-lg"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-64 bg-white/[0.02] border border-white/5 rounded-3xl" />
        ))}
      </div>
    </div>
  )
});

export default function TasksPage() {
  const { status } = useSession();
  const router = useRouter();

  // Authentication handled by middleware

  if (status === 'loading') return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto">
        <EmployeeDashboard />
      </div>
    </div>
  );
}
