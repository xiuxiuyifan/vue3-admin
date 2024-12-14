<script setup lang="tsx">
import { useTagsView } from "@/stores/tagsView.ts"
import { storeToRefs } from "pinia"

const tagsViewStore = useTagsView()
const { cachedViews } = storeToRefs(tagsViewStore)

const includes = computed(() => cachedViews.value as string[])
</script>
<template>
  <router-view v-slot="{ Component }">
    <!--  out-in   当前元素先过渡，完成之后新元素进行过渡-->
    <Transition mode="out-in" name="fade">
      <KeepAlive :include="includes">
        <component :is="Component" :key="$route.path"></component>
      </KeepAlive>
    </Transition>
  </router-view>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-500;
}
.fade-enter-form {
  @apply opacity-0 translate-x-[-50px];
}
.fade-leave-to {
  @apply opacity-100 translate-x-[50px];
}
</style>
