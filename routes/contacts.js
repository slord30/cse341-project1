const express = require('express');
const contactsController = require('../controllers/contactsController');
const router = express.Router();

router.get('/', contactsController.getAllData);
router.get('/:id', contactsController.getSingle);

module.exports = router;