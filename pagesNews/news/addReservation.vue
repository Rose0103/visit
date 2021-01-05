<template>
	<view class="createReservation">
		<view class="card">
			<view>
				<view class="card-item">
					<view class="card-img">
						<img v-if="item.userId" :src="item.userId.data?item.userId.data.avatar:'../../static/img/schedule/c.png'" alt="">
					</view>
					<view class="card-content">
						<view class="card-content-top">
							<view class="unit-name">
								<text class="unit-kind">单位名称：</text>
								<text v-if="item.tenantCode">{{item.tenantCode.data?item.tenantCode.data.name:""}}</text>
							</view>
							<view class="unit-name">
								<text class="unit-kind">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</text>{{item.name}}
							</view>
							<view class="unit-name">
								<text class="unit-kind">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</text>
								<text v-if="item.station">{{item.station.data?item.station.data.name:""}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="schedule-content">
			
			<view class="modle">
				<view class="modle-title unit-kind">来访事由</view>
				<view class="modle-content">
					<text>{{params.reservationIncident}}</text>
				</view>
			</view>
			<view class="modle">
				<view class="modle-title space-between">
					<text class="unit-kind">车牌号码</text>
				</view>
				<view class="modle-content space-between" v-for="(val,index) in params.licenseNumber">
					<text>{{params.licenseNumber[index]}}</text>
				</view>
			</view>
			
			<view class="modle">
				<view class="modle-title unit-kind">变更来访时间</view>
				<view class="modle-content">
						<view class="box-time passCheck">
							{{params.reservationTime}}
						</view>
				</view>
			</view>

			<view class="modle" style="border: none;">
				<view class="modle-title space-between">
					<text class="unit-kind">同行人</text>
				</view>
				<view class="modle-content space-between" v-for="(val,index) in partners" style="margin:10rpx 0">
					<view class="card" style="box-shadow: none;">
						<view>
							<view class="card-item">
								<view class="card-img">
									<img v-if="val.partner" :src="val.partner.data?val.partner.data.userId.data.avatar:'../../../static/img/schedule/c.png'" alt="">
								</view>
								<view class="card-content space-between">
									<view class="card-content-top" style="width: calc(100% - 60rpx);">
										<view class="unit-name">
											<text class="unit-kind">单位名称：</text>
											<text v-if="val.partner">{{val.partner.data?val.partner.data.tenantCode.data.name:""}}</text>
										</view>
										<view class="unit-name">
											<text class="unit-kind">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</text>{{val.partner.data?val.partner.data.name:""}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="actions">
				<button type="default" size="mini" @click="handleCancel">取消</button>
				<button v-if="type=='add'" type="primary" size="mini" @click="handleConfirm">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import timeSelector from '@/components/wing-time-selector/wing-time-selector.vue';
	import variableStr from '../../common/common.js';
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
    import {getValue} from '../../common/request.js';
	
	export default {
		components: {
			timeSelector,
			// moment,
			uniCollapse,
			uniCollapseItem,
			uniIcons,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				code: "",
				type: 'add',
				id: "",
				item: {},
				params: {
					reservationLabelCode: "",
					licenseNumber: [],
					partnerId: [],
					reservationIncident: "",
					reservationTime:"",
				},
				partners: [],
				expand: false,
				// moment,
			};
		},
		onReady() {},
		onLoad: function(option) {
			const code = option.code;
			const flag =  variableStr.isLogin();
			if(flag){
				if (code) {
					this.type = "add";
					this.initView(code);
				}
			}else {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '您还没有登录，请先登录',
					success: function(res) {
						console.log(res)
						if (res.confirm) {
							uni.navigateTo({
								url: "/pages/login/pwdLogin?type=appointmentCard&code=" + code
							})
						}
					}
				});
			}
			
			
		},
		methods: {
			// 初始化 根据code
			async initView(code) {
				const res = uni.getStorageSync('codeViewData');
				this.params.reservationLabelCode = code;
				this.params.reservationIncident = getValue(res,"reservationIncident");
				this.params.reservationTime =getValue(res,"reservationTime");
				this.params.licenseNumber =getValue(res,"licenseNumber") ;
				this.partners =getValue(res,"interviewPartnerReturnDtoList") ;
				this.item =getValue(res,"interviewee.data") ;
				this.id =getValue(res,"id");
			},
			
			// 确认
			async handleConfirm() {
				const url = 'visitor/interviewRecord/appendPartner';
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				const params = {
					id:this.id
				}
				const res = await this.$put(url,params);
				console.log(res);
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				uni.hideLoading();
				uni.showToast({
					icon: 'none',
					title: res.msg
				});
				if (res.code != 0) return;
				uni.reLaunch({
					url: '../../pages/news/newsList'
				});
			},
			// 取消
			handleCancel() {
				uni.navigateBack();
			},

		}
	}
</script>



<style lang="scss">
	uni-button:after,
		button:after{border:0}
	.createReservation {
		width: 100%;
		padding-bottom: 180rpx;
		overflow-x: hidden;

		.passCheck {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}


		.space-between {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.licenseNumber {
			padding: 15rpx;
			width: calc(100% - 60rpx);
			border-bottom: 1px solid #EBEEF5;
		}

		.licenseNumber:last-child {
			border-bottom: 0px solid #EBEEF5;
			padding-bottom: 0;
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
			button {
				width: 160rpx;
				font-size: 32rpx;
				
			}
		}

		.schedule-content {
			padding: 0 20rpx;
		}

		.modle {
			.modle-title {
				font-size: 36rpx;
				margin-top: 20rpx;

			}

			.modle-content {
				margin: 20px 0rpx 25rpx 0;
				color: #202022;
				font-size: 36rpx;
			}

			border-bottom: 1px solid #EBEEF5;
		}

		.unit-kind {
			color: #A0A4AA;
		}

		.card {
			// padding: 10rpx;
			paddding: 10rpx 0;
			width: 100%;
			border-color: #ebeef5;
			border-style: solid;
			border-width: 1px;
			-webkit-box-shadow: 0 2rpx 10rpx 0 rgba(0, 0, 0, .1);
			box-shadow: 0 2rpx 10rpx 0 rgba(0, 0, 0, .1);
		}

		.card-item.child {
			width: 100%;
			border-top: 1px solid #EBEEF5;

			.unit-title {
				padding-top: 50rpx;
				// line-height: 60rpx;
			}

			.unit-name {
				padding-bottom: 20rpx;
				padding-top: 15rpx;
			}

		}

		.card-item {
			display: flex;
			align-items: center;

			.card-img {
				// margin: 0 30rpx;
				// width: 130rpx;
				// height: 130rpx;

				margin: 20rpx;
				width: 120upx;
				height: 120upx;
				border-radius: 120upx;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.card-content {
				flex: auto;

				.card-content-top {
					padding-right: 10rpx;
					position: relative;

					.unit-status {
						position: absolute;
						right: 0;
						top: -0rpx;
					}

					.unit-title {
						color: #202022;
						font-size: 36rpx;
						padding-top: 25rpx;
						// line-height: 60rpx;
					}

					.unit-name {
						font-size: 36rpx;
						line-height: 60rpx;
						// margin-right: 100rpx;
					}
				}

				.unit-num {
					display: flex;
					font-size: 36rpx;
					margin-bottom: 20rpx;
					margin-top: 10rpx;
					// margin-bottom: 25rpx;
					align-items: center;
					justify-content: space-between;

					.expand {
						margin: 0 30rpx;
					}
				}

				.unit-source {
					display: flex;
					align-items: center;
					margin-right: 10rpx;
				}

			}
		}
	}
</style>
