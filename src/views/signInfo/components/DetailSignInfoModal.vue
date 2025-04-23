<template>
    <el-dialog :model-value="visible" :title="title" width="35%" @update:model-value="updateVisible">
        <div class="text-[16px] flex flex-col gap-4 pb-[20px]">
            <div>
                合同：
                <el-button link  type="primary" @click="openFile">{{ form.contract.fileName }}</el-button>
            </div>
            <div>签约日期：{{ form.contract.signDate }}</div> 
            <div>企业名称：{{ form.contract.enterpriseName }}</div> 
            <div>学生账号：{{ form.student.userAccount }}</div>
            <div>学生名称：{{ form.student.userName }}</div>
            <div>学生学号：{{ form.student.studentNumber }}</div>
            <div>毕业时间：{{ form.student.graduationDate }}</div>
            <div>薪资：{{ form.salary }}</div>
            <div>岗位：{{ form.post }}</div>
        
            <div>备注：{{ form.remark || '无' }}</div>
            <div>创建时间：{{ form.createTime }}</div>
   
        </div>
    </el-dialog>
</template>

<script setup>
import {ref, defineProps, defineEmits,computed, watch} from 'vue'
import {useUserStore} from '@/stores/modules/user'
import {updateContract} from '@/api//contract.js'
import {uploadFile} from '@/api/index'
import dayjs from "dayjs";

const userStore = useUserStore()
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '详情'
    },

    cancel: {
        type: Function,
        default: () => {

        }
    },
    formData: {
        type: Object,
        default: () => {
            return {
                fileName: '',
                filePath: '',
                signDate: '',
                remark: '',
            }
        }
    },
})

const form = ref({...props.formData})
watch(
    () => props.formData,
    (newVal) => {
        form.value = {...newVal, signDate: dayjs(newVal?.signDate).format('YYYY-MM-DD')}
    },
    {deep: true, immediate: true}
)

// 当前状态
const status = computed(() => form.value.status ?? -1)
 
 
 
const updateVisible = (value) => {
    props.cancel(value)
}

const openFile = () => {
    if (form.value.contract?.filePath) {
        window.open(form.value.contract?.filePath)
    } else {
        userStore.$message({
            message: '文件不存在',
            type: 'warning'
        })
    }
}


</script>

<style lang="scss" scoped>
</style>
