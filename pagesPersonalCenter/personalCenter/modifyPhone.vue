<template>
	<view>
		<view class="bgContent">
				<view class="input-row border">
					<text class="title">手机号码：</text>
					<input class="m-input-sel" type="number" maxlength="11" clearable focus v-model="account" placeholder="请输入新手机号码"></input>
				</view>
				<view class="input-row border">
					<text class="vCode title">短信验证码：</text>
					<input type="text" class="m-input-sel" v-model="smsCode" placeholder="请输入验证码"></input>
					<text class="sendSms" @click="sendSms">{{sendSmsContent}}</text>
				</view>
				
			</view>

			<view class="btn-row">
				<button type="primary" class="primary" @tap="findPassword">提交</button>
			</view>
	</view>
</template>

<script>
	import mInput from '../../components/m-input.vue';
	import db from "../../common/localstorage";
	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: "",
				smsCode: "",
				sendSmsContent: "点击获取",
				countdown: 60,
				InputFlag: true,
			}
		},
		methods: {
			async findPassword() {
				const url="admin/user/changeMobile";
				const options = {
					"verificationCode": this.smsCode,
					"mobile": this.account
				};
				console.log(options);
				const res = await this.$put(url, options);
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				console.log(res);
				if(res.code==0){
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '修改成功，请重新登录',
						success: function(res) {
							console.log(res)
							if (res.confirm) {
								db.clear();
								uni.navigateTo({
									url: "/pages/login/pwdLogin"
								})
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
			},
			
			async sendSms() {
				if (this.InputFlag) {
					if (this.account.trim() == "") {
						uni.showToast({
							icon: "none",
							title: '请先输入新手机号码',
							duration: 3000
						});
						return;
					} else {
					if (!(/^1[3456789]\d{9}$/.test(this.account.trim()))) {
						uni.showToast({
							icon: "none",
							title: '请输入正确的新手机号码哦',
							duration: 3000
						});
						return false;
					}
				}
					const url = 'msgs/verification/send';
					const options = {
						"captchaKey": this.codeNum,
						"mobile": this.account,
						"type": {
							"code": "CHANGE_MOBILE"
						}
					};
					console.log(options);
					const res = await this.$post(url, options);
					if (res == "" || res == null || res == undefined || res == "undefined") {
						return;
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
			}
		}
	}
</script>

<style>
	@import '../../static/css/login.css';
	.input-row {margin: 0 60upx 25upx -15upx;}
	.input-row .title {
		width: 110px;
	}
	.primary{
		margin-left: 10px;
	}
</style>
