import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

import connectToDb from "@/pinterest/libs/mongodb";
import user from "@/pinterest/models/user";
import bcrypt from "bcrypt"

const authOption = {
    provider: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLINT_ID,
            clientSecret: process.env.GOOGLE_CLINT_SECRET
        })
    ]
}