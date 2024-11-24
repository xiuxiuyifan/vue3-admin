<script setup lang="ts">
import { IRole } from "@/api/role.ts"

const formRef = ref(null)

const ruleForm = reactive<IRole>({
  name: "",
  description: "",
  is_default: 0
})

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

// 提交数据也交给外层的组件来做
const submitForm = () => {}

const handleReset = () => {}
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
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input v-model="ruleForm.description" />
    </el-form-item>
    <el-form-item label="是否是默认角色 " name="is_default">
      <el-switch
        v-model="ruleForm.is_default"
        :active-value="1"
        :inactive-value="0"
      ></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm">提交</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss"></style>
