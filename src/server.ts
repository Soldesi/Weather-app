// src/server.ts

import express from "express";
import path from "path";
import dotenv from "dotenv";
import weatherRoutes from "./routes/weatherRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "../views")));

// Rotas da API
app.use("/api", weatherRoutes);

// Rota raiz → serve o frontend
app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../views/index.html"));
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`✅ WeatherApp rodando em http://localhost:${PORT}`);
});
