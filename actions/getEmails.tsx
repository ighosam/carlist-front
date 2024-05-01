'use server'
const getEmails = async (email:string) => {
  const Base_url = process.env.REMOTE_URL
    let mydata
  try{
     mydata =   await fetch(`${Base_url}}/api/user/emailExist`,{
        method: "POST",
        headers:{
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({email})
       })
    mydata = await mydata.json()
    
  }catch(error){

  }
     
     
      return mydata 
  
}

export default getEmails