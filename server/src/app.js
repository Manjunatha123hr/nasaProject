const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const morgan = require('morgan');   ///Used for console logs of all get post delete requests

const api = require('./routes/api')

app.use(cors({origin:'http://localhost:3000',}));
app.use(morgan('combined'));    ///Used for console logs of all get post delete requests
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));
app.use('/v1',api);


app.get('/*',(req,res)=>{                            ////Note why did you add * here !!!!!!!!!!!
    res.sendFile(path.join(__dirname,'..','public','index.html')) ;
});




module.exports = app;