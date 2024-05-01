"use client"
//import { ErrorBoundary } from "next/dist/client/components/error-boundary";

const error = ({ error,reset }: {error:Error,reset:()=>void})=>{

  console.log("THIS ERROR FILE IS NOW CALLED")

  return <div>{error.message}</div>

}
export default error