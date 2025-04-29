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
