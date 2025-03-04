"use client";

import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { sendEmail } from "@/helpers/mailer";

export default function ForgotPasswordPage() {
//   const [token, setToken] = React.useState("");
  const [user, setUser] = React.useState({
    tenantId: "",
  });
  const [loading, setLoading] = React.useState(false);

  const onSubmit = async () => {
   
    
    try {
        setLoading(true);
        const response = await axios.post('/api/users/forgotpassword', user);
        console.log("Forgot Password Response", response.data);
        toast.success('tenantId Sent!');
        
    } catch (error:any) {
        console.log("Error Sending tenantId",error);
        toast.error(error.message);
    }finally{
        setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Forgot Password"}</h1>
      <hr/>
      <label htmlFor="tenantId">tenantId</label>
      <input
      className="p-1 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
        id="tenantId"
        type="text"
        value={user.tenantId}
        onChange={(e) => setUser({ ...user, tenantId: e.target.value })}
        placeholder="tenantId"
      />
      <br/>
      <button onClick={onSubmit}
      className="p-2 border border-gray-300 mb-4 bg-blue-500 text-white rounded-lg ">Submit</button>
      
    </div>
  );
}
