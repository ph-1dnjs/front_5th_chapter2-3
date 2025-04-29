import { postStore } from "../model/store"
import { useSearchPostQuery } from "../model/usePostQuery"
import { fetchPosts } from "./fetchPost"

export const searchPosts = async () => {
  const { searchQuery, setPosts, setTotal, setLoading, limit, skip } = postStore.getState()

  if (!searchQuery) {
    fetchPosts(limit, skip)
    return
  }

  setLoading(true)

  try {
    const { data } = await useSearchPostQuery(searchQuery)
    if (data) {
      setPosts(data.posts)
      setTotal(data.total)
    }
  } catch (e) {
    console.error("게시물 검색 오류:", e)
  } finally {
    setLoading(false)
  }
}
