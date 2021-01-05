<template>
	<view>
		<view v-for="(item, index) in listInfo" :key="index">
			<uni-collapse  @change = getEmployeeByOrgId(item.id)>
				<uni-collapse-item :title="item.label" :titleImg="titleImg" :titleText="titleText" thumb="../../static/img/mailListIcon.png">
					<template>
						<uni-list class="uniList" v-for="(sub, key) in employeeByOrgId" :key="key">
							<view class='contentList'>
								<view class='card'>
									<image class="headerImg" src="../../static/img/header.png"></image>
									<view class="visList">
										<view>
											<view class="visName">{{sub.name}}</view>
											<view class="visState">{{sub.name}}</view>
										</view>
									</view>
								</view>
							</view>
						</uni-list>
					</template>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script>
	import variableStr from '../../common/common.js';
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
			this.getInterviewRecord()
			// this.getScheduleTime()
		},
		data() {
			return {
				/* 搜索条默认选中项 */
				index: 1,
				titleImg: "margin-left:4upx",
				titleText: "font-size:28upx;color:#202022;",
				listInfo: [],
				employeeByOrgId: [],
			}
		},
		methods: {
			async getEmployeeByOrgId(orgId) {
				const url= "hr/employee/getEmployeeByOrgId";
				const options = {
					orgId:orgId
				}
				console.log(options);
				const res = await this.$get(url,options);
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				this.employeeByOrgId = res.data;
			}
		}
	}
</script>

<style>
	@import '../../static/css/uni.css';
	@import '../../static/css/mailList.css';

	.custom-header-top-container {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		width: 100%;
	}

	.custom-header-container {
		z-index: 1;
		width: 750upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: sticky;
		top: 0;
	}

	.custom-header-status-bar {
		width: 100%;
		top: 0;
		position: sticky;
		z-index: 100;
	}

	.custom-header-title {
		height: 44px;
		align-self: flex-start;
		margin-left: 30upx;
		line-height: 44px;
		font-size: 15px;
	}

	.tools-alert {
		height: 100%;
		position: fixed;
		width: 100%;
		left: 0;
		box-sizing: border-box;
		opacity: 0.5;
		background: #888888;
		z-index: 100;
	}
</style>
