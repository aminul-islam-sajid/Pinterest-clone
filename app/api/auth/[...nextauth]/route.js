import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import connectToDb from "@/pinterest/libs/mongodb";
import User from "@/pinterest/models/user";
import bcrypt from "bcrypt";

const authOption = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Username",
                    type: "text",
                    placeholder: "Enter your Username",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Enter your password",
                },
            },
            async authorize(credentials) {
                await connectToDb();
                const user = await User.findOne({ username: credentials.username });
                if (!user) {
                    console.log('User not found');
                    return null;
                }
                const isPasswordMatched = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordMatched) {
                    console.log('Invalid password');
                    return null;
                }
                return {
                    name: user.name,
                    email: user.email,
                    image: user.image,
                };
            },
        }),
    ],
    pages: {
        signIn: "/signin",
    },
};

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
