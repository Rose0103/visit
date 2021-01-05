<template>
	<view class="container999" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
		<!-- 刷新组件需搭配scroll-view使用，并在pages.json中添加 "disableScroll":true-->
		<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
		<view class='nav'>
			<custom-header :titles="scheduleTypes" :backBtnClass="backBtnClass" :showBack="showBack" :containerStyle="containerStyle"
			 :titleStyle="titleStyle" @backTap="backClick" ref="backTap" @bindPickerChange="bindPickerChange" :showExpand="showExpand">
			</custom-header>
			<!-- 搜索 -->
			<view  @tap="show3()">
				<masks v-if="mask"></masks>
			</view>
			<view class="example-body">
				<view class="uni-searchbar">
					<view class="uni-searchbar__box inputStr" @click="showFilter=true">
						<!-- #ifdef MP-ALIPAY -->
						<view class="uni-searchbar__box-icon-search">
							<uni-icons color="#999999" size="18" type="search" />
						</view>
						<!-- #endif -->
						<!-- #ifndef MP-ALIPAY -->
						<uni-icons color="#999999" class="uni-searchbar__box-icon-search" size="18" type="search" />
						<!-- #endif -->
						<input v-if="show" @tap="show2" :focus="showSync" @confirm="confirm" class="uni-searchbar__box-search-input" disabled="false"
						 confirm-type="search" type="text" />
						<text v-else class="uni-searchbar__text-placeholder">请输入拜访人姓名</text>
						
						<drawer :show="drawerShow2" @cancel="cancel2" @ensure="searchNews" direction="right" >
							<view class="Search-for" style="">
								<text>搜索条件</text>
							</view>
							<view class="uni-search" style="margin:0 30rpx;">
								
								<view class="card-content">
									<text class="cardtitle">填写姓名</text>
									<view class="card-detail">
										<input :focus="showSync" @confirm="confirm" class="uni-searchbar__box-search-input" confirm-type="search" type="text"
										 v-model="searchVal"  />
									</view>
								</view>
								<view class="card-content">
									<text class="cardtitle">选择日期</text>
									<view class="card-detail" style="width: 550rpx;">
										<view class="spanTime" >
											<!-- <BiaofunDatetimePicker style="" ref="startTime" class="input-sel" placeholder="开始日期" fields="day" @change="changestartDatetimePicker"></BiaofunDatetimePicker> -->
											<timeSelector showType="date" @btnConfirm="btnConfirm" @btnCancel="btnCancel">
												<view class="input-sel" v-if="none">
													开始时间
												</view>
												<view class="input-sel">
													{{startDate}}
												</view>
											</timeSelector>
											
										</view>
										<text style="line-height: 75rpx;margin-left: 20rpx;">—</text>
										<view class="spanTime" style="margin-left: 100rpx;">
											<!-- <BiaofunDatetimePicker style="" ref="endTime" class="input-sel" placeholder="结束日期" fields="day" @change="changeendtDatetimePicker"></BiaofunDatetimePicker> -->
											<timeSelector showType="date" @btnConfirm="btnConfirmEnd" @btnCancel="btnCancel">
												<view class="input-sel" v-if="hide">
													结束时间
												</view>
												<view class="input-sel">
													{{endDate}}
												</view>
											</timeSelector>
											
										</view>
									</view>
								</view>
								<view class="card-content">
									<text class="cardtitle">业务类型</text>
									<view class="card-detail">
										<view class="card-content" >
											<picker class="secretaryP" @change="isAllowedLate" :value="isAllowedLateTime" :range="isReservedConfirm"
											 :range-key="'name'">
												<view>
													<text decode="true" class="word">{{isReservedConfirm[isAllowedLateTime].name?isReservedConfirm[isAllowedLateTime].name:""}}</text>
												</view>
											</picker>
										</view>
									</view>
								</view>
								<view class="card-content">
									<text class="cardtitle">消息类型</text>
									<view class="card-detail">
										<view class="card-content">
											<picker mode=selector class="secretaryP" @change="newsType" :value="newsTypeTime" :range="newTypeConfirm"
											 :range-key="'name'">
												<view>
													<text decode="true" class="word">{{newTypeConfirm[newsTypeTime].name?newTypeConfirm[newsTypeTime].name:""}}</text>
												</view>
											</picker>
										</view>
									</view>
								</view>
							</view>

						</drawer>
					</view>
					<image @click="scan" class="tabIcon" src="../../static/img/scanning.png"></image>
					<image @click="codeUse" class="tabIcon" src="../../static/img/QRcode_news.png"></image>
				</view>

			</view>
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
		</view>
		<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
		<swiper :style="{'height':screenHeight}" :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
				<scroll-view style="height:100%" scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
					<view :id="'top'+listIndex" style="width: 100%;height: 330upx;margin-bottom: 28upx;">边距盒子</view>
					<view class='contentList'>
						<view>
							<view class='card' v-for="(item,index) in listItem" v-if="listItem.length > 0" :key="index" @click="showDetails(item)">
								<image class="headerImg" :src="item.icon?item.icon:'../../static/img/schedule/c.png'"></image>
								<view class="visList">
									<view style="display: flex;justify-content: space-between;">
										<view class="visName">{{item.title}}</view>
										<text class="visTime">{{item.messageTime}}</text>
									</view>
									<view style="display: flex;justify-content: space-between;margin-bottom: 20rpx;">
										<view class="visState">{{item.content}}</view>
										<view class="visIcon">
											<image class="newIcon" src="../../static/img/newIcon.png"></image>
											<view class="stateSpan">{{item.businessType?item.businessType.desc:''}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class='noCard' v-if="listItem.length===0">
						暂无信息
					</view>
					<view style="width: 100%;height: 100upx;opacity:0;">底部占位盒子</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>


<script>
	const util = require('../../common/util.js');
	import refresh from '../../components/tabs/refresh.vue';
	import navTab from '../../components/tabs/navTab.vue';
	import tabBar4 from '../../components/tabs/tabBar4.vue';
	import masks from '../../components/mask.vue'
	import BiaofunDatetimePicker from '../../components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	import timeSelector from'../../components/wing-time-selector/wing-time-selector.vue';
	import variableStr from '../../common/common.js';
	// import BiaofunDatetimePicker from '../../components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	const copy = obj => JSON.parse(JSON.stringify(obj));
	export default {
		components: {
			refresh,
			navTab,
			tabBar4,
			BiaofunDatetimePicker,
			masks,
			timeSelector
		},
		data() {
			return {
				scheduleTypes: [{
					title: "我的消息",
					code: "MYSELF"
				}, {
					title: "领导消息",
					code: "LEADER"
				}],
				isReservedConfirm: [
					{
						name: "请选择",
						flag: ""
					},{
					name: "来访",
					flag: "COMEVISIT"
				}, {
					name: "拜访",
					flag: "PAYVISIT"
				}],
				newTypeConfirm: [ 
					{
						name: "请选择",
						flag: ""
					},{
					name: "申请预约",
					flag: "APPLY"
				}, {
					name: "预约通过",
					flag: "ACCEPT"
				}, {
					name: "预约变更",
					flag: "CHANGE"
				}],
				screenHeight: "",
				index: 0,
				scheduleType: "MYSELF",
				showBack: variableStr.tabBarStr.showBack,
				backBtnClass: variableStr.tabBarStr.backBtnClass,
				containerStyle: variableStr.tabBarStr.containerStyle,
				titleStyle: variableStr.tabBarStr.titleStyle,
				showExpand: true,
				show: true,
				mask: false,
				showSync: false,
				searchVal: "",
				inputStr: "",
				currentPage: 'index',
				toView: '', //回到顶部id
				tabTitle: ['未读', '已读'], //导航栏格式 --导航栏组件
				// READED,UNREADED,INTERCEPTED
				messageStatus: ["UNREADED", "READED", "INTERCEPTED"],
				currentTab: 0, //sweiper所在页
				pages: [1, 1, 1], //第几个swiper的第几页
				size: 10,
				total: 0,
				list: [
					[],
					[],
					[]
				], //数据格式
				isAllowedLateTime: 0,
				newsTypeTime: 0,
				startDate: "",
				endDate: "",
				defaultValue: "",
				drawerShow2: false,
				none:true,
				hide:true
			};
		},
		onReady() {

		},
		onShow() {
			this.getSelfScheduleType();
			this.screenHeight = (uni.getSystemInfoSync().screenHeight) + 'px';
			// this.drawerShow2 = false;
			// this.mask = false;
			this.show3()
			
		},
		onHide() {
			
		},
		methods: {
			btnConfirm(e) {
				let {
					year,
					month,
					day,
					hour,
					minute
				} = e;
				if (month < 10) month = "0" + month;
				if (day < 10) day = "0" + day;
				if (hour < 10) hour = "0" + hour;
				if (minute < 10) minute = "0" + minute;
				this.startDate = year + "-" + month + "-" + day;
				this.none = false;
				
			},
			btnConfirmEnd(e) {
				let {
					year,
					month,
					day,
					hour,
					minute
				} = e;
				if (month < 10) month = "0" + month;
				if (day < 10) day = "0" + day;
				if (hour < 10) hour = "0" + hour;
				if (minute < 10) minute = "0" + minute;
				this.endDate = year + "-" + month + "-" + day;
				this.hide = false;
				
			},
			btnCancel() {
				console.log('取消时间：');
			},
			
			async getSelfScheduleType() {
				const url = 'visitor/interviewRecord/getSelfScheduleType';
				
				const res = await this.$get(url);
				console.log(res)
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				if (res.code != 0) {
					uni.showToast({
						icon: 'none',
						title: res.msg,
						duration: 3000
					});
					return;
				} else {
					this.initCunrrentTab();
					this.scheduleTypes = res.data;
				}
			},
			//显示抽屉
			show2() {
				this.drawerShow2 = true;
				this.mask = true;
				this.searchVal = "";
				this.startDate = "";
				this.endDate = "";
				this.none = true;
				this.hide = true;
				
				
			},
			
			show3() {
				this.drawerShow2 = false;
				this.mask = false;
				this.searchVal = "";
				this.startDate = "";
				this.endDate = "";
				this.none = true;
				this.hide = true;
				
			},
			//取消
			cancel2() {
				this.drawerShow2 = false;
				this.mask = false;
				this.startDate = "";
				this.endDate = "";
				this.none = true;
				this.hide = true;
				
			},
			//确定
			ensure2() {
				
			},
			isAllowedLate(e) {
				this.isAllowedLateTime = e.target.value;
			},
			newsType(e) {
				this.newsTypeTime = e.target.value;
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
			async searchNews() {
				this.pages[this.currentTab] = 1;
				let businessType = "";
				let messageType = "";
				if (this.isReservedConfirm[this.isAllowedLateTime].flag != "请选择") {
					businessType = this.isReservedConfirm[this.isAllowedLateTime].flag;
				}
				if (this.newTypeConfirm[this.newsTypeTime].flag != "请选择") {
					messageType = this.newTypeConfirm[this.newsTypeTime].flag;
				}
				const scheduleType = this.scheduleTypes[this.index].code;
				const current = this.pages[this.currentTab];
				const size = this.size;
				const startTime = this.startDate? this.startDate + ' 00:00:00': this.startDate ;
				const endTime = this.endDate?this.endDate+ ' 23:59:59':this.endDate;
				const messageStatus = this.messageStatus[this.currentTab];
				const name = this.searchVal;
				let params = {
					scheduleType,
					current,
					size,
					messageStatus,
					name,
					businessType,
					messageType,
					startTime,
					endTime
				}
				console.log(params);
				if (name == "" && startTime == "" && endTime ==""){
					uni.showToast({
						icon: "none",
						title:"姓名和时间不能同时为空",
						duration: 3000
					})
					return;
				}
				
				let records = await this.getMessageRecord(params);
				console.log(records);
				let temp = copy(this.list)
				
				temp[this.currentTab] = records;
				this.list = temp;

				this.drawerShow2 = false;
				this.mask = false;
				// this.$forceUpdate() //二维数组，开启强制渲染
			},
			bindPickerChange(index) {
				this.index = index;
				this.initCunrrentTab()
			},
			async showDetails(item) {
				const options = {
					id: item['id']
				};
				const url = "visitor/interviewMessage/updateMessageStatus";
				const res = await await this.$put(url, options);
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				let {
					interviewRecordId
				} = item;
				uni.navigateTo({
					url: '../../pagesSchedule/schedule/scheduleDetails?id=' + interviewRecordId+"&scheduleType="+this.scheduleTypes[this.index].code
				});
			},
			changestartDatetimePicker(date) {
				this.startDate = date.YYYY + "-" + date.MM + "-" + date.DD + " " + date.hh + ":" + date.mm + ":" + date.ss;
			},
			changeendtDatetimePicker(date) {
				this.endDate = date.YYYY + "-" + date.MM + "-" + date.DD + " " + date.hh + ":" + date.mm + ":" + date.ss;
			},
			toTop() {
				this.toView = ''
				setTimeout(() => {
					this.toView = 'top' + this.currentTab
				}, 10)
			},
			changeTab(currentIndex) {
				if (this.currentTab == currentIndex) return;
				// this.$refs.startTime.reset();
				// this.$refs.endTime.reset();
				this.dateStr = "";
				this.currentTab = currentIndex;
				this.isAllowedLateTime = 0,
					this.newsTypeTime = 0,
					this.initCunrrentTab();
			},
			// swiper 滑动
			swiperTab: function(e) {

				if (e.detail.source === 'touch') {
					var index = e.detail.current //获取索引
					this.$refs.navTab.longClick(index);
				}
			},
			// 加载更多 util.throttle为防抖函数
			lower1: util.throttle(async function(e) {
				let pageNum = Math.ceil(this.total / this.size);
				if (this.pages[this.currentTab] >= pageNum) {
					uni.showToast({
						icon: "none",
						title: '没有更多数据了哦',
						duration: 2000
					});
					return;
				}
				this.pages[this.currentTab]++;
				uni.showLoading({
					title: '加载中',
					mask: true
				})
				let businessType = "";
				let messageType = "";
				if (this.isReservedConfirm[this.isAllowedLateTime].flag != "请选择") {
					businessType = this.isReservedConfirm[this.isAllowedLateTime].flag;
				}
				if (this.newTypeConfirm[this.newsTypeTime].flag != "请选择") {
					messageType = this.newTypeConfirm[this.newsTypeTime].flag;
				}
				const scheduleType = this.scheduleTypes[this.index].code;
				const current = this.pages[this.currentTab];
				const size = this.size;
				const messageStatus = this.messageStatus[this.currentTab];
				const name = this.searchVal;
				const startTime = this.startDate? this.startDate + ' 00:00:00': this.startDate ;
				const endTime = this.endDate?this.endDate+ ' 23:59:59':this.endDate;
				let params = {
					businessType,
					scheduleType,
					current,
					size,
					messageStatus,
					messageType,
					startTime,
					endTime,
					name
				}
				let records = await this.getMessageRecord(params)
				let tempList = this.list
				tempList[this.currentTab] = tempList[this.currentTab].concat(records)
				this.list = tempList;
				this.$forceUpdate() //二维数组，开启强制渲染
				uni.hideLoading();
			}, 300),

			// 获取记录
			async getMessageRecord(params) {
				let records = [];
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				const res = await this.$get("visitor/interviewMessage/page", params);
				console.log(res);
				console.log(JSON.stringify(params));
				uni.hideLoading();
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return records;
				}
				if (res.code != 0) uni.showToast({
					icon: 'none',
					title: res.msg,
					duration: 3000
				});
				else {
					records = res.data.records;
					this.total = parseInt(res.data.total);
				}
				return records
			},

			//未读
			async initCunrrentTab() {
				const scheduleType = this.scheduleTypes[this.index].code;
				const current = this.pages[this.currentTab] = 1;
				const size = this.size;
				const messageStatus = this.messageStatus[this.currentTab];
				const name = this.searchVal;
				const data = await this.getMessageRecord({
					scheduleType,
					current,
					size,
					messageStatus,
					name
				})

				let temp = copy(this.list)
				temp[this.currentTab] = data;
				this.list = temp;
			},
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e) {
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			async isRefresh() {
				await this.initCunrrentTab()
				this.$refs.refresh.endAfter()

			},
			scan() {
				let that = this;
				// 扫码
				uni.scanCode({
					success: async function(res) {
						let addr = res.result.split('&');
						if (addr[1] == "businessCard") {
							console.log("2")
							if (!addr[0]) {
								uni.showToast({
									icon: "none",
									title: "预约码不能为空"
								});
								return;
							}
							const res = await that.$get("visitor/reservationLabel/getByCode", {
								"code":addr[0]
							})
							console.log(res)
							if (res == "" || res == null || res == undefined || res == "undefined") {
								return;
							}
							if (res.code != 0) {
									uni.showModal({
										title: '提示',
										showCancel: false,
										content: res.msg,
										success: (res) => {return}
									});
								return;
							}
							uni.setStorageSync('codeData', res.data);
							console.log(that.scheduleTypes[that.index].code)
							uni.navigateTo({
								url: '../../pagesNews/news/createReservation?code=' + addr[0]+'&scheduleType='+that.scheduleTypes[that.index].code
							});
						} else if (addr[1] == "appointmentCard") {
							console.log("1")
							if (!addr[0]) {
								uni.showToast({
									icon: "none",
									title: "拜访码不能为空"
								});
								return;
							}
							const res = await that.$get("visitor/interviewRecord/getByCode", {
								"code":addr[0]
							})
							console.log(res)
							if (res == "" || res == null || res == undefined || res == "undefined") {
								return;
							}
							if (res.code != 0) {
									uni.showModal({
										title: '提示',
										showCancel: false,
										content: res.msg,
										success: (res) => {return}
									});
								return;
							}
							uni.setStorageSync('codeViewData', res.data);
							uni.navigateTo({
								url: '../../pagesNews/news/addReservation?code=' + addr[0]
							});
						}else{
							uni.showModal({
								title: '提示',
								showCancel: false,
								content: "二维码不对",
								success: (res) => {return}
							});
						}
					}
				});
			},
			// 预约码使用
			codeUse() {
				uni.navigateTo({
					url: '../../pagesNews/news/codeUse?scheduleType='+this.scheduleTypes[this.index].code
				});
			}
		}
	};
</script>

<style lang="less">
	@import '../../static/css/news.css';
	@import '../../static/css/feekback.less';
	.visName {
		width: 100rpx;
	}
	
	.visName,.visState{
		white-space:nowrap;
		overflow:hidden;
		text-overflow:ellipsis;
	}
	.Search-for{
		margin-top: 10rpx;
		margin-bottom: 40rpx;
		padding: 30rpx; 
		-webkit-box-shadow: 0 8px 6px -6px #f5f5f5;
		-moz-box-shadow: 0 8px 6px -6px #f5f5f5;
		     box-shadow: 0 8px 6px -6px #f5f5f5;
			 
			 text {
				 font-size: 36upx;
			 }
	}
	.uni-search {
		display: flex;
		flex-wrap: wrap;
		.cardtitle {
			font-size: 32upx;
			color: #a7abb1;
			width: 100%;
			
		}
		
		.card-detail{
			.card-content{
				line-height: 45px;
				border: none;
			}
			
		}
		

		.card-detail {
			margin: 10rpx 0;

			.spanTime {
				flex: 2;
				width: 220rpx;
				
				.input-sel {
					font-size: 34rpx;
				}
			}

				.secretaryP {
					.word{
						font-size: 34rpx;
					}
				}
			}
		}

		.searchBtn {
			width: 80rpx;
			height: 40rpx;
			line-height: 40rpx;
			font-size: 28rpx;
			background: white;
			color: #000000;
			text-align: center;
			border: none;
			position: relative;
			top: -35rpx;
		}

	#bg{
		display: none;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: black;
		z-index: 1001;
		-moz-opacity: 0.3;
		opacity: 30;
		filter: alpha(opacity=30);
	}
</style>
