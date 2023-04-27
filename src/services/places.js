

// PLACE_IDS.forEach((place) => {
//   axios.get(`${config.API_URL}/${place}`).then((response) => {
//     const place = response.data;
//     PLACES[place.local_entry_id] = {
//       local_entry_id: place.local_entry_id,
//       source: place.source,
//       displayed_what: place.displayed_what,
//       displayed_where: place.displayed_where,
//       opening_hours: place.opening_hours,
//       addresses: place.addresses.filter(),
//     };
//   });
// });



export const getPlacesAPI = async () => {
  try {
    const data = await callAPI(`${config.PLACES_API_URL}/places`);
  } catch (error) {
    throw error;
  }
  return data;
};

export const SearchPlacesAPI = async () => {
  const data = await callAPI(`${config.PLACES_API_URL}/places`);
  return data;
};
