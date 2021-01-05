<template>
	<view>
		<view class="bgContent">
			<view>
				<text class="loginTitle">欢迎登录</text>
			</view>
			
			<image class="bgImg" src="../../static/img/logo.png"></image>
			<view class="input-row border">
				<text class="title">+86：</text>
				<input class="m-input-sel" type="number" maxlength="11" clearable focus v-model="account" placeholder="请输入手机号码"></input>
			</view>
			<view class="input-row border">
				<text class="vCode title" >短信验证码：</text>
				<input type="text" class="m-input-sel" v-model="smsCode" placeholder="请输入验证码"></input>
				<text class="sendSms" @click="sendSms">{{sendSmsContent}}</text>
			</view>
		</view>
		<view class="action-row smsLogin" v-if="code!=''&&type!=''">
			<navigator :url="`pwdLogin?type=${type}&code=${code}&scheduleType=${scheduleType}`">账号密码登录</navigator>
			<navigator :url="`../pwd/pwd?type=${type}&code=${code}&scheduleType=${scheduleType}`">忘记密码?</navigator>
		</view>
		<view class="action-row smsLogin" v-else>
			<navigator url="pwdLogin">账号密码登录</navigator>
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
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import mInput from '../../components/m-input.vue'
	import {getValue} from '../../common/request.js';
	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				account: '',
				password: '',
				smsCode: '',
				sendSmsContent: "点击获取",
				countdown: 60,
				InputFlag: true,
				positionTop: 0,
				isDevtools: false,
				type:"",
				code:"",
				scheduleType:''
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
				
				if (this.account.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '用户账号未输入',
						duration: 3000
					});
					return false;
				}
				
				
				if (this.smsCode.trim() == "") {
					uni.showToast({
						icon: 'none',
						title: '请输入短信验证码'
					});
					return;
				}
				const url = "authority/anno/login";
				const options = {
					"account": this.account,
					"verificationCode": this.smsCode,
					"loginType": {
						"code": "SMS"
					}
				};
				console.log(options);
				const res = await this.$post(url, options);
				console.log(res);
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				//异步操作成功
				if (res.code == 0) {
					const data = res.data;
					const current = new Date();
					const expireTime = current.setTime(
						current.getTime() + 1000 * data.token.expire
					);
					this.$store.commit("account/setToken", data.token.token);
					this.$store.commit("account/setExpireTime", expireTime);
					if(data.tenant==""){
						this.$store.commit("account/setTenant", "");
					}else{
						this.$store.commit("account/setTenant", data.tenant[0].code);
					}
					uni.setStorageSync('identifyCode', data.tenant[0]?data.tenant[0].identifyCode:"");
					uni.setStorageSync('userid',getValue(data,'user.id'));
					this.$store.commit("account/setUser", data.user);
					if(this.type=="businessCard"){
						uni.navigateTo({
							url: '../../pagesNews/news/createReservation?code=' +this.code+"&scheduleType=" +this.scheduleType
						});
					}else if(this.type=="appointmentCard"){
						uni.navigateTo({
							url: '../../pagesNews/news/addReservation?code='+this.code+"&scheduleType=" +this.scheduleType
						});
					}else{
						uni.switchTab({
							url: '/pages/application/code',
						})
					}
				} else{
					uni.showToast({
						icon: "none",
						title: res.msg,
						duration: 3000
					});
				}
			},
			
			async sendSms() {
				if (this.InputFlag) {
					if (this.account.trim() == "") {
						uni.showToast({
							icon: "none",
							title: '请先输手机号码',
							duration: 3000
						});
						return;
					}
					
					const url = 'msgs/verification/send';
					const options = {
							"mobile": this.account,
							"type": {
								"code": "LOGIN"
							}
					};
					console.log(options);
					const res = await this.$post(url, options);
					if(res==""||res==null||res==undefined||res=="undefined"){
						return ;
					}
					console.log(res);
					if(res.code==0){
						uni.showToast({
							icon: "none",
							title: '短信发送成功',
							duration: 3000
						});
						this.$options.methods.settime(this);
					}else{
						uni.showToast({
							icon: "none",
							title: res.msg,
							duration: 3000
						});
					}
					//这里只需要传入不同的接口地址就可以
				}
			},
			settime(_this) {
				if (_this.countdown == 0) {
					_this.InputFlag = true;
					_this.sendSmsContent="点击获取";
					_this.countdown = 60;
					return true;
				} else {
					_this.InputFlag = false;
					_this.sendSmsContent=_this.countdown;
					_this.countdown--;
				}
				// this.settime();
				setTimeout(function() {
					_this.settime(_this);
				}, 1000);
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
							uni.setStorageSync('userid',res.data.user.id);
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
								content: '已有账号请先登录后，在个人中心微信授！没有账号，请先注册！',
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
			if(option==""||option=="undefined"||option==undefined){
				
			}else{
				this.type = option.type?option.type:"";
				this.code = option.code?option.code:"";
				this.scheduleType = option.scheduleType?option.scheduleType:"";
			}
		}
	}
</script>

<style scoped>
	@import '../../static/css/login.css';
	/* .input-row {margin: 0 60upx 25upx 20upx;} */
	.input-row {margin: 0 40upx 0 36upx;}
	.input-row .title {
	    width: 110px;
	}
	.title[data-v-f0ee944e] {
	    margin:61upx 0upx 0upx 0upx;
	}
</style>
