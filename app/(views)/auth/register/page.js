'use client'
import axios from "axios";
import Link from "next/link";
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function RegisterPage(){
    const router = useRouter();
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password,setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!name || !email || !phone || !password){
           return toast.error("All field required");
        }
        const loading = toast.loading("Processing...");
        try{
            const reg = await axios.post('/api/auth/register',
                {name,email,phone,password},
                {
                    headers:{
                        'Content-Type': 'application/json',
                    },
                }
            );
            setName('');setEmail('');setPhone('');setPassword('');
            toast.success(reg.data.message);
            //alert(reg.data.message);
            router.push('/auth/login');
        }catch(error){
            toast.error(error.response?.data?.message || 'Registration failed');
            //alert(err.response?.data?.error || 'Registration failed');
        }finally {
            toast.dismiss(loading); // remove loading toast
        }
    }

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6 offset-lg-3 col-md-6">
                    <div className="card">
                        <div className="card-header text-center">Register</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <label className="mt-1">Name</label>
                                <input type="text" name="name" id="name" value={name} className="form-control" onChange={(e)=>setName(e.target.value)} />
                                <label className="mt-2">Email</label>
                                <input type="text" name="email" id="email" value={email} className="form-control" onChange={(e)=>setEmail(e.target.value)} />
                                <label className="mt-2">Phone</label>
                                <input type="text" name="phone" id="phone" value={phone} className="form-control" onChange={(e)=>setPhone(e.target.value)} />
                                <label className="mt-2">Password</label>
                                <input type="text" name="password" id="password" value={password} className="form-control" onChange={(e)=>setPassword(e.target.value)} />
                                <button type="submit" className="text-center btn btn-success mt-4">Register</button>
                            </form>
                        </div>
                        <div className="card-footer">
                            Already Register ? <Link href={'/auth/login'} >Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}