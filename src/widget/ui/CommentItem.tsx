import React, { Dispatch, SetStateAction } from "react"
import { ThumbsUp, Edit2, Trash2 } from "lucide-react"

import { Button } from "../../shared/ui"
import { highlightText } from "../../shared/util"
import { Comment } from "../../shared/type/comment"

interface CommentProps {
  comment: Comment
  postId: number
  likeComment: (commentId: number, postId: number) => void
  deleteComment: (commentId: number, postId: number) => void
  setSelectedComment: Dispatch<SetStateAction<Comment | null>>
  setShowEditCommentDialog: Dispatch<SetStateAction<boolean>>
  searchQuery: string
}

const CommentItem: React.FC<CommentProps> = ({
  comment,
  postId,
  likeComment,
  deleteComment,
  setSelectedComment,
  setShowEditCommentDialog,
  searchQuery,
}) => {
  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">{highlightText(comment.body, searchQuery)}</span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={() => likeComment(comment.id, postId)}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{comment.likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedComment(comment)
            setShowEditCommentDialog(true)
          }}
        >
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deleteComment(comment.id, postId)}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}

export default CommentItem
