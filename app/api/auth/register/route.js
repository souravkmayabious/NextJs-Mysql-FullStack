import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { name, email,phone, password } = body;
  if(!email || !password || !name || !phone ){
     return NextResponse.json({ success:false,message: 'Provide all fields' }, {status: 401});
  }
  try{
      const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users(name,email,phone,password) values(?,?,?,?)',[name,email,phone,hashedPassword]);
    return NextResponse.json({ message: "User registered successfully... go to login" ,body}, {
        status: 200,
    });
  }catch(error){
    console.error(error);
    return NextResponse.json({ message: "User registered Failed" ,error}, {
        status: 400,
    });
  }

  
}
