import { Dispatch, SetStateAction } from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { highlightText } from "../../shared/util"
import CommentSection from "./CommentSection"

import type { Post } from "../../shared/type/post"
import type { Comment } from "../../shared/type/comment"
import { usePostStore } from "../../entities/post/model/store"

interface PostDetailProps {
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
  postId: number
  selectedPost: Post | null
  setSelectedComment: Dispatch<SetStateAction<Comment | null>>
}

const PostDetailModal: React.FC<PostDetailProps> = ({
  isShow,
  setIsShow,
  postId,
  selectedPost,
  setSelectedComment,
}) => {
  const { searchQuery } = usePostStore()

  return (
    <div>
      <Dialog open={isShow} onOpenChange={setIsShow}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body, searchQuery)}</p>
            <CommentSection postId={postId} setSelectedComment={setSelectedComment} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PostDetailModal
