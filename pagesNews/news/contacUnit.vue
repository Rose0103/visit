<template>
	<view class="contacUnit">
		<!-- <uni-list class="uniList"> -->
		<view class='contentList'>
			<checkbox-group @change="checkboxChange">
				<view class='card' v-for="(sub, key) in contacts" :key="key">
					<view style="display: flex;">
						<img v-if="sub.userId" :src="sub.userId.data?sub.userId.data.avatar:'../../static/img/schedule/c.png'" alt="">
						<view class="visList">
							<view>
								<view class="visName">{{sub.name}}</view>
								<view class="visState">{{sub.station.data?sub.station.data['name']:"职位名称:暂无"}}</view>
							</view>
						</view>
					</view>

					<view class="rightBtn">
						<!-- 	<checkbox  :value="{id:sub.id,
						name:sub.name,
						tenantCode:sub.tenantCode?
						}"  /> -->
						<checkbox :value="JSON.stringify(sub)" />
						<!-- <text></text> -->
					</view>
				</view>
			</checkbox-group>
		</view>
		<!-- </uni-list> -->
		<!-- <view class='noCard' v-if="contacts.length===0" style="text-align: center;">
			暂无信息
		</view> -->
		<view class="noCard" v-if="contacts.length === 0">
			<image src="../../static/img/no.png" mode=""></image>
			暂无信息
		</view>
		<view class="actions">
			<button type="default" size="mini" @click="handleCancel">取消</button>
			<button type="primary" size="mini" @click="handleConfirm">确认</button>
		</view>
	</view>
</template>

<script>
	import variableStr from '../../common/common.js';
	import uniCollapse from '../../components/uni-collapse/uni-collapse.vue';
	import uniCollapseItem from '../../components/uni-collapse-item/uni-collapse-item.vue';
	import uniList from '../../components/uni-list/uni-list.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem,
			uniList
		},
		onReady() {},

		onLoad(option) {
			this.type = option.type;
			console.log(this.type)
			let filterEmployeeId = [];
			if (option.filterEmployeeId) filterEmployeeId = option.filterEmployeeId.split(",");
			this.getEmployeeByOrgId(filterEmployeeId)
		},

		onUnload() {
			// 移除监听事件  
			// uni.$off('filterEmployeeId');
		},
		data() {
			return {
				filterEmployeeId: [],
				contacts: [],
				contactsChecked: [],
				type:""
			}
		},
		methods: {
			checkboxChange: function(e) {
				console.log(e.detail.value)
				this.contactsChecked = e.detail.value;
			},
			async getEmployeeByOrgId(filterEmployeeId) {
				const url = "hr/employee/getEmployeeByOrgId";
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				const res = await this.$get(url, {
					filterEmployeeId
				});
				console.log(res)
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				uni.hideLoading();
				if (res.code != 0) {
					uni.showToast({
						icon: 'none',
						title: res.msg
					});
					return;
				}
				this.contacts = res.data || [];

			},

			// 确认
			async handleConfirm() {
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				const data ={
					type:this.type,
					contactsChecked:this.contactsChecked
				}
				uni.$emit('contactsChecked', data);
				uni.navigateBack();
			},
			// 取消
			handleCancel() {
				uni.navigateBack();;
			},
		}
	}
</script>

<style lang="scss">
	@import '../../static/css/uni.css';
	@import '../../static/css/mailList.css';
	@import '../../static/css/common.css';
	uni-button:after,
		button:after{border:0}
	
	.noCard {
		height: 200upx;
		background-color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		color: #999999;
		margin:100rpx auto;
		
	}
	.noCard image{
		width: 342rpx;
		height: 500rpx;
	}	
	.contacUnit {
		width: 100%;
		padding-bottom: 180rpx;

		.card {
			margin: 0;
			padding: 0 28upx 0 100upx;
		}

		.contentList {
			border-top: 1px solid #EBEEF5;
		}

		.actions {
			display: flex;
			position: fixed;
			width: 100%;
			bottom: 0;
			padding: 20rpx 0;
			justify-content: center;
			align-items: center;
			background-color: #ffffff;
			border-top: 1px solid #EBEEF5;
			
			button{
				width: 160rpx;
				font-size: 32rpx;
				
			}
		}

		.rightBtn {
			display: flex;
			justify-content: center;
			align-items: center;
		}


	}
</style>
