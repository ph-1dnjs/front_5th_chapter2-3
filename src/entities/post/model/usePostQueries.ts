import { useQuery } from "@tanstack/react-query"
import { getPosts, getPostsByTag } from "../api/post"
import { STALE_TIME } from "../../../shared/config/cache"
import { getUsers } from "../../user/api/user"
import { Post } from "../../../shared/type/post"
import { User } from "../../../shared/type/user"
import { postStore } from "./store"

export const QUERY_KEY = ["posts", "posts-by-tag"]

export const useGetPosts = () => {
  const { limit, skip, setLoading } = postStore.getState()

  return useQuery({
    queryKey: [QUERY_KEY[0]],
    queryFn: async () => {
      setLoading(true)

      const [postsData, usersData] = await Promise.all([getPosts(limit, skip), getUsers()])

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }))

      return {
        posts: postsWithUsers,
        total: postsData.total,
      }
    },
    staleTime: STALE_TIME,
  })
}

export const useGetPostsByTag = (tag: string) => {
  const { selectedTag, setLoading } = postStore.getState()

  return useQuery({
    queryKey: [QUERY_KEY[1], tag],
    queryFn: async () => {
      setLoading(true)

      const [postsData, usersData] = await Promise.all([getPostsByTag(tag), getUsers()])

      const postsWithUsers = postsData.posts.map((post: Post) => ({
        ...post,
        author: usersData.users.find((user: User) => user.id === post.userId),
      }))

      return {
        posts: postsWithUsers,
        total: postsData.total,
      }
    },
    staleTime: STALE_TIME,
    enabled: tag !== selectedTag,
  })
}
