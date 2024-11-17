import { defineStore } from "pinia"
import { UserLoginData, login as loginAPi } from "@/api/user.ts"
import { removeToken, setToken } from "@/utils/auth.ts"
import { useTagsView } from "@/stores/tagsView.ts"

export const useUserStore = defineStore("user", () => {
  const state = reactive({
    token: ""
  })

  // 调用登录接口
  const login = async (userInfo: UserLoginData) => {
    try {
      const { username, password } = userInfo
      const res = await loginAPi({
        username: username.trim(),
        password: password
      })
      const { data } = res
      state.token = data.token
      setToken(data.token)
    } catch (e) {
      return Promise.reject(e)
    }
  }

  const { delAllView } = useTagsView()

  const logout = () => {
    // 清空 本地存储里面的 token 和 store 里面的 token
    state.token = ""
    removeToken()
    // 清空所有的 tagsview
    delAllView()
  }

  const resetToken = () => {
    state.token = ""
    removeToken()
  }

  return {
    state,
    login,
    logout,
    resetToken
  }
})
