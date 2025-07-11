import { db } from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(request) {
  const body = await request.json();
  const { email,password } = body;

  try{
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = users[0];

    if (!user) return NextResponse.json({ message: 'Invalid credentials' }, {status: 401});
    const match = await bcrypt.compare(password, user.password);
    if (!match) return NextResponse.json({ message: 'Invalid credentials' }, {status: 401});
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
     cookies().set('token', token, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });
    return NextResponse.json({ message: 'Login successful', token }, {status: 200});
    

  }catch(error){
    return NextResponse.json({ message: "User Login Failed" ,error:error}, {status: 400});
  }

}    