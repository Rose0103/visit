<template>
	<view>
		<view class="bgContent">
			<view class="input">
				<text class="title">姓名：</text>
				<view class="input-row border">
					<m-input class="m-input-sel" type="text" focus clearable v-model="userName" placeholder="请输入姓名"></m-input>
				</view>
			</view>
			<view class="input">
				<text class="title vCode">身份证号码：</text>
				<view class="input-row border">
					<m-input class="m-input-sel" type="text" clearable v-model="userID" placeholder="请输入身份证号码"></m-input>
				</view>
			</view>
			<view class="input">
				<text class="title">手机号码：</text>
				<view class="input-row border">
					<m-input class="m-input-sel" type="number" maxlength="11" clearable v-model="account" placeholder="请输入手机号码"></m-input>
				</view>
			</view>
			<view class="input">
					<text class="title">登录密码：</text>
					<view class="input-row border">
						<m-input class="m-input-sel" type="password" displayable v-model="password" placeholder="请设置密码"></m-input>
					</view>
			</view>
			<view class="input">
				<text class="vCode title">手机验证：</text>
				<view class="input-row border">
					<m-input type="text" class="m-input-sel" v-model="smsCode" placeholder="请输入验证码"></m-input>
					<text class="sendSms" @click="sendSms">{{sendSmsContent}}</text>
				</view>
			</view>
		</view>


		<view class="btn-row">
			<button type="primary" class="primary" @click="appLoginWx">注册</button>
		</view>
		<view class="action-row">
			<text class="msg" style="margin-left: 11upx;">注册表示您已阅读并同意</text>
			<xuanze @itemObj='itemObj' :bgflag='flag' @tap='f1()'></xuanze>
			<view class="navigator" @click="flag=!flag">《本产品用户协议和隐私政策》</view>
		</view>
		<view class="action-row" v-if="code!=''&&type!=''">
			<text class="msg" style="margin-top: 39rpx;">已有账号？</text>
			<navigator :url="`../login/pwdLogin?type=${type}&code=${code}}&scheduleType=${scheduleType}`">快捷登录</navigator>
		</view>
		<view class="action-row" v-else>
			<text class="msg" style="margin-top: 39rpx;">已有账号？</text>
			<navigator url="../login/pwdLogin">快捷登录</navigator>
		</view>

	</view>
</template>

<script>
	// import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	import xuanze from '../../components/Feng-List/xuanze.vue';
	import {
		buildUrl
	} from '@/common/request.js';
	export default {
		components: {
			mInput,
			xuanze
		},
		data() {
			return {
				account: '',
				password: '',
				userID: '',
				smsCode: '',
				sendSmsContent: "点击获取",
				countdown: 60,
				InputFlag: true,
				userName: '',
				type: "",
				jscode: "",
				test: "",
				code: "",
				flag: false,
				scheduleType: ""

			}
		},
		methods: {
			itemObj(e) {
				console.log(e)
			},
			f1() {
				this.flag = !this.flag
			},
			appLoginWx() {
				if (this.userName.trim() == "") {
					uni.showToast({
						icon: 'none',
						title: '姓名不能为空'
					});
					return;
				}
				console.log("1:" + this.userID)
				if (this.userID.trim() == "") {
					console.log("2:" + this.userID)
					uni.showToast({
						icon: "none",
						title: '请输入身份证号码',
						duration: 3000
					});
					// return;
				} else {
					console.log("3:" + this.userID)
					if (!(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(this.userID.trim()))) {
						uni.showToast({
							icon: "none",
							title: '请输入正确的身份证号码',
							duration: 3000
						});
						return false;
					}
				}

				if (this.account.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '请输入联系电话',
						duration: 3000
					});
					return false;
				} else {
					if (!(/^1[3456789]\d{9}$/.test(this.account.trim()))) {
						uni.showToast({
							icon: "none",
							title: '请输入正确的手机号码哦',
							duration: 3000
						});
						return false;
					}
				}

				if (this.password.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '请设置登录密码',
						duration: 3000
					});
					return false;
				} else {
					if (this.password.length < 6 || this.password.length > 30) {
						uni.showToast({
							icon: "none",
							title: '请设置密码长度为6~30位数之间',
							duration: 3000
						});
						return false;
					}
				}

				if (this.smsCode.trim() == "") {
					uni.showToast({
						icon: 'none',
						title: '验证码不能为空'
					});
					return;
				}
				uni.clearStorage();
				var that = this
				uni.showModal({
					title: '微信授权',
					content: '是否授权微信登录',
					cancelText: "不授权", //取消
					confirmText: "授权", //确定
					success: function(res) {
						if (res.confirm) { //确定
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									console.log(loginRes);
									uni.setStorageSync('loginRes', loginRes.code);
									let jscode = loginRes.code;
									that.register(jscode);
								}
							});
						} else if (res.cancel) { //取消
							console.log("laile")
							let jscode = uni.getStorageSync('loginRes')
							that.register(jscode);
						}
					}
				});
			},

			async register(loginRes) {
				console.log(loginRes)
				console.log("67890");


				this.jscode = uni.getStorageSync("loginRes")
				console.log(this.jscode);
				const url = "admin/user/anno/register";
				const options = {
					mobile: this.account,
					password: this.password,
					verificationCode: this.smsCode,
					name: this.userName,
					jscode: this.jscode,
					idCard: this.userID
				}
				console.log(options);
				// this.jscode = uni.removeStorage("loginRes")
				const res = await this.$post(url, options);
				console.log(res);
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				if (res.code == 0) {
					const urlLogin = "authority/anno/login";
					const optionsLogin = {
						"account": this.account,
						"password": this.password,
						"type": {
							"code": "PASSWORD"
						}
					};
					console.log(optionsLogin);
					const resLogin = await this.$post(urlLogin, optionsLogin);
					console.log(resLogin);
					if (resLogin.code != 0) {
						uni.showModal({
							title: '提示',
							showCancel: false,
							content: '注册成功，请登录后在“我的”录入头像信息',
							success: (res) => {
								if (this.type == "businessCard") {
									uni.navigateTo({
										url: '../login/pwdLogin?type=businessCard&code=' + this.code + "&scheduleType=" + this.scheduleType
									});
								} else if (this.type == "appointmentCard") {
									uni.navigateTo({
										url: '../login/pwdLogin?type=appointmentCard&code=' + this.code + "&scheduleType=" + this.scheduleType
									});
								} else {
									uni.reLaunch({
										url: '../login/pwdLogin',
									});
								}
							}
						});
					} else {
						const data = resLogin.data;
						const current = new Date();
						const expireTime = current.setTime(
							current.getTime() + 1000 * data.token.expire
						);
						this.$store.commit("account/setToken", data.token.token);
						uni.setStorageSync('identifyCode', data.tenant[0] ? data.tenant[0].identifyCode : "");
						this.$store.commit("account/setExpireTime", expireTime);
						this.$store.commit("account/setTenant", data.tenant[0] ? data.tenant[0].code : "");
						this.$store.commit("account/setUser", data.user);
						if (this.type == "businessCard") {
							uni.showModal({
								title: '提示',
								showCancel: false,
								content: '注册成功，请登录后在“我的”录入头像信息',
								success: (res) => {
									uni.navigateTo({
										url: '../../pagesNews/news/createReservation?code=' + this.code + "&scheduleType=" + this.scheduleType
									});
								}
							});
							
						} else if (this.type == "appointmentCard") {
							uni.showModal({
								title: '提示',
								showCancel: false,
								content: '注册成功，请登录后在“我的”录入头像信息',
								success: (res) => {
									uni.navigateTo({
										url: '../../pagesNews/news/addReservation?code=' + this.code + "&scheduleType=" + this.scheduleType
									});
								}
							});
							
						} else {
							uni.setStorageSync('regType', 'reg');
							uni.reLaunch({
								url: '../application/code',
							});
						}
					}
				} else {
					uni.showToast({
						icon: "none",
						title: res.msg,
						duration: 3000
					});
				}

			},
			//发送短信验证码
			async sendSms() {
				if (this.account.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '请输入联系电话',
						duration: 3000
					});
					return false;
				} else {
					if (!(/^1[3456789]\d{9}$/.test(this.account.trim()))) {
						uni.showToast({
							icon: "none",
							title: '请输入正确的手机号码哦',
							duration: 3000
						});
						return false;
					}
				}

				const url = "msgs/verification/send";
				const options = {
					"mobile": this.account,
					"type": {
						"code": "REGISTER"
					}
				};
				const res = await this.$post(url, options);
				// 这里只需要传入不同的接口地址就可以
				console.log(res);
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				if (res.code == 0) {
					uni.showToast({
						icon: "none",
						title: '短信发送成功',
						duration: 3000
					});
					this.$options.methods.settime(this);
				} else {
					uni.showToast({
						icon: "none",
						title: res.msg,
						duration: 3000
					});
				}
			},
			settime(_this) {
				if (_this.countdown == 0) {
					_this.InputFlag = true;
					_this.sendSmsContent = "点击获取";
					_this.countdown = 60;
					return true;
				} else {
					_this.InputFlag = false;
					_this.sendSmsContent = _this.countdown;
					_this.countdown--;
				}
				// this.settime();
				setTimeout(function() {
					_this.settime(_this);
				}, 1000);
			}
		},

		onLoad: function(option) {

			if (option == "" || option == "undefined" || option == undefined) {

			} else {
				this.type = option.type ? option.type : "";
				this.code = option.code ? option.code : "";
				this.scheduleType = option.code ? option.scheduleType : "";
			}
		}
	}
</script>

<style scoped>
	@import '../../static/css/login.css';

	.navigator {
		color: #FF9400;
		padding: 0 10px;
		font-size: 28upx;
		margin-top: 28upx;
	}

	.input{margin: 0 0 25upx 20upx;}
		.input-row{
			margin: 0 65upx 25upx 0upx;
		}
	 .title {
		margin-left:6%;
	}

	.msg {
		color: #C0C4CC;
		font-size: 28upx;
		margin-top: 28upx;
	}
</style>
