import axios from "axios";

import { DEFAULT_UNITS, FORECAST_HOURS, WEATHER_API_BASE_URL } from "@/constants/weather";
import type { ForecastHour, WeatherData } from "@/types/weather";

interface OpenWeatherCurrentResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  rain?: {
    "1h"?: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
}

interface OpenWeatherForecastResponse {
  list: Array<{
    dt_txt: string;
    main: {
      temp: number;
    };
    wind: {
      speed: number;
    };
    rain?: {
      "3h"?: number;
    };
  }>;
}

function getApiKey(): string {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    throw new Error("OPENWEATHER_API_KEY is not configured");
  }
  return apiKey;
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const apiKey = getApiKey();
  const params = { q: city, units: DEFAULT_UNITS, appid: apiKey };

  const [currentResponse, forecastResponse] = await Promise.all([
    axios.get<OpenWeatherCurrentResponse>(`${WEATHER_API_BASE_URL}/weather`, {
      params,
    }),
    axios.get<OpenWeatherForecastResponse>(`${WEATHER_API_BASE_URL}/forecast`, {
      params,
    }),
  ]);

  const current = currentResponse.data;
  const [condition] = current.weather;

  const forecast: ForecastHour[] = forecastResponse.data.list
    .slice(0, FORECAST_HOURS)
    .map((entry) => ({
      time: entry.dt_txt,
      temperature: entry.main.temp,
      precipitation: entry.rain?.["3h"] ?? 0,
      windSpeed: entry.wind.speed,
    }));

  return {
    location: current.name,
    current: {
      temperature: current.main.temp,
      feelsLike: current.main.feels_like,
      humidity: current.main.humidity,
      windSpeed: current.wind.speed,
      precipitation: current.rain?.["1h"] ?? 0,
      condition: {
        id: condition.id,
        main: condition.main,
        description: condition.description,
        icon: condition.icon,
      },
    },
    forecast,
  };
}
