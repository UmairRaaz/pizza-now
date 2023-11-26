import mongoose from "mongoose"
import {MenuItem} from "../models/MenuItems"

export async function POST(req) {
    mongoose.connect(process.env.DB_URL)
    const data = await req.json()
    console.log(data)
    const menuItem = await MenuItem.create(data)
    return Response.json(menuItem)
}

export async function PUT(req) {
    mongoose.connect(process.env.DB_URL)
    const {_id, ...data} = await req.json()
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(_id, data)
    return Response.json(true)
}

export async function GET(){
    mongoose.connect(process.env.DB_URL)
    const menuItem = await MenuItem.find()
    return Response.json(menuItem)
}

export async function DELETE(req){
    mongoose.connect(process.env.DB_URL)
    const url = new URL(req.url)
    const _id = url.searchParams.get('_id')
    await MenuItem.deleteOne({_id})
    return Response.json(true)
}