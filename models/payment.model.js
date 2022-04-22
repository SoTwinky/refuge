const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        amount: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55
        },
        refuge_id: {
            type: String
        },
        email: {
            type: String

        }
    },
    {
        timestamps: true,
    }
);

const PaymentModel = mongoose.model("payment", paymentSchema, "payment");

module.exports = PaymentModel;