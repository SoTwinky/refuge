const CommentModel = require('../models/comment.model');
const PetModel = require('../models/pet.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllComments = async (req, res) => {
    const comment = await CommentModel.find().select();
    res.status(200).json(comment);
};


module.exports.updateComment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    const updatedRecord = {
        content: req.body.content,
    };

    CommentModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true, upsert: true},
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Update error : " + err);
        }
    );
};

module.exports.addComment = async (req, res) => {
    const { id_author, author, content, pet } = req.body;
    try {
        const comment = await CommentModel.create({ id_author, author, content, pet });
        res.status(201).json({ comment: comment._id});

    } catch (err) {
        return res.status(500).json({err});
    }
};

module.exports.delComment = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    CommentModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Delete error : " + err);
    });
};
