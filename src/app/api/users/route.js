import mongoose from "mongoose";
import {User} from "../models/user"
export async function GET(){
    mongoose.connect(process.env.DB_URL)
    const users = await User.find()
    return Response.json(users)
}