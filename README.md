Contact Management Application
A simple Node.js, Express.js, and MongoDB based backend application that provides CRUD operations for managing contacts.

Features
. Create, Read, Update, and Delete (CRUD) contacts.
. RESTful API with structured endpoints.
. MongoDB for data storage.
. Input validation and error handling.
. Unit tests using Jest & Supertest.
. CORS-enabled for secure API access.
. Deployed and ready for production.

Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (Mongoose ODM)
Validation: Express Validator
Testing: Jest, Supertest

Example Request & Response
🔹 Create a Contact  

POST /api/contacts
Content-Type: application/json

{
  "name": "Amulya",
  "email": "amulya@gmail.com",
  "phone": "9043768582",
  "address": "123 Street"
}

Response:

{
  "_id": "65c12345abcd67890",
  "name": "Amulya",
  "email": "amulya@gmail.com",
  "phone": "9043768582",
  "address": "123 Street",
  "createdAt": "2025-02-11T12:00:00.000Z",
  "updatedAt": "2025-02-11T12:00:00.000Z"
}
