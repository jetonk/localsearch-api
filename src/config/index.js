const env = process.env.NODE_ENV || "dev";

const config = {
  dev: {
    PLACES_API_URL:
      process.env.PLACES_API_URL ||
      `https://storage.googleapis.com/coding-session-rest-api`,
    PORT: 3000,
  },
  test: {
    PLACES_API_URL:
      process.env.PLACES_API_URL ||
      `https://storage.googleapis.com/coding-session-rest-api`,
    PORT: 3000,
  },
  production: {
    PLACES_API_URL:
      process.env.PLACES_API_URL ||
      `https://storage.googleapis.com/coding-session-rest-api`,
    PORT: 3000,
  },
};

export default config[env];
