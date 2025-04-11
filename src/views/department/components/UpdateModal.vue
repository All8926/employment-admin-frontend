<template>
  <el-dialog :model-value="visible"  @update:model-value="updateVisible" :title="title" width="40%">
    <el-form :model="form" :disabled="disabled" :rules="rules" label-width="120px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>

      <el-form-item label="上级部门" v-if="form.parentId > 0">
				<el-tree-select check-strictly placeholder="请选择上级部门" v-model="form.parentId" :data="treeData" :props="{ value: 'id', label: 'name' }" node-key="id" />
			</el-form-item>
      <el-form-item label="排序" >
      <el-input v-model="form.sort" />
    </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer" v-if="!disabled && title === '修改'">
        <el-button @click="cancel()">取消</el-button>
        <el-button type="primary" @click="handleSubmit">
          确定
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import {addDepartment, updateDepartment} from '@/api/department.js'
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
          id: null,
          name: '',
          parentId: null,
          sort:0
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

const rules = {
    name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
}

const emit = defineEmits(['submit'])

const updateVisible = (value) => {
  props.cancel(value)
}

// 提交更新
const handleSubmit = async () =>{
  try {
     await updateDepartment(form.value)
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
