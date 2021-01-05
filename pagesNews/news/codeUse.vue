<template>
	<view class="codeUse">
		<form class="form" @submit="formSubmit">
			<input class="form-input" name="code" placeholder="请输入名片码" />
			<button class="form-btn" type="primary" form-type="submit">确认</button>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				code: "",
				scheduleType:''
			}

		},
		onLoad: function(option) {
			this.scheduleType = option.scheduleType
		},
		methods: {
			async formSubmit(e) {
				// console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value;
				// formdata.code = "us0sbThZ"
				if (!formdata.code) {
					uni.showToast({
						icon: "none",
						title: "预约码不能为空"
					});
					return;
				}

				const res = await this.$get("visitor/reservationLabel/getByCode", {
					"code": formdata.code
				});
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				if (res.code != 0) {
						uni.showModal({
							title: '提示',
							showCancel: false,
							content: res.msg,
							success: (res) => {return}
						});
					return;
				}
				uni.setStorageSync('codeData', res.data);
				uni.navigateTo({
					url: './createReservation?code=' + formdata.code+'&scheduleType=' + this.scheduleType
				});
			},


		}
	}
</script>


<style lang="scss">
	.codeUse {
		background-color: #fff;
		width: 100%;

		.form {


			.form-input {
				background: #F2F3F5;
				margin: 50rpx auto;
				border: 1rpx solid rgba(0, 0, 0, .1);
				width: 80%;
				height: 90rpx;
			}

			.form-btn {
				width: 200rpx;
				margin: 50rpx auto;

			}
		}
	}
</style>
