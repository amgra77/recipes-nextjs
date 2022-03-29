import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../lib/db";

export default NextAuth({
    pages: {
        signIn: '',
        signOut: '',
        error: '',
        verifyRequest: '',
    },
    providers: [
        EmailProvider({
            from: process.env.EMAIL_FROM,
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASS,
                }
            },
            maxAge: 10 * 60, // magic links valid for 10 min
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({ session, token, user }) {
            session.user.id = user.id;
            return session;
        },
    },
});