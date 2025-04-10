<template>
  <el-dialog :model-value="visible"  @update:model-value="updateVisible" :title="title" width="500">
    <el-form :model="form"  :rules="rules" label-width="120px" ref="formRef">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称"></el-input>
      </el-form-item>

      <el-form-item label="上级部门" >
				<el-tree-select check-strictly placeholder="请选择上级部门" v-model="form.parentId" :data="treeData" :props="{ value: 'id', label: 'name' }" node-key="id" />
			</el-form-item>
      <el-form-item label="排序" >
      <el-input v-model="form.sort" />
    </el-form-item>

    </el-form>
    <template #footer>
      <div class="dialog-footer"  >
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
    default: '新增'
  },

  cancel: {
    type: Function,
    default: () => {

    }
  },
})

const formRef = ref(null)
const form = ref({
    name: '',
    parentId: null,
    sort:0
})
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
     await addDepartment(form.value)
    ElMessage.success('操作成功')
    updateVisible(false)
    emit('submit')
      // 重置表单
      form.value = {
        name: '',
        parentId: null,
        sort:0
      }
  } catch (error) {
    console.log(error)
  }
}


</script>

<style lang="scss" scoped>

</style>
