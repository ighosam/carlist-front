'use server'

import { cookies } from "next/headers"
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

interface StoreTokenRequest{
  jwt:string,
  refresh:string
}



  const tokenConfig = {
    maxAge: 60 * 1 * 1 * 1, // 1 minute
    path: "/",
    domain: process.env.HOST ?? "localhost",
    httpOnly: true,
    //secure: process.env.NODE_ENV === "production",
}

const refreshConfig = {
  maxAge: 60 * 60 * 24 * 1, // 1 day
  path: "/",
  //domain: process.env.HOST ?? "localhost",
  httpOnly: true,
 // secure: process.env.NODE_ENV === "production",
 samSite:true

}


export const storeTokens = async (data:StoreTokenRequest) =>{
 // const refresh = cookies().get('refreshToken')?.value
  //let refreshToken = {"token":refresh}


  try{
    /*
     cookies().set({
    name: "accessToken",
    value: data.jwt,
    httpOnly:true,
    sameSite:true,
    secure:true
  })

  cookies().set({
    name:"refreshToken",
    value: data.refresh,
    httpOnly:true,
    sameSite:true,
    secure:true
  })
   */
  cookies().set('accessToken', data.jwt,tokenConfig)
  cookies().set('refreshToken',data.refresh,refreshConfig)
  }catch(error){

  }

 //revalidatePath('/test')
   //redirect('/test')
 
}