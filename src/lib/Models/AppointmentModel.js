import mongoose from "mongoose"
const { Schema } = mongoose;


const AppointmentSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "Users" },
    request: { type: mongoose.Types.ObjectId, ref: "Request" },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "accepted", "cancelled", "visited", "reviewed", "missed"],
    },
   
})


export const AppointmentModel = mongoose.models.Appointments || mongoose.model('Appointments', AppointmentSchema)