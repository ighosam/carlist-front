'use server'
const updatedata = async (data:FormData) => {
  const Base_url = process.env.REMOTE_URL
 
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImlhdCI6MTcxMzIzODMzMCwiZXhwIjoxNzE1ODMwMzMwfQ.tvOuJqtE01nPAamKk9q0rBJveS7S81H1b5zCek5QeW0'
  let fdata
try{
fdata = await fetch(`${Base_url}/api/hotels/122`,{
    method:'PUT',
    headers:{
      'Authorization': `Bearer ${token}`
    },
    body:data
  })
  
  
}catch(error){
//return(`There was an error: ${fdata}`)
}finally{
 return fdata?.status 
}

}


export default updatedata