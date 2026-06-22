import { NextRequest, NextResponse } from "next/server";

import { calculateRunningScore } from "@/lib/score";
import { getWeatherByCity } from "@/services/weather.service";

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city");

  if (!city?.trim()) {
    return NextResponse.json(
      { error: "City query parameter is required" },
      { status: 400 },
    );
  }

  try {
    const weather = await getWeatherByCity(city.trim());
    const runningScore = calculateRunningScore(weather.current);

    return NextResponse.json({ weather, runningScore });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch weather data";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
