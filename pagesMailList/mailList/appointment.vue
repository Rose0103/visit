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
			<text class="AlistTitle">是否需要秘书处理 </text>
			<picker class="secretaryP" @change="bindPickerChange" :value="indexTime" :range="secretaryArray">
				<view class="ApassCheck">
					<text decode="true" class="word">{{secretaryArray[indexTime]}}</text>
					<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
				</view>
			</picker>
		</view>
		<view class="AlistGroup">
			<text class="AlistTitle">约见时间 </text>
			<view class="ApassCheck">
				<BiaofunDatetimePicker class="input-sel" placeholder="请选择到访时间" fields="minute" @change="changeDatetimePicker"></BiaofunDatetimePicker>
				<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
			</view>
		</view>
		<view class="btn-row">
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
				title: '约见',
				showBack: true,
				flag: true,
				// backBtnClass: "uni-icon uni-icon-back",
				backBtnClass: variableStr.tabBarStr.backBtnClass,
				containerStyle: variableStr.tabBarStr.containerStyle,
				titleStyle: variableStr.tabBarStr.titleStyle,
				date: '',
				secretaryArray: ['是', '否'],
				indexTime: 0,
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
		}
	}
</script>

<style>
	@import '../../static/css/uni.css';
	@import '../../static/css/mailList.css';
	@import '../../static/css/common.css';

</style>
