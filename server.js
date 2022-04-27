const express = require('express');
const cookieParser = require('cookie-parser');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const userRoutes = require('./routes/user.routes');
const petRoutes = require('./routes/pet.routes');
const refugeRoutes = require('./routes/refuge.routes');
const pageRoutes = require('./routes/page.routes');
const commentRoutes = require('./routes/comment.routes');
const formAdoptionRoutes = require('./routes/formAdoption.routes');
const paymentRoutes = require('./routes/payment.routes');
const subscriptionRoutes = require('./routes/subscription.routes');
const app = express();
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Stripe
const stripe = require("stripe")("sk_test_51KqM5dJFBabTcxIbqcWZMAejKxrz6rgS2zlhZ8E2q0zDufPW9uLpcwociAiIXehmJ9KHXPOhwLMNBPMUcOWeLo9h00SbObm9Te");
app.post("/payment", cors(), async (req, res) => {
    const {amount, id} = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Paiement du compte: " + id,
            payment_method: id,
            confirm: true
        });
        console.log("Payment", payment);
        res.json({
            message: "Payment successful",
            success: true
        });
    } catch (error) {
        console.log("Error", error);
        res.json({
            message: "Payment failed",
            success: false
        });
    }
});

app.post('/subscription', cors(), async (req, res) => {
    const {email, amount, id} = req.body;
    try {
        const customer = await stripe.customers.create({
            email: email,
            payment_method: id,
            invoice_settings: {
                default_payment_method: id,
            },
        });
        const priceId = [];

        if (amount === 1500) {
            priceId.push({price: 'price_1KtCT2JFBabTcxIb3gSSSORG'});
        } else if (amount === 2000) {
            priceId.push({price: 'price_1KtCTTJFBabTcxIbfRN2rDNj'});
        } else if (amount === 2500) {
            priceId.push({price: 'price_1Kqlm7JFBabTcxIbpCoz0iyg'});
        } else if (amount === 5000) {
            priceId.push({price: 'price_1KtCTeJFBabTcxIbQutozeg7'});
        } else if (amount === 7500) {
            priceId.push({price: 'price_1KtCTiJFBabTcxIbnX2r8LSn'});
        } else if (amount === 10000) {
            priceId.push({price: 'price_1KtCTmJFBabTcxIbdGd0HXSP'});
        }

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: priceId,
            expand: ['latest_invoice.payment_intent']
        });

        const status = subscription['latest_invoice']['payment_intent']['status'];
        const client_secret = subscription['latest_invoice']['payment_intent']['client_secret'];

        res.json({
            client_secret: client_secret,
            status: status,
            message: "Payment successful",
            success: true
        });

    } catch (error) {
        res.json({
            message: "Payment failed",
            success: false
        });
    }
});


//Cookie
app.use(cookieParser());

//cors
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'Access-Control-Allow-Origin': process.env.CLIENT_URL,
    'Access-Control-Allow-Headers': '*'
};
app.use(cors(corsOptions));

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});

//express
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use('/api/user', userRoutes);
app.use('/api/pet', petRoutes);
app.use('/api/refuge', refugeRoutes);
app.use('/api/page', pageRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/formAdoption', formAdoptionRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/subscription', subscriptionRoutes);

//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});