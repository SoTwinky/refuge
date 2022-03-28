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