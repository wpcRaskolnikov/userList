import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URL);
const db=mongoose.connection;
db.on('error',err=>{
    console.error(`MongoDB error: ${err.message}`);
    process.exit(1);
})
db.once('open',()=>{
    console.log('MongoDB connection established');
})