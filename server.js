const app =require('./app');

const connectDb =require('./Config/database')

const PORT = process.env.PORT || 3000

connectDb();

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));