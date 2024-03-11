const mongoose = require('mongoose');

const planetsSchema = new mongoose.Schema({
    keplerName:{
        type:String,
        required:true,
    }
});
// Connects planetsSchema with planets collection. A new plural name planets will be created
module.exports = mongoose.model('Planet',planetsSchema);