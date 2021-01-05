<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="passcode" style="">
		<view class="pass">
			<view class="" style="		z-index: 999;">
				<navigator url="./help">
					<text type="primary" class="help">使用手册</text>
				</navigator>
			</view>
			<image src="../../static/img/passcode.png" mode="widthFix"></image>
			<view style="text-align: center;margin-top: 20rpx;">
				<view class="custom-right-card">
					<canvas canvas-id="qrcodeID" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
					<text class="barcode">此二维码仅用于终端验证通行扫描</text>
				</view>
			</view>
			<view class=""style="text-align: center;">
				<view class="custom-right-card" style="top:90%;margin-bottom: 10%;">
					<text type="primary"   class="confirm" @click="isAuthorizationCreate()">生成名片</text>
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<!-- <view style="width:100%;position: fixed;bottom: 0;">
			    <official-account  @load="bindload" @error="binderror"></official-account>
			   </view> -->
			<!-- #endif -->
		</view>
			
	</view>
</template>

<script>
	import customHeader from '../../components/custom-header/custom-header.vue';
	import variableStr from '../../common/common.js';
	import uQRCode from '@/static/js/uqrcode.js';
	import db from "../../common/localstorage";
	import {
		getValue
	} from '../../common/request.js';
	import {
		buildUrl
	} from '@/common/request.js';
	export default {
		components: {
			customHeader,
		},
		data() {
			return {
				title: '通行码',
				showBack: variableStr.tabBarStr.showBack,
				backBtnClass: variableStr.tabBarStr.backBtnClass,
				containerStyle: variableStr.tabBarStr.containerStyle,
				titleStyle: variableStr.tabBarStr.titleStyle,
				userName: "",
				headerImg: "",
				stationName: "",
				tenantCodeName: "",
				userInfoID: "",
				qrcodeSize: 200,
				none: '',
				type: ""
			}
		},
		onLoad: function(option) {
			this.type = uni.getStorageSync('regType');
			const that = this
			uni.showLoading({
				title: '请稍后',
				mask: true
			})
			const userToken = db.get('TOKEN');
			if (userToken == "" || userToken == "undefined" || userToken == undefined) {
				uni.hideLoading();
				uni.navigateTo({
					url: "/pages/login/pwdLogin"
				})
			}
			this.userInfoID = uni.getStorageSync('userid');
			uQRCode.make({
				canvasId: 'qrcodeID',
				text: this.userInfoID,
				size: this.qrcodeSize,
				margin: 10,
				success: res => {
					this.qrcodeSrc = res;
					this.disabled = !this.disabled
				},
				complete: () => {
					uni.hideLoading()
				}
			})
			console.log(this.type)
			if (this.type == "reg") {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '请录入头像',
					success: (res) => {
						uni.removeStorageSync("regType")
						console.log()
						this.addUserFace(uni.getStorageSync('regType'));
					}
				});
			}
		},

		methods: {
			// visitor/reservationLabel/isAuthorizationCreate
			//录入头像
			addUserFace() {
				const _this = this;
				const token = db.get('TOKEN', '')
				const tenant = db.get('TENANT', '')
				console.log("555")
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					count: 1,
					sizeType: ['compressed'],
					success: res => {
						console.log("444")
						uni.uploadFile({
							url: buildUrl() + 'admin/userFace/addUserFace',
							filePath: res.tempFilePaths[0],
							header: {
								"token": token,
								"tenant": tenant,
							},
							name: 'file',
							success: (uploadFileRes) => {
								const res = JSON.parse(uploadFileRes.data)
								if (res.code == 0) {
									console.log("录入成功")
								} else {
									uni.showModal({
										title: res.msg,
										content: '在试一次：重新录入头像\r\n稍后录入：请在“我的”重新录入头像',
										cancelText: "稍后录入", //取消
										confirmText: "再试一次", //确定
										success: function(res) {
											if (res.confirm) {
												_this.addUserFace();
											} else if (res.cancel) {}
										}
									});
								}
								console.log(res);
							},
							fail: (e) => {
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 3000
								});
							},
						});
					},
					fail: (e) => {
						console.log("8888")
						console.log(e)
					}
				});
			},
			binderror(e) {
				console.log(e)
			},
			bindload(e) {
				console.log(e)
			},
			async isAuthorizationCreate() {
				const url = "visitor/reservationLabel/isAuthorizationCreate";
				const res = await this.$get(url);
				console.log(res)
				if (getValue(res, 'data')) {
					// this.none = getValue(res, 'data')
					uni.navigateTo({
						url: '../../pagesPersonalCenter/personalCenter/feekback'
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '当前机构没有购买小程序，请联系管理员',
						success: (res) => {
							if (res.confirm) {
								// uni.navigateTo({
								// 	url: '../../pagesPersonalCenter/personalCenter/addOrganization'
								// })
							}
						}
					})
				}

			},

		}

	}
</script>

<style lang="scss" scoped>
	@import '../../static/css/personal.css';
	.help {
		width: 200rpx;
		height: 60rpx;
		border-radius: 40rpx;
		font-size: 34rpx;
		line-height: 60rpx;
		// background: #FFB600;
		color: #FFB600;
		text-align: center;
		border: 1rpx solid #FFB600;
		position: absolute;
		// top: 120rpx;
		margin-left: 60%;
	}
	.confirm{
		width: 582rpx;
		height: 80rpx;
		border-radius: 40rpx;
		font-size: 34rpx;
		line-height: 80rpx;
		background: #FFB600;
		color: #FFFFFF;
		text-align: center;
		border: 1rpx solid #FFB600;
	}
	body {}

	.passcode {
		padding: 0;
		width: 100%;
		// background-image: url('https://i.loli.net/2020/07/17/7ItYVAjzZNpahbP.png');
		// background-repeat: no-repeat;
		// background-size: 100% 100%;


	}

	.pass {
		display: flex;
		flex-direction: column;
		position: relative;
		margin-top: 20%;

		image {
			margin: auto;
		}


		.custom-right-card {
			display: flex;
			justify-content: center;
			position: absolute;
			top: 25%;
			left: 0;
			right: 0;

			.barcode {
				width: 550rpx;
				height: 50rpx;
				border-radius: 40rpx;
				font-size: 32rpx;
				line-height: 50rpx;
				background: #FFFFFF;
				color: #FFB600;
				text-align: center;
				margin: auto;
				border: 1rpx solid #FFB600;
				position: absolute;
				left: 0;
				right: 0;
				top: 110%;

			}

		}

		// .confirm {
		// 	width: 582rpx;
		// 	height: 80rpx;
		// 	border-radius: 40rpx;
		// 	font-size: 36rpx;
		// 	line-height: 80rpx;
		// 	background: #FFB600;
		// 	color: #FFFFFF;
		// 	text-align: center;
		// 	border: 1rpx solid #FFB600;
		// 	// position: fixed;
		// 	// bottom: 140rpx;
		// 	// margin: 12%;
		// 	// margin-left: 10%;
			
		// }
	}
</style>
