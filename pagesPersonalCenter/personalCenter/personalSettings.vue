<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view style="width: 100%;">
		<view class="margin10"></view>
		<view class="listGroupSetting border titleImg">
			<view class="headTitle">
				<text decode="true" class="title">头像</text>
			</view>
			<view class=" headerImg">
				<view>
					<image :src="avatar" class="head" @click="changeheadImg"></image>
				</view>
				<view class="headerIcon">
					<uni-icons type="arrowright" size="16" class="icon"></uni-icons>
				</view>
			</view>
		</view>
		<navigator url="changePassword">
			<view class="listGroupSetting border">
				<view class="headTitle">
					<text decode="true" class="title">修改密码</text>
				</view>
				<view class="headIcon">
					<uni-icons type="arrowright" size="16" class="icon"></uni-icons>
				</view>
			</view>
		</navigator>
		<navigator url="modifyPhone">
			<view class="listGroupSetting ">
				<view class="headTitle">
					<text decode="true" class="title">手机号码</text>
				</view>
				<view class="headContent">
					<text decode="true" class="word">{{mobile}}</text>
				</view>
				<view class="headIcon">
					<uni-icons type="arrowright" size="16" class="icon"></uni-icons>
				</view>
			</view>
		</navigator>
		<view class="margin10"></view>
		<view class="listGroupSetting border">
			<view class="headTitle">
				<text decode="true" class="title">姓名</text>
			</view>
			<view class="headContent">
				<text decode="true" class="word">{{name}}</text>
			</view>
		</view>
		<view class="listGroupSetting border">
			<view class="headTitle">
				<text decode="true" class="title">身份证号码</text>
			</view>
			<view class="headContent">
				<text decode="true" class="word">{{idCard}}</text>
			</view>
			
		</view>
		<!-- <view class="listGroupSetting">
			<view class="headTitle">
				<text decode="true" class="title">常用车牌号</text>
			</view>
			<view class="headTitle">
				<text decode="true" class="word">A328NJ</text>
				<uni-icons type="arrowright" size="16" class="icon"></uni-icons>
			</view>
		</view> -->
		<view class="listGroupSetting border" @tap="addCarNumber">
			<view class="headTitle">
				<text decode="true" class="title">常用车牌</text>
			</view>
			<view class="headContent">
				<text decode="true" class="word">{{carNumberOld}}<strong></strong></text>
			</view>
			<view class="headIcon">
				<uni-icons type="arrowright" size="16" class="icon"></uni-icons>
			</view>
		</view>
		<view class="listGroupSetting border" @tap="addOffice">
			<view class="headTitle">
				<text decode="true" class="title">办公地址</text>
			</view>
			<view class="headContent">
				<text decode="true" class="word">{{officeAddress}}<strong></strong></text>
			</view>
			<view class="headIcon">
				<uni-icons type="arrowright" size="16" class="icon"></uni-icons>
			</view>
		</view>
		<view class="margin10"></view>
		<view class="listGroupSetting border" @click="goTenant">
			<view class="headTitle">
				<text decode="true" class="title">机构名称</text>
			</view>
			<view class="headContent">
				<text decode="true" class="word">{{tenantName}}<strong></strong></text>
			</view>
			<view class="headIcon">
				<uni-icons type="arrowright" size="16" class="icon"></uni-icons>
			</view>
		</view>
		<navigator url="applicantsList">
			<view class="listGroupSetting border">
				<view class="headTitleTwo">
					<text decode="true" class="title">注册机构进度查询</text>
				</view>
				<view class="headIcon">
					<uni-icons type="arrowright" size="16" class="icon"></uni-icons>
				</view>
			</view>
		</navigator>
		<navigator url="organizationList">
			<view class="listGroupSetting border">
				<view class="headTitleTwo">
					<text decode="true" class="title">申请加入机构进度查询</text>
				</view>
				<view class="headIcon">
					<uni-icons type="arrowright" size="16" class="icon"></uni-icons>
				</view>
			</view>
		</navigator>
		
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import db from "../../common/localstorage"
	import {
		buildUrl
	} from '@/common/request.js';
	import {
		getValue
	} from '../../common/request.js';
	export default {
		onLoad() {
			this.userAndEmployeeBaseInfo = uni.getStorageSync('userAndEmployeeBaseInfo');
			this.userTenantCode = uni.getStorageSync('userTenantCode');
			this.mobile = this.userAndEmployeeBaseInfo.mobile;
			this.name = this.userAndEmployeeBaseInfo.name;
			this.idCard = this.userAndEmployeeBaseInfo.idCard;
			this.tenantName = this.userAndEmployeeBaseInfo.tenantCode.data ? this.userAndEmployeeBaseInfo.tenantCode.data.name :
				"";
			this.avatar = this.userAndEmployeeBaseInfo.avatar ? this.userAndEmployeeBaseInfo.avatar :
				"../../static/img/header.png";
			this.officeId = uni.getStorageSync('officeId');
			this.officeAddress =  uni.getStorageSync('officeAddress');
			this.carNumberId = uni.getStorageSync('carNumberId');
			this.carNumberOld =  uni.getStorageSync('carNumber');
			uni.$on('update', (data) => {
				this.carNumberOld = data.carNumber;
				this.carNumberId =  data.carNumberId;
				uni.setStorageSync('carNumber',data.carNumber);
				uni.setStorageSync('carNumberId',data.carNumberId);
			})
			uni.$on('updateOffice', (data) => {
				
				this.officeId =  data.officeId;
				this.officeAddress = data.officeAddress;
				uni.setStorageSync('officeId',data.officeId);
				uni.setStorageSync('officeAddress',data.officeAddress);
			})
			
		},
		data() {
			return {
				userAndEmployeeBaseInfo: "",
				userTenantCode: "",
				mobile: "",
				name: "",
				idCard: "",
				avatar: "",
				tenantName: "",
				carNumberOld: "",
				carNumberId: "",
				officeId: "",
				officeAddress: "",
			}
		},

		methods: {
			async getCarNumber() {
				const res = await this.$get("admin/userInfo/getCarNumber");
				console.log(res)
				this.carNumberOld = getValue(res, 'data.carNumber').trim();
				this.carNumberId = getValue(res, 'data.id').trim();
			},
			addCarNumber() {
				let url = ""
				if (this.carNumberOld == "" || this.carNumberOld == null || this.carNumberOld == undefined || this.carNumberOld ==
					"undefined") {
					url = './CarNumber?type=add';
				} else {
					url = './CarNumber?type=edit&carNumberId=' + this.carNumberId;
				}
				uni.navigateTo({
					url: url,
				})
			},
			addOffice() {
				let url = ""
				if (this.officeAddress == "" || this.officeAddress == null || this.officeAddress == undefined || this.officeAddress ==
					"undefined") {
					url = './addOffice?type=add';
				} else {
					url = './addOffice?type=edit&officeId=' + this.officeId;
				}
				uni.navigateTo({
					url: url,
				})
			},
			async changeheadImg() {
				let id = uni.getStorageSync("userAndEmployeeBaseInfo").id;
				let token = uni.getStorageSync("TOKEN");
				let tenant = uni.getStorageSync("TENANT");
				console.log(token);
				console.log(tenant);
				uni.chooseImage({
					count: 1,
					sourceType: ['camera', 'album'],
					sizeType: ['compressed'],
					success: (res) => {
						uni.uploadFile({
							url: buildUrl() + 'admin/userFace/addUserFace',
							url: buildUrl() + 'file/attachment/upload',
							filePath: res.tempFilePaths[0],
							header: {
								"token": token,
								"tenant": tenant
							},
							formData: {
								'bizType': 'appCode'
							},
							name: 'file',
							success: (uploadFileRes) => {
								console.log("222222")
								var res = JSON.parse(uploadFileRes.data)
								console.log(res.code);
								if (res.code == 0) {
									console.log(67);
									var res = JSON.parse(uploadFileRes.data)
									this.avatar = res.data.url;
									const url = 'admin/user/avatar';
									const options = {
										"id": id,
										"avatar": this.avatar
									}
									console.log(options);
									const res1 = this.$put(url, options);
									if (res1 == "" || res1 == null || res1 == undefined || res1 == "undefined") {
										return;
									}
								}
							},
							fail: (e) => {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								});
							},
						});
					}
				})
			},

			goTenant() {
				let url = this.userTenantCode ? "organizationExhibition" : "organizationRegistration";

				uni.navigateTo({
					url: url
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/css/personal.css';
	@import '../../static/css/common.css';
	@import '../../static/css/uni.css';
	.headTitle{width:30%}
	.headTitleTwo{width:60%}
	.headContent{width:70%}
</style>
