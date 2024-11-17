import { defineStore } from "pinia"
import { UserLoginData, login as loginAPi } from "@/api/user.ts"
import { setToken } from "@/utils/auth.ts"

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
  return {
    state,
    login
  }
})
