const mongoose =require('mongoose')
require('dotenv').config()
const connectDb = async()=>{
    try{
      await  mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("mongodb connected")});
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
      }
}

module.exports=connectDb
