const CommentModel = require('../models/comment.model');
const PetModel = require('../models/pet.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllComments = async (req, res) => {
    const comment = await CommentModel.find().select();
    res.status(200).json(comment);
};

module.exports.addComment = async (req, res) => {
    const { author, content, pet } = req.body;
    try {
        const comment = await CommentModel.create({ author, content, pet });
        res.status(201).json({ comment: comment._id});

    } catch (err) {
        return res.status(500).json({err});
    }
};

module.exports.delComment = async (req, res) => {
    if (!ObjectID.isValid(req.params.pet) || !ObjectID.isValid(req.body.comments)) {
        return res.status(400).send('ID inconnu : ' + req.params.pet)
    }

    try {
        const promise_1 = CommentModel.findByIdAndUpdate(
            req.params.pet,
            {$pull: {pet: req.body.pet}},
            {new: true, upsert: true});

        const promise_2 = PetModel.findByIdAndUpdate(
            req.body.comments,
            {$pull: {comments: req.params.comments}},
            {new: true, upsert: true});

        await Promise.all([promise_1, promise_2])
            .then((docs) => res.status(201).json(docs))
            .catch((err) => res.status(500).json(err));
    } catch (err) {
        return res.status(500).json({message: err});
    }
};
