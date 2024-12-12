const mongoose =require('mongoose')

const connectDb = async()=>{
    try{
      await  mongoose.connect("mongodb://localhost:27017/college_System").then(()=>{console.log("mongodb connected")});
    }
    catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
      }
}

module.exports=connectDb
