import { Post } from "../../../shared/type/post"

export interface PostResponse {
  posts: Post[]
  total: number
}
