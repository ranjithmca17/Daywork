


// login.tsx
'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
        tenantId: '',
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login', user);
            toast.success("Login successful!");
            router.push('/Dashboard/Filter');
        } catch (error) {
            toast.error("Login failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password && user.tenantId));
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">{loading ? 'Logging in...' : 'Login'}</h1>
            <hr className="mb-4" />

            <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
            <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
            <input type="text" placeholder="Tenant ID" value={user.tenantId} onChange={(e) => setUser({ ...user, tenantId: e.target.value })} />

            <button onClick={onLogin} disabled={buttonDisabled || loading}>{loading ? "Logging in..." : "Login"}</button>
            <p>Don't have an account? <Link href="/signup">Sign up here</Link></p>
        </div>
    );
}
