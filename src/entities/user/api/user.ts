import { User } from "../../../shared/type/user"
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

export const getUserById = async (id: number): Promise<User | null> => {
  try {
    const res = await fetch(`/api/users/${id}`)
    return res.json()
  } catch (error) {
    console.error("사용자 정보 가져오기 오류:", error)
    return null
  }
}
