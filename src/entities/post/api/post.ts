import { NewPost, Post } from "../../../shared/type/post"
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
