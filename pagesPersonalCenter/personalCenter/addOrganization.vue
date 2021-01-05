<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view style="width: 100%;">
		<view class="margin10"></view>
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle">
				<text decode="true" class="title">邀请码</text>
				<input class="inputSpan" type="text" clearable focus v-model="tenantCode" placeholder="请输入邀请码"></input>
				<!-- <text decode="true" class="word">15051889698</text> -->
			</view>
		</view>
		
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle ">
				<text decode="true" class="title">申请备注</text>
				<input class="inputSpan" type="text" clearable  v-model="applyRemark" placeholder="请输入备注"></input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	export default {
		onLoad() {
			
		},
		data() {
			return {
				applyRemark: "",
				tenantCode: "",
			}
		},
		methods: {
			async submit() {
				const url = "admin/authRequest/request";
				const options = {
					applyRemark: this.applyRemark, //申请备注
					identifyCode: this.tenantCode//负责人
				};
				console.log(options);
				const res = await this.$post(url, options);
				console.log(res)
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				if(res.code==0){
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '申请成功，待审核',
						success: function(res) {
							console.log(res)
							if (res.confirm) {
								console.log("00000")
								uni.switchTab({
									url: '../../pages/personalCenter/personal',
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/css/personal.css';
	@import '../../static/css/common.css';
	@import '../../static/css/uni.css';
</style>
