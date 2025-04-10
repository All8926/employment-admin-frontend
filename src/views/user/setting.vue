<template>
	<div>
		<el-form :model="form"  >
			<el-form-item label="姓名">
				<el-input v-model="form.userName" placeholder="请输入姓名"></el-input>
			</el-form-item>
			<el-form-item label="学号" v-if="userinfo?.userRole === 'student'">
				<el-input v-model="form.studentNumber" placeholder="请输入学号"></el-input>
			</el-form-item>
			<el-form-item label="编号" v-if="userinfo?.userRole === 'teacher'">
				<el-input v-model="form.teacherNumber" placeholder="请输入编号"></el-input>
			</el-form-item>
			<el-form-item label="职务" v-if="userinfo?.userRole === 'teacher'">
				<el-input v-model="form.job" placeholder="请输入职务"></el-input>
			</el-form-item>
			<el-form-item label="学历" v-if="userinfo?.userRole === 'teacher'">
				<el-input v-model="form.qualification" placeholder="请输入职务"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-select v-model="form.gender" placeholder="请选择性别">
					<el-option label="男" :value="0"></el-option>
					<el-option label="女" :value="1"></el-option>
          <el-option label="未知" :value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="邮箱">
				<el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
			</el-form-item>
			<el-form-item label="电话">
				<el-input v-model="form.phone" placeholder="请输入电话"></el-input>
			</el-form-item>
			<el-form-item label="部门">
				<el-tree-select placeholder="请选择部门" v-model="form.deptId" :data="treeData"
					:props="{ value: 'id', label: 'name' }" node-key="id" />
			</el-form-item>
			<el-form-item label="简介">
				<el-input v-model="form.userProfile" type="textarea" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="handleSubmit">
					提交修改
				</el-button>
			</el-form-item>

		</el-form>
	</div>
</template>

<script setup>
import { editUser } from '@/api/index'
import { ref, reactive, onMounted } from 'vue'
import {useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()

const form = ref(userStore?.userinfo)
const treeData = userStore?.departmentDate
// 修改用户信息
const handleSubmit = async () => {
	try {
		await editUser(form.value)
		ElMessage.success('修改成功')
	} catch (error) {
		console.log(error)
	}

}


</script>

<style lang="scss" scoped>
</style>