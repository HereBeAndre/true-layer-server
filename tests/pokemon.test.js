const request = require("supertest");
const app = require("../app");

describe("Pokemon test suite", () => {
  const responseKeys = ["name", "description"];
  it("Expects response to have status 200", async () => {
    await request(app).get("/pokemon/pikachu").expect(200);
  });

  it("Expects response body to include required keys", async () => {
    const response = await request(app).get("/pokemon/pikachu");
    const { body } = response;
    expect(body).not.toBeFalsy();
    expect(Object.keys(body)).toEqual(responseKeys);
  });

  it("Expects 'name' key in response body to equal user input", async () => {
    const response = await request(app).get("/pokemon/pikachu");
    const { body } = response;
    expect(body.name).toEqual("pikachu");
  });

  it("Expects 'description' key in response body have length", async () => {
    const response = await request(app).get("/pokemon/pikachu");
    const { body } = response;
    expect(body.description.length).toBeGreaterThan(0);
  });

  it("Expects response to have status 404 if search parameter is empty", async () => {
    await request(app).get("/pokemon/").expect(404);
  });

  it("Expects response to have status 404 if Pokemon name doesn't exist", async () => {
    await request(app).get("/pokemon/randomName").expect(404);
  });

  it("Expects response to have status 404 if Pokemon name is not provided", async () => {
    await request(app).get("/pokemon/").expect(404);
  });
});
