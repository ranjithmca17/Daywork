
'use client';
import '@/app/Pages/Login/Login.css'
// import girlImg from '../../Assets/pen-square 6.png';
import girlImg from '@/app/Assets/pen-square 6.png'
import React, { useState } from 'react';
import Image from 'next/image';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
import { redirect } from 'next/navigation';
import Link from 'next/link';
// import { useAppContext } from '@/app/Context';
import { MdEmail } from "react-icons/md";

export default function SignUp() {
    // const { login } = useAppContext();
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(name,email,password);
            
            const response = await axios.post('http://localhost:4000/store/signup/demo', { name, email, password});
            console.log(name,email,password);
            console.log(response);
            
            setMessage(response.data.message);
            if(response.data.success){
            //   navigate("/login");
            alert("sign up successfully");
            }
            else {
                setError(responseError || 'Login failed');
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className='login-container'>
            <div className="col-1">
                <section>
                    <form className='col-sub-1' onSubmit={handleSubmit}>
                        <h2>ADMIN SIGNUP</h2>
                        <h4>Hello</h4>
                        <h1>Welcome</h1>
                        <div className="input">
                            <input 
                                type="text" 
                                placeholder='User name' 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                            <FaUser className='icon' />
                        </div>
                        <div className="input">
                            <input 
                                type="email" 
                                placeholder='User email' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                            <MdEmail className='icon' />
                        </div>
                        <div className="input">
                            <input 
                                type="password" 
                                placeholder='Password' 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                            <FaLock className='icon' />
                        </div>
                        {error && <p className="error">{error}</p>}
                        <div className="sub-links">
                            <p className="">Forget Password</p>
                            <p className="p2"><Link href='/Pages/Login'> Don't You Have an account?</Link></p>
                        </div>
                        <div className='but'>
                            <button type="submit">Sign Up</button>
                        </div>
                    </form>
                    {message&&<p>{message}</p>}
                </section>
            </div>
            <div className="col-2">
                <div className="sub-col-2">
                    <div className='bg-img'></div>
                    <div className="bg-div">
                        <Image 
                            src={girlImg}
                            alt='Girl illustration'
                            height={400}
                            width={400}
                            className='girl-img' 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

