import connectDB from "@/lib/connectDB";
import { UserModel } from "@/lib/Models/UserModel";


export async function POST(req){
    await connectDB();
    try{
        const obj = await req.json();
        let newUser = await new UserModel({...obj});
        newUser = await newUser.save();

        return Response.json({
            error: false,
            msg: "User created successfully",
            user: newUser
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

    const users = await UserModel.find();

    return Response.json({
        error: false,
        msg: "Users fetched successfully",
        users
    }, {
        status: 200
    })
}

export async function PUT(req){}

export async function DELETE(req){}