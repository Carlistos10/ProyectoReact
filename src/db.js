import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://CaleDb:CaleDb@cale.qtyc9ha.mongodb.net/");
        console.log("Conexion establecida")
    } catch (error) {
        console.log(error)
    }
};