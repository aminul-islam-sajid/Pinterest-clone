import cloudinary from "@/pinterest/libs/cloudinary";
import connectToDb from "@/pinterest/libs/mongodb";
import User from "@/pinterest/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import { resolve } from "styled-jsx/css";

export async function POST(request) {
    connectToDb();

    const fromData = await request.fromData();
    const image = fromData.get("image")
    const username = fromData.get("username")
    const email = fromData.get("email")
    const password = fromData.get("password")

    if (!image) {
        return NextResponse.json({ error: "no file received" }, { status: 400 })
    }

    try {
        const arrayBuffer = await image.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer)

        const uploadedResponse = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({}, function (error, result) {
                if (error) {
                    reject(error)
                    return
                }
                resolve(result)
            }).end(buffer)
        })
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            image: uploadedResponse.secure_url
        })
        return NextResponse.json({
            success: true,
            massage: "user registered",
            user
        }, { status: 201 })
    } catch (error) {
        console.error("user registration Failed", error);
    }
    return NextResponse.json({
        error: "user registration failed"
    }, { status: 500 })
}