// import mongoose from 'mongoose'
const mongoose = require('mongoose')
// import {Schema} from 'mongoose'

const UserSchema= new  mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        min:8,
        max:32
    }
})


module.exports = mongoose.model('User',UserSchema)


 