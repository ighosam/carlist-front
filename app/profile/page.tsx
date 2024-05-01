'use server'
import { cookies } from "next/headers"
import { headers } from "next/headers"

const page = async() => {
  const Base_url = process.env.REMOTE_URL
  const token = cookies().get('accessToken')?.value

  const td = headers().get('x-url-referer')


let muser 

  try{
 let user = await fetch(`${Base_url}/api/users/me`,{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
      muser = await user.json()

     console.log(muser)

  }catch(error){


  }
 

 
  return (
<div>you are welcome back {muser?.username}</div>
  )
}

export default page