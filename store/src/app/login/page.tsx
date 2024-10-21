
// 'use client';
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function LoginPage() {
//     const router = useRouter();
//     const [user, setUser] = useState({
//         email: '',
//         password: '',
//         tenantId: '',
//     });

//     const [buttonDisabled, setButtonDisabled] = useState(true);
//     const [loading, setLoading] = useState(false);

//     const onLogin = async () => {
//         try {
//             setLoading(true);
//             // Attempt to log in the user
//             const response = await axios.post('/api/users/login', user);
            
//             // Pass the tenant ID to the backend
//             console.log(user.tenantId);
            
//            await axios.post('http://localhost:4000/passTenantId', { tenantId: user.tenantId });


//             toast.success("Login successful!");
//             router.push('/Pages/DashBoard');
//         } catch (error) {
//             toast.error("Login failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         setButtonDisabled(!(user.email && user.password && user.tenantId));
//     }, [user]);

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1 className="text-2xl font-bold mb-4">{loading ? 'Logging in...' : 'Login'}</h1>
//             <hr className="mb-4" />

//             <input
//                 type="email"
//                 placeholder="Email"
//                 value={user.email}
//                 onChange={(e) => setUser({ ...user, email: e.target.value })}
//             />
//             <input
//                 type="password"
//                 placeholder="Password"
//                 value={user.password}
//                 onChange={(e) => setUser({ ...user, password: e.target.value })}
//             />
//             <input
//                 type="text"
//                 placeholder="Tenant ID"
//                 value={user.tenantId}
//                 onChange={(e) => setUser({ ...user, tenantId: e.target.value })}
//             />

//             <button onClick={onLogin} disabled={buttonDisabled || loading}>
//                 {loading ? "Logging in..." : "Login"}
//             </button>
//             <p>Don't have an account? <Link href="/signup">Sign up here</Link></p>
//         </div>
//     );
// }







"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    tenantId: "", 
    role:'user'
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    console.log(user);
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', user);
      console.log("Login Response", response.data);
      router.push('/profile');
    } catch (error) {
      console.log("Login failed", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.tenantId));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      
      <label htmlFor="email">Email</label>
      <input
        className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="email"
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      <label htmlFor="password">Password</label>
      <input
        className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />

      <label htmlFor="tenantId">Tenant ID</label>
      <input
        className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="tenantId"
        type="text"
        value={user.tenantId}
        onChange={(e) => setUser({ ...user, tenantId: e.target.value })}
        placeholder="Tenant ID"
      />

<select className="text-black" name="role" onChange={(e)=>setUser({...user,role:e.target.value})} value={user.role} aria-label="val"  id="">
    <option className="text-black" value="user">User</option>
    <option className="text-black" value="admin">Admin</option>
</select>
      
      <button
        onClick={onLogin}
        className="p-2 border border-gray-300 mb-4 bg-blue-500 text-white rounded-lg"
        disabled={buttonDisabled || loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <Link href="/signup">Visit Sign Up</Link>
      <Link href="/forgotpassword">Forgot Password?</Link>
    </div>
  );
}
