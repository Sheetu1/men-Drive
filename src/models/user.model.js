const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        lowarCase:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        lowarCase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        minlength:3,
        lowerCase:true
    }
})
const user = mongoose.model('user',userSchema)
module.exports = user;