const FormAdoptionModel = require('../models/formAdoption.model');
const PetModel = require('../models/pet.model');

module.exports.getAllFormAdoption = async (req, res) => {
    const formAdoption = await FormAdoptionModel.find().select();
    res.status(200).json(formAdoption);
};

module.exports.createFormAdoption = async (req, res) => {

    const newFormAdoption = new FormAdoptionModel({
        name: req.body.name,
        pet_id: req.body._id,
        adoptant_id: req.body.uid
    });

    try {
        const formAdoption = await FormAdoptionModel.create(newFormAdoption);
        const formId = formAdoption._id;
        const petFormId = PetModel.findByIdAndUpdate(
            req.body._id,
            {$addToSet: {formAdoption: formId}},
            {new: true, upsert: true});

        await Promise.all([formAdoption, petFormId])
            .then((docs) => res.status(201).json(docs))
            .catch((err) => res.status(500).json(err));

    } catch (err) {
        return res.status(500).send({err});
    }
};