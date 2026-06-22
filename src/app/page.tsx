"use client";

import { useState } from "react";

import { ForecastChart } from "@/components/ForecastChart";
import { RecommendationCard } from "@/components/RecommendationCard";
import { RunningScore } from "@/components/RunningScore";
import { SearchBar } from "@/components/SearchBar";
import { WeatherCard } from "@/components/WeatherCard";
import { WeatherLoader } from "@/components/WeatherLoader";
import type { WeatherResponse } from "@/types/weather";

export default function Home() {
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(city: string) {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/weather?city=${encodeURIComponent(city)}`,
      );
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error ?? "Failed to fetch weather");
      }

      setData(payload);
    } catch (fetchError) {
      setData(null);
      setError(
        fetchError instanceof Error
          ? fetchError.message
          : "Failed to fetch weather",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-zinc-50 dark:bg-black">
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-12">
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Weather AI Running Assistant
          </h1>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
            Search for a city to see current conditions, a running score, and a
            personalized recommendation.
          </p>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </header>

        {error && (
          <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-950 dark:text-rose-300">
            {error}
          </p>
        )}

        {isLoading && <WeatherLoader />}

        {!isLoading && data && (
          <div className="grid gap-6 lg:grid-cols-2">
            <WeatherCard
              location={data.weather.location}
              weather={data.weather.current}
            />
            <RunningScore score={data.runningScore} />
            <RecommendationCard
              recommendation={data.runningScore.recommendation}
            />
            <ForecastChart forecast={data.weather.forecast} />
          </div>
        )}
      </main>
    </div>
  );
}
