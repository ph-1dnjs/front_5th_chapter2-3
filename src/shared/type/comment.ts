export interface Comment {
  id: number
  body: string
  likes: number
  postId: number
  user: CommentUser
}

interface CommentUser {
  id: number
  username: string
  fullName: string
}

export interface NewComment {
  body: string
  postId: number | null
  userId: number
}
