const express = require("express");
const { body } = require("express-validator");
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

// Validation Rules
const validateContact = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phone").notEmpty().withMessage("Phone number is required"),
];

// Routes
router.get("/", getContacts);
router.get("/:id", getContactById);
router.post("/", validateContact, createContact);
router.put("/:id", validateContact, updateContact);
router.delete("/:id", deleteContact);

module.exports = router;
