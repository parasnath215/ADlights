export default function ProductLoading() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-white min-h-screen animate-pulse">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb skeleton */}
        <div className="h-3 w-64 bg-zinc-100 rounded mb-8" />

        {/* Main grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Gallery skeleton */}
          <div className="lg:col-span-7 space-y-4">
            <div className="w-full h-[400px] sm:h-[500px] rounded-card bg-zinc-100" />
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-20 rounded-card bg-zinc-100 shrink-0" />
              ))}
            </div>
          </div>

          {/* Buy box skeleton */}
          <div className="lg:col-span-5 space-y-5">
            <div className="h-4 w-24 bg-zinc-100 rounded" />
            <div className="h-10 w-full bg-zinc-100 rounded" />
            <div className="h-3 w-48 bg-zinc-100 rounded" />
            <div className="h-8 w-32 bg-zinc-100 rounded" />
            <div className="h-12 w-full bg-zinc-100 rounded-pill" />
            <div className="space-y-3 pt-4 border-t border-border">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 w-full bg-zinc-100 rounded-card" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
