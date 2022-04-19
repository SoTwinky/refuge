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
const app = express();
const {checkUser, requireAuth} = require('./middleware/auth.middleware');
const cors = require('cors');

//Stripe
const stripe = require("stripe")("sk_test_51KqM5dJFBabTcxIbqcWZMAejKxrz6rgS2zlhZ8E2q0zDufPW9uLpcwociAiIXehmJ9KHXPOhwLMNBPMUcOWeLo9h00SbObm9Te");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post("/payment", cors(), async (req, res) => {
    let { amount, id } = req.body;
    try {
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "Spatula company",
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

//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});