<template>
	<el-dialog :model-value="visible" @update:model-value="updateVisible" :title="title" width="35%">
		<el-form :model="form" label-width="100px">

			<el-form-item label="岗位">
				<el-input v-model="form.post" placeholder="请输入岗位"></el-input>
			</el-form-item>

			<el-form-item label="薪资">
				<el-input v-model="form.salary" placeholder="请输入薪资"></el-input>
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
import { ref, defineProps, defineEmits, computed, watch } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { editSignInfo } from '@/api/signInfo'
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
				post: '',
				salary: '', 
				remark: '',
			}
		}
	},
})

const form = ref({ ...props.formData })
watch(
	() => props.formData,
	(newVal) => {
		form.value = { ...newVal }
	},
	{ deep: true, immediate: true }
)

const emit = defineEmits(['submit'])

const updateVisible = (value) => {
	props.cancel(value)
}

// 提交
const handleSubmit = async () => {

	try {
		await editSignInfo(form.value)
		ElMessage.success('操作成功')
		updateVisible(false)
		resetForm()
		emit('submit')
	} catch (error) {
		console.log(error)
	}
}


// 重置表单
const resetForm = () => {
	form.value = {
		post: '',
		salary: '', 
		remark: '',
	}
}


</script>

<style lang="scss" scoped>
</style>
