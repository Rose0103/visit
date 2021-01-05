<template>
	<view>
		<view class="bgContent">
			<view>
				<text class="loginTitle">欢迎登录</text>
			</view>
			
			<image class="bgImg" src="../../static/img/logo.png"></image>
			<view class="input-row border">
				<text class="title">+86：</text>
				<input class="m-input-sel" type="number" maxlength="11" clearable v-model="account" placeholder="请输入手机号码"></input>
			</view>
			<view class="input-row border">
				<text class="title">密码：</text>
				<m-input type="password" class="m-input-sel" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			
		</view>
		<view class="action-row smsLogin" v-if="code!=''&&type!=''">
			<navigator :url="`./smsLogin?type=${type}&code=${code}&scheduleType=${scheduleType}`">短信快捷登录</navigator>
			<navigator :url="`../pwd/pwd?type=${type}&code=${code}&scheduleType=${scheduleType}`">忘记密码?</navigator>
		</view>
		<view class="action-row smsLogin" v-else>
			<navigator url="./smsLogin">短信快捷登录</navigator>
			<navigator url="../pwd/pwd">忘记密码?</navigator>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="oauth-image" @click="wxLogin()" style="margin: auto;">
			<image src="../../static/img/wechatLogin.png" ></image>
			<button >微信登录</button>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view class="action-row smsLogin">
			<navigator open-type="exit" target="miniProgram">暂不登录，退出小程序</navigator>
		</view>
		<!-- #endif -->

		<view class="action-row" v-if="code!=''&&type!=''">
			<text class="msg">还没有Visitor账号</text>
			<navigator :url="`../reg/reg?type=${type}&code=${code}&scheduleType=${scheduleType}`">注册账号</navigator>
		</view>
		<view class="action-row" v-else>
			<text class="msg">还没有Visitor账号</text>
			<navigator url="../reg/reg">注册账号</navigator>
		</view>
	</view>
</template>

<script>
	// import service from '../../service.js';
	import db from "../../common/localstorage";
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	export default {
		components: {
			mInput
		},
		onShareAppMessage: function() {

		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				positionTop: 0,
				isDevtools: false,
				type: "",
				code: "",
				scheduleType:""
			}
		},
		computed: mapState(['forcedLogin']),
		methods: {
			...mapMutations(['login']),

			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			async bindLogin() {
				/**
				 * 客户端对账号信息进行一些必要的校验。
				 * 实际开发中，根据业务需要进行处理，这里仅做示例。
				 */
				if (this.account.trim() == "" || this.password.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '用户账号或密码未输入',
						duration: 3000
					});
					return false;
				}
				
				const url = "authority/anno/login";
				const options = {
					"account": this.account,
					"password": this.password,
					"type": {
						"code": "PASSWORD"
					}
				};
				console.log(options);
				const res = await this.$post(url, options);
				console.log(res);
				// console.log(res.data.user.id)
				

				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				// console.log(options);
				//异步操作成功
				if (res.code == 0) {
					uni.setStorageSync('userid',res.data.user.id);
					const data = res.data;
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
						uni.navigateTo({
							url: '../../pagesNews/news/createReservation?code=' + this.code+"&scheduleType=" +this.scheduleType
						});
					} else if (this.type == "appointmentCard") {
						uni.navigateTo({
							url: '../../pagesNews/news/addReservation?code=' + this.code+"&scheduleType=" +this.scheduleType
						});
					} else {
						uni.switchTab({
							url: '/pages/application/code',
						})
					}
				} else {
					uni.showToast({
						icon: "none",
						title: res.msg,
						duration: 3000
					});
				}
			},

			
			 wxLogin(){
				console.log("3333")
				uni.login({
					provider: 'weixin',
					success: async (loginRes) => {
						const option = {
							jscode: loginRes.code,
							"loginType": {
								"code": "WX"
							}
						}
						const url = "authority/anno/login";
						const res = await this.$post(url, option);
						if (res == "" || res == null || res == undefined || res == "undefined") {
							return;
						}
						if (res.code == 0) {
							uni.setStorageSync('userid',res.data.user.id);
							const data = res.data;
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
								uni.navigateTo({
									url: '../../pagesNews/news/createReservation?code=' + this.code+"&scheduleType=" +this.scheduleType
								});
							} else if (this.type == "appointmentCard") {
								uni.navigateTo({
									url: '../../pagesNews/news/addReservation?code=' + this.code+"&scheduleType=" +this.scheduleType
								});
							} else {
								uni.reLaunch({
									url: '/pages/application/code',
								});
							}
						} else if(res.code == 40009){
							uni.showModal({
								title: '该微信还未注册此小程',
								content: '已有账号请先登录后，在个人中心微信授权！没有账号，请先注册！',
								cancelText:"已有账号",//取消
								confirmText:"没有账号",//确定
								success: function(res) {
									if (res.confirm) {//确定
										uni.reLaunch({
											url: '../../pages/reg/reg',
										});
									} else if (res.cancel) {//取消
										
									}
								}
							});
						}else{
							uni.showToast({
								icon: "none",
								title: res.msg,
								duration: 3000
							});
						}
					}
				});
			}
		},
		onReady() {
			this.initPosition();
			// this.initProvider();
			// #ifdef MP-WEIXIN
			this.isDevtools = uni.getSystemInfoSync().platform === 'devtools';
			// #endif
		},
		onLoad: function(option) {
			console.log(option)
			if (option == "" || option == "undefined" || option == undefined) {

			} else {
				this.type = option.type ? option.type : "";
				this.code = option.code ? option.code : "";
				this.scheduleType = option.scheduleType ? option.scheduleType : "";
			}
		}
	}
</script>

<style>
	@import '../../static/css/login.css';
</style>
