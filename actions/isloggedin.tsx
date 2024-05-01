import React from 'react'
import { cookies } from 'next/headers'
import customFetch from '@/library/customFetch'

const getuser = async ()=>{
  const Base_url = process.env.REMOTE_URL
  let token = cookies().get('accessToken')?.value
  let userData
  try{
    const userInfo = await fetch(`${Base_url}/api/users/me`,{
      method:'GET',
      cache: 'no-store',
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    userData = await userInfo.json()
  }catch(error){

  }
  if(!userData.error){
    return true
  }
  return false
} 


export default getuser