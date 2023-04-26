const env = process.env.NODE_ENV || "dev";

const config = {
  dev: {
    API_URL:
      process.env.API_URL ||
      `https://storage.googleapis.com/coding-session-rest-api`,
    PORT: 3000,
  },
  test: {
    API_URL:
      process.env.API_URL ||
      `https://storage.googleapis.com/coding-session-rest-api`,
    PORT: 3000,
  },
  production: {
    API_URL:
      process.env.API_URL ||
      `https://storage.googleapis.com/coding-session-rest-api`,
    PORT: 3000,
  },
};

export default config[env];
