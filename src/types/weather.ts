// ---------------------------------------------------------------------------
// Weather AI API — https://weather-ai.co/docs
// ---------------------------------------------------------------------------

export type WeatherUnits = "metric" | "imperial";

/** Query params for GET /v1/weather, /v1/forecast, /v1/hourly */
export interface WeatherAiQueryParams {
  lat: number;
  lon: number;
  days?: number;
  ai?: boolean;
  units?: WeatherUnits;
  lang?: string;
}

export interface WeatherAiCondition {
  text?: string;
  main?: string;
  description?: string;
  icon?: string;
  code?: number;
  id?: number;
}

export interface WeatherAiLocation {
  name?: string;
  city?: string;
  region?: string;
  country?: string;
  lat?: number;
  lon?: number;
  timezone?: string;
  localtime?: string;
}

export interface WeatherAiCurrent {
  last_updated?: string;
  temp_c?: number;
  temp_f?: number;
  temperature?: number;
  temp?: number;
  feelslike_c?: number;
  feelslike_f?: number;
  feels_like?: number;
  humidity?: number;
  wind_kph?: number;
  wind_mph?: number;
  wind_mps?: number;
  wind_speed?: number;
  wind_degree?: number;
  wind_dir?: string;
  precip_mm?: number;
  precipitation?: number;
  pressure_mb?: number;
  cloud?: number;
  uv?: number;
  vis_km?: number;
  is_day?: number;
  condition?: WeatherAiCondition;
}

export interface WeatherAiHour {
  time?: string;
  time_epoch?: number;
  temp_c?: number;
  temp_f?: number;
  temperature?: number;
  temp?: number;
  feelslike_c?: number;
  precip_mm?: number;
  precip_in?: number;
  precipitation?: number;
  chance_of_rain?: number;
  wind_kph?: number;
  wind_mph?: number;
  wind_mps?: number;
  wind_speed?: number;
  humidity?: number;
  condition?: WeatherAiCondition;
}

export interface WeatherAiForecastDay {
  date?: string;
  day?: {
    maxtemp_c?: number;
    mintemp_c?: number;
    avghumidity?: number;
    daily_chance_of_rain?: number;
    condition?: WeatherAiCondition;
  };
  hour?: WeatherAiHour[];
}

export interface WeatherAiForecast {
  forecastday?: WeatherAiForecastDay[];
  hourly?: WeatherAiHour[];
}

export interface WeatherAiSummary {
  text?: string;
  summary?: string;
}

/** Response shape for GET /v1/weather and aliases (/v1/forecast, /v1/hourly) */
export interface WeatherAiResponse {
  location?: WeatherAiLocation;
  current?: WeatherAiCurrent;
  forecast?: WeatherAiForecast;
  hourly?: WeatherAiHour[];
  ai_summary?: WeatherAiSummary;
}

export interface WeatherAiErrorResponse {
  error?: string;
  message?: string;
}

/** Response shape for GET /v1/ip-lookup */
export interface WeatherAiGeoLookupResponse {
  ip: string;
  ip_hash?: string;
  ip_version?: "v4" | "v6";
  geo: {
    lat: number;
    lon: number;
    city: string;
    region: string;
    country: string;
    timezone: string;
  };
}

// ---------------------------------------------------------------------------
// Geocoding (OpenStreetMap Nominatim)
// ---------------------------------------------------------------------------

export interface NominatimResult {
  lat: string;
  lon: string;
  display_name: string;
}

export interface GeoResult {
  lat: number;
  lon: number;
  name: string;
}

// ---------------------------------------------------------------------------
// App domain — normalized for UI and scoring
// ---------------------------------------------------------------------------

export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeather {
  temperature: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  uvIndex?: number;
  condition: WeatherCondition;
}

export interface ForecastHour {
  time: string;
  temperature: number;
  precipitation: number;
  windSpeed: number;
}

export interface WeatherData {
  location: string;
  current: CurrentWeather;
  forecast: ForecastHour[];
}

// ---------------------------------------------------------------------------
// Running assistant
// ---------------------------------------------------------------------------

export type RunningRating = "excellent" | "good" | "fair" | "poor";

export interface RunningScoreFactors {
  temperature: number;
  humidity: number;
  precipitation: number;
  wind: number;
}

export interface RunningScore {
  score: number;
  rating: RunningRating;
  factors: RunningScoreFactors;
  recommendation: string;
}

/** Response from GET /api/weather */
export interface WeatherResponse {
  weather: WeatherData;
  runningScore: RunningScore;
}

export interface WeatherApiErrorResponse {
  error: string;
}
