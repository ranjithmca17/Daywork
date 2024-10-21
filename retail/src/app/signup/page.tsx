


// // // SignUpPage.tsx
// // 'use client';
// // import Link from "next/link";
// // import { useRouter } from "next/navigation";
// // import axios from "axios";
// // import React, { useEffect, useState } from "react";
// // import toast from "react-hot-toast";

// // export default function SignUpPage() {
// //     const router = useRouter();
// //     const [user, setUser] = useState({
// //         email: '',
// //         password: '',
// //         username: '',
// //         tenantId: '',
// //     });

// //     const [buttonDisabled, setButtonDisabled] = useState(true);
// //     const [loading, setLoading] = useState(false);

// //     const onSignup = async () => {
// //         try {
// //             setLoading(true);
// //             await axios.post("/api/users/signup", user);
// //             toast.success("Signup successful!");
// //             router.push('/login');
// //         } catch (error) {
// //             toast.error("Signup failed");
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     useEffect(() => {
// //         setButtonDisabled(!(user.email && user.password && user.username && user.tenantId));
// //     }, [user]);

// //     return (
// //         <div className="flex flex-col items-center justify-center min-h-screen py-2">
// //             <h1 className="text-2xl font-bold mb-4">{loading ? 'Processing...' : 'Sign Up'}</h1>
// //             <hr className="mb-4" />

// //             <input type="text" placeholder="Username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
// //             <input type="email" placeholder="Email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
// //             <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
// //             <input type="text" placeholder="Tenant ID" value={user.tenantId} onChange={(e) => setUser({ ...user, tenantId: e.target.value })} />

// //             <button onClick={onSignup} disabled={buttonDisabled || loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
// //             <p>Already have an account? <Link href="/login">Login here</Link></p>
// //         </div>
// //     );
// // }









// // SignUpPage.tsx
// 'use client';
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// export default function SignUpPage() {
//     const router = useRouter();
//     const [user, setUser] = useState({
//         email: '',
//         password: '',
//         username: '',
//         tenantId: '',
//         role:'user'
//     });

//     const [buttonDisabled, setButtonDisabled] = useState(true);
//     const [loading, setLoading] = useState(false);

//     const onSignup = async () => {
//         try {
//             console.log(user);
            
//             setLoading(true);
//             await axios.post("/api/users/signup", user);
//             toast.success("Signup successful!");
//             router.push('/login');
//         } catch (error) {
//             toast.error("Signup failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         setButtonDisabled(!(user.email && user.password && user.username && user.tenantId));
//     }, [user]);

//     const onChangeValue=(e)=>{
//         const {name,value}=e.target;
//         setUser((prev)=>({
//             ...prev,
//             [name]:value
//         }))
//     }

//     return (
//         <div className="flex flex-col items-center justify-center min-h-screen py-2">
//             <h1 className="text-2xl font-bold mb-4">{loading ? 'Processing...' : 'Sign Up'}</h1>
//             <hr className="mb-4" />

//             <input type="text" placeholder="Username" name="username" value={user.username} onChange={onChangeValue}/>
//             <input type="email" placeholder="Email" name="email" value={user.email} onChange={onChangeValue} />
//             <input type="password" placeholder="Password" name="password" value={user.password} onChange={onChangeValue} />
//             <input type="text" placeholder="Tenant ID" name="tenantId" value={user.tenantId} onChange={onChangeValue} />
// <select name="role" onChange={onChangeValue} value={user.role} aria-label="val"  id="">
//     <option value="user">User</option>
//     <option value="admin">Admin</option>
// </select>
//             <button onClick={onSignup} disabled={buttonDisabled || loading}>{loading ? "Signing Up..." : "Sign Up"}</button>
//             <p>Already have an account? <Link href="/login">Login here</Link></p>
//         </div>
//     );
// }






"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    tenantId: "",
    role:'user'
  });

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      console.log(user);
      
      const response = await axios.post('/api/users/signup', user);
      console.log("SignUp Response", response.data);
      router.push('/login');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email && user.password && user.username && user.tenantId));
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Sign Up"}</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="username"
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder="Username"
      />

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
        onClick={onSignup}
        className="p-2 border border-gray-300 mb-4 bg-blue-500 text-white rounded-lg"
        disabled={buttonDisabled || loading}
      >
        {loading ? "Processing..." : "Sign Up"}
      </button>
      
      <Link href="/login">Visit Login</Link>
    </div>
  );
}
