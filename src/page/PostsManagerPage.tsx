import { useEffect, useState } from "react"
import { Plus } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"

import type { Post } from "../shared/type/post"

import UserModal from "../widget/ui/UserModal"
import EditCommentModal from "../widget/ui/EditCommentModal"
import PostDetailModal from "../widget/ui/PostDetailModal"
import AddCommentModal from "../widget/ui/AddCommentModal"
import EditPostModal from "../widget/ui/EditPostModal"
import AddPostModal from "../widget/ui/AddPostModal"
import Pagination from "../widget/ui/Pagination"
import PostTable from "../widget/ui/PostTable"

import PostFilterControls from "../entities/post/ui/PostFilterControls"
import { usePostStore } from "../entities/post/model/store"

import { fetchPosts } from "../entities/post/action/fetchPosts"
import { fetchPostsByTag } from "../entities/post/action/fetchPostsByTag"
import { fetchComments } from "../entities/comment/action/fetchComments"
import { fetchTags } from "../entities/post/action/fetchTags"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 상태 관리
  const {
    loading,
    skip,
    setSkip,
    limit,
    setLimit,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    setShowAddDialog,
    selectedPost,
    setSelectedPost,
  } = usePostStore()

  const [sortBy, setSortBy] = useState("sortBy")
  const [sortOrder, setSortOrder] = useState("asc")
  const [showPostDetailDialog, setShowPostDetailDialog] = useState(false)

  // URL 업데이트 함수
  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>게시물 관리자</span>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            게시물 추가
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostFilterControls
            updateURL={updateURL}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          {loading ? (
            <div className="flex justify-center p-4">로딩 중...</div>
          ) : (
            <PostTable updateURL={updateURL} openPostDetail={openPostDetail} />
          )}

          <Pagination />
        </div>
      </CardContent>

      <AddPostModal />

      <EditPostModal />

      <AddCommentModal />

      <EditCommentModal />

      <PostDetailModal
        isShow={showPostDetailDialog}
        setIsShow={setShowPostDetailDialog}
        postId={selectedPost?.id ?? 0}
      />

      <UserModal />
    </Card>
  )
}

export default PostsManager
