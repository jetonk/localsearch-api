/* eslint-disable no-undef */
const env = process.env.NODE_ENV || "dev";

const config = {
  dev: {
    PLACES_API_URL:
      process.env.PLACES_API_URL ||
      `https://storage.googleapis.com/coding-session-rest-api`,
    PORT: 3000,
    cacheTTLSeconds: 43200, // seconds, 12 hours
  },
  test: {
    PLACES_API_URL:
      process.env.PLACES_API_URL ||
      `https://storage.googleapis.com/coding-session-rest-api`,
    PORT: 3000,
    cacheTTLSeconds: 43200, // seconds, 12 hours
  },
  production: {
    PLACES_API_URL:
      process.env.PLACES_API_URL ||
      `https://storage.googleapis.com/coding-session-rest-api`,
    PORT: 3000,
    cacheTTLSeconds: 43200, // seconds, 12 hours
  },
};

export default config[env];
