<template>
	<view>
		<view class="bgContent">
			<view class="topTip">
				<text>密码为数字或字母或特殊字符或以上组合；长度为6~30位</text>
			</view>
			<view style="margin-top: 10px;">
				<view class="input-row border">
					<text class="title">手机号码：</text>
					<input class="m-input-sel" type="number" maxlength="11" clearable focus v-model="account" placeholder="请输入手机号码"></input>
				</view>
				<view class="input-row border">
					<text class="vCode title">短信验证码：</text>
					<input type="text" class="m-input-sel" v-model="smsCode" placeholder="请输入验证码"></input>
					<text class="sendSms" @click="sendSms">{{sendSmsContent}}</text>
				</view>
				<view class="input-row border">
					<text class="title">密码：</text>
					<m-input class="m-input-sel" type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
				</view>
				<view class="input-row border">
					<text class="title">密码：</text>
					<m-input class="m-input-sel" type="password" displayable v-model="passwordTwo" placeholder="请再次输入密码"></m-input>
				</view>
			</view>

			<view class="btn-row">
				<button type="primary" class="primary" @tap="findPassword">提交</button>
			</view>
		</view>
	</view>
</template>

<script>
	// import service from '../../service.js';
	import mInput from '../../components/m-input.vue';
	export default {
		components: {
			mInput
		},
		data() {
			return {
				account: "",
				smsCode: "",
				password: "",
				passwordTwo: "",
				sendSmsContent: "点击获取",
				countdown: 60,
				InputFlag: true,
				type:"",
				code:"",
				scheduleType:"",
			}
		},
		onLoad: function(option) {
			console.log(option)
			if(option==""||option=="undefined"||option==undefined){
				
			}else{
				this.type = option.type?option.type:"";
				this.code = option.code?option.code:"";
				this.scheduleType = option.scheduleType?option.scheduleType:"";
			}
		},
		methods: {
			async findPassword() {
				if (this.password.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '请设置密码',
						duration: 3000
					});
					return false;
				} else {
					if (this.password.length < 6 ||this.password.length >30) {
						uni.showToast({
							icon: "none",
							title: '请设置密码长度为6~30位数之间',
							duration: 3000
						});
						return false;
					}
				}
				
				if (this.passwordTwo.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '请再次确认密码',
						duration: 3000
					});
					return false;
				} else {
					if (this.passwordTwo.length < 6 ||this.passwordTwo.length >30) {
						uni.showToast({
							icon: "none",
							title: '请设置密码长度为6~30位数之间',
							duration: 3000
						});
						return false;
					}
				}
				
				const url="admin/user/verificationUpdatePassword";
				const options = {
					"verificationCode": this.smsCode,
					"password": this.password,
					"confirmPassword": this.passwordTwo,
					"account": this.account,
				};
				console.log(options);
				const res = await this.$put(url, options);
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				console.log(res);
				if(res.code==0){
					if(this.type=="businessCard"){
						uni.navigateTo({
							url: '../login/pwdLogin?type=businessCard&code=' +this.code+"&scheduleType=" +this.scheduleType
						});
					}else if(this.type=="appointmentCard"){
						uni.navigateTo({
							url: '../login/pwdLogin?type=appointmentCard&code='+this.code+"&scheduleType=" +this.scheduleType
						});
					}else{
						uni.reLaunch({
							url: '../login/pwdLogin',
						});
					}
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
							title: '请先输手机号码',
							duration: 3000
						});
						return;
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
					
					const url = 'msgs/verification/send';
					const options = {
						"captchaKey": this.codeNum,
						"mobile": this.account,
						"type": {
							"code": "UPDATE_PASSWORD"
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

<style scoped>
	@import '../../static/css/login.css';
	.input-row {margin: 0 60upx 25upx 20upx;}
	.input-row .title {
	    width: 110px;
	}
	.primary {
		margin-left: 20px;
	}
	
</style>
