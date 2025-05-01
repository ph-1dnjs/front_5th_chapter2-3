import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { highlightText } from "../../shared/util"
import CommentSection from "./CommentSection"

import { usePostStore } from "../../entities/post/model/store"

const PostDetailModal: React.FC = () => {
  const { searchQuery, selectedPost, showPostDetailDialog, setShowPostDetailDialog } = usePostStore()

  return (
    <div>
      <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body, searchQuery)}</p>
            <CommentSection postId={selectedPost?.id ?? 0} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PostDetailModal
