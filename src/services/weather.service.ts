import axios, { isAxiosError } from "axios";

import {
  DEFAULT_UNITS,
  DEFAULT_WEATHER_AI_BASE_URL,
  FORECAST_HOURS,
  NOMINATIM_BASE_URL,
} from "@/constants/weather";
import type {
  ForecastHour,
  GeoResult,
  NominatimResult,
  WeatherAiCurrent,
  WeatherAiErrorResponse,
  WeatherAiHour,
  WeatherAiResponse,
  WeatherData,
} from "@/types/weather";

function getApiKey(): string {
  const apiKey = process.env.WEATHER_AI_API_KEY;
  if (!apiKey) {
    throw new Error("WEATHER_AI_API_KEY is not configured");
  }
  return apiKey;
}

function getBaseUrl(): string {
  return process.env.WEATHER_AI_BASE_URL ?? DEFAULT_WEATHER_AI_BASE_URL;
}

function getAuthHeaders(apiKey: string) {
  return {
    Authorization: `Bearer ${apiKey}`,
  };
}

function readNumber(...values: Array<number | undefined>): number {
  for (const value of values) {
    if (typeof value === "number" && !Number.isNaN(value)) {
      return value;
    }
  }
  return 0;
}

function readWindSpeedMps(hour: WeatherAiHour | WeatherAiCurrent): number {
  const windMps = readNumber(hour.wind_mps, hour.wind_speed);
  if (windMps > 0) {
    return windMps;
  }

  const windKph = readNumber(hour.wind_kph);
  return windKph > 0 ? windKph / 3.6 : 0;
}

function mapCondition(condition?: WeatherAiHour["condition"]) {
  return {
    id: condition?.code ?? condition?.id ?? 0,
    main: condition?.main ?? condition?.text ?? "Unknown",
    description: condition?.description ?? condition?.text ?? "Unknown",
    icon: condition?.icon ?? "",
  };
}

function mapCurrentWeather(current: WeatherAiCurrent) {
  return {
    temperature: readNumber(current.temp_c, current.temperature, current.temp),
    feelsLike: readNumber(
      current.feelslike_c,
      current.feels_like,
      current.temp_c,
      current.temperature,
      current.temp,
    ),
    humidity: readNumber(current.humidity),
    windSpeed: readWindSpeedMps(current),
    precipitation: readNumber(current.precip_mm, current.precipitation),
    uvIndex: current.uv,
    condition: mapCondition(current.condition),
  };
}

function extractHourlyForecast(response: WeatherAiResponse): WeatherAiHour[] {
  if (response.hourly?.length) {
    return response.hourly;
  }

  if (response.forecast?.hourly?.length) {
    return response.forecast.hourly;
  }

  return response.forecast?.forecastday?.flatMap((day) => day.hour ?? []) ?? [];
}

function mapForecastHours(hours: WeatherAiHour[]): ForecastHour[] {
  return hours.slice(0, FORECAST_HOURS).map((hour) => ({
    time: hour.time ?? new Date((hour.time_epoch ?? 0) * 1000).toISOString(),
    temperature: readNumber(hour.temp_c, hour.temperature, hour.temp),
    precipitation: readNumber(hour.precip_mm, hour.precipitation),
    windSpeed: readWindSpeedMps(hour),
  }));
}

async function geocodeCity(city: string): Promise<GeoResult> {
  const response = await axios.get<NominatimResult[]>(
    `${NOMINATIM_BASE_URL}/search`,
    {
      params: {
        q: city,
        format: "json",
        limit: 1,
      },
      headers: {
        "User-Agent": "weather-ai-running-assistant",
      },
    },
  );

  const [result] = response.data;
  if (!result) {
    throw new Error(`Could not find coordinates for "${city}"`);
  }

  return {
    lat: Number(result.lat),
    lon: Number(result.lon),
    name: result.display_name.split(",")[0]?.trim() || city,
  };
}

function mapWeatherResponse(
  response: WeatherAiResponse,
  fallbackLocation: string,
): WeatherData {
  if (!response.current) {
    throw new Error("Weather AI response did not include current conditions");
  }

  const hourly = extractHourlyForecast(response);

  return {
    location: response.location?.name ?? response.location?.city ?? fallbackLocation,
    current: mapCurrentWeather(response.current),
    forecast: mapForecastHours(hourly),
  };
}

function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const apiError = error.response?.data as WeatherAiErrorResponse | undefined;
    return apiError?.error ?? apiError?.message ?? error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Failed to fetch weather data";
}

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const apiKey = getApiKey();
  const baseUrl = getBaseUrl();
  const geo = await geocodeCity(city);

  try {
    const response = await axios.get<WeatherAiResponse>(`${baseUrl}/v1/weather`, {
      params: {
        lat: geo.lat,
        lon: geo.lon,
        days: 1,
        ai: false,
        units: DEFAULT_UNITS,
      },
      headers: getAuthHeaders(apiKey),
    });

    return mapWeatherResponse(response.data, geo.name);
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
