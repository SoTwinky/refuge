const PaymentModel = require('../models/payment.model');

module.exports.getAllPayment = async (req, res) => {
    const payment = await PaymentModel.find().select();
    res.status(200).json(payment);
};

module.exports.createPayment = async (req, res) => {

    const newPayment = new PaymentModel({
        amount: req.body.amount,
        refuge_id: req.body.refuge_id,
        email: req.body.email
    });

    try {
        const payment = await PaymentModel.create(newPayment);
        return res.status(201).json(payment);

    } catch (err) {
        return res.status(500).send({err});
    }
};

module.exports.getRefugeDonations = (req, res) => {

        if (req.params.id) {
            PaymentModel.find({refuge_id : req.params.id}, (err, docs) => {
                if (!err) {
                    res.send(docs);
                } else {
                    console.log({refuge_id : req.params.id});
                }
            }).select();
        } else {
            return res.status(400).send('!Payment inconnu : ' + req.params.id)
        }
};