export interface PostDetail {
  id: number
  title: string
  body: string
  author: Author
  reactions: {
    likes: number
    dislikes: number
  }
  tags: string[]
  userId: number
  views: number
}

interface Author {
  id: number
  username: string
  image: string
}
