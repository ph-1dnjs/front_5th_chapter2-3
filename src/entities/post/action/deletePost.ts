import { deletePostApi } from "../api/post"
import { postStore } from "../model/store"

export const deletePost = async (id: number) => {
  const { posts, setPosts } = postStore.getState()

  await deletePostApi(id)

  setPosts(posts.filter((post) => post.id !== id))
}
