const express = require('express');
const contactsController = require('../controllers/contactsController');
const router = express.Router();

router.get('/', contactsController.getAllData);
router.get('/:id', contactsController.getSingle);

router.post('/', contactsController.createContact);

router.put('/:id', contactsController.updateContact);

router.delete('/:id', contactsController.deleteContact);

module.exports = router;