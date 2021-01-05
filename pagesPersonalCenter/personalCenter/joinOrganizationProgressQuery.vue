<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view style="width: 100%;">
			<view class="margin10"></view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">机构全称</text>
					<text decode="true" class="infoContent">{{name}}</text>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">申请备注</text>
					<text decode="true" class="infoContent">{{applyRemark}}</text>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">申请时间</text>
					<text decode="true" class="infoContent">{{applyTime}}</text>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">审核状态</text>
					<text decode="true" class="infoContent">{{desc}}</text>
				</view>
			</view>
			<!-- <view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">审核意见</text>
					<text decode="true" class="infoContent">{{auditRemark?auditRemark:"空"}}</text>
				</view>
			</view> -->
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">审核时间</text>
					<text decode="true" class="infoContent">{{auditTime?auditTime:"-"}}</text>
				</view>
			</view>
	</view>

</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	export default {
		onLoad() {
			const item = uni.getStorageSync('organizationDetails');
			this.getAuthRequestBySelf(item)
		},
		data() {
			return {
				userAndEmployeeBaseInfo: "",
				userTenantCode: "",
				applyRemark: "",
				name: "",
				desc: "",
				auditRemark: "",
				auditTime: "",
				applyTime: "",

			}
		},
		methods: {
			async getAuthRequestBySelf(data) {
				this.name = data.tenant.data.name;
				this.desc = data.auditStatus.desc;
				// this.auditRemark = data.auditRemark;
				this.applyRemark = data.applyRemark;
				this.applyTime = data.applyTime;
				this.auditTime = data.auditTime;
				console.log(data)
			},

			async submit() {
				if (this.name.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '请输入机构全称',
						duration: 3000
					});
					return false;
				}
				if (this.businessLicenseNumber.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '请输入机构代码',
						duration: 3000
					});
					return false;
				}
				if (this.duty.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '请输入负责人',
						duration: 3000
					});
					return false;
				}

				if (this.phone.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '请输入联系电话',
						duration: 3000
					});
					return false;
				} else {
					console.log(this.phone.trim())
					if (!(/^1[3456789]\d{9}$/.test(this.phone.trim()))) {
						uni.showToast({
							icon: "none",
							title: '请输入正确的手机号码哦',
							duration: 3000
						});
						return false;
					}
				}
				if (this.imgData.logoImg == "" || this.imgData.imgList == "" || this.imgData.CardBackImg == "" || this.imgData.CardFrontImg ==
					"" || this.imgData.WholeBodyImg == "") {
					uni.showToast({
						icon: "none",
						title: '请输入上传图片',
						duration: 3000
					});
					return;
				}
				const url = "authority/tenantAudit/save";
				const options = {
					areaFirstCode: this.areaArray.provinceArray[this.provinceTime]["code"], //地区一级code
					areaSecondCode: this.areaArray.cityArray[this.cityTime]["code"], //地区二级code
					areaThirdCode: this.areaArray.regionArray[this.regionTime]["code"], //地区三级code
					businessLicense: this.imgData.imgList[0]["url"], //代码证书
					businessLicenseNumber: this.businessLicenseNumber, //机构代码
					duty: this.duty, //负责人
					identityCardBack: this.imgData.CardBackImg[0]["url"], //身份证反面地址
					identityCardFront: this.imgData.CardFrontImg[0]["url"], //身份证正面地址
					identityWholeBody: this.imgData.WholeBodyImg[0]["url"], //全身照地址
					industryFirstCode: this.occupationArray.industryArray[this.industryTime]["code"], //行业一级code
					industrySecondCode: this.occupationArray.typeArray[this.typeTime]["code"], //行业二级code
					logo: this.imgData.logoImg[0]["url"], //logo
					phone: this.phone, //联系电话
					name: this.name, //联系电话
				};
				console.log(options);
				const res = await this.$post(url, options);
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				if (res.code == 0) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '申请成功，待审核',
						success: function(res) {
							console.log(res)
							if (res.confirm) {
								uni.navigateTo({
									url: '../../pages/personalCenter/personal',
								})
							}
						}
					});
				} else {
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
