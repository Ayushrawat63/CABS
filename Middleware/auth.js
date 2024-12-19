const jwt =require("jsonwebtoken")
const auth =async (req,res,next)=>{
    try{
       const token =req.header('Authorization').replace('Bearer ','');
    //    console.log(token);
       const decoded =jwt.verify(token,process.env.JWT_SECRET);
       req.user=decoded;
       next()
    }
    catch(err){
        console.log(err)
    }
}

module.exports=auth