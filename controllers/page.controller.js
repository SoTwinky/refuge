const PageModel = require('../models/page.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllPages = async (req, res) => {
    const pages = await PageModel.find().select();
    res.status(200).json(pages);
};


module.exports.getPageInfo = (req, res) => {
    PageModel.findOne({refuge: req.params.id}, (err, docs) => {
        if (!err) {
            res.send(docs);
            console.log(req.params)
        } else {
            console.log('Page inconnu' + err);
        }
    }).select();
};

module.exports.updatePage = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu' + req.params.id)
    }

    try {
        await PageModel.findOneAndUpdate(
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

module.exports.deletePage = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu' + req.params.id)
    }

    try {
        await PageModel.deleteOne({_id: req.params.id})
            .then((docs) => res.status(200).json({message: "Bien supprimé !"}));
    } catch (err) {
        return res.status(500).json({message: err});
    }
}
