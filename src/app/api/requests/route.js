import connectDB from "@/lib/connectDB";
import { RequestModel } from "@/lib/Models/RequestModel";


export async function POST(req){
    await connectDB();
    try{
        const obj = await req.json();
        let newRequest = await new RequestModel({...obj});
        newRequest = await newRequest.save();

        return Response.json({
            error: false,
            msg: "Request registered successfully",
            request: newRequest
        }, {
            status: 201
        })
    } catch(e){
        return Response.json({
            error: true,
            msg: "Something went wrong",
        }, {
            status: 400
        })
    }
}

export async function GET(req){
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

export async function PUT(req){}

export async function DELETE(req){}