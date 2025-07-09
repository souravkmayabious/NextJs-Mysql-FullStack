'use client'
import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast';
import Link from "next/link";
import { useRouter } from 'next/navigation';

export default function LoginPage(){
    const router = useRouter();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password){
           return toast.error("All field required");
        }

        try{
            const res = await axios.post('/api/auth/login',
                {email,password},
                {
                    headers:{
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(res.data);
            setEmail('');setPassword('');
            toast.success(res.data.message);
            router.push('/dashboard');
        }catch(error){
            toast.error(error.response?.data?.message || 'Login failed');
            console.log(error.response.data);
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
                                <input type="text" name="email" id="email" className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
                                <label className="mt-2">Password</label>
                                <input type="text" name="password" id="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
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