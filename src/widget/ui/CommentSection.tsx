import React, { Dispatch, SetStateAction } from "react"
import { Plus } from "lucide-react"

import CommentItem from "./CommentItem"
import { Button } from "../../shared/ui"
import { Comment, NewComment } from "../../shared/type/comment"

interface CommentSectionProps {
  postId: number
  comments: Record<number, Comment[]>
  setNewComment: React.Dispatch<React.SetStateAction<NewComment>>
  setShowAddCommentDialog: (show: boolean) => void
  likeComment: (commentId: number, postId: number) => void
  deleteComment: (commentId: number, postId: number) => void
  setSelectedComment: Dispatch<SetStateAction<Comment | null>>
  setShowEditCommentDialog: Dispatch<SetStateAction<boolean>>
  searchQuery: string
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  setNewComment,
  setShowAddCommentDialog,
  likeComment,
  deleteComment,
  setSelectedComment,
  setShowEditCommentDialog,
  searchQuery,
}) => {
  const filteredComments = comments[postId] || []

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId: postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {filteredComments.map((comment: Comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            postId={postId}
            likeComment={likeComment}
            deleteComment={deleteComment}
            setSelectedComment={setSelectedComment}
            setShowEditCommentDialog={setShowEditCommentDialog}
            searchQuery={searchQuery}
          />
        ))}
      </div>
    </div>
  )
}

export default CommentSection
