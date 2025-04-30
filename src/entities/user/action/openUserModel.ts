import { User } from "../../../shared/type/user"
import { getUserById } from "../api/user"
import { UserStore } from "../model/store"

export const openUserModal = async (user: User) => {
  const { setSelectedUser, setShowUserModal } = UserStore.getState()

  const userData = await getUserById(user.id)

  if (userData !== null) setSelectedUser(userData)
  setShowUserModal(true)
}
