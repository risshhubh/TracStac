import React from 'react';
import Link from 'next/link';

const NavLink = ({ href, children, icon }: { href: string, children: React.ReactNode, icon?: React.ReactNode }) => (
  <Link 
    href={href} 
    className="flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-brand-indigo/10 text-foreground/70 hover:text-brand-indigo group cursor-pointer"
  >
    {icon && <span className="group-hover:scale-110 transition-transform">{icon}</span>}
    <span className="font-medium">{children}</span>
  </Link>
);

export const Sidebar = () => {
  return (
    <aside className="w-64 h-screen glass border-r-0 flex flex-col p-4 fixed left-0 top-0 z-50">
      <div className="px-4 py-6 mb-8 cursor-pointer group">
        <Link href="/">
          <div className="flex items-center space-x-1">
            <div className="w-8 h-8 bg-brand-purple flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] border border-brand-purple/50 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <rect x="2" y="4" width="8" height="3" />
                <rect x="4.5" y="7" width="3" height="13" />
                <rect x="14" y="4" width="8" height="3" />
                <rect x="14" y="7" width="3" height="3" />
                <rect x="14" y="10" width="8" height="3" />
                <rect x="19" y="13" width="3" height="4" />
                <rect x="14" y="17" width="8" height="3" />
              </svg>
            </div>
            <h1 className="text-xl font-black text-white tracking-tighter">
              TRAC<span className="text-brand-purple">STAC</span>
            </h1>
          </div>
        </Link>
      </div>
      
      <nav className="flex-1 space-y-2">
        <NavLink href="/dashboard" icon={<span>🏠</span>}>Dashboard</NavLink>
        <NavLink href="/projects" icon={<span>📁</span>}>Projects</NavLink>
        <NavLink href="/tasks" icon={<span>✅</span>}>My Tasks</NavLink>
        <NavLink href="/team" icon={<span>👥</span>}>Team</NavLink>
      </nav>
      
      <div className="mt-auto border-t border-white/5 pt-4">
        <div className="flex items-center space-x-3 px-4 py-3 cursor-pointer hover:bg-white/5 rounded-xl transition-colors">
          <div className="w-10 h-10 rounded-full bg-brand-purple flex items-center justify-center text-white font-bold shadow-lg shadow-brand-purple/20">
            JD
          </div>
          <div>
            <p className="text-sm font-bold text-white">John Doe</p>
            <p className="text-xs text-white/50">Admin</p>
          </div>
        </div>
      </div>

    </aside>
  );
};

