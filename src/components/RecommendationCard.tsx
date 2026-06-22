interface RecommendationCardProps {
  recommendation: string;
}

export function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Recommendation
      </h2>
      <p className="mt-3 text-zinc-600 dark:text-zinc-300">{recommendation}</p>
    </section>
  );
}
