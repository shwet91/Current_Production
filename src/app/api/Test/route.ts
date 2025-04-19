import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"



export async function POST(request: Request ) {
    console.log("start route")
     await dbConnect()

     const newUser = await UserModel.create({
        username : "123",
        email : "checking",
        password : "fun",
        content : "Dont know"
     })



    // console.log("Test 1 :",request)
    const data = await request.json()

    console.log("test2 : " , data)


    return Response.json(
        {
            message : "Well Done",
            data : newUser
        },
        {
            status: 200
        }
    )
}