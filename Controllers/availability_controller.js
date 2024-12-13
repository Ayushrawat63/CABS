const Availablilty =require('../Models/availability')
const createAvailability=async(req,res)=>{
    try{
       if(req.user.role !== 'professor')
        return res.status(403).json({error:"Only professors can create availability"})
       
       const availability= new  Availablilty({
        professor:req.user.userId,
        startTime:req.body.startTime,
        endTime:req.body.endTime
       })
       await availability.save()
       res.status(201).json(availability)
    }
    catch (err) {
        res.status(404).json({err})
     }
}

const getAvailability = async(req,res)=>{
    try{
        // console.log(req.params.professorId)
      const availabilities= await Availablilty.find({
        professor:req.params.professorId,
        isBooked:false,
        startTime:{$gt: new Date()}
      }).populate('professor','name');
      res.status(200).json(availabilities)
    }

    catch (err) {
        res.status(404).json(err)
     }
}

module.exports={
    createAvailability,
    getAvailability
}