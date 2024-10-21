// // // getDataFromToken.ts
// // import { NextRequest } from "next/server";
// // import jwt from 'jsonwebtoken';

// // export const getDataFromToken = (request: NextRequest) => {
// //     try {
// //         const Token_Secret = 'Secret_Key';
// //         const token = request.cookies.get('token')?.value || '';
// //         const decodedToken: any = jwt.verify(token, Token_Secret);
// //         return decodedToken.id;
// //     } catch (error) {
// //         console.error("Token decode error:", error);
// //         return null;
// //     }
// // }





import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

export const getDatafromToken= (request: NextRequest) => {
    try{
        const token = request.cookies.get("token")?.value || "";
        const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET!);
        return decodedToken.id

    }catch(error:any){
        throw new Error("Invalid token");
    }
}





// import { NextRequest } from "next/server";

// import jwt from "jsonwebtoken";

// export const getDatafromToken = (request: NextRequest) => {
//     try{
//         const token = request.cookies.get("token")?.value || "";
//         const decodedToken:any = jwt.verify(token, process.env.JWT_SECRET!);
//         return decodedToken.id

//     }catch(error:any){
//         throw new Error("Invalid token");
//     }
// }