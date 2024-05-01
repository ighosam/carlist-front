import {NextRequest, NextResponse } from "next/server";
import getuser from "./actions/isloggedin";

export const middleware = async (request:NextRequest)=>{ 
  const request_url = request.nextUrl.pathname


  const userIslogged =  await getuser()
 let token = request.cookies.get('accessToken')?.value
  let refreshToken = request.cookies.get('refreshToken')?.value
  
  //define new headers and set the refere url
  const requestHeaders = new Headers(request.headers);

  //set the url-referer to be read mostly in refresh
  //so as to redirect back to the referer.
  requestHeaders.set('x-url-referer', request_url);

  //create NextResponse.next to use to set cookies
  //add the request header to the response header
  const response = NextResponse.next({
    request:{
    headers: requestHeaders
    }
  })
       

        if(request.nextUrl.pathname.includes('/login')){
            if(!userIslogged){
              return response
            }
            return NextResponse.redirect(new URL('/test', request.url)) 
        } 
        
        

  //const LOGIN = `${process.env.NEXT_PUBLIC_BASE_URL}/login?redirect=${
		//request.nextUrl.pathname + request.nextUrl.search

 
  
  if(!refreshToken){
    //if refresh token don't exist, redirect the user to login page.
  return NextResponse.redirect(new URL('/login', request.url))
  }
 
  if(!token){
    //if no access token it means it expires
  //redirect to refresh with the request path added in query string
return NextResponse.redirect(new URL(`/api/refresh?redirectUrl=${request_url}`,request.url))

  }
  //if the token expires, it supposed to delete from the browser
  //if the token is present, validate it, in case the user enter fake token
      
        if(!userIslogged){
          //delete access token and refresh token before redirect
          request.cookies.delete('accessToken')
          request.cookies.delete('refreshToken')
          return NextResponse.redirect(new URL('/login', request.url))
        }

  //if we get here it means everything is ok, the user is logged in
 return response 
//verify the token make sure user exist 
}

export const config = {
  matcher: ['/profile','/test','/login','/dashboard']
}