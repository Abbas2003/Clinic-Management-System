import connectDB from "@/lib/connectDB";
import { AppointmentModel } from "@/lib/Models/AppointmentModel";
import { RequestModel } from "@/lib/Models/RequestModel";
import { UserModel } from "@/lib/Models/UserModel";


export async function POST(req) {
    await connectDB();
    try {
        const obj = await req.json();
        let newAppointment = await new AppointmentModel({ ...obj });
        newAppointment = await newAppointment.save();

        return Response.json({
            error: false,
            msg: "Your appointment has booked, you will have confirmation message soon.",
            appointment: newAppointment
        }, {
            status: 201
        })
    } catch (e) {
        return Response.json({
            error: true,
            msg: "Something went wrong",
        }, {
            status: 400
        })
    }
}

export async function GET(req) {
    await connectDB();

    try {
        const query = {}
        const doctor = req?.nextUrl?.searchParams?.get("doctor");
        const user = req?.nextUrl?.searchParams?.get("user");
        if (doctor) query.doctor = doctor;
        if (user) query.user = user;

        const appointments = await AppointmentModel.find(query).populate("user").populate({ path: "request", populate: { path: "user"} });

        return Response.json({
            error: false,
            msg: "Appointments fetched successfully",
            appointments
        }, {
            status: 200
        })
    } catch (error) {
        console.log("error->", error.message);
        return Response.json({
            error: true,
            msg: error.message,
        }, {
            status: 400
        })
    }


}

export async function PUT(req) { }

export async function DELETE(req) { }