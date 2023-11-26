import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"
import { User } from "../models/user";
import { UserInfo } from "../models/UserInfo";
export async function PUT(req) {
    mongoose.connect(process.env.DB_URL)
    let data = await req.json()
    console.log(data)
    const { _id, name, ...otherUserInfo } = data;

    let filter = {}
    if (_id) {
        filter = { _id }
        console.log(filter)
    } else {
        const session = await getServerSession(authOptions)
        const email = session.user.email
        filter = { email }
    }
    const user = await User.findOne(filter);
    await User.updateOne(filter, { name })
    let userInfo = await UserInfo.findOneAndUpdate({email: user.email}, otherUserInfo, { upsert: true })

    return Response.json(true)
}

export async function GET(req) {
    mongoose.connect(process.env.DB_URL)
    const url = new URL(req.url);
    const _id = url.searchParams.get("id");

    let filterUser = {}
    if (_id) {
        filterUser = { _id }

    } else {
        const session = await getServerSession(authOptions)
        const email = session?.user?.email;

        if (!email) {
            return Response.json({})
        }
        filterUser = { email }


    }
    const user = await User.findOne(filterUser).lean()
    const userInfo = await UserInfo.findOne({ email: user.email }).lean()
    return Response.json({ ...user, ...userInfo })

}