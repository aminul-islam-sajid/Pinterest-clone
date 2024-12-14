import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connect to database");
    } catch (error) {
        console.log(`server somthing error ${error}`);
    }
}

export default connectToDb