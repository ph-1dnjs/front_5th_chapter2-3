export interface Comment {
  id: number
  body: string
  likes: number
  postId: number
  user: CommentUser
}

export interface CommentUser {
  id: number
  username: string
  fullName: string
}

export interface NewComment {
  body: string
  postId: number | null
  userId: number
}

export interface CommentResponse {
  comments: Comment[]
  limit: number
  skip: number
  total: number
}
export interface UpdateCommentResponse {
  id: number
  body: string
  postId: number
  user: CommentUser
}
