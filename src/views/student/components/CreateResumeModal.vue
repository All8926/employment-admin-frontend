<template>
  <el-dialog :model-value="visible"  @update:model-value="updateVisible" :title="title" width="35%">
    <el-form :model="form"  label-width="100px">
      <el-form-item label="名称">
        <el-input v-model="form.fileName" placeholder="请输入简历名称"></el-input>
      </el-form-item>

      <el-form-item label="是否生效版本">
        <el-select v-model="form.isActive" placeholder="请选择">
          <el-option label="否" :value="0"></el-option>
          <el-option label="是" :value="1"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item label="备注" >
      <el-input v-model="form.remark" type="textarea" />
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
import {updateStudent} from '@/api/student'

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

const form = ref({
    fileName: '',
    isActive: 0,
    remark: '',
})
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
