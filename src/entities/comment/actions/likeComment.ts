import { likeCommentApi } from "../api/comment"
import { commentStore } from "../model/store"

export const likeComment = async (id: number, postId: number) => {
  const { comments, setComments } = commentStore.getState()

  const postComments = comments[postId]
  if (!postComments) return

  const targetComment = postComments.find((c) => c.id === id)
  if (!targetComment) return

  const data = await likeCommentApi(id, targetComment)

  if (data !== null) {
    setComments({
      ...comments,
      [postId]: comments[postId].map((comment) =>
        comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
      ),
    })
  }
}
