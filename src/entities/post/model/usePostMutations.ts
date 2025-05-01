import { useMutation } from "@tanstack/react-query"
import { NewPost, Post } from "../../../shared/type/post"
import { addPostApi, deletePostApi, updatePostApi } from "../api/post"
import { postStore } from "../model/store"
import { handleError } from "../../../shared/lib/queryError"
import { invalidateQueries } from "../../../shared/lib/queryInvalidate"
import { queryClient } from "../../../shared/lib/queryClient"
import { QUERY_KEY } from "./usePostQueries"

export const useAddPost = () => {
  return useMutation({
    mutationFn: (newPost: NewPost) => addPostApi(newPost),
    onSuccess: (data) => {
      if (!data) return

      const { posts, setPosts, setShowAddDialog } = postStore.getState()

      setPosts([data, ...posts])
      setShowAddDialog(false)

      invalidateQueries(queryClient, [QUERY_KEY.getPosts])
    },
    onError: handleError,
  })
}

export const useDeletePost = () => {
  return useMutation({
    mutationFn: (id: number) => deletePostApi(id),
    onSuccess: (data: Post) => {
      const { posts, setPosts } = postStore.getState()

      setPosts(posts.filter((post) => data.id !== post.id))

      invalidateQueries(queryClient, [QUERY_KEY.getPosts])
    },
    onError: handleError,
  })
}

export const useUpdatePost = () => {
  return useMutation({
    mutationFn: async () => {
      const { selectedPost } = postStore.getState()
      if (selectedPost === null) throw new Error("수정할 게시물이 없습니다.")
      const data = await updatePostApi(selectedPost)
      return data
    },
    onSuccess: (data: Post) => {
      if (!data) return

      const { posts, setPosts, setShowEditDialog } = postStore.getState()

      setPosts(posts.map((post) => (post.id === data.id ? data : post)))
      setShowEditDialog(false)

      invalidateQueries(queryClient, [QUERY_KEY.getPosts])
    },
    onError: handleError,
  })
}
