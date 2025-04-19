import mongoose from "mongoose";


type ConnectionObject = {
    isConnected ? : number
}

const connection : ConnectionObject = {}

async function dbConnect(): Promise<void> {
    if(connection.isConnected){
        console.log("Already connected to database")
        return
    }
    try {
        console.log("DB function starts")
        const db = await mongoose.connect(`${process.env.MONGODB_URI}/Doughnut` || " " , {})
        console.log("This is db :" , db.connections)
        connection.isConnected = db.connections[0].readyState
       
    }catch (error) {
       console.log("Databse connection failed" , error)
       process.exit(1)
    }
}

export default dbConnect