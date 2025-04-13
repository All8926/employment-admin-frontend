<template>
	<div class="flex flex-col gap-4">
		<el-card shadow="never">
			<el-form :model="queryParams" inline class="form-inline">
				<el-form-item label="合同名称" >
					<el-input v-model="queryParams.fileName" placeholder="请输入合同名称"></el-input>
				</el-form-item>
				<el-form-item label="企业" v-if="userInfo?.userRole !== 'enterprise'">
					<el-input v-model="queryParams.enterpriseName" placeholder="请输入企业名称"></el-input>
				</el-form-item>
				<el-form-item label="学生" v-if="userInfo?.userRole !== 'student'">
					<el-input v-model="queryParams.studentName" placeholder="请输入学生姓名"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="queryParams.status" clearable placeholder="请选择状态">
						<el-option label="审核中" :value="0"></el-option>
						<el-option label="已完成" :value="2"></el-option>
						<el-option label="已拒绝" :value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button @click="handleReset">重置</el-button>
					<el-button type="primary" @click="handleSearch">查询</el-button>
				</el-form-item>
			</el-form>

		</el-card>
		<el-card shadow="never">
			<div class="flex justify-between items-center mb-[20px]">
				<div>合同列表</div>
				<div class="flex gap-2 items-center">
					 <el-button type="primary" v-if="userStore?.userinfo?.userRole === 'enterprise'" @click="handleCreateVisible(true)">新建</el-button>
					<el-icon size="20" @click="getList">
						<RefreshRight />
					</el-icon>
				</div>
			</div>
			<el-table :data="tableData" style="width: 100%" :cell-style="{textAlign: 'center'}"
				:header-cell-style="{textAlign: 'center',backgroundColor: '#f5f7fa'}" empty-text="暂无数据">
				<el-table-column type="index" width="50" />
				<el-table-column prop="fileName" label="合同名称" />
				<el-table-column prop="enterpriseName" label="企业名称" v-if="userInfo?.userRole !== 'enterprise'" />
				<el-table-column prop="studentName" label="学生姓名" v-if="userInfo?.userRole !== 'student'" />
				<el-table-column prop="signDate" label="签约时间"  />


				<el-table-column prop="status" label="当前状态">
					<template #default="scope">
						<el-tag type="primary" effect="dark" v-if="scope.row.status === 0">待学生审核</el-tag>
						<el-tag type="primary" effect="dark" v-if="scope.row.status === 1">待老师审核</el-tag>
						<el-tag type="success" effect="dark" v-if="scope.row.status === 2">已完成</el-tag>
						<el-tag type="danger" effect="dark" v-if="scope.row.status === 3">学生拒绝</el-tag>
						<el-tag type="danger" effect="dark" v-if="scope.row.status === 4">老师拒绝</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="备注" />
				<el-table-column prop="createTime" label="创建时间" />

				<el-table-column fixed="right" label="操作" min-width="120">
					<template #default="scope">
						<el-button @click="openModal(scope.row, '修改')" v-if="userInfo?.userRole === 'enterprise' && scope.row.status === 0" link type="primary" >修改</el-button>
						<el-button @click="openAuditVisible(scope.row)" v-if="auditStatus(scope.row)" link type="warning" >审核</el-button>
						<el-button @click="() => {handleDetailVisible(true), currentRow = scope.row}"  link type="primary" >详情</el-button>

						<el-button v-if="userInfo?.userRole === 'enterprise'" link type="danger"  @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="flex justify-end mt-4">
				<el-pagination v-model:current-page="queryParams.current" v-model:page-size="queryParams.pageSize" background
					layout="total,  prev, pager, next" :total="total" @current-change="getList">
				</el-pagination>
			</div>
		</el-card>
    <UpdateContractModal :visible="visible" :cancel="(value) => handleVisible(value)" @submit="getList" :formData="currentRow" />
		<CreateContractModal :visible="createVisible"  :cancel="(value) => handleCreateVisible(value)" @submit="getList"  />
		<DetailContractModal :visible="deleteVisible"  :formData="currentRow" :cancel="(value) => handleDetailVisible(value)" />

		<AuditDialog :visible="auditVisible"  @update:visible="(value) => auditVisible = value" @handleSubmit="handleAudit" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { contractList, deleteContract ,auditContract} from '@/api/contract.js'

import { RefreshRight } from '@element-plus/icons-vue'
import { useUserStore } from "@/stores/modules/user.js";
import CreateContractModal from "./components/CreateContractModal.vue";
import UpdateContractModal from './components/UpdateContractModal.vue';
import DetailContractModal from './components/DetailContractModal.vue';
import AuditDialog from "@/components/Dialog/AuditDialog.vue";
const userStore = useUserStore()
const userInfo = userStore.userinfo

const tableData = ref([])
const total = ref(0)
const queryParams = ref({
	fileName: '',
	status: null,
	signDate: null,
	enterpriseName: null,
	studentName: null,
	teacherName: null,
	current: 1,
	pageSize: 10
})

const modalTitle = ref('')
const visible = ref(false)
const currentRow = ref(null)
const createVisible = ref(false)
const deleteVisible = ref(false)
const auditVisible = ref(false)


const handleVisible = (val) => {
	visible.value = val
}
const handleCreateVisible = (val) => {
	createVisible.value = val
}


// 详情弹窗
const handleDetailVisible = (val) => {
	deleteVisible.value = val
}

const getList = async () => {
	const { data } = await contractList(queryParams.value)
	tableData.value = data.records
	total.value = Number(data.total)
	console.log(tableData.value, 'tableData.value');
}

// 条件查询
const handleSearch = () => {
	getList()
}

const openModal = (row,title) => {
  currentRow.value = row
  modalTitle.value = title
  handleVisible(true)
}

// 打开审核弹窗
const openAuditVisible = (row) => {
  currentRow.value = row
 		auditVisible.value = true
}



// 审核按钮是否显示
const auditStatus = (row) => {
	const userRole = userInfo?.userRole
	if (userRole === 'teacher') {
		return row.status === 1
	} else if (userRole === 'student') {
		return row.status === 0
	}
	return false
}

// 删除操作
const handleDelete = (row) => {
	console.log(row, 'row');
  ElMessageBox.confirm(
    '确定删除这个简历吗?',
    '提示',
    {
      type: 'warning',
    }
  )
    .then(async () => {
     await deleteContract({id: row.id})
      ElMessage.success('删除成功')
      getList()
    })
    .catch(() => {
     handleVisible(false)
    })
}


// 审核操作
const handleAudit = async (auditForm) => {
	try {
		await  auditContract({
				...auditForm,
			id: currentRow.value.id
		})
		getList()
		auditVisible.value = false
		ElMessage.success('操作成功')
	} catch (error){
		console.log(error)
	}

}

// 重置搜索条件
const handleReset = () => {
	for (const key in queryParams.value) {
		if (key !== 'pageSize' && key !== 'current') {
			queryParams.value[key] = null;
		}
	}
	getList()
}


getList()
</script>

<style lang="less" scoped>
.form-inline .el-input {
	--el-input-width: 180px;
}

.form-inline .el-select {
	--el-select-width: 180px;
}
</style>
