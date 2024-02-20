const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const planetRouter = require('./routes/planets/planets.router');
const {launchesRouter }= require('./routes/launches/launches.router');

app.use(cors({origin:'http://localhost:3000',}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));
app.use(planetRouter);
app.use(launchesRouter);

app.get('/*',(req,res)=>{                            ////Note why did you add * here !!!!!!!!!!!
    res.sendFile(path.join(__dirname,'..','public','index.html')) ;
});




module.exports = app;