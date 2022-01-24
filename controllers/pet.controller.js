const PetModel = require('../models/pet.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllPets = async (req, res) => {
    const pets = await PetModel.find().select();
    res.status(200).json(pets);
};

module.exports.getPetInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('1: ID inconnu ' + req.params.id)
    }

    PetModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('2: ID inconnu ' + err);
        }
    }).select();
};

module.exports.getPetFavorites = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('1: ID inconnu ' + req.params.id)
    }

    PetModel.find({pet_followers: req.params.id}, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('2: ID inconnu ' + err);
        }
    }).select();
};
