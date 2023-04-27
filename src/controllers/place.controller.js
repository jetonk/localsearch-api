import axios from "axios";
import config from "../config/index.js";

const PLACE_IDS = ["GXvPAor1ifNfpF0U5PTG0w", "ohGSnJtMIC5nPfYRi_HTAg"];
const PLACES = [];

export const getPlaces = async (req, res) => {
  try {
    for (const placeId of PLACE_IDS) {
      const response = await axios.get(`${config.PLACES_API_URL}/${placeId}`);
      const place = response.data;

      const contacts = place.addresses[0].contacts.map((contact) => {
        return {
          [contact.contact_type]: contact.service_code,
        };
      });

      const newPlace = {
        local_entry_id: place.local_entry_id,
        source: place.source,
        displayed_what: place.displayed_what,
        displayed_where: place.displayed_where,
        opening_hours: place.opening_hours,
        contacts,
      };

      PLACES.push(newPlace);
    }

    res.json(PLACES);
  } catch (error) {
    res.status(error.response.status).send(error.message);
  }
};

export const searchPlaces = (req, res) => {
  const { search } = req.params;
  const places = PLACES.filter((place) =>
    place.displayed_what.includes(search)
  );
  res.send(places);
};
