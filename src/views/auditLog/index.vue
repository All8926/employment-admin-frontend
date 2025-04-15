<template>
	<div class="flex flex-col gap-4">
		<el-card shadow="never">
			<el-form :model="queryParams" inline class="form-inline">
				<el-form-item label="审核人">
					<el-input v-model="queryParams.userName" placeholder="请输入审核人"></el-input>
				</el-form-item>
				<el-form-item label="审核对象">
					<el-input v-model="queryParams.targetName" placeholder="请输入审核对象"></el-input>
				</el-form-item>
				<el-form-item label="审核类型">
					<el-select v-model="queryParams.targetType" clearable placeholder="请选择审核类型"> 
						<el-option label="企业资质" value="certification"></el-option>
						<el-option label="合同" value="contract"></el-option>
						<el-option label="账号注册" value="register"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="审核结果">
					<el-select v-model="queryParams.status" clearable placeholder="请选择审核结果"> 
						<el-option label="通过" :value="1"></el-option>
						<el-option label="拒绝" :value="0"></el-option>
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
				<div>审核记录</div>
				<div class="flex gap-2 items-center"> 
					<el-icon size="20" @click="getList">
						<RefreshRight />
					</el-icon>
				</div>
			</div>
			<el-table :data="tableData" style="width: 100%" :cell-style="{textAlign: 'center'}"
				:header-cell-style="{textAlign: 'center',backgroundColor: '#f5f7fa'}" empty-text="暂无数据">
				<el-table-column type="index" width="50" />
				<el-table-column prop="userName" label="审核人"  />
				<el-table-column prop="targetType" label="审核类型"  >
          <template #default="scope">
						<el-tag type="primary" effect="plain" v-if="scope.row.targetType === 'certification'">企业资质</el-tag>
						<el-tag type="primary" effect="plain" v-if="scope.row.targetType === 'contract'">合同</el-tag> 
					</template>
          </el-table-column>
				<el-table-column prop="targetName" label="审核对象" />
				<el-table-column prop="status" label="结果">
					<template #default="scope"> 
						<el-tag type="success" effect="dark" v-if="scope.row.status === 1">通过</el-tag>
 						<el-tag type="danger" effect="dark" v-if="scope.row.status === 0">拒绝</el-tag>
					</template>
				</el-table-column> 
				<el-table-column prop="createTime" label="审核时间" /> 
 
			</el-table>
			<div class="flex justify-end mt-4">
				<el-pagination v-model:current-page="queryParams.current" v-model:page-size="queryParams.pageSize" background
					layout="total,  prev, pager, next" :total="total" @current-change="getList">
				</el-pagination>
			</div>
		</el-card>
 
	</div>
</template>

<script setup>
import { ref } from 'vue'
import {  auditLogList } from '@/api/index'

import { RefreshRight } from '@element-plus/icons-vue'
import { useUserStore } from "@/stores/modules/user.js";
 
const userStore = useUserStore()
const userInfo = userStore.userinfo

const tableData = ref([])
const total = ref(0)
const queryParams = ref({
	userName: '',
	targetType: null,
	targetName: '',
	status: null,
	current: 1,
	pageSize: 10
})
 
 

const getList = async () => {
	const { data } = await auditLogList(queryParams.value)
	tableData.value = data.records
	total.value = Number(data.total) 
}

const handleSearch = () => {
	getList()
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
