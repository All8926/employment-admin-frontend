<template>
	<div class="flex flex-col gap-4">
		<el-card shadow="never">
			<el-form :model="queryParams" inline class="form-inline">
				<el-form-item label="学生姓名">
					<el-input v-model="queryParams.studentName" placeholder="请输入学生姓名"></el-input>
				</el-form-item>
 
				<el-form-item label="岗位">
					<el-input v-model="queryParams.post" placeholder="请输入岗位"></el-input>
				</el-form-item>
 
				<el-form-item label="薪资">
					<el-input v-model="queryParams.salary" placeholder="请输入薪资"></el-input>
				</el-form-item>
 
				<el-form-item>
					<el-button @click="handleReset">重置</el-button>
					<el-button type="primary" @click="handleSearch">查询</el-button>
				</el-form-item>
			</el-form>

		</el-card>
		<el-card shadow="never">
			<div class="flex justify-between items-center mb-[20px]">
				<div>签约信息列表</div>
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
        <el-table-column prop="student.userName" label="学生姓名" />
				<el-table-column prop="student.studentNumber" label="学生学号"/>
				<el-table-column prop="student.graduationDate" label="毕业时间"/>
        <el-table-column prop="contract.enterpriseName" label="企业名称" />
				<el-table-column prop="salary" label="薪资" />
				<el-table-column prop="post" label="岗位" />
				<!-- <el-table-column prop="remark" label="备注" />
				<el-table-column prop="createTime" label="创建时间" />  -->

				<el-table-column fixed="right" label="操作" min-width="120">
					<template #default="scope">
						<el-button @click="openDetailModal(scope.row)" link type="primary"  >
							详情
						</el-button>
						<el-button @click="openUpdateModal(scope.row, '修改')" v-if="userInfo?.userRole === 'student'" link type="primary" >修改</el-button>

						<el-button  link type="danger"  @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="flex justify-end mt-4">
				<el-pagination v-model:current-page="queryParams.current" v-model:page-size="queryParams.pageSize" background
					layout="total,  prev, pager, next" :total="total" @current-change="getList">
				</el-pagination>
			</div>
		</el-card>
    <UpdateSignInfoModal :visible="visible" :cancel="(value) => handleVisible(value)" @submit="getList" :formData="currentRow" />
		<CreateSignInfoModal :visible="createVisible"  :cancel="(value) => handleCreateVisible(value)" @submit="getList"  />
		<DetailSiignInfoModal :visible="dateilVisible"  :cancel="(value) => handleDetailVisible(value)"  :formData="currentRow"  />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { signInfoList, deleteSignInfo } from '@/api/signInfo'

import { RefreshRight } from '@element-plus/icons-vue'
import { useUserStore } from "@/stores/modules/user.js";
import CreateSignInfoModal from "./components/CreateSignInfoModal.vue";
import UpdateSignInfoModal from './components/UpdateSignInfoModal.vue';
import DetailSiignInfoModal from './components/DetailSignInfoModal.vue'
const userStore = useUserStore()
const userInfo = userStore.userinfo

const tableData = ref([])
const total = ref(0)
const queryParams = ref({
	studentName: '',
	post: '',
	salary: '', 
	current: 1,
	pageSize: 10
})

const modalTitle = ref('')
const visible = ref(false)
const currentRow = ref(null)
const createVisible = ref(false)
const dateilVisible = ref(false)
const handleVisible = (val) => {
	visible.value = val
}
const handleCreateVisible = (val) => {
	createVisible.value = val
}
const handleDetailVisible = (val) => {
	dateilVisible.value = val
}

const getList = async () => {
	const { data } = await signInfoList(queryParams.value)
	tableData.value = data.records
	total.value = Number(data.total)
	console.log(tableData.value, 'tableData.value');
}

const handleSearch = () => {
	getList()
}

// 打开修改弹窗
const openUpdateModal = (row,title) => {
  currentRow.value = row
  modalTitle.value = title
  handleVisible(true)
}
// 打开详情弹窗
const openDetailModal = (row) => {
  currentRow.value = row
  handleDetailVisible(true)
}

// 打开文件
const openFile = (row) => {
  window.open(row.filePath)
}



const handleDelete = (row) => {
	console.log(row, 'row');
  ElMessageBox.confirm(
    '确定删除这个签约信息吗?',
    '提示',
    {
      type: 'warning',
    }
  )
    .then(async () => {
     await deleteSignInfo({id: row.id})
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
