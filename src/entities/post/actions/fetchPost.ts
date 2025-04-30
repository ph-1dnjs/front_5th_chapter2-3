import { Post } from "../../../shared/type/post"
import { User } from "../../../shared/type/user"
import { getUsers } from "../../user/api/user"
import { getPosts } from "../api/post"
import { postStore } from "../model/store"

export const fetchPosts = async () => {
  const { setLoading, setPosts, setTotal, limit, skip } = postStore.getState()

  setLoading(true)
  try {
    const [postsData, usersData] = await Promise.all([getPosts(limit, skip), getUsers()])

    const postsWithUsers = postsData.posts.map((post: Post) => ({
      ...post,
      author: usersData.users.find((user: User) => user.id === post.userId),
    }))

    setPosts(postsWithUsers)
    setTotal(postsData.total)
  } catch (e) {
    console.error("게시물 가져오기 오류:", e)
  } finally {
    setLoading(false)
  }
}
