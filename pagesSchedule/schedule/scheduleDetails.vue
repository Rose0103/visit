<template>
	<view class="scheduleDetails">
		<view class="card">
			<view class="" v-if='item.personType'>
				<view class="card-item" v-if="item.personType.code=='INTERVIEWEE'">
					<view class="card-img">
						<img :src="item.visitor.data.userId.data.avatar?item.visitor.data.userId.data.avatar:'../../static/img/schedule/c.png'"
						 alt="">
					</view>
					<view class="card-content">
						<view class="card-content-top">
							<!-- <view class="unit-title">{{item.visitorTenantName}}</view> -->
							<view class="unit-name">
								<text class="unit-kind">预约时间：</text>{{time}}
							</view>
							<view class="unit-name">
								<text class="unit-kind">机构名称：</text>{{item.visitor.data.tenantCode.data?item.visitor.data.tenantCode.data.name:"暂无机构"}}
							</view>
							<img class="unit-status" :src="'../../static/img/schedule/'+ item.visitStatus.code +'.png'" alt="">
							<!-- <img class=" unit-status" src="../../static/img/schedule/1.png" alt=""> -->
						</view>
						<view class="unit-num">
							<view class="unit-name">
								<text class="unit-kind">姓名：</text>{{item.visitor?item.visitor.data.name:""}}
							</view>
							<view>
								<view style="padding-right: 20rpx;">
									<text class="unit-kind">人数：</text>{{item.partnerNumber}}
									<text @click="expand=!expand">
										<uni-icons :type="!expand?'arrowright':'arrowdown'" size="14" class="icon expand"></uni-icons>
									</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="card-item" v-else>
					<view class="card-img">
						<img :src="item.interviewee?item.interviewee.data.userId.data.avatar:'../../static/img/schedule/c.png'" alt="">
					</view>
					<view class="card-content">
						<view class="card-content-top">
							<!-- <view class="unit-title">{{item.interviewee?item.interviewee.data.tenantCode.data.name:""}}</view> -->
							<view class="unit-name">
								<text class="unit-kind">预约时间：</text>{{time}}
							</view>
							<view class="unit-name">
								<text class="unit-kind">机构名称：</text>{{item.interviewee.data.tenantCode.data?item.interviewee.data.tenantCode.data.name:"暂无机构"}}
							</view>

							<!-- <view class="unit-name">
								<text class="unit-kind">姓名：</text>{{item.interviewee?item.interviewee.data.name:""}}
							</view> -->
							<img class="unit-status" :src="'../../static/img/schedule/'+ item.visitStatus.code +'.png'" alt="">
						</view>
						<view class="unit-num">
							<view class="unit-name">
								<text class="unit-kind">姓名：</text>{{item.interviewee?item.interviewee.data.name:""}}
							</view>
							<view style="padding-right: 20rpx;">
								<text class="unit-kind">同行人数：</text>{{item.partnerNumber}}
								<view v-if="item.partnerNumber!=0" @click="expand=!expand" style="display: inline-block;">
									<uni-icons :type="!expand?'arrowright':'arrowdown'" size="14" class="icon expand"></uni-icons>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view v-if="item.interviewPartnerReturnDtoList.length>0" v-for="(value,index) in item.interviewPartnerReturnDtoList">
				<div v-if="expand">
					<view class="card-item child" v-if="partnerSchema=='ADVANCED'">
						<view class="card-img">
							<img src="../../static/img/schedule/c.png" alt="">
						</view>
						<view class="card-content">
							<view class="card-content-top">
								<view class="unit-title">{{value.partnerTenantName?value.partnerTenantName:"单位名称:"}}</view>
								<view class="unit-name" v-if="value.partner">
									<text class="unit-kind">姓名：</text>
									<text v-if="value.partner.data">{{value.partner.data.userId.data?value.partner.data.userId.data.name:""}}</text>
								</view>
							</view>
						</view>
					</view>
				</div>
				<div v-if="expand">
					<view class="card-item child" v-if="partnerSchema=='MIDDLE'">
						<view class="card-img">
							<img src="../../static/img/schedule/c.png" alt="">
						</view>
						<view class="card-content">
							<view class="card-content-top">
								<view class="unit-name" v-if="value.partner">
									<text class="unit-kind">身份证：</text>
									<text v-if="value.partnerIdCard">{{value.partnerIdCard}}</text>
								</view>
								<!-- <view class="unit-title">{{value.partnerIdCard}}</view> -->
								<view class="unit-name" v-if="value.partner">
									<text class="unit-kind">姓名：</text>
									<text v-if="value.partnerName">{{value.partnerName}}</text>
								</view>
							</view>
						</view>
					</view>
				</div>
			</view>
		</view>
		<view class="schedule-content" v-if='item.personType.code!="CANCEL"&&item.personType.code!="REFUSE"&&item.personType.code!="FINISHED_APPOINT"&&item.personType.code!="UNFINISHED_APPOINT"'>
			<view class="modle">
				<view class="modle-title unit-kind">办公位置</view>
				<view class="modle-content">{{item.officeAddress?item.officeAddress:"未知"}}</view>
			</view>
			<view class="modle">
				<view class="modle-title unit-kind">来访事由</view>
				<view class="modle-content">{{item.reservationIncident}}</view>
			</view>
			<view class="modle">
				<view class="modle-title unit-kind">车牌号码</view>
				<view class="modle-content">
					<view v-for="val in item.licenseNumber" :key="val" style="margin-bottom: 10rpx;">{{val}}</view>
				</view>
			</view>
			<view class="modle">
				<view class="modle-title unit-kind">是否需要秘书处理 </view>
				<view class="modle-content">{{item.isSecretaryHandle?'是':'否'}}</view>
			</view>
			<view class="modle">
				<view class="modle-title unit-kind">来访时间</view>
				<view class="modle-content">
					<view v-if='item.visitStatus.code!="WAIT_VISIT"' class="box-time">{{time}}</view>
					<!-- </timeSelector> -->
					<timeSelector v-else showType="yearToMinute" @btnConfirm="btnConfirm" @btnCancel="btnCancel" >
						<view class="box-time"  >{{time}}</view>
					</timeSelector>
				</view>
			</view>
			<!-- <uni-section title="配置图标" type="line"></uni-section> -->
			<!-- <button type="warn" size="mini" @click="handleUp">修改</button> -->

			<view class="modle" v-if="partnerSchema=='ADVANCED'">
				<view class="custom-center">
					<view class="custom-center-card">
						<view class="custom-right-card">
							<image :src="qrcodeSrc" style="width: 230rpx;height: 230rpx;margin-top: 10rpx;" />
							<canvas class="lucky-index-round" canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}"
							 style="position: relative;z-index: auto;" />
						</view>
						<view class="custom-left-card">
							<view>
								<button class="share-btn" open-type="share">
									<image src="../../static/img/card/wechat.png.png" mode=""></image>
									<text>发送到微信</text>
								</button>
							</view>
							<view>
								<button class="share-btn" @click="saveCans(1)">
									<image src="../../static/img/card/preserve.png.png" mode=""></image>
									<text>保存到相册</text>
								</button>
							</view>
							<view>
								<button class="share-btn">
									<image src="../../static/img/card/share.png.png" mode=""></image>
									<text>发送到钉钉</text>
								</button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="actions bottomBtn" v-if='item.personType.code=="VISITOR"'>
			<!-- 待同意 WAIT_AGREE -->
			<view v-if='item.visitStatus.code=="WAIT_AGREE"'>
				<button type="warn" size="mini" @click="handleCancel"><span class="btn_mini">取消</span></button>
				<button type="primary" size="mini" @click="handleUp"><span class="btn_mini">修改</span></button>
			</view>

			<!-- 待访问 WAIT_VISIT -->
			<view v-if='item.visitStatus.code=="WAIT_VISIT"'>
				<button type="primary" size="mini" @click="handleReservationTime"><span class="btn_mini">变更</span></button>
				<button type="warn" size="mini" @click="handleCancel"><span class="btn_mini">取消</span></button>
			</view>
			<!-- 访客待确认 VISITOR_WAIT_VERIFY -->
			<view v-if='item.visitStatus.code=="VISITOR_WAIT_VERIFY"'>
				<button type="primary" size="mini" @click="handleConfirm"><span class="btn_mini">确认</span></button>
				<button type="warn" size="mini" @click="handleCancel"><span class="btn_mini">取消</span></button>
			</view>
		</view>

		<view class="actions bottomBtn" v-if='item.personType.code=="INTERVIEWEE"'>
			<!-- 受访 待同意 WAIT_AGREE -->
			<view v-if='item.visitStatus.code=="WAIT_AGREE"'>
				<button type="primary" size="mini" @click="handleAgree"><span class="btn_mini">同意</span></button>
				<button type="warn" size="mini" @click="handleDisAgree"><span class="btn_mini">不同意</span> </button>
				<button type="default" size="mini" @click="handleNeglect"><span class="btn_mini">忽略</span> </button>
			</view>
			<!-- 待访问 WAIT_VISIT -->

			<view v-if='item.visitStatus.code=="WAIT_VISIT"'>
				<button type="primary" size="mini" @click="handleReservationTime"><span class="btn_mini">变更</span></button>
				<button type="warn" size="mini" @click="handleCancel"><span class="btn_mini">取消</span></button>
			</view>
			<!-- 已忽略 NEGLECT -->
			<view v-if='item.visitStatus.code=="RECOVER"'>
				<button type="primary" size="mini" @click="handleRecover"><span class="btn_mini">恢复</span></button>
			</view>
			<!--受访人待确认 INTERVIEWEE_WAIT_VERIFY -->
			<view v-if='item.visitStatus.code=="INTERVIEWEE_WAIT_VERIFY"'>
				<button type="primary" size="mini" @click="handleConfirm"><span class="btn_mini">确认</span></button>
				<button type="warn" size="mini" @click="handleCancel"><span class="btn_mini">取消</span></button>
			</view>
		</view>
		<view v-if="mask" class="cpt-mask">

		</view>
		<view class="carinput" v-if="mask">
			<text class="text">不同意原因</text>
			<view class="contentInput">
				<textarea class="uni-input " v-model="cancellationReason" placeholder="选填" style="text-align: left;"></textarea>
			</view>
			<view class="inputBtn">
				<button type="default" size="mini" @click="carInputCancel">取消</button>
				<button type="primary" size="mini" @click="toBind">确认</button>
			</view>
		</view>

		<view v-if="mask2" class="cpt-mask">

		</view>
		<view class="carinput" v-if="mask2">
			<text class="text">取消原因</text>
			<view class="contentInput">
				<textarea class="uni-input " v-model="cancellationReason" placeholder="选填" style="text-align: left;"></textarea>
			</view>
			<view class="inputBtn">
				<button type="default" size="mini" @click="InputCancel">取消</button>
				<button type="primary" size="mini" @click="btn">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import timeSelector from '@/components/wing-time-selector/wing-time-selector.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import uQRCode from '@/static/js/uqrcode.js'

	function getDate(type) {
		let date = new Date();
		let year = date.getFullYear(); //获取完整的年份(4位)
		let month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
		let day = date.getDate(); //获取当前日(1-31)
		let hours = date.getHours(); //获取当前小时数(0-23)
		let minutes = date.getMinutes();

		if (month < 10) month = "0" + month;
		if (day < 10) day = "0" + day;
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (type == "YYYY-MM-DD") return year + "-" + month + "-" + day;
		if ('YYYY-MM-DD HH:mm') return year + "-" + month + "-" + day + " " + hours + ":" + minutes

	}
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
				qrcodeSize: 118,
				qrcodeText: '',
				qrcodeSrc: "",
				code: "",
				statusImg: {
					WAIT_AGREE: "../../static/img/schedule/1.png",
					CANCEL: "../../static/img/schedule/1.png",
					WAIT_VISIT: "../../static/img/schedule/1.png",
					REFUSE: "../../static/img/schedule/1.png",
					NEGLECT: "../../static/img/schedule/1.png",
					CANCEL: "../../static/img/schedule/1.png",
					VISITOR_WAIT_VERIFY: "../../static/img/schedule/1.png",
					INTERVIEWEE_WAIT_VERIFY: "../../static/img/schedule/1.png",
					FINISHED_APPOINT: "",
					UNFINISHED_APPOINT: ""
				},
				id: "",
				item: {
					personType: {
						code: ""
					},
					visitStatus: {
						code: ""
					}
				},
				mask: false,
				mask2: false,
				cancellationReason: "",
				isClick: true,
				expand: false,
				partnerSchema: "",
				partnerNumber: "",
				time: getDate('YYYY-MM-DD HH:mm'),
				swipeList: [{}, ],
				scheduleType:""
			};
		},

		onLoad: function(option) {
			const id = option.id;
			this.scheduleType = option.scheduleType
			this.initView(id)
		},
		onReady() {

		},
		onShareAppMessage(res) {
			console.log(res)
			return {
				title: '访客系统',
				path: '/pagesNews/news/addReservation?code=' + this.code,
				imageUrl: "/static/img/logo.png"
			}
		},
		methods: {

			// 	取消this.id
			handleCancel() {
				// const code = "CANCEL";
				// this.operation(code);
				this.mask2 = true;

			},
			// 取消原因 确定按钮
			btn() {
				const code = "CANCEL";
				this.operation(code);
				this.mask2 = false;
			},

			// 取消原因 取消按钮
			InputCancel() {
				this.mask2 = false;
			},

			handleUp() {
				uni.navigateTo({
					url: '../../pagesNews/news/createReservation?id=' + this.id
				})
			},
			// 确认
			handleConfirm() {
				const code = "CONFIRM";
				this.operation(code)
			},
			// 同意
			handleAgree() {
				const code = "AGREE"
				this.operation(code)
			},
			// 不同意
			handleDisAgree() {
				// const code = "DISAGREE";
				// this.operation(code);
				this.mask = true;
			},

			//不同意原因 确定按钮
			toBind() {
				const code = "DISAGREE";
				this.operation(code);
				this.mask = false;
			},

			//不同意原因 取消按钮
			carInputCancel() {
				this.mask = false;
			},

			//忽略
			handleNeglect() {
				const code = "NEGLECT";
				this.operation(code)

			},
			// 恢复
			handleRecover() {
				const code = "RECOVER";
				this.operation(code)
			},
			//变更 
			async handleReservationTime() {
				const fullDate = this.item.reservationTime;
				let date = fullDate.substring(0, 16);
				// let [date,ss]=fullDate.s
				if (date == this.time) {
					uni.showToast({
						title: "修改变更时间",
						icon: "none",
						duration: 3000
					});
					return;
				}
				const reservationTime = this.time;
				const id = this.id;
				uni.showLoading({
					mask: true,
					title: '处理中'
				});
				const res = await this.$put("visitor/interviewRecord", {
					reservationTime,
					id,
					scheduleType:this.scheduleType
				})
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				uni.hideLoading();
				uni.showToast({
					title: res.msg,
					icon: "none",
					duration: 3000
				});
				if (res.code != 0) return;
				uni.navigateBack()

			},
			async operation(code) {
				const operationType = {
					code,
					scheduleType:this.scheduleType
				}
				const recordId = this.id;
				const cancellationReason = this.cancellationReason;
				const res = await this.$put("visitor/interviewRecord/operation", {
					operationType,
					recordId,
					cancellationReason
				})
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				uni.showLoading({
					mask: true,
					title: '处理中'
				});
				uni.hideLoading();
				uni.showToast({
					title: res.msg,
					icon: "none",
					duration: 3000
				});
				if (res.code != 0) return;
				uni.navigateBack()
			},
			async initView(id) {
				this.id = id;
				const res = await this.$get("visitor/interviewRecord/getInterviewRecordDetail", {
					id,
					scheduleType:this.scheduleType
				});
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				if (res.code != 0) {
					uni.showToast({
						icon: "none",
						title: res.msg,
						duration: 3000
					});
					return;
				}
				this.partnerSchema = res.data.partnerSchema;
				console.log(res);
				if (res.code == 0) {
					this.item = res.data || {};
					const fullDate = this.item.reservationTime;
					let date = fullDate.substring(0, 16);
					this.time = date;
					uQRCode.make({
						canvasId: 'qrcode',
						text: res.data['appointmentCode'] + "&appointmentCard",
						size: this.qrcodeSize,
						margin: 10,
						success: res => {
							this.qrcodeSrc = res
						},
						complete: () => {
							uni.hideLoading()
						}
					})
					this.code = res.data['appointmentCode'];
				} else {
					uni.showToast({
						icon: "none",
						title: res.msg,
						duration: 3000
					});
				}

			},
			getParameterByName(name, url) {
				if (!url) url = window.location.href;
				name = name.replace(/[\[\]]/g, "\\$&");
				var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
					results = regex.exec(url);
				if (!results) return null;
				if (!results[2]) return '';
				return decodeURIComponent(results[2].replace(/\+/g, " "));
			},
			btnConfirm(e) {
				console.log(e)
				let {
					year,
					month,
					day,
					hour,
					minute
				} = e;
				if (month < 10) month = "0" + month;
				if (day < 10) day = "0" + day;
				if (hour < 10) hour = "0" + hour;
				if (minute < 10) minute = "0" + minute;
				this.time = year + "-" + month + "-" + day + " " + hour + ":" + minute
			},
			btnCancel() {
				console.log('取消时间：');
			},
			saveCans(e) {
				uni.showLoading({
					title: '保存相册中'
				});
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: 700,
					height: 1000,
					destWidth: 1000,
					destHeight: 1000,
					canvasId: 'qrcode',
					success: function(res) {
						uni.hideLoading()
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function(red) {
								uni.showToast({
									title: '保存相册成功'
								})
							},
							fail(res) {
								if (res.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
									uni.showModal({
										title: '您需要授权相册权限',
										success(res) {
											if (res.confirm) {
												uni.openSetting({
													success(res) {

													},
													fail(res) {
														console.log(res)
													}
												})
											}
										}
									})
								}
							}
						});
					},

					fail(res) {
						uni.hideLoading()
					}
				}, this)
			}
		}
	}
</script>



<style lang="scss">
	@import '../../static/css/feekback.less';

	.lucky-index-round {
		position: fixed;
		top: -9999rpx;
		left: 0;
	}

	.custom-center {
		height: 262upx;
	}

	uni-button:after,
	button:after {
		border: 0
	}

	.cpt-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #000000;
		opacity: 0.5;
		z-index: 999;
	}

	.carinput {
		position: fixed;
		z-index: 999;
		top: 200upx;
		left: 13%;
		width: 70%;
		height: 35%;
		text-align: center;
		background: #FFFFFF;
		margin-top: 74upx;
		display: flex;
		flex-direction: column;
		padding-left: 20upx;
		padding-right: 20upx;
		padding-bottom: 20upx;
	}

	.text {
		font-size: 36upx;
		margin-top: 30upx;
	}

	.uni-input {
		display: flex;
		justify-content: center;
		margin-left: 34px;
		margin-top: 10px;
		width: 200px;
		height: 100px;
		border: 1rpx solid #323232;
	}

	.inputBtn {
		font-size: 36upx;
		display: flex;
		margin-top: 20px;
		width: 70%;
		justify-content: space-between;
		margin-left: 40px;

		button {
			width: 160rpx;
			font-size: 32rpx;

		}
	}

	.btn_mini {
		line-height: 60upx;
		font-size: 36upx;
	}

	.share-btn {
		font-size: 24upx;
		display: inline;
		padding: 0;
		background-color: transparent;
	}

	uni-button:after {
		border: 0;
	}

	.xin {
		color: red;
	}

	.scheduleDetails {
		width: 100%;

		.actions {
			text-align: center;
			margin-top: 50rpx;
			margin-bottom: 50rpx;

			button {
				min-width: 400rpx;
				width: 70%;
				margin-top: 20rpx;
			}
		}

		.bottomBtn {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #FFFFFF;
			margin-bottom: 0px;
			// height: 100%;
		}

		.schedule-content {
			padding: 0 20rpx;
			margin-bottom: 300upx;
			// line-height: 80%;

		}

		.modle {
			.modle-title {
				margin-top: 20rpx;
			}

			.modle-content {
				margin: 20px 0rpx 25rpx 0;
				color: #202022;
			}

			border-bottom: 1px solid #EBEEF5;
		}

		.unit-kind {
			color: #A0A4AA;
			font-size: 36rpx;
		}

		.card {
			// padding: 10rpx;
			margin: 10rpx 0;
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
					padding-right: 100rpx;
					position: relative;


					.unit-status {
						position: absolute;
						right: 3rpx;
						top: -20rpx;
						width: 90rpx;
						height: 90rpx;
					}

					.unit-title {
						color: #202022;
						font-size: 32rpx;
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
