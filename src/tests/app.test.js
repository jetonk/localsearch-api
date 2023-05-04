/* eslint-disable no-undef */
const request = require("supertest");
import { app } from "../app";
import { PLACE_IDS } from "../config";

let server;
describe("GET /places", () => {
  beforeAll(() => {
    server = app.listen(4000);
  });

  it("GET /places => it should return all of the places as an array", () => {
    return request(server)
      .get("/places")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              local_entry_id: expect.any(String),
              displayed_what: expect.any(String),
              displayed_where: expect.any(String),
            }),
          ])
        );
      });
  });

  it("GET /places => it should return the place", () => {
    const placeId = PLACE_IDS[0];
    return request(server)
      .get(`/places/${placeId}`)

      .expect("Content-Type", /json/)

      .expect(200)

      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            local_entry_id: expect.any(String),
            source: expect.any(Object),
            displayed_what: expect.any(String),
            displayed_where: expect.any(String),
            opening_hours: expect.any(Object),
            contacts: expect.any(Array),
          })
        );
      });
  });

  it("GET /places/search => it should return Search results", () => {
    const existingSearchTerm = "Casa";
    return request(server)
      .get(`/places/search/${existingSearchTerm}`)

      .expect("Content-Type", /json/)

      .expect(200)

      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              local_entry_id: expect.any(String),
              displayed_what: expect.any(String),
              displayed_where: expect.any(String),
            }),
          ])
        );
      });
  });

  it("GET /places/search => it should return results not found", () => {
    const nonExistingSearchTerm = "Starbucks";
    return request(server)
      .get(`/places/search/${nonExistingSearchTerm}`)

      .expect("Content-Type", /json/)

      .expect(200)

      .then((response) => {
        expect(response.body).toEqual([]);
      });
  });

  it("GET /places by ID => it should return 404 if place not found", () => {
    let placeId = PLACE_IDS[0];
    placeId = `${placeId}111`;
    return request(server).get(`/places/${placeId}`).expect(404);
  });

  afterAll(() => {
    server.close();
  });
});
