import { NextResponse } from "next/server"
import {SignJWT,jwtVerify} from 'jose'

export const POST=async(req,res)=>{
    const jsonbody=await req.json()
    const username=jsonbody['user']
    const userpassword=jsonbody['password']
    // database check
    if(username === "ABC" && userpassword === "123"){
        const payload={username:username,userpassword:userpassword}
        const key=new TextEncoder().encode(process.env.secert_key)
        let token=await new SignJWT(payload)
         .setProtectedHeader({alg:'HS256'})
         .setIssuedAt()
         .setIssuer("http://localhost:3000")
         .setExpirationTime('2h')
         .sign(key)
         return NextResponse.json({status:'success',message:'Login success',token})
    }else{
        return NextResponse.json({status:'fail',message:'Not Login success'})
    }
    
    
  }