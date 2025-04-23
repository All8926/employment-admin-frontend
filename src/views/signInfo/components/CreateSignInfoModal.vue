<template>
	<el-dialog :model-value="visible" @update:model-value="updateVisible" :title="title" width="35%">
		<el-form :model="form" label-width="80px">
			<el-form-item label="合同">
				<el-select v-model="form.contractId" placeholder="请选择合同">
					<el-option v-for="item in contractData" :key="item.id" :label="item.fileName" :value="item.id"></el-option>
				</el-select>
			</el-form-item>

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
import { ref, defineProps, defineEmits, computed } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import { contractList } from '@/api/contract'
import { addSignInfo } from '@/api/signInfo'

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
	post: '',
	salary: '',
	contractId: null,
	remark: '',
})

const contractData = ref([])

const emit = defineEmits(['submit'])

const updateVisible = (value) => {
	props.cancel(value)
}

// 提交
const handleSubmit = async () => {

	try {
		await addSignInfo(form.value)
		ElMessage.success('操作成功')
		updateVisible(false)
		resetForm()
		emit('submit')
	} catch (error) {
		console.log(error)
	}
}

// 获取合同列表
const getContractList = async () => {
	try {
		const { data } = await contractList({ pageSize: 999,status:2 })
		contractData.value = data.records
	} catch (error) {
		console.log(error)
	}
}
getContractList()


// 重置表单
const resetForm = () => {
	form.value = {
		post: '',
		salary: '',
		contractId: null,
		remark: '',
	}
}


</script>

<style lang="scss" scoped>
</style>
