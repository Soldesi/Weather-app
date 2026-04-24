// src/controllers/weatherController.ts

import { Request, Response } from "express";
import { getWeatherByCity } from "../services/weatherService";
import axios from "axios";

export async function searchWeather(req: Request, res: Response): Promise<void> {
  const { city } = req.query;

  // Validação: cidade vazia ou ausente
  if (!city || typeof city !== "string" || city.trim() === "") {
    res.status(400).json({ error: "Por favor, informe o nome de uma cidade." });
    return;
  }

  try {
    const weatherData = await getWeatherByCity(city.trim());
    res.status(200).json(weatherData);
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 404) {
        res.status(404).json({ error: "Cidade não encontrada. Verifique o nome e tente novamente." });
        return;
      }
      if (err.response?.status === 401) {
        res.status(401).json({ error: "API Key inválida. Verifique o arquivo .env." });
        return;
      }
    }
    res.status(500).json({ error: "Erro interno ao buscar dados do clima." });
  }
}
