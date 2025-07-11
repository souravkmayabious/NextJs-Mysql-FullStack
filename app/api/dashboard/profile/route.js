import { getDataFromToken } from "@/helpers/getDataFromToken";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const user = await getDataFromToken(request);

    return NextResponse.json({success:true,message:"Authorized",user},{status:201})
    
  } catch (error) {
    return NextResponse.json(
      { success: false, message:  error.message || "Failed to retrive"},
      { status: 400 }
    );
  }
}
