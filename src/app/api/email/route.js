import {SignJWT,jwtVerify} from 'jose'
import { NextResponse } from 'next/server'

export const GET=async(req,res)=>{
    const key=new TextEncoder().encode(process.env.secert_key)
    const paylod={email:'Julfiker755.bd@gmail.com',user_id:'40840'}
    let token=await new SignJWT(paylod)
         .setProtectedHeader({alg:'HS256'})
         .setIssuedAt()
         .setIssuer("http://localhost:3000")
         .setExpirationTime('2h')
         .sign(key)

    return NextResponse.json({token:token})
}

//  post 
export const POST=async(req,res)=>{
  const jsonbody=await req.json()
  const Token=jsonbody['token']
  const key=new TextEncoder().encode(process.env.secert_key) 
  const decoded=await jwtVerify(Token,key)
  return NextResponse.json(decoded)
}