<template>
	<view>
		<view class="custom-header-container" :style="containerStyle">
			<view class="custom-header-status-bar"></view>
			<view class="custom-header-top-container">
				<uni-icons type="arrowleft" size="22" :style="backBtnClass" class="backIcon"></uni-icons>
				<view class="custom-header-title" :style="titleStyle">
					{{title}}
				</view>
			</view>
		</view>
		<view class="margin10"></view>
		<view class='appointment'>
			<image class="headerImg" src="../../static/img/header.png"></image>
			<view class="aTitle">
				<view>单位名称：</view>
				<view>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</view>
				<view>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</view>
			</view>
			<view class="aTitle aName">
				<view>株洲市监管支队</view>
				<view>小马哥</view>
				<view>支队长</view>
			</view>
		</view>
		<view class="margin10"></view>
		<view class="AlistGroup">
			<text class="AlistTitle">到访事由</text>
			<view class="ApassCheck">
				<input type="text" class="input-sel" placeholder="请输入"></input>
			</view>
		</view>
		<view class="AlistGroup">
			<text class="AlistTitle">到访时间 </text>
			<view class="ApassCheck">
				<BiaofunDatetimePicker class="input-sel" placeholder="请选择到访时间" fields="minute" @change="changeDatetimePicker"></BiaofunDatetimePicker>
				<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
			</view>

		</view>
		<view class="AlistGroup">
			<view class="titleBox">
				<text class="AlistTitle">车牌号码 </text>
				<uni-icons type="plusempty" size="22" class="icon" @tap="addLicensePlate"></uni-icons>
			</view>
			<view v-for="(item, index) in LicensePlate" :key="index">
				<view class="ApassCheck">
					<text class="input-sel">{{item.id}} </text>
					<uni-icons type="trash" size="22" class="icon iconTwo" @tap="deletLicensePlate(index)"></uni-icons>
				</view>
			</view>
		</view>
		<view class="AlistGroup">
			<text class="AlistTitle">是否需要秘书处理 </text>
			<picker class="secretaryP" @change="bindPickerChange" :value="indexTime" :range="secretaryArray">
				<view class="ApassCheck">
					<text decode="true" class="word">{{secretaryArray[indexTime]}}</text>
					<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
				</view>
			</picker>
		</view>
		<view class="AlistGroup">
			<view class="titleBox">
				<text class="AlistTitle">同行人员 </text>
				<uni-icons type="plusempty" size="22" class="icon" @tap="addLicensePlate"></uni-icons>
			</view>
			<view class="container_of_slide" v-for="(item, index) in colleaguesData" :key="index">
				<view class="slide_list" @touchstart="touchStart($event,index)" @touchend="touchEnd($event,index)" @touchmove="touchMove($event,index)"
				 @tap="recover(index)" :style="{transform:'translate3d('+item.slide_x+'px, 0, 0)'}">
					<view class="ApassCheck colleagues now-message-info" hover-class="uni-list-cell-hover" :style="{width:Screen_width+'px'}">
						<image class="headerImg" src="../../static/img/header.png"></image>
						<view class="aTitle">
							<view>湖南监管总队</view>
							<view><text class="colleaguesName">姓名：</text>{{item.name}}</view>
						</view>
					</view>
					<view class="group-btn">
						<view class="removeM btn-div" @tap="removeM(index)">
							删除
						</view>
					</view>
					<view style="clear:both"></view>
				</view>
			</view>
		</view>
		
		<view class="btn-row colleaguesBtn">
			<button type="primary" class="primary cancel" @tap="bindLogin">取消</button>
			<button type="primary" class="primary" @tap="bindLogin">确认</button>
		</view>
	</view>
</template>

<script>
	import variableStr from '../../common/common.js';
	import BiaofunDatetimePicker from '../../components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	export default {
		components: {
			BiaofunDatetimePicker
		},
		computed: {
			Screen_width() {
				return uni.getSystemInfoSync().windowWidth;
			}
		},
		data() {
			return {
				title: '到访',
				showBack: true,
				flag: true,
				// backBtnClass: "uni-icon uni-icon-back",
				backBtnClass: variableStr.tabBarStr.backBtnClass,
				containerStyle: variableStr.tabBarStr.containerStyle,
				titleStyle: variableStr.tabBarStr.titleStyle,
				date: '',
				licensePlateIndex: 1,
				LicensePlate: [{
					id: "湘A 10086 "
				}, {
					id: "湘A 10085"
				}, {
					id: "湘A 10087"
				}],
				secretaryArray: ['是', '否'],
				indexTime: 0,
				colleaguesData: [{
						id: 1,
						surname: '张',
						name: '张三',
						dateTime: '2019-03-18',
						remarks: 'XXXXXXXXXXXXXXXXXXX公司',
						isShare: true,
						slide_x: 0
					},
					{
						id: 2,
						surname: '?',
						name: '李二',
						dateTime: '2019-03-17',
						remarks: 'XXXXXXXXXXXXXXXXXXX公司',
						isShare: false,
						slide_x: 0
					},
					{
						id: 3,
						surname: '王',
						name: '王五',
						dateTime: '2019-03-18',
						remarks: 'XXXXXXXXXXXXXXXXXXX公司',
						isShare: true,
						slide_x: 0
					},
					{
						id: 4,
						surname: '李',
						name: '李珊珊',
						dateTime: '2019-03-18',
						remarks: 'XXXXXXXXXXXXXXXXXXX公司',
						isShare: true,
						slide_x: 0
					}

				]
			}
		},
		methods: {
			bindPickerChange(e) {
				console.log('picker发送选择改变，携带值为', e.target.value)
				this.indexTime = e.target.value
			},
			changeDatetimePicker(e) {
				// this.date = e.target.value;
			},
			addLicensePlate() {
				this.licensePlateIndex++;
				this.LicensePlate.push({
					id: this.licensePlateIndex
				});
				console.log(this.LicensePlate);
			},
			deletLicensePlate(index) {
				console.log(index);
				this.LicensePlate.splice(index, 1);
			},
			// 滑动开始
			touchStart(e, index) {
				//记录手指放上去的时间
				this.startTime = e.timeStamp;
				//记录滑块的初始位置
				this.start_slide_x = this.colleaguesData[index].slide_x;
				// 按钮宽度
				uni.createSelectorQuery()
					.selectAll('.group-btn')
					.boundingClientRect()
					.exec(res => {
						if (res[0] != null) {
							this.btnWidth = res[0][index].width * -1;
						}
					});
				// 记录上一次开始时手指所处位置
				this.startX = e.touches[0].pageX;
				// 记录上一次手指位置
				this.lastX = this.startX;
				//初始化非当前滑动消息列的位置
				this.colleaguesData.forEach((item, eq) => {
					if (eq !== index) {
						item.slide_x = 0;
					}
				});
			},
			// 滑动中
			touchMove(e, index) {
				const endX = e.touches[0].pageX;
				const distance = endX - this.lastX;
				// 预测滑块所处位置
				const duang = this.colleaguesData[index].slide_x + distance;
				// 如果在可行区域内
				if (duang <= 0 && duang >= this.btnWidth) {
					this.colleaguesData[index].slide_x = duang;
				}
				// 此处手指所处位置将成为下次手指移动时的上一次位置
				this.lastX = endX;
			},
			// 滑动结束
			touchEnd(e, index) {
				let distance = 10;
				const endTime = e.timeStamp;
				const x_end_distance = this.startX - this.lastX;
				if (Math.abs(endTime - this.startTime) > 200) {
					distance = this.btnWidth / -2;
				}
				// 判断手指最终位置与手指开始位置的位置差距
				if (x_end_distance > distance) {
					this.colleaguesData[index].slide_x = this.btnWidth;
				} else if (x_end_distance < distance * -1) {
					this.colleaguesData[index].slide_x = 0;
				} else {
					this.colleaguesData[index].slide_x = this.start_slide_x;
				}
			},
			// 点击回复原状
			recover(index) {
				this.colleaguesData[index].slide_x = 0;
			},
			removeM(index) {
				let self = this
				console.log('点击删除')
				uni.showModal({
					title: '',
					content: '确定要删除该信息吗？',
					confirmText: '删除',
					confirmColor: '#ff3b32',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定')
							self.colleaguesData.splice(index, 1)
							uni.showToast({
								icon: "success",
								title: '操作成功!',
								duration: 2000
							});
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				});
			}
		}
	}
</script>

<style>
	@import '../../static/css/uni.css';
	@import '../../static/css/mailList.css';
	@import '../../static/css/common.css';

	.index {
		background: #F8F8F8;
	}

	.list-box {
		padding: 20upx 0;
	}

	.container_of_slide {
		width: 100%;
		overflow: hidden;
	}

	.slide_list {
		transition: all 100ms;
		transition-timing-function: ease-out;
		min-width: 200%;
		height: 160upx;
	}

	.now-message-info {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		/* justify-content: space-between; */
		font-size: 16px;
		clear: both;
		height: 160upx;
		padding: 0 30upx;
		margin-bottom: 20upx;
		background: #FFFFFF;
	}

	.now-message-info,
	.group-btn {
		float: left;
	}

	.group-btn {
		display: flex;
		flex-direction: row;
		height: 160upx;
		min-width: 100upx;
		align-items: center;

	}

	.group-btn .btn-div {
		height: 160upx;
		color: #fff;
		text-align: center;
		padding: 0 50upx;
		font-size: 34upx;
		line-height: 160upx;
	}

	.group-btn .top {
		background-color: #c4c7cd;
	}

	.group-btn .removeM {
		background-color: #ff3b32;
	}


	.icon-circle {
		background: #3396fb;
		border-radius: 100%;
		width: 100upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		color: #FFFFFF;
		font-weight: bold;
		font-size: 20px;
		float: left;
	}

	.list-right {
		float: left;
		margin-left: 25upx;
		margin-right: 30upx;
	}

	.list-right-1 {
		float: right;
		color: #A9A9A9;
	}

	.list-title {
		width: 350upx;
		line-height: 1.5;
		overflow: hidden;
		margin-bottom: 10upx;
		color: #333;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.list-detail {
		width: 350upx;
		font-size: 14px;
		color: #a9a9a9;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.button-box {
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		z-index: 998;
		background: #F8F8F8;
	}

	.btn-sub {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		float: left;
		width: 100%;
		height: 100upx;
		background: #F8F8F8;
		color: #7fb2ff;
	}

	.btn-plusempty {
		width: 110upx;
		height: 110upx;
		background: #007bfa;
		position: fixed;
		bottom: 50upx;
		right: 20upx;
		border-radius: 100%;
		overflow: hidden;
		text-align: center;
		line-height: 110upx;
	}

	.empty {
		color: #999999;
	}

	.plusempty-img {
		width: 50upx;
		height: 50upx;
		margin-top: 30upx;
	}

	.scan-box {
		display: block;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 99999;
	}

	.scan-item {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		position: relative;
		margin: 0 auto;
		width: 80%;
		height: 100%;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		opacity: 1;

	}

	.scan-content {
		position: relative;
		width: 400upx;
		height: 500upx;
		background: #FFFFFF;
		border-radius: 20upx;
	}

	.scan-icon {
		position: absolute;
		top: -50upx;
		left: 150upx;
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
		box-sizing: border-box;
		background: #FFFFFF;
		padding: 20upx;
	}

	.scan-icon-img {
		width: 100%;
		height: 100%;
	}

	.scan-text {
		position: absolute;
		bottom: 40upx;
		left: 0;
		width: 100%;
		text-align: center;
		font-size: 14px;
	}

	.scan-share {
		width: 100%;
		height: 100%;
	}

	.scan-img {
		width: 300upx;
		height: 300upx;
		margin: auto;
		display: block;
		position: absolute;
		top: 80upx;
		left: 50upx;
		z-index: 99;
	}

	.scan-btn {
		top: -30upx;
		left: auto;
		right: -30upx;
		bottom: auto;
		position: absolute;
		width: 64upx;
		height: 64upx;
		border-radius: 50%;
		z-index: 99999;
		display: flex;
	}

	.uni-list-cell-hover {
		background-color: #eeeeee;
	}

	.bottom-btn-hover {
		background: #0564c7 !important;
		;
	}
</style>
