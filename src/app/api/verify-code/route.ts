import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User.Model";
import { z } from "zod";
import { usernameValidatation } from "@/schemas/signUpSchema";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const {username, code} = await request.json();
   const decodedUsername=  decodeURIComponent(username)

    const user =await UserModel.findOne({username:decodedUsername})
  
if(!user){
    return Response.json({
        status: false,
        message:"User not found"
    }, {status: 404})
}


const isCodeValid = user.verifyCode===code;
const isCodeNotExpired = new Date(user.verifyCodeExpiry)> new Date()

if(isCodeValid  && isCodeNotExpired){
    user.isVerified = true;
    await user.save()


    return Response.json({
        success: true,
        message:"User Verifeid Successfully"
    },{status:200})
}else if(!isCodeNotExpired){
    return Response.json({
        success: false,
        message:"Verification Code has expired . Please Signup again to get verificatio code"
    },{status:400})
}else{
    return Response.json({
        success: false,
        message:"Inavalid Code"
    },{status:400})
}




} catch (error) {
    console.error("Verify user error", error);

    return Response.json(
      {
        success: false,
        message: "Verify User Error",
      },
      { status: 500 }
    );
  }
}
