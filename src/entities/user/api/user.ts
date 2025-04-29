import { UsersResponse } from "../model/type"

export const getUsers = async (): Promise<UsersResponse> => {
  try {
    const res = await fetch("/api/users?limit=0&select=username,image")
    return res.json()
  } catch (e) {
    console.error("유저 불러오기 실패:", e)
    return { users: [], total: 0 }
  }
}
