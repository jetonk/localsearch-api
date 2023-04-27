import express from "express";
import config from "./src/config/index.js";
import { getPlaces, searchPlaces } from "./src/controllers/place.controller.js";

const app = express();

app.get("/places", getPlaces);
app.get("/places/:search", searchPlaces);

app.listen(config.PORT, () => {
  console.log(`API is listening on port ${config.PORT}`);
});
