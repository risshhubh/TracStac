'use client';

import React from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Button } from '../ui/Button';

export const Navbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a] border-b border-brand-purple/20 py-4 px-4 md:px-8 animate-in fade-in slide-in-from-top-4 duration-700 shadow-[0_0_30px_rgba(168,85,247,0.25)]">
      <div className="max-w-7xl mx-auto flex justify-between items-center w-full">

        <Link href="/" className="cursor-pointer group">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-brand-purple flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] border border-brand-purple/50 group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor">
                <rect x="2" y="4" width="8" height="3" />
                <rect x="4.5" y="7" width="3" height="13" />
                <rect x="14" y="4" width="8" height="3" />
                <rect x="14" y="7" width="3" height="3" />
                <rect x="14" y="10" width="8" height="3" />
                <rect x="19" y="13" width="3" height="4" />
                <rect x="14" y="17" width="8" height="3" />
              </svg>
            </div>
            <h1 className="text-base sm:text-2xl font-black text-white tracking-tighter">
              TRAC<span className="text-brand-purple">STAC</span>
            </h1>
          </div>
        </Link>
        
        <div className="hidden md:flex items-center space-x-10">
          <Link href="/" className={`text-xs font-bold uppercase tracking-widest transition-all border-b-2 pb-1 cursor-pointer ${pathname === '/' ? 'text-white border-brand-purple' : 'text-white/70 border-transparent hover:text-white hover:border-brand-purple'}`}>
            Home
          </Link>
          {session && (
            <Link href="/tasks" className={`text-xs font-bold uppercase tracking-widest transition-all border-b-2 pb-1 cursor-pointer ${pathname === '/tasks' ? 'text-white border-brand-purple' : 'text-white/70 border-transparent hover:text-white hover:border-brand-purple'}`}>
              Tasks
            </Link>
          )}
          {session && (
            <Link href="/progress" className={`text-xs font-bold uppercase tracking-widest transition-all border-b-2 pb-1 cursor-pointer ${pathname === '/progress' ? 'text-white border-brand-purple' : 'text-white/70 border-transparent hover:text-white hover:border-brand-purple'}`}>
              Progress
            </Link>
          )}
          {(session?.user as any)?.role === 'ADMIN' && (
            <Link href="/dashboard" className={`text-xs font-bold uppercase tracking-widest transition-all border-b-2 pb-1 cursor-pointer ${pathname.startsWith('/dashboard') ? 'text-white border-brand-purple' : 'text-white/70 border-transparent hover:text-white hover:border-brand-purple'}`}>
              Dashboard
            </Link>
          )}
        </div>

        {/* Mobile Navigation Icons */}
        <div className="flex md:hidden items-center space-x-4 sm:space-x-6 mx-2">
          <Link href="/" className={`transition-colors ${pathname === '/' ? 'text-brand-purple' : 'text-white/70 hover:text-brand-purple'}`}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          </Link>
          {session && (
            <Link href="/tasks" className={`transition-colors ${pathname === '/tasks' ? 'text-brand-purple' : 'text-white/70 hover:text-brand-purple'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </Link>
          )}
          {session && (
            <Link href="/progress" className={`transition-colors ${pathname === '/progress' ? 'text-brand-purple' : 'text-white/70 hover:text-brand-purple'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </Link>
          )}
          {(session?.user as any)?.role === 'ADMIN' && (
            <Link href="/dashboard" className={`transition-colors ${pathname.startsWith('/dashboard') ? 'text-brand-purple' : 'text-white/70 hover:text-brand-purple'}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </Link>
          )}
        </div>


        <div className="flex items-center space-x-4">
          {session ? (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 rounded-none bg-brand-purple flex items-center justify-center text-white font-bold cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:-translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(255,255,255,0.1)] border border-brand-purple/50"
              >
                {session.user?.name?.charAt(0).toUpperCase() || 'U'}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-48 glass border border-white/10 rounded-xl py-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-2 border-b border-white/5 mb-1">
                    <p className="text-xs font-black text-brand-purple uppercase tracking-widest">Account</p>
                    <p className="text-sm font-medium text-white truncate">{session.user?.name}</p>
                  </div>
                  <Link 
                    href="/profile" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Profile
                  </Link>
                  <Link 
                    href="/settings" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Settings
                  </Link>
                  <Link 
                    href="/contact" 
                    onClick={() => setIsDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    Contact Us
                  </Link>
                  <div className="border-t border-white/5 mt-1 pt-1">
                    <button 
                      onClick={() => {
                        setIsDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors cursor-pointer font-bold"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signup" className="cursor-pointer">
              <Button variant="primary" size="sm" className="cursor-pointer px-3 sm:px-8 py-2 text-[10px] sm:text-xs font-black uppercase tracking-widest">
                ACCESS PORTAL
              </Button>
            </Link>
          )}
        </div>

      </div>



    </nav>
  );
};
