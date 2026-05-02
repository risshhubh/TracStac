export default function RootLoading() {
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-brand-purple/20 rounded-full"></div>
        <div className="absolute top-0 w-16 h-16 border-4 border-brand-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
      <div className="flex items-center space-x-1 animate-pulse">
        <div className="w-8 h-8 bg-brand-purple flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)] border border-brand-purple/50 animate-bounce">
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
        <p className="text-sm font-black text-white tracking-widest uppercase">Initializing <span className="text-brand-purple">Stack</span></p>
      </div>
    </div>
  );
}
