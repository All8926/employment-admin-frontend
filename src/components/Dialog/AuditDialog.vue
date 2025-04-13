<template>
    <el-dialog :model-value="visible" title="提示" width="30%" @update:model-value="updateVisible">
        <el-form :model="auditForm">

            <el-form-item :label="'是否'+confirmText" required>
                <el-select v-model="auditForm.status" placeholder="请选择">
                    <el-option :label="confirmText" :value="1"/>
                    <el-option :value="0" label="拒绝"/>
                </el-select>
            </el-form-item>
            <el-form-item v-if="auditForm.status === 0" label="拒绝原因" required>
                <el-input v-model="auditForm.rejectReason" type="textarea"/>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="updateVisible(false)">取消</el-button>
                <el-button type="primary" @click="handleAudit">
                    提交
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import {ref, defineEmits, defineProps} from 'vue'
import {auditContract} from "@/api/contract.js";

const emit = defineEmits(['update:visible', 'handleSubmit' ])
const props = defineProps({
    visible: {
        type: Boolean,
        default: false
    },
    confirmText: {
        type: String,
        default: '同意'
    },
    cancel: {
        type: Function,
        default: () => {

        }
    },
})

const auditForm = ref({
    status: null,
    rejectReason: null
})
const updateVisible = (value) => {
    emit('update:visible', value)
}

// 审核操作
const handleAudit = async () => {
    const status = auditForm.value.status
    if (status === null) {
        ElMessage.error('请选择审核状态')
        return
    }
    if (status === 0 && !auditForm.value.rejectReason) {
        ElMessage.error('请输入拒绝原因')
        return
    }
    emit('handleSubmit', auditForm.value)
}

</script>

<style lang="less" scoped>

</style>
