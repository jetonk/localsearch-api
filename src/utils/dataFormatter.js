export const populateWebsite = (contact, contacts) => {
  const { contact_type } = contact;

  if (contact_type === "url") {
    contacts[contact_type] = {
      label: "Website",
      value: contact.service_code,
    };
  }
  return contacts;
};

let phoneValue = "";
export const populatePhone = (contact, contacts) => {
  const { contact_type } = contact;

  if (contact_type === "phone") {
    const isEmpty = phoneValue.length;

    phoneValue += `${
      isEmpty ? `, ${contact.call_link}` : `${contact.call_link}`
    }`;
  }

  contacts["phone"] = { label: "Phone", value: phoneValue };

  return contacts;
};

export const formatPlaceData = (Places, place) => {
  const { local_entry_id, displayed_what, displayed_where } = place;

  let newPlace = {
    local_entry_id,
    displayed_what,
    displayed_where,
  };
  Places.push(newPlace);
  return Places;
};

export const formatPlaceDetailsData = (PlaceDetails, place) => {
  const {
    local_entry_id,
    source,
    displayed_what,
    displayed_where,
    opening_hours,
  } = place;
  PlaceDetails[local_entry_id] = {
    local_entry_id: local_entry_id,
    source: source,
    displayed_what: displayed_what,
    displayed_where: displayed_where,
    opening_hours: opening_hours,
    contacts: {},
  };
  return PlaceDetails;
};
