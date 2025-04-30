import { deleteCommentApi } from "../api/comment"
import { commentStore } from "../model/store"

export const deleteComment = async (id: number, postId: number) => {
  const { comments, setComments } = commentStore.getState()

  await deleteCommentApi(id)

  setComments({
    ...comments,
    [postId]: comments[postId]?.filter((comment) => comment.id !== id) || [],
  })
}
