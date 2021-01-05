<template>
	<view>
		
	</view>
</template>

<script>
	import db from "../../common/localstorage";
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		onLoad(e) {
			console.log("333")
			// this.interviewMessage()
			uni.showLoading({
				title: '请稍后',
				mask: true
			})
			const userToken = db.get('TOKEN');
			if(userToken==""||userToken=="undefined"||userToken==undefined){
				uni.hideLoading();
				uni.navigateTo({
					url: "/pages/login/pwdLogin"
				})
			}else{
				uni.switchTab({
					url: '/pages/application/code',
				})
			}
		}
	}
</script>

<style>

</style>
