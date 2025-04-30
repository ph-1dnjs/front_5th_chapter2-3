import { getTags } from "../api/post"
import { postStore } from "../model/store"

export const fetchTags = async () => {
  const { setTags } = postStore.getState()

  const data = await getTags()

  setTags(data)
}
