'use client';
import './Login.css';
import girlImg from '../../Assets/pen-square 6.png';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUser, FaLock } from "react-icons/fa";
import axios from 'axios';
// import BillingPage from '../DashBoard/page';
// import { redirect } from 'next/navigation';
import { useRouter } from "next/router";
// import { useAppContext } from '@/app/Context';

export default function Login() {
    // const { login } = useAppContext();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(email, password );
            
            const response = await axios.post('http://localhost:4000/store/login/demo', { email, password });
            const { token, success, error: responseError } = response.data;
console.log(success);

            if (success) {
                localStorage.setItem('token', token);
                // login(token);
                alert("Login successful");
                router.push('/Pages/DashBoard')
                navigator('/Pages/DashBoard')
            } else {
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
                        <h2>ADMIN LOGIN</h2>
                        <h4>Hello</h4>
                        <h1>Welcome</h1>
                        <div className="input">
                            <input 
                                type="email" 
                                placeholder='User name' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                            <FaUser className='icon' />
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
                            <p className="p2"><Link href='/Pages/SignUp'> Don't You Have an account?</Link></p>
                        </div>
                        <div className='but'>
                            <button type="submit">Login</button>
                        </div>
                    </form>
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
