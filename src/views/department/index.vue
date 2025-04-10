<template>
	<div class="flex flex-col gap-4">

		<el-card shadow="never">
			<div class="flex justify-between items-center mb-[20px]">
				<div>部门列表</div>
				<div class="flex gap-2 items-center">
					 <el-button type="primary" @click="handleCreateVisible(true)">新建</el-button>
					<el-icon size="20" @click="getList">
						<RefreshRight />
					</el-icon>
				</div>
			</div>
			<el-table :data="tableData" style="width: 100%"  row-key="id"
				:header-cell-style="{ backgroundColor: '#f5f7fa'}" empty-text="暂无数据"
								:tree-props="{ children: 'children', }">
				<el-table-column type="index" width="50" />
				<el-table-column prop="name" label="名称" />
				<el-table-column prop="sort" label="排序" />
				<el-table-column fixed="right" label="操作" min-width="120" >
					<template #default="scope">
						<el-button @click="openModal(scope.row, '详情')"  link type="primary" size="small" > 详情 </el-button>
						<el-button @click="openModal(scope.row, '修改')" link type="primary" size="small">修改</el-button>
						<el-button link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>

		</el-card>
    <UpdateModal :visible="visible" :title="modalTitle"  :cancel="(value) => handleVisible(value)" @submit="getList" :formData="currentRow" />
		<CreateModal :visible="createVisible" :cancel="(value) => handleCreateVisible(value)" @submit="getList"  />
	</div>
</template>

<script setup>
import { ref } from 'vue'

import { RefreshRight } from '@element-plus/icons-vue'
import UpdateModal from './components/UpdateModal.vue'
import { useUserStore } from "@/stores/modules/user.js";
import {departmentTree, deleteDepartment} from "@/api/department.js";
import CreateModal from "@/views/department/components/CreateModal.vue";
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
const createVisible = ref(false)
const currentRow = ref(null)

const handleVisible = (val) => {
	visible.value = val
}

const handleCreateVisible = (val) => {
	createVisible.value = val
}

// 获取列表数据
const getList = async () => {
	const { data } = await departmentTree()
	tableData.value = data
	userStore.departmentDate = data
	console.log(tableData.value, 'tableData.value');
}

// 打开修改/详情弹窗
const openModal = (row,title) => {
  currentRow.value = row
  modalTitle.value = title
  handleVisible(true)
	console.log(currentRow.value, 'currentRow.value')
}




const handleDelete = (row) => {
	console.log(row, 'row');
  ElMessageBox.confirm(
    '确定删除吗?',
    '提示',
    {
      type: 'warning',
    }
  )
    .then(async () => {
     await deleteDepartment({id: row.id})
      ElMessage.success('删除成功')
      getList()
    })
    .catch(() => {
     handleVisible(false)
    })
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
