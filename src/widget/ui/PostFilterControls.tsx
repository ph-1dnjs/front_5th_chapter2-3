import { Search } from "lucide-react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Input } from "../../shared/ui"

interface PostFilterControlsProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchPosts: () => void
  selectedTag: string
  setSelectedTag: (tag: string) => void
  tags: { url: string; slug: string }[]
  fetchPostsByTag: (tag: string) => void
  updateURL: () => void
  sortBy: string
  setSortBy: (value: string) => void
  sortOrder: string
  setSortOrder: (value: string) => void
}

const PostFilterControls: React.FC<PostFilterControlsProps> = ({
  searchQuery,
  setSearchQuery,
  searchPosts,
  selectedTag,
  setSelectedTag,
  tags,
  fetchPostsByTag,
  updateURL,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}) => {
  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                searchPosts()
              }
            }}
          />
        </div>
      </div>

      <Select
        value={selectedTag}
        onValueChange={(value) => {
          setSelectedTag(value)
          fetchPostsByTag(value)
          updateURL()
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="태그 선택" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">모든 태그</SelectItem>
          {tags.map((tag) => (
            <SelectItem key={tag.url} value={tag.slug}>
              {tag.slug}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 기준" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">없음</SelectItem>
          <SelectItem value="id">ID</SelectItem>
          <SelectItem value="title">제목</SelectItem>
          <SelectItem value="reactions">반응</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortOrder} onValueChange={setSortOrder}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="정렬 순서" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">오름차순</SelectItem>
          <SelectItem value="desc">내림차순</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

export default PostFilterControls
