const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const pageSchema = new mongoose.Schema(
    {
        refuge: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        menu :{
            type: Array
        },
    },
    {
        timestamps: true,
    }
);

// play function before save into display: 'block',
pageSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

pageSchema.statics.login = async function(email, password) {
    const page = await this.findOne({ email });
    if (page) {
        const auth = await bcrypt.compare(password, page.password);
        if (auth) {
            return page;
        }
        throw Error('Mot de passe incorrect');
    }
    throw Error('Email incorrect')
};

const PageModel = mongoose.model("page", pageSchema);

module.exports = PageModel;