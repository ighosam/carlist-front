"use client"
import reg from '../../actions/register'
import {z} from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {useForm} from 'react-hook-form'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form' 
import {Input} from '@/components/ui/input'
import getEmails from '@/actions/getEmails'
import getUsername from '@/actions/getUsername'

type regData ={
  username:string,
  email:string,
  password:string
}

const page = () => {

  const dataSchema = z.object({
     username:z.string().min(1).refine(async (uname)=>{
      const usernameExist = await getUsername(uname)
      //if username exist reurn false else return true.
      //useing ! to negate the returned value from getUsername(uname)
      return !usernameExist
     },"User name is taken, try another username"),
     email:z.string().email().min(3).refine(async (e)=>{
      const emailExist = await getEmails(e)
      //if email exist reurn false else return true.
      //useing ! to negate the returned value from getEmails(e)
      return !emailExist
     },"This email already exist in our server"),
     password:z.string().min(1),
     confirmPassword:z.string()

  }).refine(data => data.password == data.confirmPassword,{
    message:'Password must match',
    path:['confirmPassword'],
  })

  const form = useForm<z.infer <typeof dataSchema>>({
    resolver: zodResolver(dataSchema),
    defaultValues:{
      username:'',
      email:'',
      password:'',
      confirmPassword:''
    },
    mode: 'onBlur'
  })
  const onSubmit = async (formData:regData)=>{
   const response = await reg(formData)
  //there can only be response if there happened to be error
  //only error was returned from reg(formData)
if(response){
  throw new Error("There was an error")
}

  }
  return (
    <Form {...form}>
     <form 
      onSubmit={form.handleSubmit(onSubmit)}>
 <FormField control ={form.control} name="email"
render = {
      ({field})=>
            <FormItem>
              <FormLabel>Enter email</FormLabel>
              <FormControl>
                <Input type='email' {...field} />
              </FormControl>
            <FormMessage />
            </FormItem>
         }
     />
<FormField control ={form.control} name='username'
render = {
      ({field})=>
              <FormItem>
                <FormLabel>Enter username</FormLabel>
                <FormControl>
                  <Input type='text' {...field}/>
                </FormControl>
                <FormMessage />
            </FormItem>
        }
     
     />
     <FormField control ={form.control} name='password'
render = {
      ({field})=>
              <FormItem>
                <FormLabel>Enter Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field}/>
                </FormControl>
                <FormMessage />
            </FormItem>
        }
     
     />
     <FormField control ={form.control} name='confirmPassword'
render = {
      ({field})=>
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type='password' {...field}/>
                </FormControl>
                <FormMessage />
            </FormItem>
        }
     
     />
        <button type ="submit">Submit</button>    
      </form>


    </Form>
  )
}

export default page