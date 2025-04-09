<template>
	<div class="w-[30%] m-auto mt-[50px]">
		<el-form :model="form" ref="formRef" :rules="rules" label-width="120px">
			<el-form-item label="账号" prop="userAccount">
				<el-input v-model="form.userAccount" />
			</el-form-item>
			<el-form-item label="密码" prop="userPassword">
				<el-input type="password" v-model="form.userPassword" />
			</el-form-item>
			<el-form-item label="姓名" prop="userName">
				<el-input v-model="form.userName" />
			</el-form-item>
			<el-form-item label="性别" prop="gender">
				<el-radio-group v-model="form.gender">
					<el-radio :label="0">男</el-radio>
					<el-radio :label="1">女</el-radio> 
				</el-radio-group>
			</el-form-item>
			<el-form-item label="学号" prop="studentNumber">
				<el-input v-model="form.studentNumber" />
			</el-form-item>
			<el-form-item label="部门" prop="deptId">
				<el-tree-select placeholder="请选择部门" v-model="form.deptId" :data="treeData" :props="{ value: 'id', label: 'name' }" node-key="id" /> 
			</el-form-item>
			<el-form-item label="手机号" prop="phone">
				<el-input v-model="form.phone" />
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="form.email" />
			</el-form-item>
			<el-form-item label="用户简介" prop="userProfile">
				<el-input type="textarea" v-model="form.userProfile" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm">注册</el-button>
				<el-button   @click="backLogin">返回登录</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { departmentTree } from '@/api/department'
import { ElMessage } from 'element-plus'
import { register } from '@/api/student'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = ref({
	userAccount: 'qqq1',
	userPassword: '123456',
	userName: '学生1',
	gender: 0,
	studentNumber: '2025125296552',
	deptId: null,
	phone: '',
	email: '',
	userProfile: ''
})
const formRef = ref(null)

const rules = {
	userAccount: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
	userPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
	studentNumber: [{ required: true, message: '学号不能为空', trigger: 'blur' }],
	deptId: [{ required: true, message: '部门不能为空', trigger: 'change' }]
}

const treeData = ref([])

const getDepartmentTree = async () => {
	try {
		const res = await departmentTree()
		treeData.value = res.data
		console.log(treeData.value);

	} catch (error) {
		ElMessage.error('获取部门数据失败')
	}
}
getDepartmentTree()

const submitForm = () => {
	// 提交表单逻辑
  formRef.value.validate(async valid => {
    if (valid) {
      try {
        const res = await register(form.value)
        ElMessage.success('注册成功')
        // 跳转到登录页面
        router.push('/login')
      } catch (error) {
        ElMessage.error('注册失败')
      }
    } else {
      ElMessage.error('请填写完整信息')
    }
	})
}
const backLogin = () => {
	router.replace('/login')
}
</script>

<style lang="less" scoped>
</style>