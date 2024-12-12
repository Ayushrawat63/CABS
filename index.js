const express = require("express")
const connectDb =require('./Config/database')
const bodyParser =require('body-parser')
const app= express()
app.use(bodyParser.json())
connectDb();

const auth = require("./Middleware/auth")

const userRouter =require('./Routes/userRoutes')
const availabilityRouter =require('./Routes/availabilityRoutes')
const appointmentRouter =require('./Routes/appointmentRoutes')

app.get('/',(req,res)=>{
    res.json({message:"hello from user"})
})


app.use('/',userRouter)
app.use('/slot',auth,availabilityRouter)
app.use('/appointment',auth,appointmentRouter)

app.listen(8000,()=>{
    console.log("server is started")
})