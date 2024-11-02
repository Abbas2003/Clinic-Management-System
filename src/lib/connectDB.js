import mongoose from "mongoose";


export default async function connectDB() {
    let connect;
    if(connect?.connection?.readyState != 1){
        connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log('DB Connected')
    } 
}