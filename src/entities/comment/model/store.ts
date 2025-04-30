import { create } from "zustand"

import { Comment, NewComment } from "../../../shared/type/comment"

interface CommentStore {
  comments: Record<number, Comment[]>
  setComments: (comments: Record<number, Comment[]>) => void
  newComment: NewComment
  setNewComment: (newComment: NewComment) => void
  showAddCommentDialog: boolean
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => void
  showEditCommentDialog: boolean
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => void
  selectedComment: Comment | null
  setSelectedComment: (selectedComment: Comment | null) => void
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  setComments: (comments: Record<number, Comment[]>) => set({ comments }),
  newComment: { body: "", postId: null, userId: 1 },
  setNewComment: (newComment: NewComment) => set({ newComment }),
  showAddCommentDialog: false,
  setShowAddCommentDialog: (showAddCommentDialog: boolean) => set({ showAddCommentDialog }),
  showEditCommentDialog: false,
  setShowEditCommentDialog: (showEditCommentDialog: boolean) => set({ showEditCommentDialog }),
  selectedComment: null,
  setSelectedComment: (selectedComment: Comment | null) => set({ selectedComment }),
}))

export const commentStore = useCommentStore
