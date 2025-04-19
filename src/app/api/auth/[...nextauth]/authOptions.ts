import { NextAuthOptions } from "next-auth"
import  CredentialsProvider  from "next-auth/providers/credentials"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/model/User"






export const authOptions: NextAuthOptions = {
     providers : [
        CredentialsProvider({
            id: "credentials",
            name : "credentials",
            // type: "credentials",
            credentials : {
                username : {label : "Username" , type : "text"},
                password : {label : "password" , type : "text"}
            },
            async authorize(credentials: any) : Promise<any> {
                await dbConnect()

               
                try {
                    const user = await UserModel.findOne({
                        username : credentials.identifier
                    })
    
                    if(!user){
                        throw new Error("No user foind")
                    }
    
    
                    if(user.password === credentials.password){
                        return user
                    }else{
                        throw new Error("Wrong Password")
                    }
    
                    
                    
                } catch (error : any) {
                    throw new Error(error)
                }
            }
        })
     ],
     callbacks: {
        async jwt({token , user}){
            if (user) {
                token._id = user._id?.toString(); // Convert ObjectId to string
                token.username = user.username;
              }
              return token
        },
        async session({ session , token }) {
            if(token) {
                session.user._id = token._id;
                session.user.username = token._id
            }

            return session
        }
     },
     session : {
        strategy: "jwt"
     },
     secret: process.env.NEXTAUTH_SECRET,
     pages: {
        signIn: '/sign-in',
     },
}
