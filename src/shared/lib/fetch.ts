export const apiFetch = async <T>(url: string, options?: RequestInit, fallback?: T): Promise<T> => {
  try {
    const res = await fetch(`/api/${url}`, options)
    return res.json()
  } catch (e) {
    console.error(`API 요청 실패: ${url}`, e)
    return fallback as T
  }
}
