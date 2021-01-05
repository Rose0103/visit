<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view style="width: 100%;">
		<view class="margin10"></view>
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle">
				<text decode="true" class="title">办公地址</text>
				<input class="inputSpan" type="text" clearable focus v-model="officeAddress" placeholder="请输入办公地址"></input>
				<!-- <text decode="true" class="word">15051889698</text> -->
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="submit">提交</button>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import {getValue} from '../../common/request.js';
	export default {
		onLoad(option) {
			this.type = option.type;
			console.log(this.type)
			if (this.type == "edit") {
				this.officeId = option.officeId
			}
		},
		data() {
			return {
				applyRemark: "",
				officeAddress: "",
				officeId: "",
			}
		},
		methods: {
			async submit() {
				if(this.officeAddress == "" || this.officeAddress == null || this.officeAddress == undefined || this.officeAddress ==
					"undefined"){
						uni.showModal({
							title: '提示',
							showCancel: false,
							content: "请输入办公地址",
							success: function(res) {
								console.log(res)
								if (res.confirm) {
									return;
								}
							}
						});
					}
				let params ={};
				if (this.type == "edit") {
					params.id = this.officeId
				}
				params.officeAddress = this.officeAddress;
				console.log(params)
				const res = await this.$post("admin/userInfo/save", params);
				if (res.code != 0) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: res.msg,
						success: function(res) {
							console.log(res)
							if (res.confirm) {
								return;
							}
						}
					});
				}
				const rescar = await this.$get("admin/userInfo/getOfficeAddress");
				const data = {
					"officeAddress":getValue(rescar.data,"officeAddress"),
					"officeId":getValue(rescar.data,"id"),
				}
				
				uni.$emit('updateOffice',data);
				uni.navigateBack();

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/css/personal.css';
	@import '../../static/css/common.css';
	@import '../../static/css/uni.css';
</style>
