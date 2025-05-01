import { useQuery } from "@tanstack/react-query"
import { fetchSearchPosts, getPosts, getPostsByTag, getTags } from "../api/post"
import { STALE_TIME } from "../../../shared/config/cache"
import { getUsers } from "../../user/api/user"
import { Post } from "../../../shared/type/post"
import { User } from "../../../shared/type/user"
import { postStore } from "./store"

export const QUERY_KEY = {
  getPosts: "posts",
  getPostsByTag: "posts-by-tag",
  searchPost: "search-posts",
  getTags: "tags",
}

export const useGetPosts = () => {
  const { limit, skip } = postStore.getState()

  return useQuery({
    queryKey: [QUERY_KEY.getPosts],
    queryFn: async () => {
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
  const { selectedTag } = postStore.getState()

  return useQuery({
    queryKey: [QUERY_KEY.getPostsByTag, tag],
    queryFn: async () => {
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

export const useSearchPosts = (searchQuery: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.searchPost, searchQuery],
    queryFn: () => fetchSearchPosts(searchQuery),
    enabled: !!searchQuery,
    staleTime: STALE_TIME,
  })
}

export const useGetTags = () => {
  return useQuery({
    queryKey: [QUERY_KEY.getTags],
    queryFn: async () => getTags(),
    staleTime: STALE_TIME,
  })
}
