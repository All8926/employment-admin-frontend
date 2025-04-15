<template>
    <el-dialog :model-value="visible" :title="title" width="40%" @update:model-value="updateVisible">
        <el-form :disabled="disabled" :model="form" label-width="100">
            <el-form-item label="姓名">
                <el-input v-model="form.userName" placeholder="请输入姓名"></el-input>
            </el-form-item>
            <el-form-item label="学号">
                <el-input v-model="form.studentNumber" placeholder="请输入学号"></el-input>
            </el-form-item>
            <el-form-item label="性别">
                <el-select v-model="form.gender" placeholder="请选择性别">
                    <el-option :value="0" label="男"></el-option>
                    <el-option :value="1" label="女"></el-option>
                    <el-option :value="2" label="未知"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item label="电话">
                <el-input v-model="form.phone" placeholder="请输入电话"></el-input>
            </el-form-item>
            <el-form-item label="部门">
                <el-tree-select v-model="form.deptId" :data="treeData" :props="{ value: 'id', label: 'name' }"
                                node-key="id" placeholder="请选择部门"/>
            </el-form-item>
            <el-form-item label="毕业时间">
                <el-date-picker
                        v-model="form.graduationDate"
                        placeholder="请选择时间"
                        type="date"
                        value-format="YYYY-MM-DD"
                />
            </el-form-item>
            <el-form-item label="毕业去向">
                <el-cascader v-model="form.graduationGoes" :options="cityList" :props="cascaderProps" :show-all-levels="false"
                             clearable placeholder="请选择毕业去向"/>
            </el-form-item>
            <el-form-item label="无去向原因">
                <el-input v-model="form.notGoesReason" placeholder="请输入无去向原因"></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="form.userProfile" type="textarea"/>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-input v-model="form.createTime" placeholder="请输入创建时间" readonly/>
            </el-form-item>

        </el-form>
        <template #footer>
            <div v-if="!disabled && title === '修改'" class="dialog-footer">
                <el-button @click="cancel()">取消</el-button>
                <el-button type="primary" @click="handleSubmit">
                    确定
                </el-button>
            </div>
            <div v-if="title === '审核'" class="dialog-footer">
                <el-button type="danger" @click="handleStatus(0)">拒绝</el-button>
                <el-button type="success" @click="handleStatus(1)">
                    通过
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import {ref, defineProps, defineEmits, computed} from 'vue'
import {useUserStore} from '@/stores/modules/user'
import {updateStudent} from '@/api/student'
import {cityList} from '@/utils/city'
import {userAudit} from '@/api/index'

const cascaderProps = {label: "cityName", value: "cityName", children: "citys"}

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
                userProfile: ''
            }
        }
    },
    cancel: {
        type: Function,
        default: () => {

        }
    },
})

const disabled = computed(() => props.title !== '修改')
const form = computed(() => props.formData)
const treeData = userStore?.departmentDate


const emit = defineEmits(['submit'])

const updateVisible = (value) => {
    props.cancel(value)
}

// 提交更新
const handleSubmit = async () => {
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
    let {id, userAccount, userRole} = form.value
    let params = {id, userAccount, userRole, status}
    if(status){
       return  handleUserAudit(params)
    }
    ElMessageBox.prompt('请输入拒绝原因', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
    }).then(({value}) => {
     params.rejectReason = value
        handleUserAudit(params)
    })
}

// 发送审核请求
const handleUserAudit = async (params) => {
    try {
          await userAudit(params)
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
