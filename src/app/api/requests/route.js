import connectDB from "@/lib/connectDB";
import { RequestModel } from "@/lib/Models/RequestModel";
import { UserModel } from "@/lib/Models/UserModel";


export async function POST(req) {
    await connectDB();
    try {
        const obj = await req.json();
        // console.log("Request Object->", obj);

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
            msg: `Something went wrong: ${e.message}`,
        }, {
            status: 400
        })
    }
}

export async function GET(req) {
    await connectDB();
    const query = {}
    const status = req.nextUrl.searchParams.get("status");    
    if(status && status != "all"){
        query.status = status;
    }
    
    const requests = await RequestModel.find(query).populate("user");
    // console.log("Status in Backend->", status);

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

        const request = await RequestModel.findOne({ _id: id });
        await UserModel.findOneAndUpdate({ _id: request.user }, { role: "doctor" })

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