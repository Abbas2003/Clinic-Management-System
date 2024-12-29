import connectDB from "@/lib/connectDB";
import { AppointmentModel } from "@/lib/Models/AppointmentModel";
import { RequestModel } from "@/lib/Models/RequestModel";


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
        const status = req?.nextUrl?.searchParams?.get("status");
        const now = Date.now();

        if (doctor) {
            const doctorRequest = await RequestModel.findOne({ user: doctor });
            query.request = doctorRequest._id;
        }
        if (status && status !== "upcoming" && status !== "past") query.status = status;
        if (status && status == "upcoming") {
            query.date = { $gt: now };
            query.status = "accepted"
        }
        if (status && status == "past") {
            query.date = {
                $lt: now,
            };
        }
        if (user) query.user = user;

        const stats = {
            pending: await AppointmentModel.find({ status: "pending" }).countDocuments(),
            accepted: await AppointmentModel.find({ status: "accepted" }).countDocuments(),
            cancelled: await AppointmentModel.find({ status: "cancelled" }).countDocuments(),
        }

        const appointments = await AppointmentModel.find(query).populate("user").populate({ path: "request", populate: { path: "user" } });

        return Response.json({
            error: false,
            msg: "Appointments fetched successfully",
            appointments,
            stats
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

export async function PUT(req) {
    await connectDB();
    try {
        const { id, status } = await req.json();

        const update = await AppointmentModel.findOneAndUpdate({ _id: id }, { status: status }).exec();

        return Response.json({
            error: false,
            msg: "Appointment updated successfully",
            appointment: update
        }, {
            status: 201
        })

    } catch (error) {
        console.error(error);
        return Response.json({
            error: true,
            msg: error.message,
        }, {
            status: 400
        })
    }
}

export async function DELETE(req) { }