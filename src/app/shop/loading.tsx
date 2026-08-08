export default function ShopLoading() {
  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-white min-h-screen animate-pulse">
      {/* Hero header skeleton */}
      <div className="bg-zinc-950 py-12 sm:py-16 mb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="h-5 w-48 bg-zinc-800 rounded-pill mx-auto" />
          <div className="h-12 w-3/4 bg-zinc-800 rounded mx-auto" />
          <div className="h-4 w-1/2 bg-zinc-800 rounded mx-auto" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex gap-8 items-start">
          {/* Sidebar skeleton */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-6">
            <div className="h-4 w-32 bg-zinc-100 rounded" />
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-8 w-full bg-zinc-100 rounded-lg" />
            ))}
          </aside>

          {/* Grid skeleton */}
          <main className="flex-1">
            <div className="h-12 w-full bg-zinc-100 rounded-card mb-6" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="rounded-card border border-border overflow-hidden">
                  <div className="h-48 sm:h-64 bg-zinc-100" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 w-20 bg-zinc-100 rounded" />
                    <div className="h-5 w-full bg-zinc-100 rounded" />
                    <div className="h-4 w-24 bg-zinc-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
