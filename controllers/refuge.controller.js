const RefugeModel = require('../models/refuge.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllRefuges = async (req, res) => {
    const refuges = await RefugeModel.find().select();
    res.status(200).json(refuges);
};

module.exports.getRefugeInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        if (req.params.id) {
            RefugeModel.findOne({url : req.params.id}, (err, docs) => {
                if (!err) {
                    res.send(docs);
                } else {
                    console.log({url : req.params.id});
                }
            }).select();
        } else {
            return res.status(400).send('!Refuge inconnu : ' + req.params.id)
        }
    } else {
        RefugeModel.findById(req.params.id, (err, docs) => {
            if (!err) {
                res.send(docs);
            }
        }).select();
    }
};

module.exports.updateRefuge = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu' + req.params.id)
    }

    try {
        await RefugeModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    name: req.body.name,
                    country: req.body.country
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

module.exports.deleteRefuge = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu' + req.params.id)
    }

    try {
        await RefugeModel.deleteOne({_id: req.params.id})
            .then((docs) => res.status(200).json({message: "Bien supprimé !"}));
    } catch (err) {
        return res.status(500).json({message: err});
    }
};

module.exports.createRefuge = async (req, res) => {

    const newRefuge = new RefugeModel({
        name: req.body.name,
        url: req.body.url,
        picture: req.body.picture,
        country: req.body.country
    });

    try {
        const refuge = await RefugeModel.create(newRefuge);
        return res.status(201).json(refuge);
    } catch (err) {
        return res.status(500).send({err});
    }
};