import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: $string,
    email: $string,
    image: $string,
    password: $string,

}, {
    timestamps: true
})

export default mongoose.model.User || mongoose.model("user", userSchema)