const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
 professor:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
 },
 student:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
 },
 availability:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Availability',
    required:true
 },
 status:{
    type:String,
    default:"scheduled"
 }
},{timestamps:true})



module.exports = mongoose.model("Appointment",appointmentSchema);