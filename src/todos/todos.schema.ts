import * as mongoose from 'mongoose'


export const TodoSchema = new mongoose.Schema({
    userId:String,
    name:String,
    isCompleted:{
        type:Boolean,
        default:false
    }
})