const express = require("express")
const bodyParser =require('body-parser')
const auth = require("./Middleware/auth")
const userRouter =require('./Routes/userRoutes')
const availabilityRouter =require('./Routes/availabilityRoutes')
const appointmentRouter =require('./Routes/appointmentRoutes')

const app = express()
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.json({message:"Hello,This is a college Appointment System "})
})


app.use('/',userRouter)
app.use('/slot',auth,availabilityRouter)
app.use('/appointment',auth,appointmentRouter)


module.exports =app

