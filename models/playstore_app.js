// import mongoose from 'mongoose'
const mongoose = require('mongoose')


const PlaystoreAppSchema = new mongoose.Schema({
    App:{
        type:String,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    Rating:{
        type:Number,

    },
    Reviews:{
        type:Number
    },
    Size:{
        type:String,
        required:true
    },
    Price:{
        type:Number
    },
    Content_Rating:{
        type:String
    },
    Genres:{
        type:String
    },
    LastUpdatedDate:{
        type:Date
    },
    CurrentVersion:{
        type:Number
    },
    AndroidVersion:{
        type:String,
    }
})


module.exports =  mongoose.model('PlaystoreApp',PlaystoreAppSchema)
