import { addPostApi } from "../api/post"
import { postStore } from "../model/store"

export const addPost = async () => {
  const { posts, setPosts, newPost, setNewPost, setShowAddDialog } = postStore.getState()

  try {
    const data = await addPostApi(newPost)

    if (data !== null) {
      setPosts([data, ...posts])
    }

    setShowAddDialog(false)
    setNewPost({ title: "", body: "", userId: 1 })
  } catch (error) {
    console.error("게시물 추가 오류:", error)
  }
}
