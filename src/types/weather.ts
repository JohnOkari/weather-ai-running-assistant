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

export type RunningRating = "excellent" | "good" | "fair" | "poor";

export interface RunningScore {
  score: number;
  rating: RunningRating;
  factors: {
    temperature: number;
    humidity: number;
    precipitation: number;
    wind: number;
  };
  recommendation: string;
}

export interface WeatherResponse {
  weather: WeatherData;
  runningScore: RunningScore;
}
