<template>
	<view class="content" style="padding:0;background-color: #FFFFFF;">
		<custom-header :title="title" :backBtnClass="backBtnClass" :showBack="showBack" :containerStyle="containerStyle"
		 :titleStyle="titleStyle" @backTap="backClick" ref="backTap"></custom-header>
		
		<!-- <view class="margin10"></view>
		<view class="listGroup">
			<text class="listTitle">个人通讯录</text>
			<view class="passCheck" >
				<image src="../../static/img/personalAddressBook.png" class="iconImg"></image>
				<text decode="true" class="word">个人通讯录</text>
				<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
			</view>
		</view> -->
		<view class="margin10"></view>
		<view class="listGroup">
			<text class="listTitle">单位通讯录</text>
			<navigator url="../../pagesMailList/mailList/addressbook">
				<view class="passCheck">
					<image src="../../static/img/companyAddressBook.png" class="iconImg"></image>
					<text decode="true" class="word">单位通讯录</text>
					<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
				</view>
			</navigator>
		</view>
		<view class="margin10"></view>
		<!-- <view class="listGroup">
			<text class="listTitle">内部通讯录</text>
			<navigator url="../../pagesMailList/mailList/insideMailDetails">
				<view class="passCheck" >
					<image src="../../static/img/internalAddressBook.png" class="iconImg"></image>
					<text decode="true" class="word">内部通讯录</text>
					<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
				</view>
			</navigator>
		</view> -->
		<view class="margin10"></view>
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
				title: '通讯录',
				showBack: variableStr.tabBarStr.showBack,
				backBtnClass: variableStr.tabBarStr.backBtnClass,
				containerStyle: variableStr.tabBarStr.containerStyle,
				titleStyle: variableStr.tabBarStr.titleStyle,
				show: false,
				showSync: false,
				searchVal: "",
				inputStr: ""
			}
		},

		methods: {
			onReady() {
				// console.log(variableStr.tabBarStr);
			},
			onLoad(e) {
				
			},
			searchClick() {
				if (this.show) {
					return
				}
				this.searchVal = ""
				this.show = true;
				this.$nextTick(() => {
					this.showSync = true;
				})
			},
			clear() {
				this.searchVal = ""
			},
			cancel() {

			},
			confirm() {
				// #ifndef APP-PLUS
				uni.hideKeyboard();
				// #endif
				// #ifdef APP-PLUS
				plus.key.hideSoftKeybord()
				// #endif
				this.$emit("confirm", {
					value: this.searchVal
				})
			}
		}
	}
</script>

<style>
	@import '../../static/css/mailList.css';
</style>
