<template>
	<div class="flex flex-col gap-4">
		<el-card shadow="never">
			<el-form :model="queryParams" inline class="form-inline"> 
				<el-form-item label="名称">
					<el-input v-model="queryParams.fileName" placeholder="请输入资质名称"></el-input>
				</el-form-item>
				<el-form-item label="类型">
					<el-input v-model="queryParams.certType" placeholder="请输入资质类型"></el-input>
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
					 <el-button type="primary" v-if="userStore?.userinfo?.userRole === 'enterprise'" @click="handleCreateVisible(true)">新建</el-button>
					<el-icon size="20" @click="getList">
						<RefreshRight />
					</el-icon>
				</div>
			</div>
			<el-table :data="tableData" style="width: 100%" :cell-style="{textAlign: 'center'}"
				:header-cell-style="{textAlign: 'center',backgroundColor: '#f5f7fa'}" empty-text="暂无数据">
				<el-table-column type="index" width="50" />
				<el-table-column prop="enterprise.enterpriseName" label="企业名称" v-if="userInfo?.userRole !== 'enterprise'" />
				<el-table-column prop="fileName" label="资质名称" />
				<el-table-column prop="certType" label="资质类型" />
 
				<el-table-column prop="remark" label="备注" />
				<el-table-column prop="createTime" label="创建时间" />
				<el-table-column prop="updateTime" label="更新时间" />

				<el-table-column fixed="right" label="操作" min-width="120">
					<template #default="scope">
						<el-button @click="openFile(scope.row)" v-if="scope.row.status !== 0" link type="primary" size="small" >
							查看
						</el-button>
						<el-button @click="openModal(scope.row, '修改')" v-if="userInfo?.userRole === 'enterprise'" link type="primary" size="small">修改</el-button>

						<el-button v-if="userInfo?.userRole === 'enterprise'" link type="danger" size="small" @click="handleDelete(scope.row)">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="flex justify-end mt-4">
				<el-pagination v-model:current-page="queryParams.current" v-model:page-size="queryParams.pageSize" background
					layout="total,  prev, pager, next" :total="total" @current-change="getList">
				</el-pagination>
			</div>
		</el-card>
    <UpdateCertificationModal :visible="visible" :cancel="(value) => handleVisible(value)" @submit="getList" :formData="currentRow" />
		<CreatCertificationModal :visible="createVisible"  :cancel="(value) => handleCreateVisible(value)" @submit="getList"  />
	</div>
</template>

<script setup>
import { ref } from 'vue'
import { certificationList, deleteCertification } from '@/api/enterprise'

import { RefreshRight } from '@element-plus/icons-vue' 
import { useUserStore } from "@/stores/modules/user.js";
import CreatCertificationModal from "@/views/enterprise/components/CreatCertificationModal.vue";
import UpdateCertificationModal from './components/UpdateCertificationModal.vue';
const userStore = useUserStore()
const userInfo = userStore.userinfo

const tableData = ref([])
const total = ref(0)
const queryParams = ref({
	fileName: '',
	remark: '',
	certType: '',
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
	const { data } = await certificationList(queryParams.value)
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
    '确定删除这个企业资质吗?',
    '提示',
    {
      type: 'warning',
    }
  )
    .then(async () => {
     await deleteCertification({id: row.id})
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
