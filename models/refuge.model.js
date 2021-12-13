const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const refugeSchema = new mongoose.Schema(
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
refugeSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

refugeSchema.statics.login = async function(email, password) {
    const refuge = await this.findOne({ email });
    if (refuge) {
        const auth = await bcrypt.compare(password, refuge.password);
        if (auth) {
            return refuge;
        }
        throw Error('Mot de passe incorrect');
    }
    throw Error('Email incorrect')
};

const PetModel = mongoose.model("refuge", refugeSchema);

module.exports = PetModel;