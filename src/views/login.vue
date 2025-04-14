<template>
	<div class="w-[20%] m-auto mt-[100px]">
		<div class="text-center text-3xl mb-[50px]">就业信息管理系统.</div>
		<el-form :model="form" ref="formRef" :rules="rules" label-width="auto" size="large">
			<el-form-item label="账号" prop="userAccount">
				<el-input v-model="form.userAccount" />
			</el-form-item>
			<el-form-item label="密码" prop="userPassword">
				<el-input type="password" v-model="form.userPassword" />
			</el-form-item>
			<el-form-item label="角色" prop="userRole">
				<el-radio-group v-model="form.userRole">
					<el-radio value="student">学生</el-radio>
					<el-radio value="teacher">教师</el-radio>
					<el-radio value="enterprise">企业</el-radio>
				</el-radio-group>
			</el-form-item>
			<div class="mb-[15px] text-[12px] text-[#999999]">提示：管理员账号为admin/123456，选择教师</div>
			<div class="mb-[15px]">
				<el-button style="width: 100%;"   type="primary" @click="handleLogin">登录</el-button>
			</div>
			<div>
				<el-button style="width: 100%;" @click="toRegister">前往注册</el-button>
			</div>
		</el-form>
	</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { departmentTree } from '@/api/department'
import { ElMessage } from 'element-plus'
import { login } from '@/api/index'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()

const router = useRouter()

const form = ref({
	userAccount: 'qqq1',
	userPassword: '123456',
	userRole: 'student',
})
const formRef = ref(null)

const rules = {
	userAccount: [{ required: true, message: '账号不能为空', trigger: 'blur' }],
	userPassword: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
	userRole: [{ required: true, message: '部门不能为空', trigger: 'change' }]
}



const getDepartmentTree = async () => {
	try {
		const res = await departmentTree()
		userStore.departmentDate = res.data
	} catch (error) {
		ElMessage.error('获取部门数据失败')
	}
}


const handleLogin = () => {
	// 提交表单逻辑
  formRef.value.validate(async valid => {
    if (valid) {
      try {
        const res = await login(form.value)
				await getDepartmentTree()
        ElMessage.success('登录成功')
        // 跳转到登录页面
        router.push('/')
      } catch (error) {
      }
    } else {
      ElMessage.error('请填写完整信息')
    }
	})
}

const toRegister = () => {
	router.replace('/register')
}

</script>

<style lang="less" scoped>
</style>
