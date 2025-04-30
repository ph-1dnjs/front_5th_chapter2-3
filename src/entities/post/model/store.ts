import { create } from "zustand"

import { Post } from "../../../shared/type/post"

interface PostStore {
  loading: boolean
  setLoading: (loading: boolean) => void
  posts: Post[]
  setPosts: (posts: Post[]) => void
  total: number
  setTotal: (total: number) => void
  limit: number
  setLimit: (limit: number) => void
  skip: number
  setSkip: (limit: number) => void
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  selectedTag: string
  setSelectedTag: (selectedTag: string) => void
}

export const usePostStore = create<PostStore>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set({ loading }),
  posts: [],
  setPosts: (posts: Post[]) => set({ posts }),
  total: 0,
  setTotal: (total: number) => set({ total }),
  limit: 10,
  setLimit: (limit: number) => set({ limit }),
  skip: 0,
  setSkip: (skip: number) => set({ skip }),
  searchQuery: "",
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  selectedTag: "",
  setSelectedTag: (selectedTag: string) => set({ selectedTag }),
}))

export const postStore = usePostStore
