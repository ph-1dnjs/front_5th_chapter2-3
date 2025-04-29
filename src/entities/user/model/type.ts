import { User } from "../../../shared/type/user"

export interface UsersResponse {
  users: User[]
  total: number
}
