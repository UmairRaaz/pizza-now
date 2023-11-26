import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { User } from "../models/user";

export async function POST(req) {
    let body = await req.json()
    await mongoose.connect(process.env.DB_URL)
    let createduser = await User.create(body)
    return Response.json(createduser)
}