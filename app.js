import express from "express";
import cors from "cors";
import config from "./src/config/index.js";
import {
  getPlaces,
  getPlaceById,
  searchPlaces,
} from "./src/controllers/place.controller.js";

const app = express();

app.use(cors());

app.get("/places", getPlaces);
app.get("/places/:placeId", getPlaceById);
app.get("/places/search/:search", searchPlaces);

app.listen(config.PORT, () => {
  console.log(`API is listening on port ${config.PORT}`);
});
