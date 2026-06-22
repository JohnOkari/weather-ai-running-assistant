import type { CurrentWeather, RunningRating, RunningScore } from "@/types/weather";

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function scoreTemperature(tempC: number): number {
  const ideal = 15;
  const distance = Math.abs(tempC - ideal);
  return clamp(100 - distance * 6, 0, 100);
}

function scoreHumidity(humidity: number): number {
  if (humidity >= 30 && humidity <= 60) return 100;
  const distance =
    humidity < 30 ? 30 - humidity : humidity > 60 ? humidity - 60 : 0;
  return clamp(100 - distance * 2, 0, 100);
}

function scorePrecipitation(precipitation: number): number {
  return clamp(100 - precipitation * 25, 0, 100);
}

function scoreWind(windSpeed: number): number {
  return clamp(100 - Math.max(0, windSpeed - 5) * 8, 0, 100);
}

function ratingFromScore(score: number): RunningRating {
  if (score >= 80) return "excellent";
  if (score >= 60) return "good";
  if (score >= 40) return "fair";
  return "poor";
}

function recommendationFromRating(rating: RunningRating): string {
  switch (rating) {
    case "excellent":
      return "Great conditions for a run. Enjoy your workout!";
    case "good":
      return "Solid running weather. Stay hydrated and pace yourself.";
    case "fair":
      return "Run with caution. Consider a shorter route or slower pace.";
    case "poor":
      return "Conditions are tough for running. Consider indoor training.";
  }
}

export function calculateRunningScore(weather: CurrentWeather): RunningScore {
  const factors = {
    temperature: scoreTemperature(weather.temperature),
    humidity: scoreHumidity(weather.humidity),
    precipitation: scorePrecipitation(weather.precipitation),
    wind: scoreWind(weather.windSpeed),
  };

  const score = Math.round(
    factors.temperature * 0.35 +
      factors.humidity * 0.2 +
      factors.precipitation * 0.3 +
      factors.wind * 0.15,
  );

  const rating = ratingFromScore(score);

  return {
    score,
    rating,
    factors,
    recommendation: recommendationFromRating(rating),
  };
}
