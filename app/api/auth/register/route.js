import cloudinary from "@/pinterest/libs/cloudinary";
import connectToDb from "@/pinterest/libs/mongodb";
import User from "@/pinterest/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(request) {
    connectToDb();

    const fromData = await request.fromData();
    const image = fromData.get("image")
    const username = fromData.get("username")
    const email = fromData.get("email")
    const password = fromData.get("password")

    if (!image) {
        return NextResponse.json()
    }
}