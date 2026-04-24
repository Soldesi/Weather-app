// src/services/weatherService.ts

import axios from "axios";
import { WeatherData, OpenWeatherResponse } from "../types/weather";

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherByCity(city: string): Promise<WeatherData> {
  const apiKey = process.env.API_KEY;

  if (!apiKey) {
    throw new Error("API_KEY não configurada no arquivo .env");
  }

  const response = await axios.get<OpenWeatherResponse>(BASE_URL, {
    params: {
      q: city,
      appid: apiKey,
      units: "metric",
      lang: "pt_br",
    },
  });

  const data = response.data;

  return {
    city: data.name,
    country: data.sys.country,
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    description: data.weather[0].description,
    icon: data.weather[0].icon,
  };
}
