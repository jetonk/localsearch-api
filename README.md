## How to run the API?

### Available scripts:

1. `npm install` to install node modules dependencies
2. `npm start`
3. `npm start: dev` - to run using nodemon for development experience with auto-restarting

## Requirements:

- Node Version: `v18.15.0`
- NPM Version: `9.6.4`

### Used libraries/frameworks:

- Express,
- Node-cache
- Axios

### Run the API using Docker

- docker build -t localsearch-api .
- docker run -p 3000:3000 --env-file .env localsearch-api
