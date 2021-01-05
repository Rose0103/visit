<template>
	<view>
		<view class='card blackList'>
			<image class="headerImg" src="../../static/img/header.png"></image>
			<view class="visList">
				<view>
					<view class="visName">张大华</view>
					<view class="visState">南京子屹智能科技有限公司</view>
				</view>
			</view>
			<view class="rightBtn">
				<view class="visitBtn arriveBtn">
					<text>移除</text>
				</view>
			</view>
		</view>
		<view class='card blackList'>
			<image class="headerImg" src="../../static/img/header.png"></image>
			<view class="visList">
				<view>
					<view class="visName">张大华</view>
					<view class="visState">南京子屹智能科技有限公司</view>
				</view>
			</view>
			<view class="rightBtn">
				<view class="visitBtn arriveBtn">
					<text>移除</text>
				</view>
			</view>
		</view>
		<view class='card blackList'>
			<image class="headerImg" src="../../static/img/header.png"></image>
			<view class="visList">
				<view>
					<view class="visName">张大华</view>
					<view class="visState">南京子屹智能科技有限公司</view>
				</view>
			</view>
			<view class="rightBtn">
				<view class="visitBtn arriveBtn">
					<text>移除</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '../../components/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '../../components/uni-collapse-item/uni-collapse-item.vue';
	import uniList from '../../components/uni-list/uni-list.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			uniList
		},
		onLoad() {
			this.getInterviewRecord()
			// this.getScheduleTime()
		},
		data() {
			return {
				title: '黑名单',
				showBack: true,
				flag: true,
				/* 搜索条默认选中项 */
				index: 1,
				titleImg: "margin-left:4upx",
				titleText: "font-size:28upx;color:#202022;",
				listInfo: []
			}
		},
		methods: {
			/* 点击综合 */
			synthesizeClick() {
				this.c = !this.c
			},
			
			async getInterviewRecord() {
				const url = "hr/employee/getSavedEmployeeInfoBySelfTenant";
				const res = await this.$get(url);
				this.listInfo = res.data;
				console.log(res);
			}
		}
	}
</script>

<style>
	@import '../../static/css/uni.css';
	@import '../../static/css/common.css';
	@import '../../static/css/mailList.css';
</style>
