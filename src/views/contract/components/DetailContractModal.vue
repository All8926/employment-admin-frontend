<template>
    <el-dialog :model-value="visible" :title="title" width="35%" @update:model-value="updateVisible">
        <div class="text-[16px] flex flex-col gap-4 pb-[20px]">
            <div>
                合同：
                <el-button link  type="primary" @click="openFile">{{ form.fileName }}</el-button>
            </div>
            <div>企业名称：{{ form.enterpriseName }}</div>
            <div>学生名称：{{ form.studentName }}</div>
            <div>
                学生简历：
                <el-button v-for="item in form.resumeList" :key="item.id" link  type="primary" @click="openFile(item)">{{ item.fileName }}</el-button>
                <span v-if="form.resumeList.length === 0">无</span>
            </div>
            <div>签约日期：{{ form.signDate }}</div>
            <div v-if="form.teacherName">审核老师：{{ form.teacherName }}</div>
            <div>备注：{{ form.remark || '无' }}</div>
            <div>创建时间：{{ form.createTime }}</div>
            <div>当前状态：
                <el-steps :active="activeStep" align-center finish-status="success">
                    <el-step title="企业提交" :status="stepStatus(0)" />
                    <el-step
                        :title="studentStepTitle"
                        :status="stepStatus(1)"
                        :description="status === 3 ? form.rejectReason : ''"
                    />
                    <el-step
                        :title="teacherStepTitle"
                        :status="stepStatus(2)"
                        :description="status === 4 ? form.rejectReason : ''"
                    />
                    <el-step
                        title="完成"
                        :status="stepStatus(3)"
                        v-if="status === 2"
                    />
                </el-steps>
            </div>
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

// 当前处于第几步
const activeStep = computed(() => {
    switch (status.value) {
        case 0: return 1 // 学生审核中
        case 1: return 2 // 老师审核中
        case 2: return 4 // 已完成
        case 3: return 1 // 学生拒绝
        case 4: return 2 // 老师拒绝
        default: return 0
    }
})

// 步骤状态计算
function stepStatus(stepIndex) {
    if (status.value === 3 && stepIndex === 1) return 'error'
    if (status.value === 4 && stepIndex === 2) return 'error'
    if (status.value === 2 && stepIndex === 3) return 'success' // 已完成
    if (activeStep.value > stepIndex) return 'success'
    if (activeStep.value === stepIndex) return 'process'
    return 'wait'
}

// 步骤标题（支持拒绝情况）
const studentStepTitle = computed(() =>
    status.value === 3 ? '学生拒绝' : '学生审核'
)
const teacherStepTitle = computed(() =>
    status.value === 4 ? '老师拒绝' : '老师审核'
)

const emit = defineEmits(['submit'])

const updateVisible = (value) => {
    props.cancel(value)
}

const openFile = (item) => {
    if (item.filePath) {
        window.open(item.filePath)
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
