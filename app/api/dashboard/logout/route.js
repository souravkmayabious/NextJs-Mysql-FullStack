import { NextResponse } from "next/server";

export async function GET() {
    try{
        const response = NextResponse.json({success:true, message : "Logout Successful"});
        response.cookies.set("token","",
            {
                httpOnly:true,
                expires: new Date(0)
            }
        )
        return response;
    }catch(error){
        return NextResponse.json({success:false,error:error.message},{status:500})
    }
}