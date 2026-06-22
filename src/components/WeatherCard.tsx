import type { CurrentWeather } from "@/types/weather";

interface WeatherCardProps {
  location: string;
  weather: CurrentWeather;
}

export function WeatherCard({ location, weather }: WeatherCardProps) {
  return (
    <section className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {location}
      </h2>
      <p className="mt-1 capitalize text-zinc-500 dark:text-zinc-400">
        {weather.condition.description}
      </p>
      <p className="mt-4 text-5xl font-bold text-zinc-900 dark:text-zinc-50">
        {Math.round(weather.temperature)}°C
      </p>
      <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Feels like</dt>
          <dd className="font-medium">{Math.round(weather.feelsLike)}°C</dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Humidity</dt>
          <dd className="font-medium">{weather.humidity}%</dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Wind</dt>
          <dd className="font-medium">{weather.windSpeed} m/s</dd>
        </div>
        <div>
          <dt className="text-zinc-500 dark:text-zinc-400">Precipitation</dt>
          <dd className="font-medium">{weather.precipitation} mm</dd>
        </div>
      </dl>
    </section>
  );
}
