import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if(!token){
        return NextResponse.json({success:false,message:"Unauthorized no token provided"},{status:401})
    }else{
        return NextResponse.json({success:true,message:token},{status:200})
    }

  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to retrive", error },
      { status: 400 }
    );
  }
}
