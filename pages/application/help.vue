<template>
	<view class="content" style="padding:0;background-color: #FFFFFF;">
		<view class="margin10"></view>
		<view class="listGroup">
			<!-- <text class="listTitle">敏智访客预约手册</text> -->
			<navigator url="./make">
				<view class="passCheck">
					<text decode="true" class="word">敏智访客预约手册</text>
					<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
				</view>
			</navigator>
		</view>
		<view class="listGroup">
			<!-- <text class="listTitle">敏智访客内部手册</text> -->
			<navigator url="./inside_help">
				<view class="passCheck">
					<text decode="true" class="word">敏智访客内部手册</text>
					<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import customHeader from '../../components/custom-header/custom-header.vue';
	import variableStr from '../../common/common.js';
	import uniSearchBar from '../../components/uni-search-bar/uni-search-bar.vue';
	import uniIcons from "../../components/uni-icons/uni-icons.vue";
	export default {
		components: {
			customHeader,
			uniSearchBar,
			uniIcons
		},
		data() {
			return {
				title: '使用手册',
				// showBack: variableStr.tabBarStr.showBack,
				// backBtnClass: variableStr.tabBarStr.backBtnClass,
				// containerStyle: variableStr.tabBarStr.containerStyle,
				// titleStyle: variableStr.tabBarStr.titleStyle,
				// show: false,
				// showSync: false,
				// searchVal: "",
				// inputStr: ""
			}
		},

	}
</script>

<style>
	@import '../../static/css/mailList.css';
</style>
