import mongoose, { Schema, model, models } from "mongoose";

const ExtraPriceSchema = new Schema({
    name : String,
    price : Number,
})

const MenuItemSchema = new Schema({
    name  :{type : String},
    description  :{type : String},
    category  : {type : mongoose.Types.ObjectId},
    basePrice  :{type : String},
    sizes : {type : [ExtraPriceSchema]},
    extraIngredientPrice : {type : [ExtraPriceSchema]}
},{timestamps : true})

export const MenuItem = models?.MenuItem || model("MenuItem", MenuItemSchema)