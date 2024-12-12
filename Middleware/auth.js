const jwt =require("jsonwebtoken")
const auth =async (req,res,next)=>{
    try{
       const token =req.header('Authorization').replace('Bearer ','');
    //    console.log(token);
       const decoded =jwt.verify(token,"secret_Key12345");
       req.user=decoded;
       next()
    }
    catch(err){
        console.log(err)
    }
}

module.exports=auth