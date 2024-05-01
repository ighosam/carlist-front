import {zodResolver} from '@hookform/resolvers/zod'
import {z} from 'zod'


export const fileSchema = z.object({
  file: z.custom<File[]>(),
  name: z.string().min(3),
  description: z.string().min(5)
})

export const postSchema = z.object({
  file:z.custom<File[]>(),
  name: z.string().min(3,"name is required"),
  description: z.string().min(5),
  delImages:z.array(z.object({
    name: z.string(),
    url: z.string()
  }))
})


export const urlDataType = z.object({
  name:z.string(),
  url: z.string()
})
