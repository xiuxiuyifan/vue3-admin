<script setup lang="ts">
import { ElForm } from "element-plus"
import { ActionType } from "@/types/type.ts"
import { IMenu } from "@/api/menu.ts"
import { ITreeItemData } from "@/utils/tree.ts"

type FormInstance = InstanceType<typeof ElForm>

const formRef = useTemplateRef<FormInstance | null>("formRef")

const initForm = (): IMenu => {
  return {
    type: 0,
    title: "",
    path: "",
    component_path: "",
    component_name: "",
    icon: "",
    sort_id: 1,
    route: true,
    hidden: false,
    keep_alive: false,
    internal_or_external: false,
    // 授权策略
    perms: "", // 授权标识
    strategy: "1",
    available: "1"
  }
}

const handleReset = () => {
  formRef.value?.clearValidate()
  ruleForm.value = initForm()
  // 并且清除表单校验信息
}
const ruleForm = ref<IMenu>(initForm())

const emit = defineEmits(["submit"])

const { data, actionType, treeData } = defineProps({
  data: {
    type: Object as PropType<IMenu>,
    default: () => ({})
  },
  actionType: {
    type: String as PropType<ActionType>,
    default: "add"
  },
  treeData: {
    type: Array as PropType<IMenu[]>,
    default: () => []
  }
})

// props 中的 data 变化之后重新更新 form 的值
watch(
  () => data,
  (newVal: IMenu) => {
    console.log("watch 到了")
    ruleForm.value = {
      ...newVal
    }

    console.log(ruleForm)
    // 如果是新增则清除校验规则
    if (actionType === "add") {
      handleReset()
    }
  },
  {
    immediate: true
  }
)

const menuTree = ref<IMenu[]>([])

watch(
  () => treeData,
  (newVal: IMenu[]) => {
    menuTree.value = [...newVal]
  },
  {
    immediate: true
  }
)

const rules = reactive({
  type: [
    {
      required: true,
      message: "请选择菜单类型",
      trigger: "change"
    }
  ],
  title: [{ required: true, message: "请输入菜单名称", trigger: "blur" }],
  parent_id: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
  path: [{ required: true, message: "请输入访问路径", trigger: "blur" }],
  component_path: [
    { required: true, message: "请输入组件路径", trigger: "blur" }
  ],
  component_name: [
    { required: true, message: "请输入组件名称", trigger: "blur" }
  ],
  icon: [{ required: true, message: "请输入菜单图标", trigger: "blur" }],
  sort_id: [
    { required: true, message: "请输入排序值", trigger: "blur" },
    { type: "number", message: "排序值必须是数字", trigger: "blur" }
  ],
  route: [
    { type: "boolean", message: "请选择是否为路由菜单", trigger: "change" }
  ],
  hidden: [
    { type: "boolean", message: "请选择是否隐藏路由", trigger: "change" }
  ],
  keep_alive: [
    { type: "boolean", message: "请选择是否缓存路由", trigger: "change" }
  ],
  internal_or_external: [
    { type: "boolean", message: "请选择打开方式", trigger: "change" }
  ],
  strategy: [{ required: true, message: "请选择授权策略", trigger: "change" }],
  available: [{ required: true, message: "请选择状态", trigger: "change" }]
})

const loading = ref(false)

// 提交数据也交给外层的组件来做
const submitForm = () => {
  // 提交数据
  loading.value = true
  formRef.value?.validate((valid) => {
    if (valid) {
      emit("submit", ruleForm.value)
    }
    loading.value = false
  })
}

const initData = () => {}

const filterNodeMethod = (value: string, data: ITreeItemData) =>
  data.title.includes(value)

onMounted(() => {
  initData()
})
</script>

<template>
  <el-form
    ref="formRef"
    style="max-width: 600px"
    :model="ruleForm"
    :rules="rules"
    label-width="auto"
    class="demo-ruleForm"
    status-icon
  >
    <el-form-item label="菜单类型" prop="type">
      <el-radio-group v-model="ruleForm.type" :disabled="actionType === 'edit'">
        <el-radio-button label="一级菜单" :value="0" />
        <el-radio-button label="子菜单" :value="1" />
        <el-radio-button label="按钮/权限" :value="2" />
      </el-radio-group>
    </el-form-item>
    <template v-if="[0, 1].includes(ruleForm.type)">
      <el-form-item label="菜单名称" prop="title">
        <el-input
          v-model="ruleForm.title"
          clearable
          placeholder="请输入菜单名称"
        />
      </el-form-item>
      <el-form-item
        label="上级菜单"
        prop="parent_id"
        v-if="ruleForm.type === 1"
      >
        <el-tree-select
          v-model="ruleForm.parent_id"
          :filter-node-method="filterNodeMethod"
          :data="menuTree"
          node-key="id"
          :props="{
            label: (data: IMenu[], node: Node) => {
              return node && node.data.title
            }
          }"
          check-strictly
          filterable
        >
          <template #default="{ node }">
            <span>{{ node.data.title }}</span>
          </template>
        </el-tree-select>
      </el-form-item>
      <el-form-item label="访问路径" prop="path">
        <el-input
          v-model="ruleForm.path"
          clearable
          placeholder="请输入访问路径"
        />
      </el-form-item>
      <el-form-item label="前端组件" prop="component_path">
        <el-input
          v-model="ruleForm.component_path"
          clearable
          placeholder="请输入前端组件"
        />
      </el-form-item>
      <el-form-item label="组件名称" prop="component_name">
        <el-input
          v-model="ruleForm.component_name"
          clearable
          placeholder="请输入组件名称"
        />
      </el-form-item>
      <el-form-item label="菜单图标" prop="icon">
        <el-input v-model="ruleForm.icon" placeholder="请选择图标" />
      </el-form-item>
      <el-form-item label="排序" prop="sort_id">
        <el-input-number v-model="ruleForm.sort_id" />
      </el-form-item>
      <el-form-item label="是否路由菜单" prop="route">
        <el-switch v-model="ruleForm.route"></el-switch>
      </el-form-item>
      <el-form-item label="隐藏路由" prop="hidden">
        <el-switch v-model="ruleForm.hidden"></el-switch>
      </el-form-item>
      <el-form-item label="是否缓存路由" prop="keep_alive">
        <el-switch v-model="ruleForm.keep_alive"></el-switch>
      </el-form-item>
      <el-form-item label="打开方式" prop="internal_or_external">
        <el-switch
          inline-prompt
          active-text="外部"
          inactive-text="内部"
          v-model="ruleForm.internal_or_external"
        ></el-switch>
      </el-form-item>
    </template>
    <template v-if="ruleForm.type == 2">
      <el-form-item label="按钮名称" prop="title">
        <el-input v-model="ruleForm.title" placeholder="请输入按钮名称" />
      </el-form-item>
      <el-form-item label="上级菜单" prop="parent_id">
        <el-tree-select
          v-model="ruleForm.parent_id"
          :filter-node-method="filterNodeMethod"
          :data="menuTree"
          node-key="id"
          :props="{
            label: (data: IMenu[], node: Node) => {
              return node && node.data.title
            }
          }"
          check-strictly
          filterable
        >
          <template #default="{ node }">
            <span>{{ node.data.title }}</span>
          </template>
        </el-tree-select>
      </el-form-item>
      <el-form-item label="授权标识" prop="perms">
        <el-input v-model="ruleForm.perms" placeholder="请输入授权标识" />
      </el-form-item>
      <el-form-item label="授权策略" prop="strategy">
        <el-radio-group v-model="ruleForm.strategy">
          <el-radio value="1" border>显示/不显示</el-radio>
          <el-radio value="2" border>正常/禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="available">
        <el-radio-group v-model="ruleForm.available">
          <el-radio value="1" border>有效</el-radio>
          <el-radio value="0" border>无效</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
    <el-form-item>
      <el-button type="primary" @click="submitForm" :loading="loading"
        >提交</el-button
      >
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
