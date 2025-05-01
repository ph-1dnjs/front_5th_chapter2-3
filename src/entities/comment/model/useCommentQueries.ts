import { useQuery } from "@tanstack/react-query"
import { getComments } from "../api/comment"
import { CommentResponse } from "../../../shared/type/comment"
import { Post } from "../../../shared/type/post"
import { STALE_TIME } from "../../../shared/config/cache"

export const QUERY_KEY = "comments"

export const useCommentQueries = (selectedPost: Post | null) => {
  return useQuery<CommentResponse, Error>({
    queryKey: [QUERY_KEY, selectedPost?.id],
    queryFn: () => getComments(selectedPost?.id || 0),
    enabled: !!selectedPost?.id,
    staleTime: STALE_TIME,
  })
}
