import { apiFetch } from "../../../shared/lib/fetch"
import { Comment, CommentResponse, UpdateCommentResponse, NewComment } from "../../../shared/type/comment"

export const getComments = async (postId: number): Promise<CommentResponse> => {
  return apiFetch(`comments/post/${postId}`, undefined)
}

export const addCommentApi = async (newComment: NewComment): Promise<UpdateCommentResponse> => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newComment),
  }

  return apiFetch("comments/add", options)
}

export const deleteCommentApi = async (id: number): Promise<void> => {
  const options = {
    method: "DELETE",
  }

  return apiFetch(`comments/${id}`, options)
}

export const updateCommentApi = async (selectedComment: Comment): Promise<Comment> => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ body: selectedComment?.body }),
  }

  return apiFetch(`comments/${selectedComment?.id}`, options)
}

export const likeCommentApi = async (id: number, targetComment: Comment): Promise<Comment> => {
  const options = {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ likes: targetComment.likes + 1 }),
  }

  return apiFetch(`comments/${id}`, options)
}
