import { useEffect, useState } from "react"
import { ThumbsUp, ThumbsDown, MessageSquare, Edit2, Trash2 } from "lucide-react"

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, Button } from "../../shared/ui/"
import { highlightText } from "../../shared/util"
import type { User } from "../../shared/type/user"
import type { Post } from "../../shared/type/post"

import { usePostStore } from "../../entities/post/model/store"
import { useDeletePost } from "../../entities/post/model/usePostMutations"
import { useUserDetail } from "../../entities/user/model/useUserQuery"
import { useUserStore } from "../../entities/user/model/store"

interface PostTableProps {
  updateURL: () => void
}

const PostTable: React.FC<PostTableProps> = ({ updateURL }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)

  const {
    posts,
    searchQuery,
    selectedTag,
    setSelectedTag,
    setSelectedPost,
    setShowEditDialog,
    setShowPostDetailDialog,
  } = usePostStore()
  const { setSelectedUser, setShowUserModal } = useUserStore()

  const { data: userData } = useUserDetail(selectedUserId)
  const { mutate: deletePost } = useDeletePost()

  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    setShowPostDetailDialog(true)
  }

  const openUserModal = (user: User) => {
    setSelectedUserId(user.id)
  }

  useEffect(() => {
    if (userData) {
      setSelectedUser(userData)
      setShowUserModal(true)
    }
  }, [userData])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-[150px]">작성자</TableHead>
          <TableHead className="w-[150px]">반응</TableHead>
          <TableHead className="w-[150px]">작업</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>{post.id}</TableCell>
            <TableCell>
              <div className="space-y-1">
                <div>{highlightText(post.title, searchQuery)}</div>
                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <span
                      key={tag}
                      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                        selectedTag === tag
                          ? "text-white bg-blue-500 hover:bg-blue-600"
                          : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                      }`}
                      onClick={() => {
                        setSelectedTag(tag)
                        updateURL()
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author!)}>
                <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                <span>{post.author?.username}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                <span>{post.reactions?.likes || 0}</span>
                <ThumbsDown className="w-4 h-4" />
                <span>{post.reactions?.dislikes || 0}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedPost(post)
                    setShowEditDialog(true)
                  }}
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default PostTable
