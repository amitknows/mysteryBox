import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.Model";
import { getServerSession } from "next-auth";
import { User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(request: Request) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  const user: User = session?.user;

  if (!session || session?.user) {
    return Response.json(
      {
        success: false,
        message: "Not authenticated",
      },
      { status: 401 }
    );
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Failed to update user status to accpet messages",
        },
        { status: 401 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message acceptence status updated successfully",
        updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error accepting message", error);

    return Response.json(
      {
        success: false,
        message: "Failed to update user status to accpet messages",
      },
      { status: 500 }
    );
  }
}




export async function GET (request:Request){
    await dbConnect();
    const session = await getServerSession(authOptions);
    const user:User = session?.user;

    if(!session || !user){
        return Response.json({
            success:false,
            message: "Not aithenticated",
        },{status:401})
    }

    const userId = user._id;
try {
    const foundUser = await UserModel.findById(userId)


    if(!foundUser){
        return Response.json({
            success:false,
            message:"user not found",
        },{status:404})
    }

    return Response.json({
        success:true,
        message:"user found",
        isAcceptingMessages:foundUser.isAcceptingMessage
    },{status:200})
}
 catch (error) {
    console.error("Error accepting message", error);
    return Response.json(
        {
          success: false,
          message: "Error in getting message is acceptance message",
        },
        { status: 500 }
      );
}
}