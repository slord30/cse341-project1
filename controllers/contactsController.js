const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; //unique id mongo assigns to all databases, basically the primary key

const getAllData = async (req, res, next) => {
  const result = await mongodb.getDb().db('project1').collection('contacts').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists); 
  });
};

const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db('project1').collection('contacts').find({_id: userId}); //mongo uses _id: userId
    result.toArray().then((lists) => { 
        res.setHeader('Content-Type', 'application/json');

        if (lists.length > 0) {
          res.status(200).json(lists[0]);
        } else {
          res.status(404).json({message: "Contact not found."});
        }
  
    });
};

const createContact = async (req, res) => {
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db('project1').collection('contacts').insertOne(contact);
  if (response.acknowledged > 0) {
    res.status(201).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const updateContact = async (req, res) =>
{
  const userId = new ObjectId(req.params.id);
  const contact = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday
  };
  const response = await mongodb.getDb().db('project1').collection('contacts').replaceOne({_id: userId}, contact);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the contact.');
  }
};

const deleteContact = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db('project1').collection('contacts').deleteOne({_id: userId});
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while deleting the contact.');
  }
};



module.exports = { 
  getAllData, 
  getSingle,
  createContact,
  updateContact,
  deleteContact
};