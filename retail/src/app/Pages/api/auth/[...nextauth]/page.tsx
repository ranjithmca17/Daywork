// pages/api/auth/[...nextauth].js
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      async authorize(credentials) {
        try {
          const res = await axios.post('http://localhost:5000/api/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });

          if (res.status === 200) {
            return res.data.user; // Return the user object
          }
        } catch (error) {
          console.log('Login Error: ', error.response.data.message);
          return null; // Returning null means login failed
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
