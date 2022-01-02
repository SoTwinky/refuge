const UserModel = require('../models/user.model');
const PetModel = require('../models/pet.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users);
};

module.exports.getUserInfo = (req, res) => {
    console.log(req.params);

    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu' + req.params.id)
    }

    UserModel.findById(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs);
        } else {
            console.log('ID inconnu' + err);
        }
    }).select('-password');
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu' + req.params.id)
    }

    try {
        await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio,
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

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu' + req.params.id)
    }

    try {
        await UserModel.deleteOne({_id: req.params.id})
            .then((docs) => res.status(200).json({message: "Bien supprimé !"}));
    } catch (err) {
        return res.status(500).json({message: err});
    }
};

module.exports.follow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow)) {
        return res.status(400).send('ID inconnu : ' + req.params.id)
    }

    try {
        //add to the follow lsit

        const promise_1 = UserModel.findByIdAndUpdate(
            req.params.id,
            {$addToSet: {pet_following: req.body.idToFollow}},
            {new: true, upsert: true});

        const promise_2 = PetModel.findByIdAndUpdate(
            req.body.idToFollow,
            {$addToSet: {pet_followers: req.params.id}},
            {new: true, upsert: true});

        await Promise.all([promise_1, promise_2])
            .then((docs) => res.status(201).json(docs))
            .catch((err) => res.status(500).json(err));

    } catch (err) {
        return res.status(500).json({message: err});
    }
};

module.exports.unfollow = async (req, res) => {
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow)) {
        return res.status(400).send('ID inconnu : ' + req.params.id)
    }

    try {
        const promise_1 = UserModel.findByIdAndUpdate(
            req.params.id,
            {$pull: {pet_following: req.body.idToUnfollow}},
            {new: true, upsert: true});

        const promise_2 = PetModel.findByIdAndUpdate(
            req.body.idToUnfollow,
            {$pull: {pet_followers: req.params.id}},
            {new: true, upsert: true});

        await Promise.all([promise_1, promise_2])
            .then((docs) => res.status(201).json(docs))
            .catch((err) => res.status(500).json(err));
    } catch (err) {
        return res.status(500).json({message: err});
    }
};
