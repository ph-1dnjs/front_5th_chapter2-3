import { updatePostApi } from "../api/post"
import { postStore } from "../model/store"

export const updatePost = async () => {
  const { posts, setPosts, selectedPost, setShowEditDialog } = postStore.getState()

  if (selectedPost === null) return

  const data = await updatePostApi(selectedPost)

  if (data !== null) {
    setPosts(posts.map((post) => (post.id === data.id ? data : post)))
  }
  setShowEditDialog(false)
}
