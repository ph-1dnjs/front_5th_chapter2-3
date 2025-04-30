import { useQuery } from "@tanstack/react-query"
import { getUsers } from "../api/user"

export const QUERY_KEY = { useGetUsers: "api/users" }

export const useGetUsers = () => {
  return useQuery({
    queryKey: [QUERY_KEY.useGetUsers],
    queryFn: () => getUsers(),
    initialData: { users: [], total: 0 },
  })
}
