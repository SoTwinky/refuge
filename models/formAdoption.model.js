const mongoose = require('mongoose');

const formAdoptionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55
        },
        pet_id: {
            type: String,
            required: true
        },
        adoptant_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

const FormAdoptionModel = mongoose.model("formadoptions", formAdoptionSchema);

module.exports = FormAdoptionModel;