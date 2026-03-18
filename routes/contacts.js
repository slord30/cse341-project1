const express = require('express');
const contactsController = require('../controllers/contactsController');
const router = express.Router();
const {contactValidationRules, validate} = require('../middleware/validate');
const contact = require('../models/contact');

router.get('/', contactsController.getAllData);
router.get('/:id', contactsController.getSingle);

router.post('/', contactValidationRules(), validate, contactsController.createContact);

router.put('/:id', contactValidationRules(), validate, contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;