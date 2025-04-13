<template>
	<div class="flex flex-col gap-4">
		<el-card shadow="never">
			<el-form :model="queryParams" inline class="form-inline">
				<el-form-item label="名称">
					<el-input v-model="queryParams.fileName" placeholder="请输入简历名称"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="queryParams.isActive" clearable placeholder="请选择状态">
						<el-option label="未生效" :value="0"></el-option>
						<el-option label="生效中" :value="1"></el-option>
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
				<div>简历列表</div>
				<div class="flex gap-2 items-center">
					 <el-button type="primary" v-if="userStore?.userinfo?.userRole === 'student'" @click="handleCreateVisible(true)">新建</el-button>
					<el-icon size="20" @click="getList">
						<RefreshRight />
					</el-icon>
				</div>
			</div>
			<el-table :data="tableData" style="width: 100%" :cell-style="{textAlign: 'center'}"
				:header-cell-style="{textAlign: 'center',backgroundColor: '#f5f7fa'}" empty-text="暂无数据">
				<el-table-column type="index" width="50" />
				<el-table-column prop="userName" label="创建人" v-if="userInfo?.userRole !== 'student'" />
				<el-table-column prop="fileName" label="简历名称" />

				<el-table-column prop="isActive" label="是否生效版本">
					<template #default="scope">
						<el-tag type="warning" effect="dark" v-if="scope.row.isActive === 0">否</el-tag>
						<el-tag type="success" effect="dark" v-if="scope.row.isActive === 1">是</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="备注" />
				<el-table-column prop="createTime" label="创建时间" />
				<el-table-column prop="updateTime" label="更新时间" />

				<el-table-column fixed="right" label="操作" min-width="120">
					<template #default="scope">
						<el-button @click="openFile(scope.row)" v-if="scope.row.status !== 0" link type="primary"  >
							查看
						</el-button>
						<el-button @click="openModal(scope.row, '修改')" v-if="userInfo?.userRole === 'student'" link type="primary" >修改</el-button>

						<el-button v-if="scope.row.status === 1" link type="danger"  @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="flex justify-end mt-4">
				<el-pagination v-model:current-page="queryParams.current" v-model:page-size="queryParams.pageSize" background
					layout="total,  prev, pager, next" :total="total" @current-change="getList">
				</el-pagination>
			</div>
		</el-card>
    <UpdateResumeModal :visible="visible" :cancel="(value) => handleVisible(value)" @submit="getList" :formData="currentRow" />
		<CreateResumeModal :visible="createVisible"  :cancel="(value) => handleCreateVisible(value)" @submit="getList"  />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { resumeList, deleteResume } from '@/api/student'

import { RefreshRight } from '@element-plus/icons-vue'
import { useUserStore } from "@/stores/modules/user.js";
import CreateResumeModal from "@/views/student/components/CreateResumeModal.vue";
import UpdateResumeModal from './components/UpdateResumeModal.vue';
const userStore = useUserStore()
const userInfo = userStore.userinfo

const tableData = ref([])
const total = ref(0)
const queryParams = ref({
	fileName: '',
	remark: '',
	isActive: null,
	userName: null,
	current: 1,
	pageSize: 10
})

const modalTitle = ref('')
const visible = ref(false)
const currentRow = ref(null)
const createVisible = ref(false)
const handleVisible = (val) => {
	visible.value = val
}
const handleCreateVisible = (val) => {
	createVisible.value = val
}

const getList = async () => {
	const { data } = await resumeList(queryParams.value)
	tableData.value = data.records
	total.value = Number(data.total)
	console.log(tableData.value, 'tableData.value');
}

const handleSearch = () => {
	getList()
}

const openModal = (row,title) => {
  currentRow.value = row
  modalTitle.value = title
  handleVisible(true)
}

// 打开文件
const openFile = (row) => {
  window.open(row.filePath)
}



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
     await deleteResume({id: row.id})
      ElMessage.success('删除成功')
      getList()
    })
    .catch(() => {
     handleVisible(false)
    })
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
