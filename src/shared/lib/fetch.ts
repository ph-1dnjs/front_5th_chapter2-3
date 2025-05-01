export const apiFetch = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const res = await fetch(`/api/${url}`, options)
  return res.json()
}
