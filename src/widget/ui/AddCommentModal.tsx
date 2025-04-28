import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { Textarea } from "../../shared/ui"
import { Button } from "../../shared/ui"
import { NewComment } from "../../shared/type/comment"

interface AddCommentModalProps {
  showAddCommentDialog: boolean
  setShowAddCommentDialog: (show: boolean) => void
  newComment: NewComment
  setNewComment: React.Dispatch<React.SetStateAction<NewComment>>
  addComment: () => void
}

const AddCommentModal: React.FC<AddCommentModalProps> = ({
  showAddCommentDialog,
  setShowAddCommentDialog,
  newComment,
  setNewComment,
  addComment,
}) => {
  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddCommentModal
