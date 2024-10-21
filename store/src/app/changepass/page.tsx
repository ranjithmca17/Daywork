"use client";

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

export default function ChangePassword() {
  const url = window.location.search.split("=");
  console.log(url[2]);
  
  // const router = useRouter()
  // const [token, setToken] = useState("");
  const suBurl = window.location.search.split("=")[1];


  console.log(suBurl);
  const result = suBurl.slice(0, 3);
  console.log(result); 

  const path=usePathname();
  console.log(path);

  console.log(window.location.hostname);
  
  
 
  
  function extractToken(inputString)
   { // Split the input string at "Token" 
    const tokens = inputString.split("token");
     // Trim and return the first part if it exists 
     return tokens[0].trim() || ''; } // Example usage with a single input string 
     const inputString = suBurl;
      const output = extractToken(inputString);
     
      console.log(output);
      

      const [user, setUser] = useState({
        token:"",
        newpassword: "",
        confirmpassword: "",
        tenantId:output
      });
    
      console.log(user);

  const [isChanged, setChanged] = useState(false);
  const [error, setError] = useState(false);

  const Changefunc = async () => {
    try {
      await axios.post("/api/users/changepass", {user});
      setChanged(true);
      // router.push('/login');
    } catch (error: any) {
      setError(true);
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=");
    console.log(urlToken[2]);
    console.log(urlToken[2])
    setUser({ ...user, token: urlToken[2] })
  }, []);




  
  // useEffect(() => {
  //   if (token.length > 0) {
  //     // verifyUserEmail();
  //   }
  // }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Update Password tenant value : {user.tenantId}</h1>
      <label htmlFor="password">New Password</label>
      <input
        className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="newpassword"
        type="password"
        value={user.newpassword}
        onChange={(e) => setUser({ ...user, newpassword: e.target.value })}
        placeholder="New Password"
      />
      <br/>
      <label htmlFor="password">Confirm Password</label>
      <input
        className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="confirmpassword"
        type="password"
        value={user.confirmpassword}
        onChange={(e) => setUser({ ...user, confirmpassword: e.target.value })}
        placeholder="Confirm Password"
      />
      <br/>
      <button onClick={Changefunc} className="p-2 border border-gray-300 mb-4 bg-blue-500 text-white rounded-lg">Submit</button>
    </div>
  );
}
