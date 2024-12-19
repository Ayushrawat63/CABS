const Availability =require('../Models/availability')
const Appointment= require('../Models/appointment');



const createAppointment = async (req, res) => {
  try {
    if(req.user.role !== 'student')
        return res.status(403).json({error:"Only student can book appointments"});
    // console.log(req.user)

    const availability= await Availability.findOne({_id:req.body.availabilityId});
    if(!availability || availability.isBooked)
        return res.status(400).json({error:"this slot is not available"});

    const newAppointment = new Appointment({
        professor:availability.professor,
        student:req.user.userId,
        availability:req.body.availabilityId,
    })
    // console.log(newAppointment)
    availability.isBooked=true
    await availability.save();
    await newAppointment.save();
    res.status(201).json(newAppointment)

  } catch (err) {
    res.status(400).json({error:"server error"})
 }
};

const cancelAppointment =async (req,res)=>{
  try{
    // console.log(req.user)
  
    const appointment = await Appointment.findById(req.params.appointmentId);
    if(!appointment)
      return res.status(404).json({error:"Appointment not found"});

    // console.log(appointment)
    if(req.user.role==="professor" && appointment.professor.toString() !== req.user.userId)
      return res.status(403).json({error:"Not authorized"});

    
    // console.log(appointment)

    const availability = await Availability.findById({_id:appointment.availability});
    availability.isBooked=false;

    // console.log(availability)


    await availability.save();
    await Appointment.findByIdAndDelete(req.params.appointmentId)

    res.status(200).json({message:`Appointment with id ${req.params.appointmentId} is cancled by ${req.user.role}`})

  }
  catch (err) {
    console.log(err)
    res.status(404).json({error:"server error"})
 }
}

const getMyAppointment =async (req,res)=>{
  try{
    const data = req.user.role === "student"? {student:req.user.userId}:{professor:req.user.userId} 

    const appointments =await Appointment.find(data).populate('professor','name').populate('student','name');
  
    if(appointments.length===0)
       return res.json({message:"You have zero Appointment"})
     res.status(200).json(appointments)

  }
  catch (err) {
    console.log(err)
    res.status(404).json({error:"server error"})
 }
}

module.exports = {
 createAppointment,
 cancelAppointment,
 getMyAppointment
};
