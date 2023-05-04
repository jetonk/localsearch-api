import axios from "axios";
import config from "../config/index.js";
import { CacheManager } from "../services/cacheManager.js";
import {
  formatPlaceData,
  formatPlaceDetailsData,
} from "../utils/dataFormatter.js";
import { PLACE_IDS } from "../config/index.js";

const cacheManager = new CacheManager(config.cacheTTLSeconds);

const fetchAndProcessPlaceData = async (type) => {
  let PlaceDetails = {};
  let Places = [];

  for (const placeId of PLACE_IDS) {
    const response = await axios.get(`${config.PLACES_API_URL}/${placeId}`);

    Places = formatPlaceData(Places, response.data);
    PlaceDetails = formatPlaceDetailsData(Places, response.data);

    cacheManager.set("places", Places);
    cacheManager.set("placedetails", PlaceDetails);
  }

  return type === "places" ? Places : PlaceDetails;
};

export const getPlaces = async (req, res) => {
  let places = [];
  try {
    if (cacheManager.has("places")) {
      places = cacheManager.get("places");
    } else {
      places = await fetchAndProcessPlaceData("places");
    }
    res.json(places);
  } catch (error) {
    console.error("error", error);
    res.status(error?.response?.status).send(error.message);
  }
};

export const getPlaceById = async (req, res) => {
  const { placeId } = req.params;
  let places = [];
  try {
    if (cacheManager.has("placedetails")) {
      places = cacheManager.get("placedetails");
    } else {
      places = await fetchAndProcessPlaceData();
    }
    if (places[placeId]) {
      res.json(places[placeId]);
    } else {
      res.status(404).send({ message: "Place not found.." });
    }
  } catch (error) {
    console.error("error", error);
    res.status(error?.response?.status).send(error.message);
  }
};

export const searchPlaces = async (req, res) => {
  const { search } = req.params;
  let places = [];
  try {
    if (cacheManager.has("places")) {
      places = cacheManager.get("places");
    } else {
      places = await fetchAndProcessPlaceData();
    }
    const filteredPlaces = places.filter((place) => {
      return (
        place.displayed_what.toLowerCase().includes(search.toLowerCase()) ||
        place.displayed_where.toLowerCase().includes(search.toLowerCase())
      );
    });
    res.json(filteredPlaces);
  } catch (error) {
    res.status(error.response.status).send(error.message);
  }
};
