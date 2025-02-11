const request = require("supertest");
const app = require("../index"); // Import the app
const mongoose = require("mongoose");
const Contact = require("../models/contactModel");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Contacts API", () => {
  test("GET /api/contacts should return a list of contacts", async () => {
    const response = await request(app).get("/api/contacts");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /api/contacts should create a new contact", async () => {
    const newContact = {
      name: "John Doe",
      email: "johndoe@example.com",
      phone: "1234567890",
    };

    const response = await request(app).post("/api/contacts").send(newContact);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");

    // Cleanup: Delete the contact after test
    await Contact.findByIdAndDelete(response.body._id);
  });

  test("POST /api/contacts should return validation error for missing fields", async () => {
    const response = await request(app).post("/api/contacts").send({});
    expect(response.status).toBe(400);
  });
});
