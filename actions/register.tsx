'use server'
import { NextResponse, NextRequest } from 'next/server'
import { cookies} from "next/headers";
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

type regData ={
  username:string,
  email:string,
  password:string
}


const register = async (request:regData) => {
  const Base_url = process.env.REMOTE_URL
  let respData
  let respData2
  try{
    const response = await fetch(`${Base_url}/api/auth/local/register`,{
      method: 'POST',
      headers:{
        'Content-Type':'Application/json'
      },
      body: JSON.stringify({
        ...request
      })
    })
    respData = await response.json()
  }catch(error){
  return (`There was an error: ${error}`)
  }
  if(respData){
    revalidatePath('/login')
      redirect('/login')
  }
 
}

export default register