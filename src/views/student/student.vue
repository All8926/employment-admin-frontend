<template>
	<div class="flex flex-col gap-4">
		<el-card shadow="never">
			<el-form :model="queryParams" inline class="form-inline">
				<el-form-item label="姓名">
					<el-input v-model="queryParams.userName" placeholder="请输入姓名"></el-input>
				</el-form-item>
				<el-form-item label="学号">
					<el-input v-model="queryParams.studentNumber" placeholder="请输入学号"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-select v-model="queryParams.gender" clearable placeholder="请选择性别">
						<el-option label="男" :value="0"></el-option>
						<el-option label="女" :value="1"></el-option>
						<el-option label="未知" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="queryParams.status" clearable placeholder="请选择状态">
						<el-option label="待审核" :value="0"></el-option>
						<el-option label="正常" :value="1"></el-option>
						<el-option label="已拒绝" :value="2"></el-option>
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
				<div>学生列表</div>
				<div class="flex gap-2 items-center">
					<!-- <el-button type="primary">新建</el-button> -->
					<el-icon size="20" @click="getList">
						<RefreshRight />
					</el-icon>
				</div>
			</div>
			<el-table :data="tableData" style="width: 100%" :cell-style="{textAlign: 'center'}"
				:header-cell-style="{textAlign: 'center',backgroundColor: '#f5f7fa'}" empty-text="暂无数据">
				<el-table-column type="index" width="50" />
				<el-table-column prop="userName" label="姓名" />
				<el-table-column prop="gender" label="性别">
					<template #default="scope">
						<span>{{ scope.row.gender === 0 ? '男' : scope.row.gender === 1 ? '女' : '未知' }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="studentNumber" label="学号" />
				<el-table-column prop="phone" label="手机号" />
				<el-table-column prop="deptName" label="学院/专业" />
				<el-table-column prop="status" label="状态">
					<template #default="scope">
						<el-tag type="warning" effect="dark" v-if="scope.row.status === 0">待审核</el-tag>
						<el-tag type="success" effect="dark" v-if="scope.row.status === 1">正常</el-tag>
						<el-tag type="danger" effect="dark" v-if="scope.row.status === 2">已拒绝</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" />

				<el-table-column fixed="right" label="操作" min-width="120">
					<template #default="scope">
						<el-button @click="openModal(scope.row, '详情')" v-if="scope.row.status !== 0" link type="primary" size="small" >
							详情
						</el-button>
						<el-button @click="openModal(scope.row, '审核')" v-if="scope.row.status === 0" link type="warning" size="small"  >
							审核
						</el-button>
						<el-button @click="openModal(scope.row, '修改')" v-if="scope.row.status === 1" link type="primary" size="small">修改</el-button>

						<el-button v-if="scope.row.status === 1" link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="flex justify-end mt-4">
				<el-pagination v-model:current-page="queryParams.current" v-model:page-size="queryParams.pageSize" background
					layout="total,  prev, pager, next" :total="total" @current-change="getList">
				</el-pagination>
			</div>
		</el-card>
    <StudentModal :visible="visible" :title="modalTitle"  :cancel="(value) => handleVisible(value)" @submit="getList" :formData="currentRow" />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { studentList } from '@/api/student'

import { RefreshRight } from '@element-plus/icons-vue'
import {deleteStudent} from '@/api/student'
import StudentModal from './components/StudentModal.vue'
import { useUserStore } from "@/stores/modules/user.js";
const userStore = useUserStore()

const tableData = ref([])
const total = ref(0)
const queryParams = ref({
	userName: '',
	studentNumber: '',
	gender: null,
	status: null,
	current: 1,
	pageSize: 10
})

const modalTitle = ref('')
const visible = ref(false)
const currentRow = ref(null)

const handleVisible = (val) => {
	visible.value = val
}

const getList = async () => {
	const { data } = await studentList(queryParams.value)
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



const handleDelete = (row) => {
	console.log(row, 'row');
  ElMessageBox.confirm(
    '确定删除这个学生账号吗?',
    '提示',
    {
      type: 'warning',
    }
  )
    .then(async () => {
     await deleteStudent({id: row.id})
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
