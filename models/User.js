import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true,'Please provide name'],
        minlength:3,
        maxlength:20,
        trim:true 
    },
    email:{
        type:String,
        required: [true,'Please provide email'],
        validate:{
            validator:validator.isEmail,
            message:''
        },
        unique:true 
    },
    password:{
        type:String,
        required: [true,'Please provide password'],
        minlength:6,
        select:false,
    },
    lastName:{
        type:String,
        maxlength:20,
        trim:true,
        default:'lastname'
    },
    location:{
        type:String,
        maxlength:20,
        trim:true,
        default:'my city'
    },
})

export default mongoose.model('User',UserSchema)
