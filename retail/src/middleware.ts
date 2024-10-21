

// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';
// import { jwtVerify } from 'jose';

// export async function middleware(request: NextRequest) {
//     const path = request.nextUrl.pathname;
//     const token = request.cookies.get('token')?.value || '';
//     const TOKEN_SECRET = new TextEncoder().encode(process.env.TOKEN_SECRET || 'Secret_Key');

//     let userRole = null;
//     if (token) {
//         try {
//             const { payload } = await jwtVerify(token, TOKEN_SECRET);
//             userRole = payload.role; 
//         } catch (error) {
//             console.error("Token verification failed:", error);
//         }
//     }

//     const isPublicPath = ['/login', '/signup'].includes(path);
//     if (isPublicPath && token) {
//         return NextResponse.redirect(new URL('/', request.url));
//     }

//     const protectedPaths = ['/Components/AddProduct', '/Components/AllProducts', '/Components/WareHouse'];
//     if (protectedPaths.includes(path) && !token) {
//         return NextResponse.redirect(new URL('/login', request.url));
//     }

//     const adminPaths = ['/Components/AddVendor', '/Dashboard/Filter'];
//     if (adminPaths.includes(path) && userRole !== 'admin') {
//         return NextResponse.redirect(new URL('/unauthorized', request.url));
//     }
// }

// export const config = {
//     matcher: [
//         '/Components/AddProduct',
//         '/Components/AllProducts',
//         '/Components/WareHouse',
//         '/Components/AddVendor',
//         '/Dashboard/Filter',
//         '/profile',
//         '/login',
//         '/signup',
//         '/unauthorized',
//     ],
// };






import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';
    const TOKEN_SECRET = new TextEncoder().encode(process.env.TOKEN_SECRET || 'Secret_Key');

    let isAuthenticated = false;

    if (token) {
        try {
            await jwtVerify(token, TOKEN_SECRET);
            isAuthenticated = true; 
        } catch (error) {
            console.error("Token verification failed:", error);
        }
    }

    const publicPaths = ['/login', '/signup'];
    if (publicPaths.includes(path) && isAuthenticated) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    const protectedPaths = ['/Dashboard/Filter', '/Components/AddVendor','/Pages/AllProducts','/Components/AddProduct', '/Components/AllProducts', '/Components/WareHouse', '/profile'];
    if (protectedPaths.includes(path) && !isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: [
        '/Components/AddProduct',
        '/Components/AllProducts',
        '/Components/WareHouse',
        '/Dashboard/Filter',
        '/Pages/AllProducts',
        '/Components/AddVendor',
        '/profile',
        '/login',
        '/signup',
    ],
};
