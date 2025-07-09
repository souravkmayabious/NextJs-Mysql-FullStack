'use client'
import { useState } from "react";
import toast from 'react-hot-toast';
import Link from "next/link";

export default function LoginPage(){

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password){
           return toast.error("All field required");
        }

        try{
            const reg = axios.post('/api/auth/login',
                {email,password},
                {
                    headers:{
                        'Content-Type': 'application/json',
                    },
                }
            );
            toast.success(reg.data.message);
        }catch(error){
            toast.error(error.response?.data?.error || 'Login failed');
        }
    }

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card">
                        <div className="card-header text-center">Login</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <label className="mt-2">Email</label>
                                <input type="text" name="email" id="email" className="form-control" onChange={(e)=>setEmail(e.target.value)} />
                                <label className="mt-2">Password</label>
                                <input type="text" name="password" id="password" className="form-control" onChange={(e)=>setPassword(e.target.value)} />
                                <button type="submit" className="text-center btn btn-success mt-4">Login</button>
                            </form>
                        </div>
                        <div className="card-footer">
                            Not Register ? <Link href={'/auth/register'} >Register</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}