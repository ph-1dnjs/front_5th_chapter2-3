import { Dispatch, SetStateAction } from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui"
import { highlightText } from "../../shared/util"
import CommentSection from "./CommentSection"

import type { Post } from "../../shared/type/post"
import type { Comment, NewComment } from "../../shared/type/comment"

interface PostDetailProps {
  isShow: boolean
  setIsShow: Dispatch<SetStateAction<boolean>>
  postId: number
  selectedPost: Post | null
  comments: Record<number, Comment[]>
  setNewComment: React.Dispatch<React.SetStateAction<NewComment>>
  setShowAddCommentDialog: (show: boolean) => void
  likeComment: (commentId: number, postId: number) => void
  deleteComment: (commentId: number, postId: number) => void
  setSelectedComment: Dispatch<SetStateAction<Comment | null>>
  setShowEditCommentDialog: Dispatch<SetStateAction<boolean>>
  searchQuery: string
}

const PostDetailModal: React.FC<PostDetailProps> = ({
  isShow,
  setIsShow,
  postId,
  selectedPost,
  comments,
  likeComment,
  setNewComment,
  setShowAddCommentDialog,
  deleteComment,
  setSelectedComment,
  setShowEditCommentDialog,
  searchQuery,
}) => {
  return (
    <div>
      <Dialog open={isShow} onOpenChange={setIsShow}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>{highlightText(selectedPost?.body, searchQuery)}</p>
            <CommentSection
              postId={postId}
              comments={comments}
              setNewComment={setNewComment}
              setShowAddCommentDialog={setShowAddCommentDialog}
              likeComment={likeComment}
              deleteComment={deleteComment}
              setSelectedComment={setSelectedComment}
              setShowEditCommentDialog={setShowEditCommentDialog}
              searchQuery={searchQuery}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default PostDetailModal
