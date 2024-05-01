
'use client'
import {z} from 'zod'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import postdata from '../actions/postdata'
import {postSchema} from '../types/types'
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
import updatedata from '@/actions/updatedata'


type test = {
  id:number,
  attributes:{
    name:string,
    url:string
  }
  
}  

type test2={
    name:string,
    url:string
  }

//maximum upload files.
let maxUpload = 4



const update = ({dValues}:any)=> {



const fetchImages = dValues.attributes.photo?.data

let fetchUrls:string[]
 let photoData

 //fetch url of the images from the server

  if(fetchImages != null && fetchImages.length >0){
/*
     fetchUrls = fetchImages?.map((fi:test)=>{
    const baseUrl = 'http://localhost:1337'
    return `${baseUrl}${fi.attributes.url}`
  })
  */

  //fetch
   photoData= fetchImages?.map((fi:test)=>{
    const baseUrl = 'http://localhost:1337'
    return {
      url:`${baseUrl}${fi.attributes.url}`,
      name: fi.attributes.name
    }
  })
  }
  
  const form = useForm<z.infer<typeof postSchema>>({
    resolver : zodResolver(postSchema),
    defaultValues:{
      name:dValues.attributes.name,
      description:dValues.attributes.description,
      file: undefined,
      delImages: photoData
     
    }
  
  })

   form.watch('delImages')
   form.watch('file')
 
const filedData = form.getValues('delImages')
let uploadMax = filedData != undefined ? maxUpload -filedData.length: maxUpload

  //turn the function below (onSubmit) to server action
  const onSubmit = async ()=>{

   
 const  fileData = form.getValues('file')
 const localPhoto = form.getValues('delImages')


 const data = {
  name: form.getValues('name'),
  description: form.getValues('description'),
  currentImages: localPhoto
 }
 
   const formData = new FormData()

  formData.append('data',JSON.stringify(data))

  if(fileData != undefined){
    for(let i =0;i<fileData.length;i++){
  formData.append('files.photo',fileData[i])
 } 
  }






const sendData = async (formData:FormData)=>{
const resault = await updatedata(formData)

if(resault && resault != 200){
  console.log("Update not completed, there was an error")
  
}
}

sendData(formData)


form.resetField('file')
}

const deleteImage = (name:string) =>{

  const fileData = form.getValues('file')
  const fileUrls = form.getValues('delImages')

//Delete file
  let newFile = fileData?.filter((fname)=> fname.name != name)
  form.setValue('file',newFile)

//Delet corresponding url
  let newUrls = fileUrls?.filter(url=> url.name !=name)
  form.setValue('delImages',newUrls)

}
  //function to get the actual dataform from input field
  const loadImageData =(e:ChangeEvent<HTMLInputElement>)=>{

    //previous values of the urls
    e.preventDefault()

      //get old photo data from file and photo field
       const prevData = form.getValues('delImages')
       const PrevFiles = form.getValues('file')

       
       
       //file data from user input field
       const newFiles = e.target.files!
        

       //Extract the names from prevData {url,name}
       const exNames =  prevData?.map(k=>k.name)
 
      
     
       //function to get new file from old file name by appending random number
       const getNewFileName = (fileName:string)=>{
        const divide = fileName.split('.')
        const ext = divide[1]
        let name = divide[0]
        
        const val = Math.floor(1000 + Math.random() * 9000)
        return `${name}${val}.${ext}`
        
        }
    
       let fileImages = Array()
       let fileArr = Array()

       

       //is any of the file name present in the url list
      /*  
       Array.from(newFiles).forEach((fi)=>{
        //if the file exist, create a copy with new name
        if(exNames && exNames.includes(fi.name)){
          const file = new File([fi],getNewFileName(fi.name),{
            type:fi.type,
            lastModified:fi.lastModified
          
          })
             fileImages.push(file) 
          return
        }
     
        fileImages.push(fi)
      }
       )
*/
       
      //rename file on upload, add random number to the filename

      Array.from(newFiles).forEach((fi)=>{
        const file = new File([fi],getNewFileName(fi.name),{
          type:fi.type,
          lastModified:fi.lastModified
        })
        fileImages.push(file)
      })
     

      //set your file
       form.setValue('file',fileImages)

       //function to add two array
       const addArray = (prevArr:any,newArr:any)=>{
        if(prevArr != undefined){
          return prevArr.concat(newArr)
        }
        return newArr
       }

      //update urls
       fileArr = getUrl(fileImages) 
       fileArr = addArray(prevData,fileArr)
       form.setValue('delImages',fileArr)

      const combinedFiles = addArray(PrevFiles,fileImages)

      form.setValue('file', combinedFiles)


       //update files
        e.target.value = null!


       return {fileImages}
  
  }

  
//function that returns url from file data
 const getUrl = (data:any[])=>{

  const udata = data?.map(newUrl=> {
    return {
    url: URL.createObjectURL(newUrl),
    name: newUrl.name
    }
  
  })
  return udata
 }



  //get url from file data for display
  //const urlData = getUrl(form.getValues('file'))
  const urlData = form.getValues('delImages')

return (
  <div className='w-full'>
    
    <div className="flex h-[200px] gap-10 w-full py-10">
       {
        
       urlData && urlData?.map((url,index)=><div key={index}><img  src={url.url} width="300" height="200"/>
       <button onClick={()=>deleteImage(url.name)}>delete</button>
       
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
                
                const {fileImages} = loadImageData(e)
               // onChange(fileImages) 
                })       
                }          
           disabled={uploadMax <= 0} 
         
           />
            </FormControl>

           <FormMessage />
           </FormItem>
        }
      
      } />
      <FormField control ={form.control} name="name"
      render = {({field})=>{

        return <FormItem>
           <FormControl>
            <Input type='text' placeholder='Enter name' {...field}
           
            />
           </FormControl>
        <FormMessage />
        </FormItem>

      }}
      />
      <FormField control = {form.control} name='description'
      render = {({field})=>{
        return <FormItem>
          <FormControl>
            <Input type="textarea" placeholder='Enter description'
            {...field}
            />
          </FormControl>

         <FormMessage />
        </FormItem>
      }}
      />
      <FormField control = {form.control} name ='delImages' 
      
      render = {({field:{onChange,value,...field}})=>{

      return <FormItem>
        <FormControl>
          <Input type='hidden' {...field} 
          onChange={(e)=>onChange(e.target.value)}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
      }
      
      }  
      />
       <button type ="submit">Submit</button> 
      </form>

    </Form>
  </div>
)
}

export default update