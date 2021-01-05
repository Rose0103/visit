<template>
	<view class="container">
		<view class="booklist">
			<view class="card" v-for="(itme,index) in employeeByOrgId" :key="index">
				<view class="card-information" @click="showDetails(itme)">
					<text class="card-identity">机构名称：{{itme.tenant.data.name}}</text>
					<text class="card-identity">审核意见：{{itme.auditRemark?itme.auditRemark:"空"}}</text>
					<text class="card-identity">审核状态：{{itme.auditStatus.desc}}</text>
					<text class="card-identity">申请时间：{{itme.applyTime}}</text>
				</view>
			</view>
		</view>
		<view class="noCard" v-if="employeeByOrgId.length === 0">
			<image src="../../static/img/no.png" mode=""></image>
			暂无信息
		</view>
	</view>
</template>

<script>
	import uniCollapse from '../../components/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '../../components/uni-collapse-item/uni-collapse-item.vue';
	import uniList from '../../components/uni-list/uni-list.vue';
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			uniList
		},
		onLoad() {
			this.getAuthRequestBySelf();
		},
		data() {
			return {
				employeeByOrgId: [],
				name: ""
			}
		},
		methods: {
			async getAuthRequestBySelf() {
				const url = "admin/authRequest/getAuthRequestBySelf";
				const res = await this.$get(url);
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				console.log(res);
				this.employeeByOrgId = res.data;
			},
			showDetails(item){
				uni.setStorageSync('organizationDetails', item);
				uni.navigateTo({
					url: './joinOrganizationProgressQuery'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../static/css/uni.css';
	@import '../../static/css/addressbook.less';
	
</style>
