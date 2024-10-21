// import { Connect } from "@/dbConfig/dbConfig";
// import UserVal from "@/models/UserModel";
// import { NextRequest, NextResponse } from "next/server";
// import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";

// const TOKEN_SECRET = process.env.TOKEN_SECRET || 'Secret_Key'; // Use environment variable

// export async function POST(request: NextRequest) {
//     try {
//         const { email, password, tenantId } = await request.json();

//         if (!tenantId) {
//             return NextResponse.json({ error: "Tenant ID is required" }, { status: 400 });
//         }

//         await Connect(tenantId);

//         const user = await UserVal.findOne({ email });
//         if (!user) {
//             return NextResponse.json({ error: "User does not exist" }, { status: 400 });
//         }

//         const isValidPassword = await bcrypt.compare(password, user.password);
//         if (!isValidPassword) {
//             return NextResponse.json({ error: "Invalid password" }, { status: 400 });
//         }

//         const tokenData = { 
//             id: user._id, 
//             username: user.username, 
//             email: user.email, 
//             tenantId: user.tenantId,
//             role: user.role // Include role in the token
//         };
//         const token = jwt.sign(tokenData, TOKEN_SECRET, { expiresIn: "1d" });

//         const response = NextResponse.json({ message: "Login successful", success: true });
//         response.cookies.set("token", token, { httpOnly: true });

//         return response;
//     } catch (error) {
//         console.error("Login error:", error);
//         return NextResponse.json({ error: "An error occurred during login." }, { status: 500 });
//     }
// }





import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {

    // await connect(tenantId);
    try {
        const reqBody = await request.json();
        const { email, password,tenantId } = reqBody;

        if(!tenantId){
            return NextRequest.json({error:"Tenant Id is Not exsite"})
        }
        await connect(tenantId);
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invalid password" }, { status: 400 });
        }

        const tokendata = {
            id: user._id,
            email: user.email,
            username: user.username,
            tenantId:user.tenantId,
            role:user.role
        };
        const token = jwt.sign(tokendata, process.env.TOKEN_SECRET!, { expiresIn: "1h" });

        const response = NextResponse.json({ message: "Login successful", token }, { status: 200 });
        response.cookies.set("token", token, { httpOnly: true });

        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
