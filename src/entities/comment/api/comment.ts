import { Comment, CommentResponse, UpdateCommentResponse, NewComment } from "../../../shared/type/comment"

export const getComments = async (postId: number): Promise<CommentResponse | null> => {
  try {
    const res = await fetch(`/api/comments/post/${postId}`)
    return res.json()
  } catch (e) {
    console.error("댓글 가져오기 오류:", e)
    return null
  }
}

export const addCommentApi = async (newComment: NewComment): Promise<UpdateCommentResponse | null> => {
  try {
    const res = await fetch("/api/comments/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    })
    return res.json()
  } catch (e) {
    console.error("댓글 추가 오류:", e)
    return null
  }
}

export const deleteCommentApi = async (id: number): Promise<void> => {
  try {
    await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
  } catch (e) {
    console.error("댓글 삭제 오류:", e)
  }
}

export const updateCommentApi = async (selectedComment: Comment): Promise<Comment | null> => {
  try {
    const res = await fetch(`/api/comments/${selectedComment?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ body: selectedComment?.body }),
    })
    return res.json()
  } catch (e) {
    console.error("댓글 업데이트 오류:", e)
    return null
  }
}

export const likeCommentApi = async (id: number, targetComment: Comment): Promise<Comment | null> => {
  try {
    const res = await fetch(`/api/comments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: targetComment.likes + 1 }),
    })
    return res.json()
  } catch (e) {
    console.error("댓글 좋아요 오류:", e)
    return null
  }
}
