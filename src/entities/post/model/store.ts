import { create } from "zustand"

import { Post, Tag } from "../../../shared/type/post"

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
  sortBy: string
  setSortBy: (sortBy: string) => void
  sortOrder: string
  setSortOrder: (sortOrder: string) => void
  searchQuery: string
  setSearchQuery: (searchQuery: string) => void
  tags: Tag[]
  setTags: (tags: Tag[]) => void
  selectedTag: string
  setSelectedTag: (selectedTag: string) => void
  selectedPost: Post | null
  setSelectedPost: (selectedPost: Post) => void
  showAddDialog: boolean
  setShowAddDialog: (showAddDialog: boolean) => void
  showEditDialog: boolean
  setShowEditDialog: (showAddDialog: boolean) => void
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (setShowPostDetailDialog: boolean) => void
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
  sortBy: "sortBy",
  setSortBy: (sortBy: string) => set({ sortBy }),
  sortOrder: "asc",
  setSortOrder: (sortOrder: string) => set({ sortOrder }),
  searchQuery: "",
  setSearchQuery: (searchQuery: string) => set({ searchQuery }),
  tags: [],
  setTags: (tags: Tag[]) => set({ tags }),
  selectedTag: "",
  setSelectedTag: (selectedTag: string) => set({ selectedTag }),
  selectedPost: null,
  setSelectedPost: (selectedPost: Post | null) => set({ selectedPost }),
  showAddDialog: false,
  setShowAddDialog: (showAddDialog: boolean) => set({ showAddDialog }),
  showEditDialog: false,
  setShowEditDialog: (showEditDialog: boolean) => set({ showEditDialog }),
  showPostDetailDialog: false,
  setShowPostDetailDialog: (showPostDetailDialog: boolean) => set({ showPostDetailDialog }),
}))

export const postStore = usePostStore
