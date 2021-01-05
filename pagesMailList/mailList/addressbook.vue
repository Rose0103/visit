<template>
	<view>
		<view class="booklist">
			<view class="card" v-for="(itme,index) in employeeByOrgId" :key="index">
				<image src="../../static/img/header.png" mode="widthFix"></image>
				<view class="card-information">
					<text class="card-name">{{itme.name}}</text>
					<text class="card-identity">{{itme.station.data?itme.station.data.name:""}}</text>
					<text class="card-identity">{{name}}</text>
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
			this.getEmployeeByOrgId();
		},
		data() {
			return {
				employeeByOrgId: [],
				name: ""
			}
		},
		methods: {
			async getEmployeeByOrgId() {
				const url = "hr/employee/getEmployeeByOrgId";
				const res = await this.$get(url);
				console.log(res);
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				if(res.code==0){
					this.employeeByOrgId = res.data;
				}else{
					uni.showToast({
						icon: "none",
						title: res.msg,
						duration: 3000
					});
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../static/css/uni.css';
	@import '../../static/css/addressbook.less';
	
</style>
