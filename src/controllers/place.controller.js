import axios from "axios";
import config from "../config/index.js";
import { CacheManager } from "../services/cacheManager.js";
import {
  populateWebsite,
  populatePhone,
  formatPlaceData,
  formatPlaceDetailsData,
} from "../utils/dataFormatter.js";

const cacheManager = new CacheManager(config.cacheTTLSeconds);

const PLACE_IDS = ["GXvPAor1ifNfpF0U5PTG0w", "ohGSnJtMIC5nPfYRi_HTAg"];

const fetchAndProcessPlaceData = async (type) => {
  let PlaceDetails = {};
  let Places = [];
  for (const placeId of PLACE_IDS) {
    const response = await axios.get(`${config.PLACES_API_URL}/${placeId}`);

    const { local_entry_id, addresses } = response.data;

    Places = formatPlaceData(Places, response.data);

    PlaceDetails = formatPlaceDetailsData(Places, response.data);

    for (let contact of addresses[0].contacts) {
      populateWebsite(contact, PlaceDetails[local_entry_id].contacts);
      populatePhone(contact, PlaceDetails[local_entry_id].contacts);
    }
  }

  cacheManager.set("places", Places);
  cacheManager.set("placedetails", PlaceDetails);
  if (type === "places") {
    return Places;
  }
  return PlaceDetails;
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
    res.json(places[placeId]);
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
        place.displayed_what.includes(search) ||
        place.displayed_where.includes(search)
      );
    });
    res.json(filteredPlaces);
  } catch (error) {
    res.status(error.response.status).send(error.message);
  }
};
