'use server'

import { cookies} from "next/headers";

const refreshtoken = async () => {
  const Base_url = process.env.REMOTE_URL

 const reqRefresh = cookies().get('refreshToken')?.value

 let refreshToken = {"token":reqRefresh}
 

  let data = await fetch(`${Base_url}/api/auth/refreshToken`,{
  method:'Post',
  headers: {
    'Content-Type':"application/json"
  },
  body: JSON.stringify(refreshToken)
  })

  let jsonData = await data.json()

  cookies().set({
    name:"accessToken",
    value:jsonData.jwt,
    httpOnly:true,
    sameSite:true,
    secure:true
   })

   cookies().set({
    name:"refreshToken",
    value:jsonData.refresh,
    httpOnly:true,
    sameSite:true
   })

return 'ok'
}

export default refreshtoken