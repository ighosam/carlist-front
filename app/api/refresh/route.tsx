"use server"
import { cookies,headers} from "next/headers";
import { storeTokens } from "@/actions/storeTokens";
import { NextResponse, NextRequest } from "next/server"
import { redirect } from 'next/navigation'


export const GET = async (request:NextRequest) =>{
  const Base_url = process.env.REMOTE_URL
  const res = new NextResponse('Updated token')


//const redirectUrl = new URL(request.url).searchParams.get('redirectUrl')
const redirectUrl = new URL(request.nextUrl).searchParams.get('redirectUrl')


  //get cookies from browser (httpOnly)
 let reqRefresh = cookies().get('refreshToken')?.value
 
 //make refreshToken variable an object variable to pass to fetch body
 let refreshToken = {"token":reqRefresh}

  let data = await fetch(`${Base_url}/api/auth/refreshToken`,{
  method:'Post',
  headers: {
    'Content-Type':"application/json"
  },
  body: JSON.stringify(refreshToken)
  })
    let jsonData = await data.json()

    if(jsonData.error){
      //delete cookies from the browser
      cookies().delete('accessToken') //set cookies to expires instead
      cookies().delete('refreshToken')
      //optionally send revoke refresh token to server
      //redirect user to login page
      redirect('/login')
    }

//th line below help to store the token in cookie only browser
   await storeTokens(jsonData)
       //const responseData = {
      //  token: cookies().get('accessToken')?.value    
redirect(redirectUrl!)


/*
//the code below is never executed
  
const responseData = {
  token: cookies().get('accessToken')?.value
 }



return new Response(JSON.stringify(responseData),{
status:200,
headers:{
'Content-Type':'application/json'
}
})
 
*/
}