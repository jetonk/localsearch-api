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

  const openingHours = formatOpeningHours(opening_hours.days);
  PlaceDetails[local_entry_id] = {
    local_entry_id: local_entry_id,
    source: source,
    displayed_what: displayed_what,
    displayed_where: displayed_where,
    opening_hours: openingHours,
    contacts: {},
  };
  return PlaceDetails;
};

export function formatOpeningHours(days) {
  const daysOfWeek = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const hours = {};
  const closedShift = "closed";
  daysOfWeek.forEach((key) => {
    if (days[key]) {
      const day = days[key];
      const firstShift = `${day[0]?.start || ""} - ${day[0]?.end || ""}`;
      const secondShift = `${day[1]?.start || ""} - ${day[1]?.end || ""}`;
      const lookupShift = `${firstShift}${secondShift}`.replaceAll(" - ", "");

      hours[lookupShift] = hours[lookupShift] || {};
      hours[lookupShift] = {
        days: hours[lookupShift]?.days
          ? hours[lookupShift]?.days.concat(key)
          : [key],
        firstShift,
        secondShift: secondShift === " - " ? closedShift : secondShift,
      };
    } else {
      hours[closedShift] = {
        days: hours[closedShift]?.days
          ? hours[closedShift].days.concat(key)
          : [key],
        firstShift: closedShift,
        secondShift: closedShift,
      };
    }
  });
  return hours;
}
