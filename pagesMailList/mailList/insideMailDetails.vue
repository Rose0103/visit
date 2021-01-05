<template>
	<view style="width: 100%;">
		<view v-for="(item, index) in listInfo" :key="index">
			<uni-collapse>
				<uni-collapse-item :title="item.tenantName" :titleImg="titleImg" :titleText="titleText" thumb="../../static/img/mailListIcon.png">
					<template>
						<uni-list class="uniList" v-for="(sub, key) in item.children" :key="key">
							<view class='contentList'>
								<view class='card'>
									<image class="headerImg" src="../../static/img/header.png"></image>
									<view class="visList">
										<view>
											<view class="visName">{{sub.name}}</view>
											<view class="visState">{{sub.station.data?sub.station.data['name']:""}}</view>
										</view>
									</view>
									<!-- <view class="rightBtn">
										<view class="visitBtn">
											<text>约见</text>
										</view>
										<view class="visitBtn arriveBtn">
											<text>到访</text>
										</view>
									</view> -->

								</view>
							</view>
						</uni-list>
					</template>
				</uni-collapse-item>

			</uni-collapse>
		</view>
		<view class="noCard" v-if="listInfo.length === 0">
			<image src="../../static/img/no.png" mode=""></image>
			暂无信息
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
				index: 1,
				titleImg: "margin-left:4upx",
				titleText: "font-size:28upx;color:#202022;",
				listInfo: []
			}
		},
		methods: {
			async getInterviewRecord() {
				const url = "hr/employee/getSavedEmployeeInfoBySelfTenant";
				const res = await this.$get(url);
				console.log(res);
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				if(res.code=="0"){
					this.listInfo = res.data;
				}
			}
			
		}
	}
</script>

<style>
	@import '../../static/css/uni.css';
	@import '../../static/css/mailList.css';
	@import '../../static/css/common.css';
	.noCard {
		height: 200upx;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #999999;
		margin: auto;
		margin-top: 300rpx;
		
	}
	.noCard image{
		width: 342rpx;
		height: 500rpx;
	}	
	
</style>
