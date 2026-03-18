const Contact = require('../models/contact');
// const ObjectId = require('mongodb').ObjectId; //unique id mongo assigns to all databases, basically the primary key

const getAllData = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const contacts = await Contact.find();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const contact = await Contact.findById(req.params.id);
    res.setHeader("Content-Type", "application/json");
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Contact not found." });
    }
  } catch (err) {
    res.status(400).json({ message: "Invalid ID format." });
  }
};

const createContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const contact = new Contact({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    });

    const response = await contact.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json({ message: err.message || "Some error occurred when creating contact." });
  }
};

const updateContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const contactId = (req.params.id);
    const contactData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await Contact.findByIdAndUpdate(contactId, contactData, { new: true, runValidators: true });
    if (response) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found for your update." });
    }
  } catch (err) {
    res.status(400).json({ message: err.message || "Some error occured while updating the contact." })
  }
};

const deleteContact = async (req, res) => {
  //#swagger.tags = ['Contacts']
  try {
    const response = await Contact.findByIdAndDelete(req.params.id);
    if (response) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found for deletion." });
    }
  } catch (err) {
    res.status(500).json({ message: err.message || "Some error occurred while deleting the contact." });
  }
};



module.exports = {
  getAllData,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};