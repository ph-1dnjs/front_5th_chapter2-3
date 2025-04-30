import { NewPost, Post, Tag } from "../../../shared/type/post"
import { PostResponse } from "../model/type"

export const getPosts = async (limit: number, skip: number): Promise<PostResponse> => {
  try {
    const res = await fetch(`/api/posts?limit=${limit}&skip=${skip}`)
    return res.json()
  } catch (e) {
    console.error("게시물 가져오기 오류:", e)
    return { posts: [], total: 0 }
  }
}

export const getTags = async (): Promise<Tag[]> => {
  try {
    const res = await fetch("/api/posts/tags")
    return res.json()
  } catch (e) {
    console.error("태그 가져오기 오류:", e)
    return []
  }
}

export const getPostsByTag = async (tag: string): Promise<PostResponse> => {
  try {
    const res = await fetch(`/api/posts/tag/${tag}`)
    return res.json()
  } catch (e) {
    console.error("태그별 게시물 가져오기 오류:", e)
    return { posts: [], total: 0 }
  }
}

export const fetchSearchPosts = async (searchQuery: string): Promise<PostResponse> => {
  try {
    const res = await fetch(`/api/posts/search?q=${searchQuery}`)
    const data = await res.json()
    return data
  } catch (e) {
    console.error("게시물 검색 오류:", e)
    return { posts: [], total: 0 }
  }
}

export const addPostApi = async (post: NewPost): Promise<Post | null> => {
  try {
    const response = await fetch("/api/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    })
    return response.json()
  } catch (e) {
    console.error("게시물 추가 오류:", e)
    return null
  }
}

export const updatePostApi = async (selectedPost: Post): Promise<Post | null> => {
  try {
    const res = await fetch(`/api/posts/${selectedPost?.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedPost),
    })
    return res.json()
  } catch (e) {
    console.error("게시물 업데이트 오류:", e)
    return null
  }
}

export const deletePostApi = async (id: number) => {
  try {
    await fetch(`/api/posts/${id}`, {
      method: "DELETE",
    })
  } catch (e) {
    console.error("게시물 삭제 오류:", e)
  }
}
