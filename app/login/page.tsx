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
import login from '@/actions/login'

const loginSchema = z.object({
  identifier: z.string().min(3),
  password:z.string().min(4)
})

//instead of using loginData type,
//extact the schema and use it instead
//by importing it from a remote file.
type loginData={
  identifier:string,
  password:string
}

const page = () => {
const form = useForm<z.infer <typeof loginSchema>>({
  resolver: zodResolver(loginSchema),
  defaultValues:{
    identifier:'',
    password:''
  }
})

const onSubmit = async (formData:loginData)=>{

  const resp = await login(formData)

  //only error is returned

}

  return (
    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)}>

      <FormField control={form.control} name='identifier'
      render = {
        ({field})=>
                <FormItem>
                  <FormLabel>Enter user name</FormLabel>
                  <FormControl>
                  <Input type='text' {...field} />
                  </FormControl>
                <FormMessage />
               </FormItem>
      }     
      />
      <FormField control={form.control} name='password'
      render = {
        ({field})=>
                <FormItem>
                  <FormLabel>Enter password</FormLabel>
                  <FormControl>
                  <Input type='password' {...field} />
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