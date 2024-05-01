'use server'
import { fileSchema } from '@/types/types'

import {z} from 'zod'

//pass the data with fileSchema

const myfetch = async (idata:FormData) => {
const Base_url = process.env.REMOTE_URL

  const i = 1
     
    await fetch(`${Base_url}/api/upload/`,{
      method: 'POST',
      headers: {
        "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNzExNzgyOTEwLCJleHAiOjE3MTQzNzQ5MTB9.iC5Z4mzO943JAkflEz8nNdl8EXZmRXHhioMRTZl0uEs'
       },
        body: idata
        
         
      
    })
    
}

export default myfetch