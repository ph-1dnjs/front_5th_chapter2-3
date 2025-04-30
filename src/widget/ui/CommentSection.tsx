import React, { Dispatch, SetStateAction } from "react"
import { Plus } from "lucide-react"

import CommentItem from "./CommentItem"
import { Button } from "../../shared/ui"
import { Comment } from "../../shared/type/comment"
import { useCommentStore } from "../../entities/comment/model/store"

interface CommentSectionProps {
  postId: number
  setSelectedComment: Dispatch<SetStateAction<Comment | null>>
}

const CommentSection: React.FC<CommentSectionProps> = ({ postId, setSelectedComment }) => {
  const { comments, newComment, setNewComment, setShowAddCommentDialog } = useCommentStore()

  const filteredComments = comments[postId] || []

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment({ ...newComment, postId: postId })
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {filteredComments.map((comment: Comment) => (
          <CommentItem key={comment.id} comment={comment} postId={postId} setSelectedComment={setSelectedComment} />
        ))}
      </div>
    </div>
  )
}

export default CommentSection
