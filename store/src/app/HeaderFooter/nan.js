analys this logout.ts code 

import { NextResponse } from "next/server";


export async function GET(){
    try{
const response=await NextResponse.json({
    message:"Logout Successfull",
    success:true,
})
response.cookies.set("token","",{
    httpOnly:true,expires:new Date(0)
})
return response;
    }catch(error){
        return NextResponse.json({error:error.message},{status:500})
    }
}
and this is profile.tsx


'use client';

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState(null);

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout successful");
            router.push('/login');
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            console.log(res.data);
            setData(res.data.data._id);
        } catch (error) {
            console.error(error.message);
            toast.error("Failed to fetch user details");
        }
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2 gap-4'>
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <h2 className="bg-green-500 text-white p-2">
                {data === null ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
            </h2>
            <hr />
            <button onClick={logout} className='bg-blue-500 text-white p-2'>Logout</button>
            <button onClick={getUserDetails} className='bg-green-500 text-white p-2'>Fetch User Details</button>
        </div>
    );
}

and this it navbar.js
import Link from "next/link"
import '@/app/HeaderFooter/nav.css'

export default function NavBar() {
  return (
    <div className="nav">
      <div className="logo">
      NavBar
      </div>
      <div className="links">
       
        <ul>
            
            <li><Link href='/Pages/DashBoard'>DashBoard</Link></li>
            <li><Link href='/Pages/Purchase'>Purchase</Link></li>
            <li><Link href='/Pages/Sales'>sales</Link></li>
            <li><Link href='/Component/TodayTopFive'>Today Top Five</Link></li>
            <li><Link href='/Component/LowStockFive'>Top Five Low Stock Items</Link></li>
            <li><Link href='/Pages/Login'>Login</Link></li>
            <li><Link href='/Pages/SignUp'>SignUp</Link></li>
            
            
        </ul>
      </div>
    </div>
  )
}
rewrite navbar add username and logout button correctly