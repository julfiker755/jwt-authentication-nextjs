import { NextResponse } from "next/server";
import {jwtVerify} from 'jose'

export async function middleware(req,res) {
    if(req.nextUrl.pathname.startsWith("/api/profile")){
        try{
            const reqheader=new Headers(req.headers)
            const token=reqheader.get('token')
            const key=new TextEncoder().encode(process.env.secert_key) 
            const decodedstring=await jwtVerify(token,key)
           
            // const username=decodedstring["payload"]["username"]
            //  reqheader.set('username',username)
            // return NextResponse.next({
            //     headers:{headers:reqheader}
            // })
            return NextResponse.next()

        }catch{
          return NextResponse.json({status:'fail',message:'Your token not allowed'})
        }
        
    }
 }