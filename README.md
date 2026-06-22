# Weather AI Running Assistant

A Next.js app that fetches weather from the [Weather AI API](https://weather-ai.co/docs), scores conditions for outdoor running, and displays forecasts with personalized recommendations.

## Features

- City search with loading skeletons
- Current weather conditions
- Running score (0–100) based on temperature, humidity, precipitation, and wind
- AI-style recommendation text
- 24-hour forecast chart

## Prerequisites

- Node.js 20+
- npm (or yarn / pnpm / bun)
- A Weather AI API key ([get one from the dashboard](https://weather-ai.co/docs))

## Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd weather-ai-running-assistant
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the project root:

   ```bash
   cp .env.example .env.local
   ```

   Or create it manually with the following values:

   ```env
   WEATHER_AI_API_KEY=wai_your_api_key_here
   WEATHER_AI_BASE_URL=https://api.weather-ai.co
   ```

   > **Important:** `.env.local` is gitignored. Never commit API keys to version control.

4. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000), search for a city, and view the results.

## Configuration

### Environment variables

| Variable | Required | Default | Description |
| --- | --- | --- | --- |
| `WEATHER_AI_API_KEY` | Yes | — | Bearer token for the Weather AI API (prefix `wai_`) |
| `WEATHER_AI_BASE_URL` | No | `https://api.weather-ai.co` | Base URL for Weather AI API requests |

### Example `.env.local`

```env
WEATHER_AI_API_KEY=wai_your_api_key_here
WEATHER_AI_BASE_URL=https://api.weather-ai.co
```

### Application constants

Defined in `src/constants/weather.ts`:

| Constant | Value | Description |
| --- | --- | --- |
| `DEFAULT_WEATHER_AI_BASE_URL` | `https://api.weather-ai.co` | Fallback API base URL |
| `DEFAULT_UNITS` | `metric` | Temperature and wind units sent to the API |
| `FORECAST_HOURS` | `24` | Number of hourly forecast points shown |
| `NOMINATIM_BASE_URL` | `https://nominatim.openstreetmap.org` | Geocoding service for city → coordinates |

### TypeScript path aliases

Configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Project structure

```
src/
├── app/
│   ├── api/weather/route.ts   # GET /api/weather?city=...
│   ├── layout.tsx
│   ├── page.tsx               # Search page (client component)
│   └── globals.css
├── components/
│   ├── SearchBar.tsx
│   ├── WeatherCard.tsx
│   ├── RunningScore.tsx
│   ├── RecommendationCard.tsx
│   ├── ForecastChart.tsx
│   └── WeatherLoader.tsx
├── services/
│   └── weather.service.ts     # Weather AI + geocoding integration
├── lib/
│   └── score.ts               # Running score calculation
├── types/
│   └── weather.ts             # API and app domain types
└── constants/
    └── weather.ts
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |

## API

### `GET /api/weather`

Fetches weather and running score for a city.

**Query parameters**

| Param | Required | Description |
| --- | --- | --- |
| `city` | Yes | City name (e.g. `London`, `Nairobi`) |

**Example**

```bash
curl "http://localhost:3000/api/weather?city=London"
```

**Response**

```json
{
  "weather": {
    "location": "London",
    "current": { "temperature": 15, "feelsLike": 14, "humidity": 72, "windSpeed": 3.5, "precipitation": 0, "condition": { "id": 1003, "main": "Cloudy", "description": "partly cloudy", "icon": "..." } },
    "forecast": [{ "time": "...", "temperature": 14, "precipitation": 0, "windSpeed": 3.2 }]
  },
  "runningScore": {
    "score": 78,
    "rating": "good",
    "factors": { "temperature": 85, "humidity": 90, "precipitation": 100, "wind": 72 },
    "recommendation": "Solid running weather. Stay hydrated and pace yourself."
  }
}
```

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Recharts](https://recharts.org) — forecast chart
- [Lucide React](https://lucide.dev) — icons
- [Weather AI API](https://weather-ai.co/docs) — weather data
- [OpenStreetMap Nominatim](https://nominatim.org) — city geocoding

## License

Private project.
