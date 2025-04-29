import { useQuery } from "@tanstack/react-query"
import { fetchSearchPosts } from "../api/post"

export const QUERY_KEY = { useSearchPostQuery: "api/posts/search" }

export const useSearchPostQuery = (searchQuery: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.useSearchPostQuery],
    queryFn: () => fetchSearchPosts(searchQuery),
    initialData: { posts: [], total: 0 },
  })
}
