<template>
	<div class="flex flex-col w-[25%]  ml-[30%]">
		<div class="flex justify-center mb-[20px]">
			<el-upload action="string" :http-request="handeUpload" :show-file-list="false" :on-success="handleAvatarSuccess"
				:before-upload="beforeAvatarUpload">
				<img v-if="form.userAvatar" :src="form.userAvatar" class="w-[80px] h-[80px] rounded-full" />
				<el-avatar v-else :size="50" :src="form?.userAvatar">
					<el-icon size="30">
						<UploadFilled />
					</el-icon>
				</el-avatar>
			</el-upload>
		</div>
		<el-form :model="form">
			<el-form-item label="姓名">
				<el-input v-model="form.userName" placeholder="请输入姓名"></el-input>
			</el-form-item>
			<el-form-item label="学号" v-if="form?.userRole === 'student'">
				<el-input v-model="form.studentNumber" placeholder="请输入学号"></el-input>
			</el-form-item>
			<el-form-item label="编号" v-if="form?.userRole === 'teacher'">
				<el-input v-model="form.teacherNumber" placeholder="请输入编号"></el-input>
			</el-form-item>
			<el-form-item label="职务" v-if="form?.userRole !== 'student'">
				<el-input v-model="form.job" placeholder="请输入职务"></el-input>
			</el-form-item>
			<el-form-item label="学历" v-if="form?.userRole === 'teacher'">
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
			<el-form-item label="部门" v-if="form?.userRole !== 'enterprise'">
				<el-tree-select placeholder="请选择部门" v-model="form.deptId" :data="treeData"
					:props="{ value: 'id', label: 'name' }" node-key="id" />
			</el-form-item>
			<el-form-item label="统一社会信用代码" v-if="form?.userRole == 'enterprise'">
				<el-input v-model="form.licenseNum" placeholder="请输入统一社会信用代码"></el-input>
			</el-form-item>
			<el-form-item label="办公地址" v-if="form?.userRole == 'enterprise'">
				<el-input v-model="form.address" placeholder="请输入办公地址"></el-input>
			</el-form-item>
			<el-form-item label="经营范围" v-if="form?.userRole == 'enterprise'">
				<el-input v-model="form.businessScope" placeholder="请输入经营范围"></el-input>
			</el-form-item>
			<el-form-item label="所属行业" v-if="form?.userRole == 'enterprise'">
				<el-input v-model="form.industry" placeholder="请输入所属行业"></el-input>
			</el-form-item>
			<el-form-item label="简介">
				<el-input v-model="form.userProfile" type="textarea" />
			</el-form-item>
			<div class="flex justify-center">
				<el-button type="primary" @click="handleSubmit">
					提交修改
				</el-button>
			</div>

		</el-form>
	</div>
</template>

<script setup>
import { editUser, uploadFile } from '@/api/index'
import { ref, reactive, onMounted } from 'vue'
import { UploadFilled, Avatar } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/modules/user'
const userStore = useUserStore()

const form = ref(userStore?.userinfo)
const treeData = userStore?.departmentDate
const formData = ref(null)
// 提交修改
const handleSubmit = async () => {
	try {
		if (formData.value) {
			const res = await uploadFile(formData.value, 'user_avatar')
			let avatarUrl = res.data
			form.value.userAvatar = avatarUrl
		}
		await editUser(form.value)
		userStore?.getUserInfo()
		formData.value = null
		ElMessage.success('修改成功')
		
	} catch (error) {
		console.log(error)
	}

}


// 校验文件格式
const checkFileFormat = (fileName) => {
	const validFormats = ['jpg', 'jpeg', 'png'];
	const fileExtension = fileName.split('.').pop().toLowerCase();
	return validFormats.includes(fileExtension);
}
const handleAvatarSuccess = async (response, file) => {
	console.log(response, file);
	let url = URL.createObjectURL(file.raw)
	console.log(url);
	form.value.userAvatar = url
	let requestFile = new FormData()
	requestFile.append('file', file.raw)
	formData.value = requestFile


}

// 上传前校验
const beforeAvatarUpload = (rawFile) => {
	console.log(rawFile);

	if (!checkFileFormat(rawFile.name)) {
		ElMessage.error('文件格式不正确!')
		return false
	}
	if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('文件大小不能超过2MB!')
		return false
	}
	return true
}

const handeUpload = async (options) => {
	console.log(options);

}


</script>

<style lang="scss" scoped>
</style>