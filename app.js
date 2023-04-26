import express from "express";
import config from "./src/config/index.js";

const app = express();

const PLACES = {};

app.get("/places", (req, res) => {
  res.send(PLACES);
});

app.get("/places/:search", (req, res) => {
  const { search } = req.params;
  res.send({ search });
});

app.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`);
});
