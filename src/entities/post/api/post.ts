import { apiFetch } from "../../../shared/lib/fetch"
import { NewPost, Post, Tag } from "../../../shared/type/post"

import { PostResponse } from "../model/type"

export const getPosts = async (limit: number, skip: number): Promise<PostResponse> => {
  return apiFetch(`posts?limit=${limit}&skip=${skip}`, undefined, { posts: [], total: 0 })
}

export const getTags = async (): Promise<Tag[]> => {
  return apiFetch(`posts/tags`, undefined, [])
}

export const getPostsByTag = async (tag: string): Promise<PostResponse> => {
  return apiFetch(`posts/tag/${tag}`, undefined, { posts: [], total: 0 })
}

export const fetchSearchPosts = async (searchQuery: string): Promise<PostResponse> => {
  return apiFetch(`search?q=${searchQuery}`, undefined, { posts: [], total: 0 })
}

export const addPostApi = async (post: NewPost): Promise<Post | null> => {
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  }

  return apiFetch("posts/add", options, null)
}

export const updatePostApi = async (selectedPost: Post): Promise<Post | null> => {
  const options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(selectedPost),
  }

  return apiFetch(`posts/${selectedPost?.id}`, options, null)
}

export const deletePostApi = async (id: number) => {
  const options = {
    method: "DELETE",
  }

  return apiFetch(`posts/${id}`, options)
}
