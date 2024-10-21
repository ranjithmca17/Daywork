
// // // signup.ts
// // import { Connect } from "@/dbConfig/dbConfig";
// // import UserVal from "@/models/UserModel";
// // import { NextRequest, NextResponse } from "next/server";
// // import bcryptjs from 'bcryptjs';

// // export async function POST(request: NextRequest) {
// //     try {
// //         const reqBody = await request.json();
// //         const { username, email, password, tenantId, role } = reqBody;

// //         // Validate required fields
// //         if (!tenantId) {
// //             return NextResponse.json({ error: "Tenant ID is required" }, { status: 400 });
// //         }
// //         if (!username || !email || !password || !role) {
// //             return NextResponse.json({ error: "All fields are required" }, { status: 400 });
// //         }

// //         // Connect to the database
// //         await Connect(tenantId);

// //         // Check if user already exists
// //         const userExists = await UserVal.findOne({ email });
// //         if (userExists) {
// //             return NextResponse.json({ error: "User already exists" }, { status: 400 });
// //         }

// //         // Hash the password
// //         const salt = await bcryptjs.genSalt(10);
// //         const hashedPassword = await bcryptjs.hash(password, salt);

// //         // Create a new user
// //         const newUser = new UserVal({
// //             username,
// //             password: hashedPassword,
// //             email,
// //             tenantId,
// //             role, // Store the role (e.g., user or admin)
// //         });

// //         await newUser.save();

// //         return NextResponse.json({
// //             message: 'User created successfully',
// //             success: true,
// //         });
// //     } catch (error) {
// //         console.error("Signup error:", error);
// //         return NextResponse.json({ error: "An error occurred during signup." }, { status: 500 });
// //     }
// // }




// import { Connect } from "@/dbConfig/dbConfig";
// import UserVal from "@/models/UserModel";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from 'bcryptjs';

// export async function POST(request: NextRequest) {
//     try {
//         const reqBody = await request.json();
//         const { username, email, password, tenantId, role } = reqBody;

//         // Validate required fields
//         if (!tenantId) {
//             return NextResponse.json({ error: "Tenant ID is required" }, { status: 400 });
//         }
//         if (!username || !email || !password || !role) {
//             return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//         }

//         // Connect to the database
//         await Connect(tenantId);

//         // Check if user already exists
//         const userExists = await UserVal.findOne({ email });
//         if (userExists) {
//             return NextResponse.json({ error: "User already exists" }, { status: 400 });
//         }

//         // Hash the password
//         const salt = await bcryptjs.genSalt(10);
//         const hashedPassword = await bcryptjs.hash(password, salt);

//         // Create a new user
//         const newUser = new UserVal({
//             username,
//             password: hashedPassword,
//             email,
//             tenantId,
//             role, // Store the role (e.g., user or admin)
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
