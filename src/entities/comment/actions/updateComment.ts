import { Comment } from "../../../shared/type/comment"
import { updateCommentApi } from "../api/comment"
import { commentStore } from "../model/store"

export const updateComment = async (selectedComment: Comment) => {
  console.log("update!!")
  const { comments, setComments, setShowEditCommentDialog } = commentStore.getState()

  const data = await updateCommentApi(selectedComment)

  if (data !== null) {
    const updated = {
      ...data,
      likes: comments[data.postId].find((c) => c.id === data.id)?.likes ?? 0,
    }

    setComments({
      ...comments,
      [data.postId]: comments[data.postId].map((comment) => (comment.id === updated.id ? updated : comment)),
    })
  }

  setShowEditCommentDialog(false)
}
