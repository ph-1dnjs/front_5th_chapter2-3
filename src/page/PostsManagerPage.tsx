import { useEffect } from "react"
import { Plus } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"

import { Button, Card, CardContent, CardHeader, CardTitle } from "../shared/ui"

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
import { useGetPosts, useGetPostsByTag, useGetTags, useSearchPosts } from "../entities/post/model/usePostQueries"
import { useDebounce } from "../shared/hook/useDebounce"

const PostsManager = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // 상태 관리
  const {
    loading,
    setLoading,
    setPosts,
    setTotal,
    setTags,
    skip,
    setSkip,
    limit,
    setLimit,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    setShowAddDialog,
  } = usePostStore()

  const debouncedSearchQuery = useDebounce(searchQuery, 300)

  const { data: postsData, isLoading: postsLoading } = useGetPosts()
  const { data: postsByTagData, isLoading: postsByTagLoading } = useGetPostsByTag(selectedTag)
  const { data: searchPosts, isLoading: searchPostsLoading } = useSearchPosts(debouncedSearchQuery)
  const { data: tagsData } = useGetTags()

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

  useEffect(() => {
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

  // 데이터 로딩 핸들러
  useEffect(() => {
    setLoading(postsLoading || postsByTagLoading || searchPostsLoading)
  }, [postsLoading, postsByTagLoading, searchPostsLoading])

  // 태그 데이터 업데이트
  useEffect(() => {
    if (tagsData) {
      setTags(tagsData)
    }
  }, [tagsData])

  // 포스트 데이터 업데이트
  useEffect(() => {
    if (postsData) {
      setPosts(postsData.posts)
      setTotal(postsData.total)
      setLoading(false)
    }
  }, [postsData])

  // 검색 포스트 데이터 업데이트
  useEffect(() => {
    if (searchPosts) {
      setPosts(searchPosts.posts)
      setTotal(searchPosts.total)
      setLoading(false)
    }
  }, [searchPosts])

  // 태그 선택 포스트 데이터 업데이트
  useEffect(() => {
    if (postsByTagData) {
      setPosts(postsByTagData.posts)
      setTotal(postsByTagData.total)
      setLoading(false)
    }
  }, [postsByTagData])

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
          <PostFilterControls updateURL={updateURL} />
          {loading ? <div className="flex justify-center p-4">로딩 중...</div> : <PostTable updateURL={updateURL} />}
          <Pagination />
        </div>
      </CardContent>
      <AddPostModal />
      <EditPostModal />
      <AddCommentModal />
      <EditCommentModal />
      <PostDetailModal />
      <UserModal />
    </Card>
  )
}

export default PostsManager
