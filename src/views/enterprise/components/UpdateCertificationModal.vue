<template>
	<el-dialog :model-value="visible" @update:model-value="updateVisible" :title="title" width="35%">
		<el-form :model="form" label-width="100px">
			<el-form-item label="上传新的资质">
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

			<el-form-item label="名称">
				<el-input v-model="form.fileName" placeholder="请输入资质名称"></el-input>
			</el-form-item>
			<el-form-item label="类型">
				<el-input v-model="form.certType" placeholder="请输入资质类型"></el-input>
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
import {ref, defineProps, defineEmits, computed, watch} from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { updateCertification } from '@/api/enterprise'
import { uploadFile } from '@/api/index'

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
				certType: 0,
				remark: '',
				filePath: '',
			}
		}
	},
})

const form = ref({...props.formData})
watch(
		() => props.formData,
		(newVal) => {
			form.value = { ...newVal}
		},
		{ deep: true, immediate: true }
)

const resumeFile = ref(null)
const uploadRef = ref(null)

const emit = defineEmits(['submit'])

const updateVisible = (value) => {
	props.cancel(value)
}

// 提交
const handleSubmit = async () => {
	if (!form.value.fileName) {
		return ElMessage.error('请输入资质名称')

	}
	try {
		if (resumeFile.value) {
			const res = await uploadFile(resumeFile.value, 'enterprise_certificate')
			let filePath = res.data
			form.value.filePath = filePath
		}
		await updateCertification(form.value)
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
	resumeFile.value = null
}

// 上传成功
const handleSuccess = async (res) => {
	console.log(res);
	let file = res.file
	let requestFile = new FormData()
	requestFile.append('file', file)
	resumeFile.value = requestFile
	form.value.fileName = file.name
}

// 校验文件格式
const checkFileFormat = (fileName) => {
	const validFormats = ['jpg', 'jpeg', 'png','pdf'];
	const fileExtension = fileName.split('.').pop().toLowerCase();
	return validFormats.includes(fileExtension);
}

// 上传前校验
const beforeUpload = (rawFile) => {
	console.log(rawFile);
	if (!checkFileFormat(rawFile.name)) {
		ElMessage.error('文件格式不正确！')
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
	}
	resumeFile.value = null
	uploadRef.value.clearFiles()
}


</script>

<style lang="scss" scoped>
</style>
