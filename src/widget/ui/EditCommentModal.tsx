import React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { Textarea } from "../../shared/ui"
import { Button } from "../../shared/ui"

import { updateComment } from "../../entities/comment/action/updateComment"
import { useCommentStore } from "../../entities/comment/model/store"

const EditCommentModal: React.FC = () => {
  const { selectedComment, setSelectedComment, showEditCommentDialog, setShowEditCommentDialog } = useCommentStore()

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) =>
              setSelectedComment(selectedComment ? { ...selectedComment, body: e.target.value } : selectedComment)
            }
          />
          <Button
            onClick={() => {
              if (selectedComment) updateComment(selectedComment)
            }}
          >
            댓글 업데이트
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditCommentModal
