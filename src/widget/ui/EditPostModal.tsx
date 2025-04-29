import React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { Input, Textarea } from "../../shared/ui"
import { Button } from "../../shared/ui"

import type { Post } from "../../shared/type/post"

interface EditPostModalProps {
  showEditDialog: boolean
  setShowEditDialog: (show: boolean) => void
  selectedPost: Post | null
  setSelectedPost: React.Dispatch<React.SetStateAction<Post | null>>
  updatePost: () => void
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  showEditDialog,
  setShowEditDialog,
  selectedPost,
  setSelectedPost,
  updatePost,
}) => {
  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => {
              if (selectedPost) {
                setSelectedPost({
                  ...selectedPost,
                  title: e.target.value,
                })
              }
            }}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => {
              if (selectedPost) {
                setSelectedPost({
                  ...selectedPost,
                  title: e.target.value,
                })
              }
            }}
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditPostModal
