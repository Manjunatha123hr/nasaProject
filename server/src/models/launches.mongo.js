const { default: mongoose, model } = require("mongoose");

const launchSchema = new mongoose.Schema({
    flightNumber:
    {
        type:Number,
        default:100,
        required:true,
    },
    mission:
    {
        type:String,
        required:true,
    },
    rocket:
    {
        type:String,
        required:true,
    },
    launchDate:
    {
        type:Date,
        required:true,
    },
    target:
    {
        type:String,
        required:true,
    },
    customer:
    {
        type:[String],     
       // required:true,
    },
    upcoming:
    {
        type:Boolean,
        required:true,
    },
    success:
    {
        type:Boolean,
        default:true,
        required:true,
    }
    });

    module.exports = mongoose.model('Launch',launchSchema);