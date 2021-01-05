<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view style="width: 100%;">
		<view class="margin10"></view>
		<!-- <view class="listGroupSetting border">
			<view class="headTitle organizationTitle pickerSpan">
				<text decode="true" class="title">更换机构</text>
				<picker id="cityid" @change="bindPickerChange" :value="mechanismime" :range="replacementMechanism" :range-key="'name'">
					<view class="ApassCheck">
						<text decode="true" class="word">{{replacementMechanism[mechanismime]?replacementMechanism[mechanismime].name:""}}</text>
						<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
					</view>
				</picker>
			</view>
		</view> -->
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle">
				<text decode="true" class="title">机构全称</text>
				<text decode="true" class="infoContent">{{name}}</text>
			</view>
		</view>
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle">
				<text decode="true" class="title">机构邀请码</text>
				<text decode="true" class="infoContent">{{identifyCode}}</text>
			</view>
		</view>
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle headerImg">
				<text decode="true" class="title">机构Logo</text>
				<image :src="logoImg" mode="aspectFill" class="head"></image>
			</view>
		</view>
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle ">
				<text decode="true" class="title">机构代码</text>
				<text decode="true" class="infoContent">{{businessLicenseNumber}}</text>
			</view>
		</view>
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle headerImg">
				<text decode="true" class="title">代码证书</text>
				<image :src="imgList" mode="aspectFill" class="head"></image>
			</view>
		</view>
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle pickerSpan">
				<text decode="true" class="title">所&nbsp;在&nbsp;省</text>
				<text decode="true" class="infoContent">{{provinceArray}}</text>
			</view>
		</view>
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle pickerSpan">
				<text decode="true" class="title">所在市县</text>
				<text decode="true" class="infoContent">{{cityArray}}</text>
			</view>
		</view>
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle pickerSpan">
				<text decode="true" class="title">所在区域</text>
				<text decode="true" class="infoContent">{{regionArray}}</text>
			</view>
		</view>
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle pickerSpan">
				<text decode="true" class="title">所属行业</text>
				<text decode="true" class="infoContent">{{industryArray}}</text>

			</view>
		</view>
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle pickerSpan">
				<text decode="true" class="title">所属类型</text>
				<text decode="true" class="infoContent">{{typeArray}}</text>
			</view>
		</view>
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle">
				<text decode="true" class="title">负&nbsp;&nbsp;责&nbsp;&nbsp;人</text>
				<text decode="true" class="infoContent">{{duty}}</text>

			</view>
		</view>
		<view class="listGroupSetting border">
			<view class="headTitle organizationTitle">
				<text decode="true" class="title">联系电话</text>
				<text decode="true" class="infoContent">{{phone}}</text>
			</view>
		</view>
		
		<view class="btn-row">
			<button type="primary" class="primary" @tap="submit">退出机构</button>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import db from "../../common/localstorage";
	export default {
		onLoad() {
			this.userAndEmployeeBaseInfo = uni.getStorageSync('userAndEmployeeBaseInfo');
			this.userTenantCode = uni.getStorageSync('userTenantCode');
			console.log(this.userTenantCode);
			console.log(this.userAndEmployeeBaseInfo);
			this.getTenantByCode(this.userTenantCode);
			this.identifyCode = uni.getStorageSync('identifyCode');
			// this.getRefresh();
		},
		data() {
			return {
				userAndEmployeeBaseInfo: "",
				userTenantCode: "",
				replacementMechanism: [],
				mechanismime: 0,
				provinceArray: "",
				cityArray: "",
				regionArray: "",
				industryArray: "",
				typeArray: "",
				duty: "",
				phone: "",
				name: "",
				businessLicenseNumber: "",
				logoImg: "", //机构logo
				imgList: "", //代码证书
				CardBackImg: "", //身份证反面
				CardFrontImg: "", //身份证正面
				WholeBodyImg: "", //全身照地址
				identifyCode: "", //机构邀请码
				// imgCount: 1,//最多支持9张上传，可以修改
			}
		},
		methods: {
			bindPickerChange(e) {
				this.mechanismime = e.target.value;
				this.$store.commit("account/setTenant", this.replacementMechanism[this.mechanismime]["code"]);
				uni.setStorageSync('userTenantCode', this.replacementMechanism[this.mechanismime]["code"]);
				this.getTenantByCode(this.replacementMechanism[this.mechanismime]["code"]);
			},
			async getTenantByCode(code) {
				const url = "authority/tenantAudit/getTenantByCode";
				const options = {
					code: code
				};
				console.log(options);
				const res = await this.$get(url, options);
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				const data = res.data;
				this.name = data.name;
				this.businessLicenseNumber = data.businessLicenseNumber;
				this.duty = data.duty;
				this.phone = data.phone;
				this.provinceArray = data.areaFirstName;
				this.cityArray = data.areaSecondName;
				this.regionArray = data.areaThirdName;
				this.industryArray = data.industryFirstName;
				this.typeArray = data.industrySecondName;
				this.logoImg = data.logo;
				this.imgList = data.businessLicense;
				console.log(res)
			},
			async getRefresh() {
				const url = "authority/account/refresh";
				const res = await this.$get(url);
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				this.replacementMechanism = res.data.tenant;
				for (let i = 0; i < this.replacementMechanism.length; i++) {
					if (this.userTenantCode == this.replacementMechanism[i].code) {
						this.mechanismime = i;
					}
				}
				console.log(res)
			},
			async submit() {
				
				uni.showModal({
					title: '退出机构',
					content: '您确定要退出机构吗？',
					success: async (res) => {
						if (res.confirm) {
							const url = "visitor/interviewRecord/employeeLeave";
							const res = await this.$del(url);
							if (res == "" || res == null || res == undefined || res == "undefined") {
								return;
							}
							console.log(res);
							if (res.code == 0) {
								uni.showModal({
									title: '提示',
									showCancel: false,
									content: '退出机构成功',
									success: function(res) {
										if (res.confirm) {
											db.remove("TENANT");
											uni.switchTab({
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
						} else if (res.cancel) {}
					}
				});
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/css/personal.css';
	@import '../../static/css/common.css';
	@import '../../static/css/uni.css';
</style>
