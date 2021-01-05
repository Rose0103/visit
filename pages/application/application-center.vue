<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view class="content" style="padding:0;background-color: #FFFFFF;" >
		<custom-header  :title="title" :backBtnClass="backBtnClass" :showBack="showBack" :containerStyle="containerStyle"
		 :titleStyle="titleStyle" @backTap="backClick" ref="backTap"></custom-header>
		<view class="listCss">
			<view class="application">
				<image src="../../static/img/sun-canteen.png.png" mode=""></image>
				<text class="canteen-text">阳光食堂</text>
			</view>
			<view class="application">
				<image src="../../static/img/other-application.png.png" mode=""></image>
				<text class="canteen-text">其他应用</text>
			</view>
		</view>
	</view>
</template>

<script>
	import customHeader from '../../components/custom-header/custom-header.vue';
	import variableStr from '../../common/common.js';
	export default {
		data() {
			return {
				title: '应用中心',
				showBack: variableStr.tabBarStr.showBack,
				backBtnClass: variableStr.tabBarStr.backBtnClass,
				containerStyle: variableStr.tabBarStr.containerStyle,
				titleStyle: variableStr.tabBarStr.titleStyle,
				userName: "",
				headerImg: "",
				stationName: "",
				tenantCodeName: ""

			}
		},
		
		components: {
			customHeader
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/css/personal.css';
	.listCss{
		display: flex;
		flex-direction: row;
		.application{
			margin-left: 93rpx;
			margin-top: 68rpx;
			image{
				width: 88rpx;
				height: 88rpx;
			}
			.canteen-text{
				display: block;
				font-size:24rpx;
				font-family:PingFang SC;
				font-weight:500;
				color:#A0A4AA;
			}
		}
	}
</style>
