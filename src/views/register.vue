<template>
	<div class="w-[30%] m-auto mt-[50px]">
		<el-tabs type="border-card">
			<el-tab-pane label="学生注册">
				<el-form :model="studentForm" ref="studentFormRef" :rules="studentRules" label-width="120px">
					<el-form-item label="账号" prop="userAccount">
						<el-input v-model="studentForm.userAccount" />
					</el-form-item>
					<el-form-item label="密码" prop="userPassword">
						<el-input type="password" v-model="studentForm.userPassword" />
					</el-form-item>
					<el-form-item label="姓名" prop="userName">
						<el-input v-model="studentForm.userName" />
					</el-form-item>
					<el-form-item label="性别" prop="gender">
						<el-radio-group v-model="studentForm.gender">
							<el-radio :label="0">男</el-radio>
							<el-radio :label="1">女</el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="学号" prop="studentNumber">
						<el-input v-model="studentForm.studentNumber" />
					</el-form-item>
					<el-form-item label="部门" prop="deptId">
						<el-tree-select check-strictly placeholder="请选择部门" v-model="studentForm.deptId" :data="treeData"
							:props="{ value: 'id', label: 'name' }" node-key="id" />
					</el-form-item>
					<el-form-item label="手机号" prop="phone">
						<el-input v-model="studentForm.phone" />
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="studentForm.email" />
					</el-form-item>
					<el-form-item label="用户简介" prop="userProfile">
						<el-input type="textarea" v-model="studentForm.userProfile" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitStudentForm">注册</el-button>
						<el-button @click="backLogin">返回登录</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="企业注册">
				<el-form :model="enterpriseForm" ref="enterpriseFormRef" :rules="enterpriseRules" label-width="120px">
					<el-form-item label="账号" prop="userAccount">
						<el-input v-model="enterpriseForm.userAccount" />
					</el-form-item>
					<el-form-item label="密码" prop="userPassword">
						<el-input type="password" v-model="enterpriseForm.userPassword" />
					</el-form-item>
					<el-form-item label="姓名" prop="userName">
						<el-input v-model="enterpriseForm.userName" />
					</el-form-item>
					<el-form-item label="性别" prop="gender">
						<el-radio-group v-model="enterpriseForm.gender">
							<el-radio :label="0">男</el-radio>
							<el-radio :label="1">女</el-radio>
						</el-radio-group>
					</el-form-item>

					<el-form-item label="企业名称" prop="enterpriseName">
						<el-input v-model="enterpriseForm.enterpriseName" />
					</el-form-item>

					<el-form-item label="手机号" prop="phone">
						<el-input v-model="enterpriseForm.phone" />
					</el-form-item>
					<el-form-item label="邮箱" prop="email">
						<el-input v-model="enterpriseForm.email" />
					</el-form-item>
					<el-form-item label="用户简介" prop="userProfile">
						<el-input type="textarea" v-model="enterpriseForm.userProfile" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submitEnterpriseForm">注册</el-button>
						<el-button @click="backLogin">返回登录</el-button>
					</el-form-item>
				</el-form>
			</el-tab-pane>
		</el-tabs>

	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { departmentTree } from '@/api/department'
import { ElMessage } from 'element-plus'
import { studentRegister } from '@/api/student'
import { enterpriseRegister } from '@/api/enterprise'
import { useRouter } from 'vue-router'

const router = useRouter()

const studentForm = ref({
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
const enterpriseForm = ref({
	userAccount: '1',
	userPassword: '123456',
	userName: '企业1',
	gender: 0,
	enterpriseName: '百度科技有限公司',
	phone: '',
	email: '',
	userProfile: ''
})
const studentFormRef = ref(null)
const enterpriseFormRef = ref(null)

const studentRules = {
	userAccount: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
	userPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
	studentNumber: [{ required: true, message: '学号不能为空', trigger: 'blur' }],
	deptId: [{ required: true, message: '部门不能为空', trigger: 'change' }]
}

const enterpriseRules = {
	userAccount: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
	userPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
	enterpriseName: [{ required: true, message: '企业名称不能为空', trigger: 'blur' }], 
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

// 学生注册提交
const submitStudentForm = () => { 
	studentFormRef.value.validate(async valid => {
		if (valid) {
			try {
				const res = await studentRegister(studentForm.value)
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

// 企业注册提交
const submitEnterpriseForm = () => {
	enterpriseFormRef.value.validate(async valid => {
		if (valid) {
			try {
				const res = await enterpriseRegister(enterpriseForm.value)
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
