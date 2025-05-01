import { postStore } from "../model/store"
import { useSearchPostQuery } from "../model/usePostQuery"
import { fetchPosts } from "./fetchPosts"

export const searchPosts = async () => {
  const { searchQuery, setPosts, setTotal, setLoading } = postStore.getState()

  if (!searchQuery) {
    fetchPosts()
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
