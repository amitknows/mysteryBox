import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.Model";
import { Message } from "@/model/User.Model";

export async function POST(request: Request) {
  await dbConnect();

  const { username, content } = await request.json();

  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: " User not found",
        },
        { status: 404 }
      );
    }
    //is user is accepting messages

    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "Not accepting messages",
        },
        { status: 403 }
      );
    }

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);

    await user.save();

    return Response.json(
      {
        success: true,
        message: "Message sent succefully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending messages", error);
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500}
    );
  }
}
