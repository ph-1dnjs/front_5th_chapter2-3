import { Post } from "../../../shared/type/post"
import { User } from "../../../shared/type/user"
import { getUsers } from "../../user/api/user"
import { getPostsByTag } from "../api/post"
import { postStore } from "../model/store"
import { fetchPosts } from "./fetchPosts"

export const fetchPostsByTag = async (tag: string) => {
  const { setLoading, setPosts, setTotal, selectedTag, setSelectedTag } = postStore.getState()

  if (tag === selectedTag) return

  setSelectedTag(tag)

  if (!tag || tag === "all") {
    fetchPosts()
    return
  }

  setLoading(true)
  try {
    const [postsData, usersData] = await Promise.all([getPostsByTag(tag), getUsers()])

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: usersData.users.find((user: User) => user.id === post.userId),
    }))

    setPosts(postsWithUsers)
    setTotal(postsData.total)
  } catch (e) {
    console.error("태그별 게시물 가져오기 오류:", e)
  } finally {
    setLoading(false)
  }
}
