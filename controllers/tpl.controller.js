const TplModel = require('../models/tpl.model');

module.exports.getAllItem = async (req, res) => {
    const item = await TplModel.find().select();
    res.status(200).json(item);
};

module.exports.createTPL = async (req, res) => {

};