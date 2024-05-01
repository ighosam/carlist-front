import Update from '../../form/update'
import qs from 'qs'

const page = async() => {
  const Base_url = process.env.REMOTE_URL
  
  const QUERY = qs.stringify({
    filters:{
      id: 122
    }, 
       populate:['name','description','photo']
  })


  const data = await fetch(`${Base_url}/api/hotels?${QUERY}`,{
    method:'GET',
    
    
  })

  const jdata = await data.json()

 

  return (
   <Update dValues={jdata.data[0]}/>
  )
}

export default page


