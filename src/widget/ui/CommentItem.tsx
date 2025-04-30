import React from "react"
import { ThumbsUp, Edit2, Trash2 } from "lucide-react"

import { Button } from "../../shared/ui"
import { highlightText } from "../../shared/util"
import { Comment } from "../../shared/type/comment"
import { deleteComment } from "../../entities/comment/action/deleteComment"
import { useCommentStore } from "../../entities/comment/model/store"
import { usePostStore } from "../../entities/post/model/store"
import { likeComment } from "../../entities/comment/action/likeComment"

interface CommentProps {
  comment: Comment
  postId: number
}

const CommentItem: React.FC<CommentProps> = ({ comment, postId }) => {
  const { setSelectedComment, setShowEditCommentDialog } = useCommentStore()
  const { searchQuery } = usePostStore()

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
