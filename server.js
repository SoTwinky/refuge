const express = require('express');
const userRoutes = require('./routes/user.routes');
const petRoutes = require('./routes/pet.routes');
const refugeRoutes = require('./routes/refuge.routes');
const commentRoutes = require('./routes/comment.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const app = express();












app.use(express.json());





app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});




//routes

app.use('/api/user', userRoutes);
app.use('/api/pet', petRoutes);
app.use('/api/refuge', refugeRoutes);
app.use('/api/comment', commentRoutes);

//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
});