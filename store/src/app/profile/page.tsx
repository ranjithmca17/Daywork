

// 'use client';

// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import toast from "react-hot-toast";

// export default function ProfilePage() {
//     const router = useRouter();
//     const [data, setData] = useState(null);

//     const logout = async () => {
//         try {
//             await axios.get('/api/users/logout');
//             toast.success("Logout successful");
//             router.push('/login');
//         } catch (error) {
//             console.error(error.message);
//             toast.error(error.message);
//         }
//     };

//     const getUserDetails = async () => {
//         try {
//             const res = await axios.get('/api/users/me');
//             console.log(res.data);
//             setData(res.data.data._id);
//         } catch (error) {
//             console.error(error.message);
//             toast.error("Failed to fetch user details");
//         }
//     };

//     return (
//         <div className='flex flex-col items-center justify-center min-h-screen py-2 gap-4'>
//             <h1>Profile</h1>
//             <hr />
//             <p>Profile page</p>
//             <h2 className="bg-green-500 text-white p-2">
//                 {data === null ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}

//             </h2>
//             {/* <h1>{data.username}</h1> */}
//             <hr />
//             <button onClick={logout} className='bg-blue-500 text-white p-2'>Logout</button>
//             <button onClick={getUserDetails} className='bg-green-500 text-white p-2'>Fetch User Details</button>
//         </div>
//     );
// }










"use client";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      axios.get("/api/users/logout");
      toast.success("Logout Successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>PROFILE</h1>
      <hr />
      <p>Profile Page</p>
      <hr />
      <h2 className="p-1 rounded bg-green-500">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold rounded py-2 px-4"
        onClick={logout}
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="bg-purple-500 mt-4 hover:bg-purple-700 text-white font-bold rounded-lg py-2 px-4"
      >
        GetUserDetails
      </button>
    </div>
  );
}
