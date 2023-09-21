// src/content/config.ts

import { z, defineCollection, reference } from 'astro:content'

const postCollection = defineCollection({
    type: 'content', 
    schema: z.object({
      title: z.string(),
      categories: z.array(z.string()),
      thumb: z.string(),
      pudate: z.date(),
      videos: reference('videos'),
      author: reference('authors'),
      draft: z.boolean().default(false),
    }),
})

const pageCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        thumb: z.string().optional(),
        pudate: z.date(),
        author: reference('authors'),
    })
})

const videoCollection = defineCollection({
    type: 'data',
    schema: z.object({
        videos: z.array(z.object({
            vidType: z.string(),
            id: z.string(),
            status: z.string(),
        }))
    })
})

const authorCollection = defineCollection({
    type: 'content',
    schema: z.object({
        name: z.string(),
        role: z.string(),
        thumb: z.string().optional(),
        pudate: z.date(),
        email: z.string().email(),
        password: z.string(),
    })
})

export const collections = {
    'posts': postCollection,
    'videos': videoCollection,
    'authors': authorCollection,
    'pages': pageCollection,
}
  