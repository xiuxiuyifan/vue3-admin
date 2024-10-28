<script lang="ts">
export default {
  setup() {
    const route = useRoute()

    const router = useRouter()

    // 为了实现重定向
    router.replace({
      path: "/" + route.params.path,
      query: route.query
    })
    return () => h("template")
  }
}
</script>

<style scoped lang="scss"></style>
