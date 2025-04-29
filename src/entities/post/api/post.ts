export const fetchSearchPosts = async (searchQuery: string): Promise<{ posts: []; total: number }> => {
  try {
    const res = await fetch(`/api/posts/search?q=${searchQuery}`)
    const data = await res.json()
    return data
  } catch (e) {
    console.error("게시물 검색 오류:", e)
    return { posts: [], total: 0 }
  }
}
