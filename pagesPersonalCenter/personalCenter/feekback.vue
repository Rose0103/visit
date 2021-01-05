<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view>
		<view style="margin-left: 28rpx;">
			<view class="margin10"></view>
			<view class="card-content">
				<text class="cardtitle">名片使用次数</text>
				<view class="card-detail">
					<input type="number" ref="useTimes" class="card-num" v-model="useTimes" :disabled="isdisabled" />
				</view>
			</view>
			<view class="card-content">
				<text class="cardtitle">办公地址</text>
				<view class="card-detail">
					<input type="text" class= "card-num" v-model="Office_location" :disabled="undisabled"/>
					<button class='send' @click="editAddress" v-if="none">修改地址</button>
				</view>
				
			</view>
			<!-- <view class="card-content">
				<text class="cardtitle">名片使用人数&nbsp;&nbsp;(<span class='xin'>*</span>使用的最大限制人数)</text>
				<view class="card-detail">
					<input type="number" ref="singleUsersNumber" class="card-num" v-model="singleUsersNumber" :disabled="isdisabled" />
				</view>
			</view> -->
			<view class="card-content">
				<text class="cardtitle">允许来访迟到</text>
				<picker class="secretaryP" @change="isAllowedLate" :value="isAllowedLateTime" :range="isReserved" :range-key="'name'">
					<view class="card-detail">
						<text decode="true" class="word">{{isReserved[isAllowedLateTime].name?isReserved[isAllowedLateTime].name:""}}</text>
						<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
					</view>
				</picker>
			</view>
			<view class="card-content">
				<text class="cardtitle">是否需要预约确认</text>
				<picker class="secretaryP" @change="isReservedConfirmChange" :value="isReservedConfirmTime" :range="isReservedConfirm"
				 :range-key="'name'">
					<view class="card-detail">
						<text decode="true" class="word">{{isReservedConfirm[isReservedConfirmTime].name}}</text>
						<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
					</view>
				</picker>
			</view>
			<view class="card-content">
				<text class="cardtitle">是否需要秘书处理</text>
				<picker class="secretaryP" @change="isSecretaryHandleChange" :value="isSecretaryHandleTime" :range="isReservedConfirm"
				 :range-key="'name'">
					<view class="card-detail">
						<text decode="true" id="aa" class="word">{{isReservedConfirm[isSecretaryHandleTime].name}}</text>
						<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
					</view>
				</picker>
			</view>
			<view class="margin10"></view>
			<view class="custom-center">
				<view class="custom-center-card">
					<view class="custom-right-card">
						<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
					</view>
					<view class="custom-left-card">
						<view>
							<button class="share-btn" open-type="share" :disabled="disabled">
								<image src="../../static/img/card/wechat.png.png" mode=""></image>
								<text>发送到微信</text>
							</button>
							<button class="share-btn" :disabled="disabled">
								<image src="../../static/img/card/share.png.png" mode=""></image>
								<text>发送到钉钉</text>
							</button>
						</view>
						<view>
							<button class="share-btn" @click="saveCans(1)" :disabled="disabled">
								<image src="../../static/img/card/preserve.png.png" mode=""></image>
								<text>保存到相册</text>
							</button>

							<button class="share-btn" :disabled="disabled">
								<image src="../../static/img/card/phone-code.png.png" mode=""></image>
								<text>手机短信码</text>
							</button>
						</view>
					</view>
				</view>
				<view class="custom-bottom">
					<text class="yaocode">个人码:</text><text class="custom-bottom-url">{{code}}</text>
					<button class='send' @click='btnShare' :disabled="disabled">复制</button>
				</view>
			</view>

			<view style="position: absolute;"><button class='confirm' @click="submit">生成名片</button></view>
		</view>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import uQRCode from '@/static/js/uqrcode.js';
	import {
		getValue
	} from '../../common/request.js';
	export default {
		onLoad() {
			this.getCurrentUpdateAuthority();
		},
		onShow() {
				this.getOfficeAddress();
		},

		onShareAppMessage(res) {
			return {
				title: '访客系统',
				path: '/pagesNews/news/createReservation?code=' + this.code+'&scheduleType=MYSELF',
				imageUrl: "/static/img/logo.png"
			}
		},
		data() {
			return {
				title: '分享名片',
				showBack: true,
				flag: true,
				isReservedConfirm: [{
					name: "需要",
					flag: "true"
				}, {
					name: "不需要",
					flag: "false"
				}],
				isReserved: [{
					name: "允许",
					flag: "true"
				}, {
					name: "不允许",
					flag: "false"
				}],
				isReservedConfirmTime: 0,
				isSecretaryHandleTime: 0,
				isAllowedLateTime: 0,
				singleUsersNumber: 1000,
				useTimes: 1,
				qrcodeSize: 118,
				qrcodeText: 'uQRCode',
				qrcodeSrc: "",
				code: "",
				disabled: true,
				isdisabled: true,
				undisabled:true,
				Office_location:"",
				id:"",
				none:true
			}
		},

		methods: {
			isAllowedLate(e) {
				this.isAllowedLateTime = e.target.value;
			},
			isReservedConfirmChange(e) {
				this.isReservedConfirmTime = e.target.value;
			},
			isSecretaryHandleChange(e) {
				this.isSecretaryHandleTime = e.target.value;
			},
			// admin/userInfo/getOfficeAddress
			
			//办公地点
			async getOfficeAddress() {
				const url = "admin/userInfo/getOfficeAddress";
				const res = await this.$get(url);
				console.log(res);
				this.id = getValue(res.data,'id');
				
				this.Office_location = getValue(res.data,'officeAddress');
				if(getValue(res.data,'officeAddress') != ""){
					this.undisabled = true;
					this.none = true
				}else{
					this.undisabled = false;
					this.none = false;
				}
				
			},
			
			//修改地址
			editAddress() {
				uni.navigateTo({
					url:'./addOffice?type=edit&officeId=' + this.id
				})
			},
			
			//名片修改次数权限
			async getCurrentUpdateAuthority() {
				const url = "admin/role/getCurrentUpdateAuthority";
				const res = await this.$get(url);
				console.log(res)
				if (res.code == 0) {
					this.isdisabled = false;
				} else {
					this.isdisabled = true;
				}
			},


			async submit() {

				const url = "visitor/reservationLabel";
				const options = {
					// ids:[list[i]['id']]
					isAllowedLate: this.isReservedConfirm[this.isAllowedLateTime].flag,
					isReservedConfirm: this.isReservedConfirm[this.isReservedConfirmTime].flag,
					isSecretaryHandle: this.isReservedConfirm[this.isSecretaryHandleTime].flag,
					singleUsersNumber: this.singleUsersNumber,
					useTimes: this.useTimes,
					officeAddress : this.Office_location
				}
				console.log(options);
				if(options.officeAddress != ""){
					const url = "admin/userInfo/save";
					const options = {
						officeAddress : this.Office_location
					}
					const res = await this.$post(url,options);
					console.log(res);
				}
				if(options.officeAddress != ""){
					this.none = true;
				}else {
					this.none = false;
				}
				
				if (options.useTimes == "") {
					uni.showToast({
						icon: "none",
						title: '请输入名片使用次数',
						duration: 3000
					});
					return false;
				}
				

				if (options.isReservedConfirm == "" || options.isAllowedLate == "" || options.isSecretaryHandle == "") {
					uni.showToast({
						icon: "none",
						title: '请选择',
						duration: 3000
					});
					return false;
				}

				const res = await this.$post(url, options);
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				console.log(res)
				// console.log(JSON.stringify(res.data));

				if (res.code == 0) {
					uni.showToast({
						icon: "none",
						title: '名片已生成，请分享',
						duration: 3000
					});
					uQRCode.make({
						canvasId: 'qrcode',
						text: res.data['code'] + "&businessCard",
						size: this.qrcodeSize,
						margin: 10,
						success: res => {
							this.qrcodeSrc = res;
							this.disabled = !this.disabled
						},
						complete: () => {
							uni.hideLoading()
							this.disabled = false;
						}
					})
					this.code = res.data['code'];



				} else {
					uni.showToast({
						icon: "none",
						title: res.msg,
						duration: 3000
					});
				}
			},
			saveCans(e) {
				uni.showLoading({
					title: '保存海报中'
				});
				uni.canvasToTempFilePath({
					x: 0,
					y: 0,
					width: 700,
					height: 1000,
					destWidth: 1000,
					destHeight: 1000,
					canvasId: 'qrcode',
					success: function(res) {
						uni.hideLoading()
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function(red) {
								uni.showToast({
									title: '保存相册成功'
								})
							},
							fail(res) {
								if (res.errMsg == "saveImageToPhotosAlbum:fail auth deny") {
									uni.showModal({
										title: '您需要授权相册权限',
										success(res) {
											if (res.confirm) {
												uni.openSetting({
													success(res) {

													},
													fail(res) {
														console.log(res)
													}
												})
											}
										}
									})
								}
							}
						});
					},

					fail(res) {
						uni.hideLoading()
					}
				}, this)
			},
			btnShare() {
				uni.setClipboardData({
					data: this.code,
					complete() {
						uni.showToast({
							title: "已复制到剪贴板"
						})
					}
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	@import '../../static/css/feekback.less';
	@import '../../static/css/personal.css';
	@import '../../static/css/common.css';
	@import '../../static/css/uni.css';

	.share-btn {
		margin: 0 10rpx;
		font-size: 24upx;
		display: inline;
		padding: 0;
		background-color: transparent;

	}

	uni-button:after {
		border: 0;
	}

	.xin {
		color: red;
	}
	.send{
		width:240upx;
		height:60upx;
		float: right;
		line-height: 60rpx;
		border:1px solid #FFB600;
		border-radius:20rpx;
		font-size: 30upx;
		margin-right: 40rpx;
		background: white;
		color: #FFB600;
		text-align: center;
	}
</style>
