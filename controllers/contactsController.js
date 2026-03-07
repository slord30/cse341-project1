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

module.exports = { getAllData, getSingle };