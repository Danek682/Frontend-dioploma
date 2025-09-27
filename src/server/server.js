import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());

// Загружаем alldata.json из той же папки, где лежит server.js
const data = JSON.parse(readFileSync(join(__dirname, "alldata.json"), "utf8"));

app.get("/alldata", (req, res) => {
  res.json(data);
});

app.listen(4000, () => {
  console.log("✅ Server running on http://localhost:4000/alldata");
});
