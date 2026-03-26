import request from "supertest";
import app from "../src/app.js";

describe("Auth Routes", () => {

  let token;

  it("should register, login user and return token", async () => {
    // Register
    const regRes = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "123456"
      });

    expect(regRes.statusCode).toBe(201);
    expect(regRes.body.email).toBe("test@example.com");

    // Login
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "123456"
      });

    expect(loginRes.statusCode).toBe(200);
    expect(loginRes.body.token).toBeDefined();

    token = loginRes.body.token;
  });

});
