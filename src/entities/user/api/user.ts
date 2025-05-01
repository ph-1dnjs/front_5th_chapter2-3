import { apiFetch } from "../../../shared/lib/fetch"
import { User } from "../../../shared/type/user"
import { UsersResponse } from "../model/type"

export const getUsers = async (): Promise<UsersResponse> => {
  return apiFetch("users?limit=0&select=username,image")
}

export const getUserById = async (id: number): Promise<User> => {
  return apiFetch(`users/${id}`)
}
