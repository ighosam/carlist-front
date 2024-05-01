'use server'
const getUsername = async (uname:string) => {
  const Base_url = process.env.REMOTE_URL
    let mydata
  try{
     mydata =   await fetch(`${Base_url}/api/user/usernameExist`,{
        method: "POST",
        headers:{
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({uname})
       })
    mydata = await mydata.json()
    
  }catch(error){

  }
     
     
      return mydata 
  
}

export default getUsername