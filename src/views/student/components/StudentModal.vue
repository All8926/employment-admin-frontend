<template>
  <el-dialog :model-value="visible"  @update:model-value="updateVisible" :title="title" width="40%">
    <el-form :model="form" :disabled="disabled">
      <el-form-item label="姓名">
        <el-input v-model="form.userName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="form.studentNumber" placeholder="请输入学号"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-select v-model="form.gender" placeholder="请选择性别">
          <el-option label="男" :value="0"></el-option>
          <el-option label="女" :value="1"></el-option>
          <el-option label="未知" :value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
      </el-form-item>
      <el-form-item label="部门" >
				<el-tree-select placeholder="请选择部门" v-model="form.deptId" :data="treeData" :props="{ value: 'id', label: 'name' }" node-key="id" />
			</el-form-item>
      <el-form-item label="简介" >
      <el-input v-model="form.userProfile" type="textarea" />
    </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer" v-if="!disabled && title === '修改'">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          确定
        </el-button>
      </div>
      <div class="dialog-footer" v-if="title === '审核'">
        <el-button type="danger" @click="handleStatus(2)">拒绝</el-button>
        <el-button type="success" @click="handleStatus(1)">
          通过
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import {updateStudent} from '@/api/student'

const userStore = useUserStore()
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '修改'
  },
  formData: {
    type: Object,
    default: () => {
      return {
        userName: '',
        studentNumber: '',
        gender: null,
        email: '',
        phone: '',
        studentNumber: '',
        userProfile: '',
        deptId: null,
        userProfile:''
      }
    }
  },
  cancel: {
    type: Function,
    default: () => {

    }
  },
})

const disabled = computed(() => props.title !==  '修改')
const form = computed(() => props.formData)
const treeData = userStore?.departmentDate


const emit = defineEmits(['submit'])

const updateVisible = (value) => {
  props.cancel(value)
}

// 提交更新
const handleSubmit = async () =>{
  try {
     await updateStudent(form.value)
    ElMessage.success('操作成功')
    updateVisible(false)
    emit('submit')
  } catch (error) {
    console.log(error)
  }
}

// 审核
const handleStatus = async (status) => {
  try {
    await updateStudent({...form.value, status})
    ElMessage.success('操作成功')
    updateVisible(false)
    emit('submit')
  } catch (error) {
    console.log(error)
  }
}

</script>

<style lang="scss" scoped>

</style>
