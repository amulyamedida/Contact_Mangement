const Contact = require("../models/contactModel");
const { validationResult } = require("express-validator");

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Public
const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error); // Pass error to middleware
  }
};

// @desc    Get a single contact by ID
// @route   GET /api/contacts/:id
// @access  Public
const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Contact ID" });
    }
    next(error);
  }
};

// @desc    Create a new contact
// @route   POST /api/contacts
// @access  Public
const createContact = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, address } = req.body;

  try {
    const contact = new Contact({ name, email, phone, address });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a contact
// @route   PUT /api/contacts/:id
// @access  Public
const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Ensures data validation
    );

    res.status(200).json(updatedContact);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Contact ID" });
    }
    next(error);
  }
};

// @desc    Delete contact
// @route   DELETE /api/contacts/:id
// @access  Public
const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid Contact ID" });
    }
    next(error);
  }
};

module.exports = { getContacts, getContactById, createContact, updateContact, deleteContact };
