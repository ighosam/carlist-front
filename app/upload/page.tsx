
'use client'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import myfetch from '../../actions/fetch'
import {fileSchema} from '../../types/types'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form' 

import {Input} from '@/components/ui/input'
import { ChangeEvent } from 'react'



//maximum upload files.
let maxUpload = 4

const page = ()=> {

  const form = useForm<z.infer<typeof fileSchema>>({
    resolver : zodResolver(fileSchema),
    defaultValues:{
       
    }

  })

  form.watch('file')
const filedData = form.getValues('file')
let uploadMax = filedData != undefined ? maxUpload -filedData.length: maxUpload

  //turn the function below (onSubmit) to server action
  const onSubmit = async ()=>{
 const  data = form.getValues('file')
 
   const formData = new FormData()


for(let i =0;i<data.length;i++){
  formData.append('files',data[i])
}
   
  formData.append("field","photo")
  formData.append("ref","api::hotel.hotel")
   formData.append("refId","12")
   

myfetch(formData)
  }

  

const deleteImage = (num:number) =>{

  const fileData = form.getValues('file')
  let newFile = fileData?.filter((_,index)=> index != num)
  form.setValue('file',newFile)
}
  //function to get the actual dataform from input field
  const getImageData =(e:ChangeEvent<HTMLInputElement>)=>{

    //return e.target.files
   
       e.preventDefault()
       let fileArr = Array()
     
       //previous values of the file field
       const prevData = form.getValues('file')
     
       const mfiles = e.target.files!

       Array.from(mfiles).forEach((fi)=>{
       fileArr.push(fi)
     
      }
    
       )
        
       let fileArr2 = Array<File>()
       if(prevData != undefined && prevData?.length > 0 ){
       fileArr2 = fileArr.concat(prevData)
       fileArr = fileArr2
        
       }
      
       form.setValue("file",fileArr)
       return {fileArr}
       
  }
//function that returns url from file data
 const getUrl = (data:any[])=>{


  const udata = data?.map(newUrl=> URL.createObjectURL(newUrl))
  return udata
 }

//get url from file data for display
  const urlData = getUrl(form.getValues('file'))

return (
  <div className='w-full'>
    
    <div className="flex h-[200px] gap-10 w-full py-10">
       {
        
       urlData && urlData?.map((url,index)=><div key={index}><img  src={url} width="300" height="200"/>
       <button onClick={()=>deleteImage(index)}>delete</button>
       
       </div>)
 
     }
    </div>
    

    <Form {...form} >
      <form onSubmit = {form.handleSubmit(onSubmit)}>
        <FormField control = {form.control} name='file'
        render = {({field:{onChange,value,...rest}})=>{
           return <FormItem>
            <FormLabel>Chose file</FormLabel>
            <FormControl>
              <Input type='file' {...rest}  multiple
                onChange = {(e=>{
                //check if number of files uploaded
                if(e.target.files?.length! > uploadMax)
                {
                  alert("too many files upload")
                 return
                }  
                const {fileArr} = getImageData(e)
                
                onChange(fileArr) 
                 
                })
                
                }
               
           disabled={uploadMax <= 0} 
          
           />
            </FormControl>

           <FormMessage />
           </FormItem>
        }
      } />
       <button type ="submit">Submit</button> 
      </form>


    </Form>
  </div>
)
}

export default page