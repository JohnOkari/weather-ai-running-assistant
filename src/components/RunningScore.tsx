import type { RunningScore as RunningScoreType } from "@/types/weather";

interface RunningScoreProps {
  score: RunningScoreType;
}

const ratingColors: Record<RunningScoreType["rating"], string> = {
  excellent: "text-emerald-600 dark:text-emerald-400",
  good: "text-sky-600 dark:text-sky-400",
  fair: "text-amber-600 dark:text-amber-400",
  poor: "text-rose-600 dark:text-rose-400",
};

export function RunningScore({ score }: RunningScoreProps) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Running Score
      </h2>
      <p className="mt-4 text-5xl font-bold text-zinc-900 dark:text-zinc-50">
        {score.score}
        <span className="text-2xl font-normal text-zinc-400">/100</span>
      </p>
      <p
        className={`mt-2 text-sm font-medium capitalize ${ratingColors[score.rating]}`}
      >
        {score.rating}
      </p>
      <ul className="mt-6 space-y-2 text-sm">
        <li className="flex justify-between">
          <span className="text-zinc-500">Temperature</span>
          <span>{Math.round(score.factors.temperature)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-zinc-500">Humidity</span>
          <span>{Math.round(score.factors.humidity)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-zinc-500">Precipitation</span>
          <span>{Math.round(score.factors.precipitation)}</span>
        </li>
        <li className="flex justify-between">
          <span className="text-zinc-500">Wind</span>
          <span>{Math.round(score.factors.wind)}</span>
        </li>
      </ul>
    </section>
  );
}
