import { User } from "./user"

export interface Post {
  id: number
  title: string
  body: string
  author?: User
  reactions: {
    likes: number
    dislikes: number
  }
  tags: string[]
  userId: number
  views: number
}

export interface NewPost {
  title: string
  body: string
  userId: number
}
