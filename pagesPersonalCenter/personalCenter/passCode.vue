<template>
	<view style="width: 100%;text-align: center;">
		<text >此二维码仅用于终端验证通行扫描</text>
		<view class="custom-right-card">
			<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
		</view>
	</view>
</template>

<script>
	import uQRCode from '@/static/js/uqrcode.js'
	export default {
		data() {
			return {
				userInfoID :"",
				qrcodeSize: 200,
			}
		},
		onLoad(e) {
			this.userInfoID = uni.getStorageSync('userAndEmployeeBaseInfo')['id'];
			uQRCode.make({
				canvasId: 'qrcode',
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
			console.log(this.userInfoID)
		},
		methods: {
			
		}
	}
</script>

<style>
.custom-right-card{
	display: flex;
	justify-content: center;
}
</style>
