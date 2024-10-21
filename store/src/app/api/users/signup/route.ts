// // signup.ts
// import { Connect } from "@/dbConfig/dbConfig";
// import UserVal from "@/models/UserModel";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from 'bcryptjs';

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json();
//         const { username, email, password, tenantId } = reqBody;

//         if (!tenantId) {
//             return NextResponse.json({ error: "Tenant ID is required" }, { status: 400 });
//         }

//         await Connect(tenantId);

//         const userExists = await UserVal.findOne({ email });

//         if (userExists) {
//             return NextResponse.json({ error: "User already exists" }, { status: 400 });
//         }

//         const salt = await bcryptjs.genSalt(10);
//         const hashedPassword = await bcryptjs.hash(password, salt);

//         const newUser = new UserVal({
//             username,
//             password: hashedPassword,
//             email,
//             tenantId,
//         });

//         await newUser.save();
//         return NextResponse.json({
//             message: 'User created successfully',
//             success: true,
//         });
//     } catch (error) {
//         console.error("Signup error:", error);
//         return NextResponse.json({ error: "An error occurred during signup." }, { status: 500 });
//     }
// }




import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest) {
    // const { tenantId } = request.json();
    // await connect(tenantId); 
    
    try {
        const reqBody = await request.json();
        const { username, email, password,tenantId,role } = reqBody;
console.log("tenantId the tenant Id Is : ",tenantId);

        if (!tenantId) {
          return NextResponse.json({ error: "Tenant ID is required" }, { status: 400 });
      }

      await connect(tenantId);
        // Check if user already exists
        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            tenantId, // Include tenantId here
            role
        });

        const savedUser = await newUser.save();
        await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

        return NextResponse.json(
            { message: "User created successfully" },
            { status: 201 }
        );
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
