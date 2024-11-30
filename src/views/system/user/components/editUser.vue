<script setup lang="ts">
import { getRoles, IRole } from "@/api/role.ts"
import { ElForm } from "element-plus"
import { ActionType } from "@/types/type.ts"
import { IUserInfo } from "@/api/user.ts"

type FormInstance = InstanceType<typeof ElForm>

const formRef = useTemplateRef<FormInstance | null>("formRef")

const roleList = ref([])
const initForm = (): IUserInfo => {
  return {
    username: "",
    password: "",
    mobile: "",
    email: "",
    status: false,
    description: "",
    roleIds: []
  }
}

const handleReset = () => {
  formRef.value?.clearValidate()
  ruleForm.value = initForm()
  // 并且清除表单校验信息
}
const ruleForm = ref<IUserInfo>(initForm())

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
  (newVal: IUserInfo) => {
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
  username: [
    {
      required: true,
      message: "请输入用户名！"
    }
  ],
  password: [
    {
      required: true,
      message: "请输入密码！"
    }
  ],
  mobile: [
    {
      required: true,
      message: "请输入手机号码！"
    }
  ],
  email: [
    {
      required: true,
      message: "请输入邮箱！"
    }
  ],
  status: [
    {
      required: true,
      message: "请选择状态！"
    }
  ],
  roleIds: [
    {
      required: true,
      message: "请选择角色！"
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

const initData = () => {
  getRoles().then((res) => {
    roleList.value = res.data.roles
  })
}

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
    <el-form-item label="用户名" prop="username">
      <el-input
        v-model="ruleForm.username"
        clearable
        placeholder="请输入用户名"
      />
    </el-form-item>
    <el-form-item label="密码" prop="password" v-if="actionType === 'add'">
      <el-input
        v-model="ruleForm.password"
        clearable
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input
        v-model="ruleForm.mobile"
        clearable
        placeholder="请输入手机号"
      />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="ruleForm.email" clearable placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-switch v-model="ruleForm.status"></el-switch>
    </el-form-item>
    <el-form-item label="角色" prop="roleIds">
      <el-select multiple v-model="ruleForm.roleIds" placeholder="请选择角色">
        <el-option
          v-for="item in roleList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input
        v-model="ruleForm.description"
        :rows="2"
        type="textarea"
        placeholder="请输入描述"
      />
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
