'use server'

import { cookies} from "next/headers";
import refreshtoken from '../actions/refreshtoken'
import { storeTokens } from "@/actions/storeTokens";
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { headers } from "next/headers";
import { NextRequest } from "next/server";


const customFetch =  async () => {

  let config:any = {}
  const url_list = headers().get('x-url-referer')



  let initialFetch = async (url:string, config={})=>{
    let response = await fetch(url,config)
    let data = await response.json()    
    return data
}


const callFetch = async(url:string)=>{
const token = cookies().get('accessToken')?.value
const refreshToken = cookies().get('refreshToken')?.value

//let refreshCookies = {token:refreshToken}

config['headers']={
  'Authorization': `Bearer ${token}`
}

let dataResponse  = await initialFetch(url,config)
let  {data,error} = dataResponse



if(error && error.status =='401'){
  redirect(`/api/refresh?redirectUrl=${url_list}`)
 
}

return {data,error}

}

return callFetch

}
export default customFetch