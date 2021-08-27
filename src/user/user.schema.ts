import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})