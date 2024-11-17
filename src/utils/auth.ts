const tokenKey = "V3-admin-Token"

export const getToken = (): string | null => {
  return localStorage.getItem(tokenKey)
}

export const setToken = (token: string) => {
  return localStorage.setItem(tokenKey, token)
}

export const removeToken = () => {
  return localStorage.removeItem(tokenKey)
}
