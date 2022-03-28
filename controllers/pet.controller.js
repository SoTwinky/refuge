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

module.exports.createPet = async (req, res) => {

    const newPet = new PetModel({
        name: req.body.name,
        color: req.body.color,
        age: req.body.age,
        gender: req.body.gender
    });

    try {
        const pet = await PetModel.create(newPet);
        return res.status(201).json(pet);
    } catch (err) {
        return res.status(500).send({err});
    }
};

module.exports.updatePet = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu' + req.params.id)
    }

    try {
        await PetModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    name: req.body.name,
                    color: req.body.color,
                    age: req.body.age,
                    gender: req.body.gender
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true}
        )
            .then((docs) => res.send(docs))
            .catch((err) => res.status(500).send({message: err}))
    } catch (err) {
        return res.status(500).json({message: err});
    }
};

module.exports.deletePet = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu' + req.params.id)
    }

    try {
        await PetModel.deleteOne({_id: req.params.id})
            .then((docs) => res.status(200).json({message: "Bien supprimé !"}));
    } catch (err) {
        return res.status(500).json({message: err});
    }
};