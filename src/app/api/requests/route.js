import connectDB from "@/lib/connectDB";
import { RequestModel } from "@/lib/Models/RequestModel";


export async function POST(req) {
    await connectDB();
    try {
        const obj = await req.json();

        const isUserRequestedBefore = await RequestModel.findOne({ user: obj.user });
        if (isUserRequestedBefore) {
            return Response.json({
                error: true,
                msg: "You have already requested before",
            }, {
                status: 403
            })
        }

        let newRequest = await new RequestModel({ ...obj });
        newRequest = await newRequest.save();

        return Response.json({
            error: false,
            msg: "Request registered successfully",
            request: newRequest
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

    const requests = await RequestModel.find();

    return Response.json({
        error: false,
        msg: "Requests fetched successfully",
        requests
    }, {
        status: 200
    })
}

export async function PUT(req) { 
    await connectDB();
    try {
        const obj = await req.json();
        let { id, status } = obj
        const updated = await RequestModel.findOneAndUpdate({
            _id: id
        }, { status: status }).exec();

        return Response.json({
            error: false,
            msg: "Request updated Successfully",
            request: updated
        }, {
            status: 200
        })

    } catch(err) {
        return Response.json({
            error: true,
            msg: "Something went wrong",
        }, {
            status: 500
        })
    }
}

export async function DELETE(req) { }