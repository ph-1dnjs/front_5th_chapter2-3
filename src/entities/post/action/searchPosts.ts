import { fetchSearchPosts } from "../api/post"
import { postStore } from "../model/store"
import { fetchPosts } from "./fetchPosts"

export const searchPosts = async () => {
  const { searchQuery, setPosts, setTotal, setLoading } = postStore.getState()

  if (!searchQuery) {
    fetchPosts()
    return
  }

  setLoading(true)

  const data = await fetchSearchPosts(searchQuery)

  if (data) {
    setPosts(data.posts)
    setTotal(data.total)
  }

  setLoading(false)
}
