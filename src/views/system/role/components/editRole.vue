<script setup lang="ts">
import { IRole } from "@/api/role.ts"
import { ElForm } from "element-plus"
import { ActionType } from "@/types/type.ts"

type FormInstance = InstanceType<typeof ElForm>

const formRef = useTemplateRef<FormInstance | null>("formRef")

const initForm = (): IRole => {
  return {
    name: "",
    description: "",
    is_default: 0
  }
}

const handleReset = () => {
  // 并且清除表单校验信息
  formRef.value?.clearValidate(Object.keys(initForm()))
  ruleForm.value = initForm()
}

const ruleForm = ref<IRole>(initForm())

const emit = defineEmits(["submit"])

const { data, actionType } = defineProps({
  data: {
    type: Object as PropType<IRole>,
    default: () => ({})
  },
  actionType: {
    type: String as PropType<ActionType>,
    default: "add"
  }
})

// props 中的 data 变化之后重新更新 form 的值
watch(
  () => data,
  (newVal: IRole) => {
    ruleForm.value = {
      ...newVal
    }
    // 如果是新增则清除校验规则
    if (actionType === "add") {
      handleReset()
    }
  },
  {
    immediate: true
  }
)

const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入角色名称！"
    }
  ],
  description: [
    {
      required: true,
      message: "请输入描述！"
    }
  ],
  is_default: [
    {
      required: true,
      message: "请选择是否默认角色！"
    }
  ]
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
    <el-form-item label="角色名称" prop="name">
      <el-input
        v-model="ruleForm.name"
        clearable
        placeholder="请输入角色名称"
      />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input
        v-model="ruleForm.description"
        clearable
        placeholder="请输入描述"
      />
    </el-form-item>
    <el-form-item label="是否是默认角色 " name="is_default">
      <el-switch
        v-model="ruleForm.is_default"
        :active-value="1"
        :inactive-value="0"
      ></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm" :loading="loading"
        >提交</el-button
      >
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
