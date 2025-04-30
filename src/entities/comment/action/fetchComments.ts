import { getComments } from "../api/comment"
import { commentStore } from "../model/store"

export const fetchComments = async (postId: number) => {
  const { comments, setComments } = commentStore.getState()

  if (comments[postId]) return

  try {
    const data = await getComments(postId)

    setComments({ ...comments, [postId]: data?.comments ?? [] })
  } catch (error) {
    console.error("댓글 가져오기 오류:", error)
  }
}
