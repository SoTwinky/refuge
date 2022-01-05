const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const commentSchema = new mongoose.Schema(
    {
        id_author: {
            type: String,
            max: 1024,
        },
        author: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true
        },
        content: {
            type: String,
            max: 1024,
        },
        pet: {
            type: String,
            max: 1024,
        }
    },
    {
        timestamps: true,
    }
);

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = CommentModel;