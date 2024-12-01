import connectDB from "@/lib/connectDB";
import { RequestModel } from "@/lib/Models/RequestModel";


export async function GET(req, { params }) {
    await connectDB();

    
    const requests = await RequestModel.findOne({ _id: params.id }).populate("user");
    // console.log("User in Backend->", requests);

    return Response.json({
        error: false,
        msg: "Single Request fetched successfully",
        requests
    }, {
        status: 200
    })
}