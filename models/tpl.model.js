const mongoose = require('mongoose');

const tplSchema = new mongoose.Schema(
    {
        btn_url: {
            type: String
        },
        btn_name: {
            type: String
        },
        title: {
            type: String
        },
        image: {
            type: String
        },
        resume: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

const TplModel = mongoose.model("tpl", tplSchema, "TPL_ACCUEIL");
module.exports = TplModel;
