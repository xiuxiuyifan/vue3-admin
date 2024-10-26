<script setup lang="ts"></script>

<template>
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Transition mode="out-in" name="fade">
        <KeepAlive>
          <component :is="Component"></component>
        </KeepAlive>
      </Transition>
    </template>
  </RouterView>
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
