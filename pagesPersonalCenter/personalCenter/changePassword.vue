<template>
	<view>
		<view class="bgContent">
			<view class="input-row border">
				<text class="title">原密码：</text>
				<input class="m-input-sel" type="password" clearable focus v-model="oldpsdword" placeholder="请输入原密码"></input>
			</view>
			<view class="input-row border">
				<text class="vCode title">新密码：</text>
				<input type="password" class="m-input-sel" v-model="newpsdword" placeholder="请输入新密码"></input>
			</view>
			<view class="input-row border">
				<text class="vCode title">新密码确定：</text>
				<input type="password" class="m-input-sel" v-model="newpsdwordTwo" placeholder="请再次输入新密码"></input>
			</view>
			<view class="btn-row">
				<button type="primary" class="primary" @tap="changePassword">提交</button>
			</view>
		</view>
	</view>
</template>


<script>

	export default {
		components: {},
		data() {
			return {
				oldpsdword: "",
				newpsdword: "",
				newpsdwordTwo: "",
			}
		},
		onLoad() {

		},
		methods: {
			async changePassword() {
				if (this.oldpsdword.trim() == "" || this.newpsdword.trim() == "" || this.newpsdwordTwo.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '密码不能为空',
						duration: 3000
					});
					return false;
				}
				const url = "admin/user/password";
				const options = {
					"oldPassword": this.oldpsdword,
					"password": this.newpsdword,
					"confirmPassword": this.newpsdwordTwo,

				};
				console.log(options);
				const res = await this.$put(url, options);
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				//console.log(res.code);   -5
				if (res.code == 0) {
					console.log(res.code);
					uni.reLaunch({
						url: '../../pages/login/pwdLogin',
					});
				} else {
					console.log("else")
					uni.showToast({
						icon: "none",
						title: res.msg,
						duration: 3000
					});
				}
			}
		}
	}
</script>

<style>
	@import '../../static/css/login.css';
	.input-row {margin: 0 60upx 25upx 20upx;}
	.input-row .title {
		width: 110px;
	}
	.primary{
		margin-left: 10px;
	}
</style>
