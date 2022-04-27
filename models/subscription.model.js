const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
    {
        amount: {
            type: String
        },
        pet: {
            type: String
        },
        id_user: {
            type: String
        },
        refuge: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

const SubscriptionModel = mongoose.model("subscription", subscriptionSchema, "subscription");

module.exports = SubscriptionModel;