const SubscriptionModel = require('../models/subscription.model');

module.exports.getAllSubscription = async (req, res) => {
    const payment = await SubscriptionModel.find().select();
    res.status(200).json(payment);
};

module.exports.createSubscription = async (req, res) => {

    const newPayment = new SubscriptionModel({
        amount: req.body.amount,
        pet: req.body.pet,
        id_user: req.body.id_user,
        refuge: req.body.refuge
    });

    try {
        const payment = await SubscriptionModel.create(newPayment);
        return res.status(201).json(payment);

    } catch (err) {
        return res.status(500).send({err});
    }
};

module.exports.getRefugeSubscription = (req, res) => {

        if (req.params.id) {
            SubscriptionModel.find({refuge : req.params.refuge}, (err, docs) => {
                if (!err) {
                    res.send(docs);
                } else {
                    console.log({refuge : req.params.refuge});
                }
            }).select();
        } else {
            return res.status(400).send('!Subscription inconnu : ' + req.params.id)
        }
};