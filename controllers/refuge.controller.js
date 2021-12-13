const RefugeModel = require('../models/refuge.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllRefuges = async (req, res) => {
    const refuges = await RefugeModel.find().select();
    res.status(200).json(refuges);
};
