<template>
	<div class="flex flex-col items-center justify-center gap-[15px] wrap">
		<el-avatar :size="80" :src="userinfo?.userAvatar">
			<el-icon size="50">
				<UserFilled />
			</el-icon>
		</el-avatar>
    <div>账号：<span>{{userinfo?.userAccount}}</span></div>
		<div>姓名：<span>{{userinfo?.userName}}</span></div>

    <div>性别：<span>{{userinfo?.gender === 0 ? '男' : userinfo?.gender === 1 ? '女' : '未知' }}</span></div>
    <div>邮箱：<span>{{userinfo?.email || '-'}}</span></div>
    <div>手机号：<span>{{userinfo?.phone || '-'}}</span></div>
    <div  v-if="userinfo?.userRole !== 'enterprise'">部门：<span>{{userinfo?.deptName || '-'}}</span></div>
    <div v-if="userinfo?.userRole === 'student'">学号：<span>{{userinfo?.studentNumber}}</span></div>
    <div v-if="userinfo?.userRole === 'student'">毕业时间：<span>{{userinfo?.graduationDate || '-'}}</span></div>
    <div v-if="userinfo?.userRole === 'student'">毕业去向：<span>{{graduationGoes}}</span></div>
    <div v-if="userinfo?.userRole === 'student'">无去向原因：<span>{{userinfo?.notGoesReason || '-'}}</span></div>
    <div v-if="userinfo?.userRole != 'student'">职务：<span>{{userinfo?.job || '-'}}</span></div>
    <div v-if="userinfo?.userRole == 'tracher'">学历：<span>{{userinfo?.qualification || '-'}}</span></div>
   <div v-if="userinfo?.userRole == 'enterprise'">企业名称：<span>{{ userinfo?.enterpriseName || '-'}}</span></div>
   <div v-if="userinfo?.userRole == 'enterprise'">办公地址：<span>{{ userinfo?.address || '-'}}</span></div>
   <div v-if="userinfo?.userRole == 'enterprise'">所属行业：<span>{{ userinfo?.industry || '-'}}</span></div>
   <div v-if="userinfo?.userRole == 'enterprise'">统一社会信用代码：<span>{{ userinfo?.licenseNum || '-'}}</span></div>
   <div v-if="userinfo?.userRole == 'enterprise'">经营范围：<span>{{ userinfo?.businessScope || '-'}}</span></div>
   <div v-if="userinfo?.userRole == 'enterprise'">认证状态： 
						<el-tag type="success" effect="dark" v-if="userinfo.isAuthorized === 1">已认证</el-tag>
						<el-tag type="danger" effect="dark" v-if="userinfo.isAuthorized === 0">未认证</el-tag></div>
    <div>创建时间：<span>{{ userinfo?.createTime }}</span></div>
     <div  >简介：<span>{{userinfo?.userProfile || '-'}}</span></div>
	</div>
</template>

<script setup>
import { ref ,computed} from 'vue'
import { useUserStore } from "@/stores/modules/user.js";
import {UserFilled} from '@element-plus/icons-vue'
const userStore = useUserStore()
 
const userinfo = ref(userStore?.userinfo)

const graduationGoes = computed(() => {
 let graduationGoes = userinfo.value?.graduationGoes
  if(graduationGoes) {
    return graduationGoes.join('-')
  }
  return '-'
})
</script>

<style lang="less" scoped>
.wrap div  {
  width: 300px;
}
</style>
