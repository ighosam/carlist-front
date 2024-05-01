'use client'
import { useEffect } from 'react'

interface StoreTokenRequest{
  jwt:string,
  refresh:string
}


const runAction =  ({action}: {action:(data:StoreTokenRequest)=>Promise<void>},data:StoreTokenRequest) => {

  useEffect(()=>{
    action(data)
  },[])
  return (
    <div></div>
  )
}

export default runAction