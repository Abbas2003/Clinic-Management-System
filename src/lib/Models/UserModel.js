import mongoose from "mongoose"
const { Schema } = mongoose;


const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    imgUrl: String,
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'doctor', 'admin']
    },
    doctorInfo: {
        fees: String,
        specialization: String,
        bio: String,
        hospital: String,
        time: Array,
        number: String,       
        gender: String,       
    }
}) 


export const UserModel = mongoose.models.Users ||  mongoose.model('Users', UserSchema)