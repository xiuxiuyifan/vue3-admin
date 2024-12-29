import { ObjectDirective, DirectiveBinding, App } from "vue"
import { useUserStore } from "@/stores/user.ts"

const checkPermission = (el: HTMLElement, binging: DirectiveBinding) => {
  let { value } = binging
  const userStore = useUserStore()

  const buttonAuth = userStore.state.buttonAuth
  const disableButton = userStore.state.disableButton
  // 如果传递 过来的值是字符串，则把字符串变成数组
  // 只能是字符串或者数组类型
  if (typeof value === "string") {
    value = [value]
  }
  // 看当前的权限是否在 角色的权限菜单中
  const hasAuth = buttonAuth.some((item) => {
    return value.includes(item.perms)
  })

  // 禁用的按钮默认添加 disabled 属性
  const hasDisabled = disableButton.some((item) => {
    return value.includes(item.perms)
  })

  // 没有权限
  if (!hasAuth && !hasDisabled) {
    // 判断是那种指令， 禁用还是不可见的
    el.parentNode?.removeChild(el)
  }

  if (hasDisabled) {
    el.disabled = true
  }
  // 如果在 按钮权限里面有，则说明不用禁用
  if (hasAuth) {
    console.log("有的呢")
    el.disabled = false
  }
}

export default checkPermission
