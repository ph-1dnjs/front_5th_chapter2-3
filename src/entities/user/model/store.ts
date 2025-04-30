import { create } from "zustand"

import { User } from "../../../shared/type/user"

interface UserStore {
  selectedUser: User | null
  setSelectedUser: (selectedUser: User) => void
  showUserModal: boolean
  setShowUserModal: (showUserModal: boolean) => void
}

export const useUserStore = create<UserStore>((set) => ({
  selectedUser: null,
  setSelectedUser: (selectedUser: User | null) => set({ selectedUser }),
  showUserModal: false,
  setShowUserModal: (showUserModal: boolean) => set({ showUserModal }),
}))

export const UserStore = useUserStore
