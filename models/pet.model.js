const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const petSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55
        },
        color: {
            type: String,
        },
        age: {
            type: Number,
            maxLength: 100
        },
        gender: {
            type: String,
        },
        pet_followers: {
            type: [String]
        },
        comments: {
            type: [String]
        },
    },
    {
        timestamps: true,
    }
);

const PetModel = mongoose.model("pet", petSchema);

module.exports = PetModel;