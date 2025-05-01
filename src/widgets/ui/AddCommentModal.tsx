import React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { Textarea } from "../../shared/ui"
import { Button } from "../../shared/ui"

import { useCommentStore } from "../../entities/comment/model/store"
import { useAddComment } from "../../entities/comment/model/useCommentMutations"

const AddCommentModal: React.FC = () => {
  const { newComment, setNewComment, showAddCommentDialog, setShowAddCommentDialog } = useCommentStore()

  const { mutate: addComment } = useAddComment()

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={() => addComment()}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddCommentModal
