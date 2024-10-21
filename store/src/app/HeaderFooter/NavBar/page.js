
// 'use client';

// import axios from "axios";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import '@/app/HeaderFooter/nav.css';

// export default function NavBar() {
//   const [userName, setUserName] = useState(null);
//   const router = useRouter();

//   // Fetch user details when the component mounts
//   const fetchUserDetails = async () => {
//     try {
//       const res = await axios.get('/api/users/me');
//       setUserName(res.data.data.username);
//     } catch (error) {
//       console.error(error.message);
//       setUserName(null); // User not logged in or error occurred
//     }
//   };

//   // Logout function to handle user logout
//   const logout = async () => {
//     try {
//       await axios.get('/api/users/logout');
//       toast.success("Logout successful");
//       setUserName(null);
//       router.push('/Pages/Login');
//     } catch (error) {
//       console.error(error.message);
//       toast.error(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchUserDetails(); // Fetch user details on component mount
//   }, []);

//   return (
//     <div className="nav">
//       <div className="logo">
//         NavBar
//       </div>
//       <div className="links">
//         <ul>
//           <li><Link href='/Pages/DashBoard'>DashBoard</Link></li>
//           <li><Link href='/Pages/Purchase'>Purchase</Link></li>
//           <li><Link href='/Pages/Sales'>Sales</Link></li>
//           <li><Link href='/Component/TodayTopFive'>Today Top Five</Link></li>
//           <li><Link href='/Component/LowStockFive'>Top Five Low Stock Items</Link></li>

//           {/* If user is logged in, display the username and logout button */}
//           {userName ? (
//             <>
//               <li>{`${userName}`}</li>
//               <li>
//                 <button onClick={logout} className="logout-btn bg-black text-white p-2">
//                   Logout
//                 </button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li><Link href='/login'>Login</Link></li>
//               <li><Link href='/signup'>SignUp</Link></li>
//             </>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }







// NavBar.tsx
'use client';
import axios from "axios";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import "@/app/HeaderFooter/nav.css";

export default function NavBar() {
    const [userName, setUserName] = useState(null);
    const router = useRouter();

    const fetchUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            setUserName(res.data.data.username);
        } catch (error) {
            console.error(error.message);
            setUserName(null); // User not logged in
        }
    };

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            toast.success("Logout successful");
            setUserName(null);
            router.push('/login');
        } catch (error) {
            console.error(error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <div className="flex items-center justify-around gap-2">
            <div>
                <ul className="flex items-center justify-between gap-2">
                          <li><Link href='/Pages/DashBoard'>DashBoard</Link></li>
           <li><Link href='/Pages/Purchase'>Purchase</Link></li>
           <li><Link href='/Pages/Sales'>Sales</Link></li>
          <li><Link href='/Component/TodayTopFive'>Today Top Five</Link></li>
          <li><Link href='/Component/LowStockFive'>Top Five Low Stock Items</Link></li>

           </ul>
            </div>

            {userName ? (
                <div className="flex items-center gap-4">
                    <span>{`${userName}`}</span>
                    <button onClick={logout} className="bg-blue-500 text-white p-2">Logout</button>
                </div>
            ) : (
                <Link href="/login" className="bg-blue-500 text-white p-2">Login</Link>
            )}
        </div>
    );
}
