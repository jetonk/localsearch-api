import axios from "axios";
import config from "../config/index.js";

const PLACE_IDS = ["GXvPAor1ifNfpF0U5PTG0w", "ohGSnJtMIC5nPfYRi_HTAg"];

export const fetchPlaces = async () => {
  try {
    for (const placeId of PLACE_IDS) {
      const response = await axios.get(`${config.PLACES_API_URL}/${placeId}`);
      return response.data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
