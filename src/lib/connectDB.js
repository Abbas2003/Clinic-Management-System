import mongoose from "mongoose";


export default async function connectDB() {
    let connect;
    if(connect.connection.readyState != 1){
        connect = await mongoose.connect(process.env.MONGO_URI)
        console.log('DB Connected')
    } 
}