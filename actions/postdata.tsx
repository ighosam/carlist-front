//import { postSchema } from '@/types/types'

//import {z} from 'zod'



const postdata = async (data:FormData) => {
  const Base_url = process.env.REMOTE_URL

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTcxMzIzNDE1MCwiZXhwIjoxNzE1ODI2MTUwfQ.daPjXegTp6yj36rayQCw1NQv3-MuP4aSMJZQGGaSHXE'

console.log("we got here as client")
//post data
 await fetch(`${Base_url}/api/hotels`,{
    method:'POST',
    headers:{
      'Authorization': `Bearer ${token}`
    },
    body:data

  })
 
}

export default postdata