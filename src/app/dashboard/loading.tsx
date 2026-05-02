export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 pb-12 px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-10 w-64 bg-white/5 rounded-lg"></div>
            <div className="h-4 w-48 bg-white/5 rounded-lg"></div>
          </div>
          <div className="h-12 w-48 bg-white/5 rounded-lg"></div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 bg-white/[0.02] border border-white/5 rounded-2xl"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
