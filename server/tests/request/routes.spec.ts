import supertest from "supertest";

import app from "../../src/app";

import DatabaseClient from "../../database/client";
import type { Result, Rows } from "../../database/client";

afterAll(() => {
  jest.clearAllMocks();
});

describe("GET /api/request", () => {
  it("should fetch request successfully", async () => {
    const rows = [] as Rows;

    jest
      .spyOn(DatabaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    const response = await supertest(app).get("/api/request");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows);
  });
});

describe("get /api/request/:id", () => {
  it("should fetch a single request successfully", async () => {
    const rows = [{}] as Rows;

    jest
      .spyOn(DatabaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    const response = await supertest(app).get("/api/request/1");

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(rows[0]);
  });

  it("should fail on invalid id", async () => {
    const rows = [] as Rows;

    jest
      .spyOn(DatabaseClient, "query")
      .mockImplementation(async () => [rows, []]);

    const response = await supertest(app).get("/api/request/0");

    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });
});

describe("POST /api/request", () => {
  it("should add a new request successfully", async () => {
    const result = { insertId: 1 } as Result;

    jest
      .spyOn(DatabaseClient, "query")
      .mockImplementation(async () => [result, []]);

    const fakeRequest = {
      title: "Hello , Hello",
      theme: "Matthieu est malade",
      details: "Je suis en arrêt maladie jusqu'à la fin de la semaine ",
      user_id: 0,
    };

    const response = await supertest(app)
      .post("/api/request")
      .send(fakeRequest);

    expect(response.status).toBe(201);
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body.insertId).toBe(result.insertId);
  });
  it("should fail on invalid request body", async () => {
    const result = { insertId: 1 } as Result;

    jest
      .spyOn(DatabaseClient, "query")
      .mockImplementation(async () => [result, []]);

    //FakeRequest with missing theme , details and user_id
    const fakeRequest = {
      title: "foo foo foo",
      theme: "trololo",
      details: "bhobhobho",
    };

    const response = await supertest(app)
      .post("/api/request/")
      .send(fakeRequest);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });
});

describe("PUT /api/request/:id", () => {
  it("should update an existing request successfully", async () => {
    // Mock result of the database query
    const result = { affectedRows: 1 } as Result;

    jest
      .spyOn(DatabaseClient, "query")
      .mockImplementation(async () => [result, []]);

    const fakeRequest = {
      title: "Hello , ",
      theme: "Matthieu est ",
      details: "Je suis en arrêt maladie  de la semaine ",
      user_id: 0,
    };

    const response = await supertest(app)
      .put("/api/request/2")
      .send(fakeRequest);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid request body", async () => {
    // Mock result of the database query
    const result = { affectedRows: 1 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(DatabaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake item data with missing user_id
    const fakeRequest = { title: "foo" };

    // Send a PUT request to the /api/items/:id endpoint with a test item
    const response = await supertest(app)
      .put("/api/request/42")
      .send(fakeRequest);

    // Assertions
    expect(response.status).toBe(400);
    expect(response.body).toEqual({});
  });

  it("should fail on invalid id", async () => {
    // Mock result of the database query
    const result = { affectedRows: 0 } as Result;

    // Mock the implementation of the database query method
    jest
      .spyOn(DatabaseClient, "query")
      .mockImplementation(async () => [result, []]);

    // Fake item data with missing user_id
    const fakeRequest = { title: "foo", user_id: 0 };

    // Send a PUT request to the /api/request/:id endpoint with a test item
    const response = await supertest(app)
      .put("/api/request/43")
      .send(fakeRequest);

    // Assertions
    expect(response.status).toBe(404);
    expect(response.body).toEqual({});
  });

  describe("DELETE /api/request/:id", () => {
    it("should delete an existing request successfully", async () => {
      // Mock result of the database query
      const result = { affectedRows: 1 } as Result;

      // Mock the implementation of the database query method
      jest
        .spyOn(DatabaseClient, "query")
        .mockImplementation(async () => [result, []]);

      // Send a DELETE request to the /api/request/:id endpoint
      const response = await supertest(app).delete("/api/request/42");

      // Assertions
      expect(response.status).toBe(204);
      expect(response.body).toEqual({});
    });

    it("should fail on invalid id", async () => {
      // Mock result of the database query
      const result = { affectedRows: 0 } as Result;

      // Mock the implementation of the database query method
      jest
        .spyOn(DatabaseClient, "query")
        .mockImplementation(async () => [result, []]);

      // Send a DELETE request to the /api/request/:id endpoint
      const response = await supertest(app).delete("/api/request/43");

      // Assertions
      expect(response.status).toBe(404);
      expect(response.body).toEqual({});
    });
  });
});
