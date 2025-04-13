<template>
	<el-dialog :model-value="visible" @update:model-value="updateVisible" :title="title" width="30%">
		<el-form :model="form" label-width="100px" :rules="rules">
			<el-form-item label="上传合同"   required>
				<el-upload ref="uploadRef" action="string" :http-request="handleSuccess" :on-remove="handleRemove" :on-exceed="handleExceed"
					:before-upload="beforeUpload" :limit="1" style="width: 100%;">
					<template #trigger>
						<el-button type="primary">选择文件</el-button>
					</template>
					<template #tip>
						<div class="el-upload__tip">只能上传pdf文件，且不超过2M</div>
					</template>
				</el-upload>
			</el-form-item>

			<el-form-item label="名称" prop="fileName"  >
				<el-input v-model="form.fileName" placeholder="请输入合同名称"></el-input>
			</el-form-item>

			<el-form-item label="签约日期" prop="signDate">
				<el-date-picker
						v-model="form.signDate"
						type="date"
						placeholder="请选择签约日期"
						value-format="YYYY-MM-DD"
				/>
			</el-form-item>
			<el-form-item label="学生姓名" prop="studentName"  >
				<el-input v-model="form.studentName" placeholder="请输入学生姓名"></el-input>
			</el-form-item>
			<el-form-item label="学生账号" prop="studentAccount"  >
				<el-input v-model="form.studentAccount" placeholder="请输入学生姓名"></el-input>
			</el-form-item>



			<el-form-item label="备注">
				<el-input v-model="form.remark" type="textarea" />
			</el-form-item>

		</el-form>
		<template #footer>
			<div class="dialog-footer">
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
import { addContract } from '@/api/contract'
import { uploadFile } from '@/api/index'

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
	filePath: '',
	studentName: '',
	studentAccount: '',
	signDate: '',
	remark: '',
})

const contractFile = ref(null)
const uploadRef = ref(null)

const rules = {
	fileName: [
		{ required: true, message: '请输入合同名称', trigger: 'blur' },
	],
	signDate: [
		{ required: true, message: '请选择签约日期', trigger: 'blur' },
	],
	studentName: [
		{ required: true, message: '请输入学生姓名', trigger: 'blur' },
	],
	studentAccount: [
		{ required: true, message: '请输入学生账号', trigger: 'blur' },
	],

}

const emit = defineEmits(['submit'])

const updateVisible = (value) => {
	props.cancel(value)
}

// 提交
const handleSubmit = async () => {
	if (!form.value.fileName) {
		return ElMessage.error('请输入合同名称')
	}
	if (!contractFile.value) {
		return ElMessage.error('请上传合同')

	}
	try {
		if (contractFile.value) {
			const res = await uploadFile(contractFile.value, 'contract_file')
			let filePath = res.data
			form.value.filePath = filePath
		}
		await addContract(form.value)
		ElMessage.success('操作成功')
		updateVisible(false)
    	resetForm()
		emit('submit')
	} catch (error) {
		console.log(error)
	}
}

// 文件超出限制
const handleExceed = (files) => {
	ElMessage.warning('只能上传一个文件')
}

// 文件删除
const handleRemove = (file, fileList) => {
	contractFile.value = null
}

// 上传成功
const handleSuccess = async (res) => {
	console.log(res);
	let file = res.file
	let requestFile = new FormData()
	requestFile.append('file', file)
	contractFile.value = requestFile
	form.value.fileName = file.name
}


// 上传前校验
const beforeUpload = (rawFile) => {
	console.log(rawFile);

	if (rawFile.type !== 'application/pdf') {
		ElMessage.error('文件格式不正确!')
		return false
	}
	if (rawFile.size / 1024 / 1024 > 2) {
		ElMessage.error('文件大小不能超过2MB!')
		return false
	}
	return true
}

// 重置表单
const resetForm = () => {
	form.value = {
		fileName: '',
		isActive: 0,
		remark: '',
    filePath: ''
	}
  uploadRef.value.clearFiles()
	contractFile.value = null
}


</script>

<style lang="scss" scoped>
</style>
