import { NewPost } from "../../../shared/type/post"
import { addPostApi } from "../api/post"
import { postStore } from "../model/store"

export const addPost = async (newPost: NewPost) => {
  const { posts, setPosts, setShowAddDialog } = postStore.getState()

  try {
    const data = await addPostApi(newPost)

    if (data !== null) {
      setPosts([data, ...posts])
    }

    setShowAddDialog(false)
  } catch (error) {
    console.error("게시물 추가 오류:", error)
  }
}
