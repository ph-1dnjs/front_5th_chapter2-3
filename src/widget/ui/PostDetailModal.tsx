import { useEffect } from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { highlightText } from "../../shared/util"

import CommentSection from "./CommentSection"
import { usePostStore } from "../../entities/post/model/store"
import { useCommentQueries } from "../../entities/comment/model/useCommentQueries"
import { useCommentStore } from "../../entities/comment/model/store"

const PostDetailModal: React.FC = () => {
  const { comments, setComments } = useCommentStore()
  const { searchQuery, selectedPost, showPostDetailDialog, setShowPostDetailDialog } = usePostStore()
  const postId = selectedPost?.id ?? 0

  const { data: commentResponse } = useCommentQueries(selectedPost)

  useEffect(() => {
    if (commentResponse !== undefined) {
      setComments({ ...comments, [postId]: commentResponse.comments })
    }
  }, [commentResponse])

  return (
    <div>
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body, searchQuery)}</p>
            <CommentSection postId={postId} comments={comments} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PostDetailModal
