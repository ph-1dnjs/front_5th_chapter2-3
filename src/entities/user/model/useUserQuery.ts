import { useQuery } from "@tanstack/react-query"
import { STALE_TIME } from "../../../shared/config/cache"
import { getUserById } from "../api/user"

export const QUERY_KEY = "user"

export const useUserDetail = (userId: number | null) => {
  return useQuery({
    queryKey: [QUERY_KEY, userId],
    queryFn: () => {
      if (userId !== null) return getUserById(userId)
    },
    enabled: userId !== null,
    staleTime: STALE_TIME,
  })
}
