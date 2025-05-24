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

export async function GET(req) {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (userId) {
        // Get single user by id
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                return Response.json({
                    error: true,
                    msg: "User not found"
                }, {
                    status: 404
                });
            }
            return Response.json({
                error: false,
                msg: "User fetched successfully",
                user
            }, {
                status: 200
            });
        } catch (e) {
            return Response.json({
                error: true,
                msg: "Invalid user id"
            }, {
                status: 400
            });
        }
    } else {
        // Get all users
        const users = await UserModel.find();
        return Response.json({
            error: false,
            msg: "Users fetched successfully",
            users
        }, {
            status: 200
        });
    }
}
export async function PUT(req){}

export async function DELETE(req){}