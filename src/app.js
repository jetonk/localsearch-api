import express from "express";
import cors from "cors";

import {
  getPlaces,
  getPlaceById,
  searchPlaces,
} from "./controllers/place.controller.js";

const app = express();

app.use(cors());

app.get("/places", getPlaces);
app.get("/places/:placeId", getPlaceById);
app.get("/places/search/:search", searchPlaces);

export { app };
