<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="content">
		<custom-header :title="title" :backBtnClass="backBtnClass" :showBack="showBack" :containerStyle="containerStyle"
		 :titleStyle="titleStyle" @backTap="backClick" ref="backTap"></custom-header>
		<view class="listCss">
			<view class="headtitle">
				<image :src="headerImg" class="head" @tap="ViewImage"></image>
				<view class="personalInfo">
					<text decode="true" class="companyName">{{tenantCodeName }}</text>
					<text decode="true" class="userName">{{userName}}</text>
				</view>
			</view>
			<!-- <view class="passCheck">
				<text decode="true" class="word">{{stationName}}</text>
				<navigator url="../../pagesPersonalCenter/personalCenter/feekback">
					<text decode="true" class="word floatRight">分享名片</text>
					<image src="../../static/img/QRCode.png" class="QRCode"></image>
				</navigator>
			</view> -->
		</view>
		<view class="listGroup">
			<navigator url="../../pagesPersonalCenter/personalCenter/personalSettings">
				<view class="passCheck">
					<image src="../../static/img/icon-shezhi.png" class="iconImg"></image>
					<text decode="true" class="word">个人设置</text>
					<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
				</view>
			</navigator>
			<!-- <view class="passCheck">
				<image src="../../static/img/blacklist.png" class="iconImg"></image>
				<text decode="true" class="word">黑名单</text>
				<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
			</view> -->
			<!-- <view class="passCheck">
				<image src="../../static/img/icon-iconset0142.png" class="iconImg"></image>
				<text decode="true" class="word">关于软件</text>
				<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
			</view> -->
			<!-- <view class="passCheck">
				<image src="../../static/img/icon-yijianfankui-.png" class="iconImg"></image>
				<text decode="true" class="word">意见反馈</text>
				<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
			</view> -->
			<!-- <navigator url="../../pagesPersonalCenter/personalCenter/passCode">
				<view class="passCheck">
					<image src="../../static/img/icon-yijianfankui-.png" class="iconImg"></image>
					<text decode="true" class="word">查看通行码</text>
					<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
				</view>
			</navigator> -->
			<view class="passCheck" v-if="!isBindWx" @click="bind()">
				<image src="../../static/img/weixin.png" class="iconImg"></image>
				<text decode="true" class="word">微信授权</text>
				<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
			</view>

			<view class="passCheck" v-else @click="unbind()">
				<image src="../../static/img/weixin.png" class="iconImg"></image>
				<text decode="true" class="word">微信解绑</text>
				<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
			</view>
			<view class="passCheck" @click="enterFace()">
				<image src="../../static/img/face.png" class="iconImg"></image>
				<text decode="true" class="word">录入头像</text>
				<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
			</view>
			<view class="passCheck" @click="loginOut">
				<image src="../../static/img/loginOut.png" class="iconImg"></image>
				<text decode="true" class="word">退出登录</text>
				<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import customHeader from '../../components/custom-header/custom-header.vue';
	import variableStr from '../../common/common.js';
	import {
		buildUrl
	} from '@/common/request.js';
	import {
		getValue
	} from '@/common/request.js';
	import db from "../../common/localstorage";
	export default {
		data() {
			return {
				title: '我的',
				showBack: variableStr.tabBarStr.showBack,
				backBtnClass: variableStr.tabBarStr.backBtnClass,
				containerStyle: variableStr.tabBarStr.containerStyle,
				titleStyle: variableStr.tabBarStr.titleStyle,
				userName: "",
				headerImg: "",
				stationName: "",
				isBindWx: "",
				tenantCodeName: "",
				file: ""
			}
		},
		// onLoad(e) {
		// 	this.interviewMessage();
		// },
		onShow() {
			if (db.get('TENANT') == " " || db.get('TENANT') == undefined || db.get('TENANT') == "undefined" || db.get('TENANT') ==
				'null' || db.get('TENANT') == null) {
				console.log("第一种")
				this.refresh()
			} else {
				this.interviewMessage();
			}


		},
		methods: {
			loginOut() {
				uni.showModal({
					title: '退出登录',
					content: '您确定要退出登录吗？',
					success: function(res) {
						if (res.confirm) {
							db.clear();
							uni.reLaunch({
								url: '../../pages/login/pwdLogin',
							});
						} else if (res.cancel) {}
					}
				});
			},
			async interviewMessage() {
				const url = "admin/user/getUserAndEmployeeBaseInfo";
				const res = await this.$get(url);
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				console.log(res)
				this.userName = res.data.name;
				this.isBindWx = res.data.isBindWx;
				this.headerImg = res.data.avatar ? res.data.avatar : "../../static/img/header.png";
				this.stationName = res.data.station.data ? res.data.station.data['name'] : " ";
				this.tenantCodeName = res.data.tenantCode.data ? res.data.tenantCode.data['name'] : " ";
				uni.setStorageSync('userAndEmployeeBaseInfo', res.data);
				uni.setStorageSync('userTenantCode', res.data.tenantCode['key']);
				uni.setStorageSync('identifyCode', getValue(res.data, "identifyCode"));
				uni.setStorageSync('officeId', getValue(res.data, "officeInfo.id"));
				uni.setStorageSync('officeAddress', getValue(res.data, "officeInfo.officeAddress"));
				uni.setStorageSync('carNumberId', getValue(res.data, "carInfo.id"));
				uni.setStorageSync('carNumber', getValue(res.data, "carInfo.carNumber"));
			},

			async refresh() {

				const url = "authority/account/refresh";
				const res = await this.$get(url);
				console.log("3333333")
				console.log(res.data)
				this.$store.commit("account/setTenant", res.data.tenant[0] ? res.data.tenant[0].code : " ");
				// console.log(res.data.tenant[0].code)
				this.interviewMessage();
			},
			//微信解绑
			unbind() {
				uni.showModal({
					title: '解绑微信',
					content: '您确定要解绑微信吗？',
					success: async (res) => {
						if (res.confirm) {
							const url = "admin/userAuthorization/unbind";
							const res = await this.$put(url);
							console.log(res)
							if (res.code != 0) {
								uni.showToast({
									icon: "none",
									title: res.msg,
									duration: 2000
								});
							} else {
								uni.showModal({
									title: '提示',
									showCancel: false,
									content: '解绑成功',
									success: (res) => {
										this.interviewMessage();
									}
								});
							}
						} else if (res.cancel) {}
					}
				});
			},
			ViewImage(e) {
				console.log(e)
				uni.previewImage({
					urls: [this.headerImg],
					current: e.currentTarget.dataset.url
				});
			},

			//微信绑定
			bind() {
				uni.showModal({
					title: '绑定微信',
					content: '您确定要绑定微信吗？',
					success: (res) => {
						if (res.confirm) {
							uni.login({
								provider: 'weixin',
								success: async (loginRes) => {
									const option = {
										jscode: loginRes.code
									}
									const url = "admin/userAuthorization/bind";
									const res = await this.$put(url, option);
									console.log(res)
									if (res.code != 0) {
										uni.showToast({
											icon: "none",
											title: res.msg,
											duration: 3000
										});
									} else {
										uni.showModal({
											title: '提示',
											showCancel: false,
											content: '绑定成功',
											success: (res) => {
												this.interviewMessage();
											}
										});
									}
								}
							});
						} else if (res.cancel) {}
					}
				});
			},

			//录入头像
			enterFace() {
				let token = uni.getStorageSync("TOKEN");
				let tenant = uni.getStorageSync("TENANT");
				uni.showModal({
					title: '录入头像',
					content: '您确定要录入头像吗？',
					success: (res) => {
						console.log("12345")

						if (res.confirm) {
							uni.chooseImage({
								count: 1,
								sourceType: ['camera', 'album'],
								sizeType: ['compressed'],
								success: (res) => {
									uni.uploadFile({
										url: buildUrl() + 'admin/userFace/addUserFace',
										filePath: res.tempFilePaths[0],
										header: {
											"token": token,
											"tenant": tenant
										},
										name: 'file',
										success: (uploadFileRes) => {
											console.log("222222")
											var res = JSON.parse(uploadFileRes.data)
											console.log(res);
											uni.showToast({
												title: res.msg,
												icon: 'none'
											});

											if (res.code != 0) {
												uni.showToast({
													title: res.msg + '请重新录入',
													icon: 'none',
													duration: 3000
												});
												return;
											}
										},
										fail: (e) => {
											uni.showToast({
												title: res.msg,
												icon: 'none'
											});
										},

									});
								}
							});
						} else if (res.cancel) {}

					}


				})
			}


		},
		components: {
			customHeader
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/css/personal.css';
</style>
