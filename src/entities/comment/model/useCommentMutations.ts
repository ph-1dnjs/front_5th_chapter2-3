import { useMutation } from "@tanstack/react-query"

import { Comment } from "../../../shared/type/comment"
import { handleError } from "../../../shared/lib/queryError"
import { queryClient } from "../../../shared/lib/queryClient"
import { invalidateQueries } from "../../../shared/lib/queryInvalidate"

import { addCommentApi, deleteCommentApi, likeCommentApi, updateCommentApi } from "../api/comment"
import { commentStore } from "../model/store"

import { QUERY_KEY } from "./useCommentQueries"

interface CommentParams {
  id: number
  postId: number
}

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: async ({ id }: CommentParams) => {
      await deleteCommentApi(id)
      return id
    },
    onSuccess: (id, { postId }) => {
      const { comments, setComments } = commentStore.getState()

      const updatedComments = comments[postId]?.filter((comment) => comment.id !== id) || []

      setComments({
        ...comments,
        [postId]: updatedComments,
      })
      invalidateQueries(queryClient, [QUERY_KEY])
    },
    onError: handleError,
  })
}

export const useLikeComment = () => {
  return useMutation({
    mutationFn: async ({ id, postId }: CommentParams) => {
      const { comments } = commentStore.getState()
      const postComments = comments[postId]
      if (!postComments) throw new Error("댓글 없음")

      const targetComment = postComments.find((c) => c.id === id)
      if (!targetComment) throw new Error("대상 댓글 없음")

      const updated = await likeCommentApi(id, targetComment)

      return { updated, postId }
    },
    onSuccess: ({ updated, postId }) => {
      const { comments, setComments } = commentStore.getState()

      const newComments = comments[postId].map((comment: Comment) =>
        comment.id === updated.id ? { ...updated, likes: comment.likes + 1 } : comment,
      )

      setComments({
        ...comments,
        [postId]: newComments,
      })
      invalidateQueries(queryClient, [QUERY_KEY])
    },
    onError: handleError,
  })
}

export const useAddComment = () => {
  return useMutation({
    mutationFn: async () => {
      const { newComment } = commentStore.getState()
      const data = await addCommentApi(newComment)
      if (!data) throw new Error("댓글 추가 실패")
      return data
    },
    onSuccess: (data) => {
      const { comments, setComments, setNewComment, setShowAddCommentDialog } = commentStore.getState()

      const comment: Comment = {
        ...data,
        likes: 0,
      }

      setComments({
        ...comments,
        [comment.postId]: [...(comments[comment.postId] || []), comment],
      })

      setShowAddCommentDialog(false)
      setNewComment({ body: "", postId: null, userId: 1 })

      invalidateQueries(queryClient, [QUERY_KEY])
    },
    onError: handleError,
  })
}

export const useUpdateComment = () => {
  return useMutation({
    mutationFn: async (selectedComment: Comment) => {
      const data = await updateCommentApi(selectedComment)
      if (!data) throw new Error("댓글 수정 실패")
      return data
    },
    onSuccess: (data) => {
      const { comments, setComments, setShowEditCommentDialog } = commentStore.getState()

      const updated = {
        ...data,
        likes: comments[data.postId].find((c) => c.id === data.id)?.likes ?? 0,
      }

      setComments({
        ...comments,
        [data.postId]: comments[data.postId].map((comment) => (comment.id === updated.id ? updated : comment)),
      })

      setShowEditCommentDialog(false)

      invalidateQueries(queryClient, [QUERY_KEY])
    },
    onError: handleError,
  })
}
