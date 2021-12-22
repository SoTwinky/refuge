const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const petSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        }
    },
    {
        timestamps: true,
    }
);

// play function before save into display: 'block',
petSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

petSchema.statics.login = async function(email, password) {
    const pet = await this.findOne({ email });
    if (pet) {
        const auth = await bcrypt.compare(password, pet.password);
        if (auth) {
            return pet;
        }
        throw Error('Mot de passe incorrect');
    }
    throw Error('Email incorrect')
};

const CommentModel = mongoose.model("pet", petSchema);

module.exports = CommentModel;