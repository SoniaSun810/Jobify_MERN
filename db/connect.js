import mongoose from "mongoose"

const connectDB = (url) => {
    mongoose.set('strictQuery', true);
    console.log("connected mongodb")
    return mongoose.connect(url)
}

export default connectDB

