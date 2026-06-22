function SkeletonCard({ lines = 4 }: { lines?: number }) {
  return (
    <div className="animate-pulse rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="h-5 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-4 h-10 w-1/4 rounded bg-zinc-200 dark:bg-zinc-700" />
      <div className="mt-6 space-y-3">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="h-4 rounded bg-zinc-200 dark:bg-zinc-700"
            style={{ width: `${70 + (index % 3) * 10}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function WeatherLoader() {
  return (
    <div
      className="grid gap-6 lg:grid-cols-2"
      aria-busy="true"
      aria-label="Loading weather data"
    >
      <SkeletonCard lines={4} />
      <SkeletonCard lines={5} />
      <SkeletonCard lines={2} />
      <div className="animate-pulse rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="h-5 w-1/3 rounded bg-zinc-200 dark:bg-zinc-700" />
        <div className="mt-6 h-64 rounded bg-zinc-200 dark:bg-zinc-700" />
      </div>
    </div>
  );
}
