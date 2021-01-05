<template>
	<view class="container999 schedule-view" @touchstart="refreshStart" @touchmove="refreshMove" @touchend="refreshEnd">
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
			<!-- <view>我的日程</view> -->
			<view class="example-body">
				<view class="uni-searchbar">
					<view class="uni-searchbar__box inputStr" @click="searchClick">
						<!-- #ifdef MP-ALIPAY -->
						<view class="uni-searchbar__box-icon-search">
							<uni-icons color="#999999" size="18" type="search" />
						</view>
						<!-- #endif -->
						<!-- #ifndef MP-ALIPAY -->
						<uni-icons color="#999999" class="uni-searchbar__box-icon-search" size="18" type="search" />
						<!-- #endif -->
						<input  @tap="show2" :focus="showSync" @confirm="confirm" class="uni-searchbar__box-search-input" disabled="false"
						 confirm-type="search" type="text"  />
						<!-- <text class="uni-searchbar__text-placeholder">请输入拜访人姓名</text> -->
						
						<scheduleList :show="drawerShow2" @cancel="cancel2" @ensure="searchNews" direction="right" >
							<view class="Search-for" >
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
									<text class="cardtitle">日程状态类型:</text>
									<view class="card-detail">
										<view class="card-content" >
											<picker class="secretaryP" @change="isAllowedLate" :value="isAllowedLateTime" :range="isReservedConfirm"
											 :range-key="'name'">
												<view class="card-detail">
													<text decode="true" class="word">{{isReservedConfirm[isAllowedLateTime].name?isReservedConfirm[isAllowedLateTime].name:""}}</text>
												</view>
											</picker>
										</view>
									</view>
								</view>
								
							</view>
						</scheduleList>
						
					</view>
					<image @click="scan" class="tabIcon" src="../../static/img/scanning.png"></image>
					<image @click="codeUse" class="tabIcon" src="../../static/img/QRcode_news.png"></image>
				</view>
				
			</view>
			<!-- 导航栏 agents导航栏标题 -->
			<navTab ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
			<view class="zzx-box" style="width: 100%;" v-if="currentTab==1">
				<zzx-calendar  @changeMode="changeMode" @selected-change="datechange" :showBack="false"
				 :dotList="dotLists">
				</zzx-calendar>
			</view>
			<view class='all' v-if="currentTab==2">
				<view class="bar">
					<timeSelector showType="yearToMonth" @btnConfirm="btnConfirm" @btnCancel="btnCancel">
						<view class="box-time passCheck">
							{{year_month}}
							<uni-icons type="arrowdown" size="14" class="icon"></uni-icons>
						</view>
					</timeSelector>
				</view>
			</view>
		</view>
		<swiper style="min-height: 100vh;margin-top: 90rpx;" :current="currentTab" @change="swiperTab">
			<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
				<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">
					<view :class="topHeight" :id="'top'+listIndex" style="width: 100%;margin-bottom: 10rpx;">边距盒子</view>
					<!-- <view  style="width: 100%;margin-bottom: 50rpx;"></view> -->
					<view class='contentList' >
						<view class="set_box" v-for="(item,index) in listItem" :key="index">
							<view class="set_time">
								<view>{{timeForMat(item.date)}}</view>
								<!-- <view>{{timeForMat("2020-07-10")}}</view> -->
							</view>
							<!-- 步骤条 -->
							<view class="set-1">
								<view class="set-2">
									<view class="tlak_o" v-for="(cItem) in item.record" :key="cItem.id" v-if="cItem.personType">
										<view class="user like_">
											<view class="user_say like_o">
												<view class="user_head like_h">
													<text class="doc_name name_">{{cItem.name}}</text><text class="doc_time time_">{{cItem.time}}</text>
												</view>
												<view class="user_talk like_talk">
													<view class="zzx-box"  >
														<view  class="example-box" >
															<view  style="width: 100%;margin-bottom: 50rpx;"></view>
															<view class="card" @click="showDetails(cItem)" v-if='cItem.personType'>
																<view class="card-item" v-if="cItem.personType.code=='INTERVIEWEE'">
																	<view class="card-img">
																		<img :src="cItem.avatar?cItem.avatar:'../../static/img/schedule/c.png'" alt="">
																	</view>
																	<view class="card-content">
																		<view class="card-content-top">
																			<view class="unit-title">{{cItem.tenantName?cItem.tenantName:""}}</view>
																			<img class="unit-status" :src="'../../static/img/schedule/'+ cItem.visitStatus.code +'.png'" alt="">
																		</view>
																		<view class="unit-num">
																			<!-- <view class="unit-name">
																				<text class="unit-kind">姓名：{{cItem.visitor?cItem.visitor.data.name:""}}</text>
																			</view> -->
																			<view> <text class="unit-kind">同行人数：</text>{{cItem.partnerNumber}}</view>
																			<view class="unit-source">
																				<img src="../../static/img/schedule/icon4.png" alt="">
																				<text class="unit-kind">{{cItem.personType?(cItem.personType.code=='VISITOR'?'拜访':'来访'):""}}</text>
																			</view>
																		</view>
																	</view>
																</view>
																<view class="card-item" v-else>
																	<view class="card-img">
																		<img :src="cItem.avatar?cItem.avatar:'../../static/img/schedule/c.png'" alt="">
																	</view>
																	<view class="card-content">
																		<view class="card-content-top">
																			<view class="unit-title">{{cItem.tenantName}}</view>
																			<img class="unit-status" :src="'../../static/img/schedule/'+ cItem.visitStatus.code +'.png'" alt="">
																		</view>
																		<view class="unit-num">
																			<!-- <view class="unit-name">
																				<text class="unit-kind">姓名：</text>{{cItem.name}}
																			</view> -->
																			<view> <text class="unit-kind">同行人数：</text>{{cItem.partnerNumber}}</view>
																			<view class="unit-source">
																				<img src="../../static/img/schedule/icon4.png" alt="">
																				<text class="unit-kind">{{cItem.personType?(cItem.personType.code=='VISITOR'?'拜访':'来访'):""}}</text>
																			</view>
																		</view>
																	</view>
																</view>
															</view>
														</view>
													</view>
												</view>
											</view>
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
	import variableStr from '../../common/common.js';
	import zzxCalendar from "../../components/zzx-calendar/zzx-calendar.vue"
	import ScheduleBar from "../../components/uni-schedule-bar/uni-schedule-bar.vue"
	import uniCard from '@/components/uni-card/uni-card.vue';
	import masks from '../../components/mask.vue'
	import timeSelector from '@/components/wing-time-selector/wing-time-selector.vue';

	const copy = obj => JSON.parse(JSON.stringify(obj));

	function getDate(type) {
		let date = new Date();
		let year = date.getFullYear(); //获取完整的年份(4位)
		let month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
		let day = date.getDate(); //获取当前日(1-31)
		let hours = date.getHours(); //获取当前小时数(0-23)
		let minutes = date.getMinutes();

		if (month < 10) month = "0" + month;
		if (day < 10) day = "0" + day;
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (type == "YYYY-MM-DD") return year + "-" + month + "-" + day;
		if (type == "YYYY-MM") return year + "-" + month ;
		if ('YYYY-MM-DD HH:mm') return year + "-" + month + "-" + day + " " + hours + ":" + minutes
	}
	//判断时间
	// function 
	export default {
		components: {
			// moment,
			zzxCalendar,
			ScheduleBar,
			uniCard,
			refresh,
			navTab,
			tabBar4,
			timeSelector,
			masks
		},
		data() {
			return {
				scheduleTypes: [],
				index: 0,
				scheduleType: "MYSELF",
				toView: "",
				title: '我的日程',
				showBack: variableStr.tabBarStr.showBack,
				backBtnClass: variableStr.tabBarStr.backBtnClass,
				containerStyle: variableStr.tabBarStr.containerStyle,
				titleStyle: variableStr.tabBarStr.titleStyle,
				show: false,
				mask: false,
				showSync: false,
				searchVal: "",
				inputStr: "",
				tabTitle: ['周', '日', '月'], //导航栏格式 --导航栏组件
				weekMode: true,
				dateShowTypes: ['', 'DATA', 'MONTH'],
				items: ['周', '日', '月'],
				currentTab: 0,
				topHeight: "heigth_list",
				pages: [1, 1, 1],
				size: 30,
				total: 0,
				list: [
					[],
					[],
					[]
				], //数据格式
				showExpand: true,
				dotLists:[],
				fullDate: getDate("YYYY-MM-DD"),
				VisitStatus: '',
				isReservedConfirm: [{
					name: '全部',
					flag: ''
				}],
				isAllowedLateTime: 0,
				statusList:[],
				drawerShow2: false,
				hide:true,
				year_month: getDate("YYYY-MM") //当前选的月
			}
		},
		
		onShow() {
			this.enums();
			this.show3();
		},
		methods: {
			btnConfirm(e){
				console.log(e)
				this.year_month =e.key;
				const days = "01";
				this.fullDate =e.key+"-01";
				const [year, month, day] =[e.year,e.month, "01"];
				// this.getScheduleTime(year,month)
				this.initCunrrentTab2();
			},
			btnCancel() {
				console.log('取消时间：');
			},
			//显示抽屉
			show2() {
				this.drawerShow2 = true;
				this.mask = true;
				this.searchVal = "";
			},
			
			show3() {
				this.drawerShow2 = false;
				this.mask = false;
				this.searchVal = "";
			},
			//取消
			cancel2() {
				this.drawerShow2 = false;
				this.mask = false;
			},
			//确定
			ensure2() {
				
			},
			
			timeForMat(type) {
				let showTime = type;
				let dataTime = type.split("-");
				
				let date = new Date();
				let year = date.getFullYear(); //获取完整的年份(4位)
				
				let month = date.getMonth() + 1; //获取当前月份(0-11,0代表1月)
				let day = date.getDate(); //获取当前日(1-31)
				if(year==dataTime[0] &&month==dataTime[1]&&day==dataTime[2]){
					showTime="今天"
				}else{
					let daysDiffer = dataTime[2]-day
					if(year==dataTime[0] &&month==dataTime[1]&&daysDiffer==1){
						showTime="明天"
					}
				}
				return showTime;
			},
			async enums(){
				const url = "visitor/enums";
				const res = await this.$get(url, {
					'codes[]': 'VisitStatus'
				});
				console.log(res);
				const obj = res.data.VisitStatus;
				this.isReservedConfirm = [{
					name: '全部',
					flag: ''
				}];
				for (let datas in obj) {
					this.isReservedConfirm.push({
						"name": obj[datas],
						"flag": datas
					})
				}
				this.getSelfScheduleType();
			},
			isAllowedLate(e) {
				this.isAllowedLateTime = e.target.value;
				// this.searchNews();
			},
			bindPickerChange(index) {
				this.index = index;
				this.getTopHeight();
				if (this.currentTab == 0) this.initCunrrentTab0();
				else if (this.currentTab == 1) {
					this.fullDate = getDate("YYYY-MM-DD");
					const fullDate = this.fullDate;
					const arr = fullDate.split("-");
					const [year, month, day] = arr;
					this.getScheduleTime(year, month)
					this.initCunrrentTab1();
				} else if (this.currentTab == 2) {
					this.fullDate = getDate("YYYY-MM-DD");
					const fullDate = this.fullDate;
					const arr = fullDate.split("-");
					const [year, month, day] = arr;
					this.getScheduleTime(year,month)
					this.initCunrrentTab2();
				}
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
				let statusList = "";
				if (this.isReservedConfirm[this.isAllowedLateTime].flag) {
					statusList = this.isReservedConfirm[this.isAllowedLateTime].flag;
					this.statusList[0] = statusList;
				}
				const scheduleType = this.scheduleTypes[this.index].code;
				const current = this.pages[this.currentTab];
				const size = this.size;
				const name = this.searchVal;
				let params = {
					scheduleType,
					current,
					size,
					name,
					statusList,
				}
				let records = await this.getInterviewRecord(params);
				let temp = copy(this.list)
				temp[this.currentTab] = records;
				this.list = temp;
				
				this.drawerShow2 = false;
				this.mask = false;
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
						title: res.msg
					});
					return;
				} else {
					this.scheduleTypes = res.data;
					this.initCunrrentTab0();
					
				}
			},
			// 获取打点日期
			async getScheduleTime(year, month) {
				const url = 'visitor/interviewRecord/getScheduleTime';
				const dateShowType = this.dateShowTypes[this.currentTab];
				const name = this.searchVal;
				const statusList = this.statusList;
				const scheduleType = this.scheduleTypes[this.index].code;
				const param = {
					dateShowType,
					month,
					year,
					name,
					statusList,
					scheduleType
				}
				// console.log(param);
				const res = await this.$get(url, param);
				// console.log(res)
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				if (res.code != 0) {
					uni.showToast({
						icon: 'none',
						title: res.msg
					});
					return;
				} else {
					if(res.data==null||res.data==""||res.data=="null"||res.data==undefined||res.data=="undefined"){
						return;
					}
					const doLists = res.data.map(e => {
						let date = e;
						return {
							date
						}
					})
					this.dotLists = doLists;
				}
			},
			// 计算导航栏的距离
			getTopHeight() {
				if (this.currentTab == 0) this.topHeight = 'heigth_list';
				else if (this.currentTab == 2) this.topHeight = 'height_month'
				else {
					if (this.weekMode) this.topHeight = 'height_day_week';
					else this.topHeight = 'height_day_month';
				}
			},
			// 日列表切换 日历模式
			changeMode(val) {
				this.weekMode = val;
				this.getTopHeight()
			},
			toTop() {
				this.toView = '';
				setTimeout(() => {
					this.toView = 'top' + this.currentTab
				}, 10)
			},
			changeTab(currentIndex) {
				this.weekMode = true;
				if (this.currentTab == currentIndex) return;
				this.currentTab = currentIndex;
				this.getTopHeight();
				if (currentIndex == 0) this.initCunrrentTab0();
				else if (currentIndex == 1) {
					this.fullDate = getDate("YYYY-MM-DD");
					const fullDate = this.fullDate;
					const arr = fullDate.split("-");
					const [year, month, day] = arr;
					this.getScheduleTime(year, month)
					this.initCunrrentTab1();
				} else if (currentIndex == 2) {
					this.fullDate = getDate("YYYY-MM-DD");
					const fullDate = this.fullDate;
					const arr = fullDate.split("-");
					const [year, month, day] = arr;
					this.getScheduleTime(year,month)
					this.initCunrrentTab2();
				}
			},

			showDetails(item) {
				let {
					id
				} = item;
				uni.navigateTo({
					url: '../../pagesSchedule/schedule/scheduleDetails?id=' + id+"&scheduleType="+this.scheduleTypes[this.index].code
				});
			},
			// swiper 滑动
			swiperTab: function(e) {
				if (e.detail.source === 'touch') {						var index = e.detail.current //获取索引						this.$refs.navTab.longClick(index);				}
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
				let params = {}
				const scheduleType = this.scheduleTypes[this.index].code;
				const current = this.pages[this.currentTab];
				const size = this.size;
				const name = this.searchVal;
				const statusList = this.statusList;
				params = {
					scheduleType,
					current,
					size,
					name,
					statusList
				}
				if (this.currentTab == 0) {} else if (this.currentTab == 1) {
					const dateShowType = this.dateShowTypes[this.currentTab];
					const fullDate = this.fullDate;
					const arr = fullDate.split("-");
					const [year, month, day] = arr;
					params = { ...params,
						dateShowType,
						year,
						month,
						day
					}
				} else if (this.currentTab == 2) {
					const dateShowType = this.dateShowTypes[this.currentTab];
					const fullDate = this.fullDate;
					// const arr = fullDate.split("-");
					// const [year, month, day] = arr;
					params = { ...params,
						dateShowType,
						year,
						month,
						day
					}
				}
				
				let records = await this.getInterviewRecord(params);
				let tempList = this.list;
				tempList[this.currentTab] = tempList[this.currentTab].concat(records);
				this.list = tempList;
				this.$forceUpdate() //二维数组，开启强制渲染
			}, 300),
			// 获取记录
			async getInterviewRecord(params) {
				console.log(params)
				let records = [];
				uni.showLoading({
					title: '加载中',
					mask: true
				});
				console.log(JSON.stringify(params))
				const res = await this.$get("visitor/interviewRecord/getScheduleRecord", params)
				// const res = await this.$get("visitor/interviewRecord/getInterviewRecord", params)
				if(res==""||res==null||res==undefined||res=="undefined"){
					return records;
				}
				console.log(res)
				uni.hideLoading();
				if (res.code != 0) uni.showToast({
					icon: 'none',
					title: res.msg
				});
				else{
					records = res.data.records;
					this.total = parseInt(res.data.total);
				}
				return records
			},
			//初始话全部列表1
			async initCunrrentTab0() {
				const scheduleType = this.scheduleTypes[this.index].code;
				const current = this.pages[0] = 1;
				const size = this.size;
				const data = await this.getInterviewRecord({
					scheduleType,
					current,
					size
				})
				 data.reverse()
				let temp = copy(this.list)
				 console.log(temp);
				temp[0] = data;
				this.list = temp;
				
			},
			// 初始话日列表2
			async initCunrrentTab1() {
				const scheduleType = this.scheduleTypes[this.index].code;
				const current = this.pages[1] = 1;
				const size = this.size;
				const dateShowType = this.dateShowTypes[this.currentTab];
				
				const fullDate = this.fullDate;
				const arr = fullDate.split("-");
				const [year, month, day] = arr;
				const data = await this.getInterviewRecord({
					scheduleType,
					current,
					size,
					year,
					month,
					day,
					dateShowType
				});
				let temp = copy(this.list)
				temp[1] = data || [];
				this.list = temp;
			},
			async initCunrrentTab2() {
				const scheduleType = this.scheduleTypes[this.index].code;
				const current = this.pages[1] = 1;
				const size = this.size;
				const fullDate = this.fullDate;
				const arr = fullDate.split("-");
				const [year, month, day] = arr;
				const dateShowType = this.dateShowTypes[this.currentTab];
				const data = await this.getInterviewRecord({
					scheduleType,
					current,
					size,
					year,
					month,
					dateShowType
				});
				let temp = copy(this.list)
				temp[2] = data || [];
				this.list = temp;
			},
			// 点击日期
			datechange(e) {
				this.fullDate = e.fullDate;
				this.initCunrrentTab1()
			},
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e) {
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			// 下拉刷新
			async isRefresh() {
				if (this.currentTab == 0) await this.initCunrrentTab0()
				else if (this.currentTab == 1) {
					await this.initCunrrentTab1();
				}
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
	}
</script>

<style lang="scss">
	@import '../../static/css/news.css';
	@import '../../static/css/feekback.less';
	.all {
		// margin-top: 20rpx;
		// width:100%;
		margin: auto;
		font-size: 18px;
	}
	
	.all .bar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		// margin: 30rpx 20rpx;
		padding: 10rpx;
	}
	
	.bar .barbtn {
		height: 30px;
		line-height: 30px;
		font-size: 18px;
	}
	.Search-for{
		margin-top: -190rpx;
		margin-bottom: 40rpx;
		padding: 30rpx; 
		-webkit-box-shadow: 0 8px 6px -6px #f5f5f5;
		-moz-box-shadow: 0 8px 6px -6px #f5f5f5;
		     box-shadow: 0 8px 6px -6px #f5f5f5;
			 
			 text {
				 font-size: 34rpx;
			 }
	}
	
	.card-detail{
		.card-content{
			line-height: 55px;
			border: none;
		}
		
	}
	
	.searchBtn{
		width: 100rpx;
	}
	.set_box {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
	}
	
	/* 左侧时间 */
	.set_time {
		width: 10%;
		position: relative;
	
		view {
			position: absolute;
			margin-top: 60upx;
			color: #999999;
			font-size: 36upx;
		}
	
	}
	
	
	/* 右侧内容 */
	
	
	.set-1 {
		width: 90%;
	}
	
	.set-2 {
		min-height: 300upx;
		border-radius: 10upx;
		width: 84%;
		margin-left: 80upx;
		margin-top: 60upx;
		padding-right: 10rpx;
		position: relative;
	
		.tlak_o {
			width: 100%;
			min-height: 300upx;
	
			.like_ {
				width: 100%;
				min-height: 100rpx;
	
				.like_o {
					width: 100%;
					height: 100%;
	
					.like_h {
						color: #999999;
	
						.name_ {
							margin-right: 20rpx;
							font-size: 36rpx;
						}
	
						.time_ {
							font-size: 36rpx;
						}
					}
	
					.like_talk {
						// width: 95%;
						min-height: 100rpx;
						// margin: 0 30rpx;
	
						text {
							color: #333333;
						}
	
						.like_img {
							width: 100%;
							min-height: 100rpx;
							display: flex;
							justify-content: flex-start;
							flex-wrap: wrap;
	
							image {
								width: 30%;
								height: 180rpx;
								margin-bottom: 20rpx;
								margin-right: 2%;
							}
						}
					}
				}
			}
		}
	}
	
	.set-2::after {
		content: '';
		/* 必须存在如果没有图标就留空 */
		top: -20upx;
		/* 定位 距离*/
		border-left: #c6c6c6 1px solid;
		/* 横线颜色 */
		left: -44upx;
		/* 定位 距离*/
		height: 120%;
		/* 高度 */
		position: absolute;
		/* 定位 */
	}
	
	.set-2::before {
		content: "\e64d";
		/* 必须存在如果没有图标就留空 */
		color: #c6c6c6;
		/* 设置颜色 */
		position: absolute;
		/* 定位 */
		left: -70upx;
		top: -20upx;
		/* 移动到左边 */
		font-weight: bold;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		font-family: "iconfont" !important;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		font-size: 54upx;
		/* 图标大小 */
		font-style: normal;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		-webkit-font-smoothing: antialiased;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
		-moz-osx-font-smoothing: grayscale;
		/* 图标样式在复制的图标文件中复制相对应的图标样式必须存在 */
	}
	
	@font-face {
		font-family: "iconfont";
		src: url('//at.alicdn.com/t/font_1337773_f06f5a7las.eot?t=1565581133395');
		/* IE9 */
		src: url('//at.alicdn.com/t/font_1337773_f06f5a7las.eot?t=1565581133395#iefix') format('embedded-opentype'),
			/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAOIAAsAAAAAB8QAAAM7AAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCDMgqCRIIjATYCJAMUCwwABCAFhG0HZhvNBsiemjwJqJERRCC3tX4YOM4iqNbCnr29uw8wKGBUsUAKqDyCjY5HcEzCALron1wr8wDk8hKBFpIc5yaXfWZJoIBIQkF1KlvVqWuFfZ3c/CBw0p8fcMJJsQY6uIuEMk8188LgXgfHTJceiXlrm0tGajTgaMCz2T6yyf5BXh+Ef9BdxMSIS9cTaKmvYGbzFhRXA1sZ2C0QO7cRAdhadnmkNTSEqufYLM4qNdKx9AJn+M/Hb2OiQVIWwL6rNufIIP1bj29voaZspAiK/byITqLAaEAmdvX6d7KQ+dEstCw2tjQL0FJDkvZald8e//3y+WglCIaW0E/e5R8vERWvuTWY5RYy3/ywXBtKXBEF395EBN++FCQ8V5CWsmEt4CBgHMz1Ad8rde7s2LbD7oUhT3l+eWHbhxwOB+LFrfkVL7I3FIAWdpdWvfHiYt8FltYWdzy1Pz/WfPhQ/elT7efPvUJiVlRsIj8+18X3az7+5Wb48vVrbnvo7OndVe1cPc55k2ebWG7OmMgYX01bT3vJnNlJWtemes0mn3vI/PJl80NQQqVErfcH/Ys5Fy3evrVoyyZNDLSq/cp5EyYsKTbb69bD/+5fmPs/cFwxG9ABoCNdTY+AKrwdi2npHk0Xu4vMH/Q7Wl+4+Yftkv83kMHXTiVutOlsnh68ZYPZit+hmDmRSxVwlDnvxvI8WOq3gz4VCy3xE8Id/d7H2GV2M6Ghi4ak1gcKDYORGTsaSq2Mg0rDTGhplLyTW+mEsRC5BUYadyC0dwpJWw+h0N53ZMb+glJX/6DSPgpoaUN4nLOVobGtZdYuJHAkQ7EbqiVqwMjF7UVrJSKKTmCmitNrETOpUzAiNLxZykMGxPY4wNRBIjnHEDOqh7nOzZBOR6GRUQ2SeKiKc2NiWBju+6JQieqBvbkYRMAhMkjUDVKTUAaYzufsW99fCSEUOgI20rMQr4UwJurloQihwmcg8/SGWT3v8hKTDkQkjsMgjKH0oFzHi+hgnoKM/VtpIBIulGpF1ihRmDcLz9WHnm/Uv0BZNAD40zJSFJGjjEq77dsEg1ahKoF2qbupYvP0KNS2e69WbmucSNZAOpEa5XpUagAAAA==') format('woff2'),
			url('//at.alicdn.com/t/font_1337773_f06f5a7las.woff?t=1565581133395') format('woff'),
			url('//at.alicdn.com/t/font_1337773_f06f5a7las.ttf?t=1565581133395') format('truetype'),
			/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
			url('//at.alicdn.com/t/font_1337773_f06f5a7las.svg?t=1565581133395#iconfont') format('svg');
		/* iOS 4.1- */
	}
	
	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	
	.icon-yuandian:before {
		content: "\e64d";
	}
	
	.icon-dingweiweizhi:before {
		content: "\e619";
	}
	.uni-search{
		margin:0 20upx;
		display: flex;
		flex-direction: column;
		.card-detail{
			font-size: 32rpx;
			.secretaryP{
				width: 200rpx;
				
			}
		}
	}
	.schedule-view {
		width: 100%;

		.schedule-content {
			// padding-top: 300upx;
		}

		.heigth_list {
			height: 300upx;
		}

		.height_day_week {
			height: 470upx;
		}

		.height_day_month {
			height: 740upx;
		}

		.height_month {
			height: 300upx;
		}

		.zzx-box {
			background-color: #FFFFFF;
			padding-right: 10rpx;
			margin-top: 0rpx;

			.card {
				// padding: 10rpx;
				margin-right: 0;
				// margin-left: 80rpx;
				border-color: #ebeef5;
				border-style: solid;
				border-width: 1px;
				-webkit-box-shadow: 0 2rpx 10rpx 0 rgba(0, 0, 0, .1);
				box-shadow: 0 2rpx 10rpx 0 rgba(0, 0, 0, .1);
			}
		}

		.timeline {
			display: flex;
			align-items: center;
			margin: 15rpx 0 20rpx 0;
			// justify-content: ;

			.timeline-time {
				margin: 0 10rpx;
				color: #A0A4AA;
				font-size: 24rpx;
			}

			.timeline-line {
				height: 3rpx;
				flex: auto;
				background-color: #DCDFE6;
				position: relative;
			}

			.timeline-line::before {
				display: inline-block;
				width: 14rpx;
				height: 14rpx;
				border-radius: 50%;
				background-color: #DCDFE6;
				content: "";
				position: absolute;
				left: 0;
				top: -6rpx;

			}
		}

		.card-item {
			display: flex;
			align-items: center;
			width: 100% ;

			.card-img {
				margin: 20rpx;
				width: 100px;
				height: 120upx;
				border-radius: 120upx;
				overflow: hidden;
				// width: 100rpx;
				// width: 100rpx;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.card-content {
				flex: auto;

				.card-content-top {
					padding-right: 100rpx;
					position: relative;

					.unit-status {
						position: absolute;
						right: -4rpx;
						top: -4rpx;
						width: 86rpx;
						height: 86rpx;
					}

					.unit-title {
						color: #202022;
						font-size: 36rpx;
						padding-top: 20rpx;
						// line-height: 60rpx;
					}

					.unit-name {
						font-size: 36rpx;
						line-height: 60rpx;
						// margin-right: 100rpx;
					}
				}

				.unit-kind {
					color: #A0A4AA;
				}

				.unit-num {
					display: flex;
					font-size: 36rpx;
					margin-bottom: 20rpx;
					margin-top: 30rpx;
					align-items: center;
					justify-content: space-between
				}

				.unit-source {
					display: flex;
					align-items: center;
					margin-right: 10rpx;

					img {
						width: 56rpx;
						height: 56rpx;
					}
				}

			}

		}
	}
</style>
