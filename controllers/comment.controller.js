const PetModel = require('../models/pet.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllPets = async (req, res) => {
    const pets = await PetModel.find().select();
    res.status(200).json(pets);
};
