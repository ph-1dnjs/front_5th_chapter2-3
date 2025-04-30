import { Comment } from "../../../shared/type/comment"
import { addCommentApi } from "../api/comment"
import { commentStore } from "../model/store"

export const addComment = async () => {
  const { comments, setComments, newComment, setNewComment, setShowAddCommentDialog } = commentStore()

  const data = await addCommentApi(newComment)

  if (data !== null) {
    const comment: Comment = {
      ...data,
      likes: 0,
    }

    setComments({
      ...comments,
      [comment.postId]: [...(comments[comment.postId] || []), comment],
    })
  }

  setShowAddCommentDialog(false)
  setNewComment({ body: "", postId: null, userId: 1 })
}
