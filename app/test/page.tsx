"use server"
import type { NextRequest } from 'next/server'
import customFetch from '../../library/customFetch'
import isloggedin from '@/actions/isloggedin'


const gethotels = async ()=>{
  const Base_url = process.env.REMOTE_URL
 
  const myFetch = await customFetch()

const response = await myFetch(`${Base_url}/api/hotels`) 

return response

}


const page = async () => {



 const {data,error} = await gethotels()  
   


 type mydata = {
  attributes:{
    name:string,
    description:string
  }
 }

 return (
    <div>
      {
        data.map((p:mydata)=>{
          return <div key={p.attributes.name}>
          <h3>{p.attributes.name}</h3>
          <p>{p.attributes.description}</p>
          </div>
        })
      }
    </div>
  )
}

export default page