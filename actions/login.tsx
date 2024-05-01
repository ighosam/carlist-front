'use server'
import { cookies} from "next/headers";
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { storeTokens } from "./storeTokens";

type loginData={
  identifier:string,
  password:string
}

const login = async(request:loginData) => {
  const Base_url = process.env.REMOTE_URL

  let data
  const {
    identifier,
    password
  } = request

  try{
  const res =  await fetch(`${Base_url}/api/auth/local`,{
   method: 'POST',
   headers:{
    'Content-Type':'Application/json'
   },
   body: JSON.stringify({
    identifier,
    password
   })
  })

  
   data = await res.json()
  //set cookie headers here.
  await storeTokens(data)
  //redirect to dashboard after.
  
  }catch(error){
    return("There was an error")
    
  }
  if(data){
    revalidatePath('/dashboard')
      redirect('/dashboard')
  }

  // return('OK')
}

export default login