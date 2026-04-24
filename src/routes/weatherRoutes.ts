// src/routes/weatherRoutes.ts

import { Router } from "express";
import { searchWeather } from "../controllers/weatherController";

const router = Router();

// GET /api/weather?city=NomeDaCidade
router.get("/weather", searchWeather);

export default router;
