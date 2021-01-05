<template>
	<view class="createReservation">
		<view class="card">
			<view>
				<view class="card-item">
					<view class="card-img">
						
						<img v-if="item.userId" :src="ItemImg?ItemImg:'../../static/img/schedule/c.png'" alt="">
					</view>
					<view class="card-content">
						<view class="card-content-top">
							<view class="unit-name"> 
								<text class="unit-kind">单位名称：</text>
								<text v-if="item.tenantCode">{{item.tenantCode.data?item.tenantCode.data.name:""}}</text>
							</view>
							<view class="unit-name">
								<text class="unit-kind">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</text>{{item.name}}
							</view>
							<view class="unit-name">
								<text class="unit-kind">职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;位：</text>
								<text v-if="item.station">{{item.station.data?item.station.data.name:""}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="schedule-content">
			<!-- 	<view class="uni-form-item uni-column">
			    <view class="title"><text class="uni-form-item__title">可自动聚焦的 input</text></view>
			    <view class="uni-input-wrapper">
			        <input class="uni-input" focus placeholder="自动获得焦点" />
			    </view>
			</view> -->
			<view class="modle">
				<view class="modle-title unit-kind">来访事由</view>
				<view class="modle-content">
					<input class="uni-input" ref="reservationIncident"  placeholder="请输入预约事由" v-model="params.reservationIncident" />
				</view>
			</view>
			<view class="modle">
				<view class="modle-title space-between">
					<text class="unit-kind">车牌号码</text>
					<uni-icons type="plusempty" size="28" class="icon-add" @click="addlicenseNumber"></uni-icons>
				</view>
				<view class="modle-content space-between" v-for="(val,index) in params.licenseNumber">
					<!-- <view class="space-between" > -->
					<view>{{params.licenseNumber[index]}}</view>
					<uni-icons type="trash" size="24" class="" @click="deldelLicenseNumber(index)" color="red"></uni-icons>
					<!-- </view> -->
					<!-- <view v-for="val in item.licenseNumber" :key="val" style="margin-bottom: 10rpx;">{{val}}</view> -->
				</view>
			</view>
			<view class="modle">
				<view class="modle-title unit-kind">变更来访时间</view>
				<view class="modle-content">
					<!-- <view class="passCheck"> -->
					<!-- beginTime="09:30:30" endTime="18:00:00"  beginDate="2010-01-01" endDate="2030-12-31" -->
					<timeSelector showType="yearToMinute" :beginDate="beginDate" @btnConfirm="btnConfirm" @btnCancel="btnCancel">
						<view class="box-time passCheck">
							{{params.reservationTime}}
							<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
						</view>
					</timeSelector>
					<!-- </view> -->
				</view>
			</view>
			<!-- <uni-section title="配置图标" type="line"></uni-section> -->
			<view class="modle" v-if="PartnerSchema=='SIMPLE'">
				<view class="modle-title unit-kind">同行人数量</view>
				<view class="modle-content">
					<input class="uni-input" type="number" placeholder="请输入同行人数量" v-model="partnerNumber" @click="SIMPLEInput" />
				</view>
			</view>
			<view class="modle" style="border: none;" v-if="PartnerSchema=='MIDDLE'">
				<!-- <view class="modle" style="border: none;"> -->
				<view class="modle-title space-between">
					<text class="unit-kind">同行人</text>
					<text class="unit-kind" @click="ManualInput">手动输入</text>
					<uni-icons type="plusempty" size="28" class="icon-add" @click="addPartnerTwo"></uni-icons>
				</view>
				<view class="modle-content space-between" v-for="(val,index) in partnersMIDDLE" style="margin:10rpx 0">
					<view class="card" style="box-shadow: none;">
						<view>
							<view class="card-item">
								<view class="card-content space-between">
									<view class="card-content-top" style="width: calc(100%);">
										<view class="unit-name space-between">
											<text class="unit-kind">身份号码：</text>
											<input placeholder="请输入身份号码" v-model="partnersMIDDLE[index].idCard" style="" />
										</view>
										<view class="unit-name space-between">
											<text class="unit-kind">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</text>
											<input placeholder="请输入姓名" v-model="partnersMIDDLE[index].name" style="" />
										</view>
									</view>
									<uni-icons type="trash" size="24" class="" @click="delPartner(index,'MIDDLE')" color="red"></uni-icons>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="modle" style="border: none;" v-if="PartnerSchema=='ADVANCED'">
				<view class="modle-title space-between">
					<text class="unit-kind">同行人</text>
					<uni-icons type="plusempty" size="28" class="icon-add" @click="addPartner"></uni-icons>
				</view>
				<view class="modle-content space-between" v-for="(val,index) in partners" style="margin:10rpx 0">
					<view class="card" style="box-shadow: none;">
						<view>
							<view class="card-item">
								<view class="card-img">
									<img v-if="val.userId" :src="val.userId.data?val.userId.data.avatar:'../../static/img/schedule/c.png'" alt="">
								</view>
								<view class="card-content space-between">
									<view class="card-content-top" style="width: calc(100% - 60rpx);">
										<view class="unit-name">
											<text class="unit-kind">单位名称：</text>
											<text v-if="val.tenantCode">{{val.tenantCode.data?val.tenantCode.data.name:""}}</text>
										</view>
										<view class="unit-name">
											<text class="unit-kind">姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：</text>{{val.name}}
										</view>
									</view>
									<uni-icons type="trash" size="24" class="" @click="delPartner(index,'ADVANCED')" color="red"></uni-icons>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="carinput" v-if="mask">
				<view style="text-align: center;font-size: 36rpx;margin-top: 30rpx;">添加车牌号</view>
				<view class="contentInput">
					<view class="carinput-input" v-if="!isPower">
						<view class="carinput-input-i" :class="{'input-active':carIndex == i}" @tap="inputKey" :data-index="i" v-for="(v,i) in carInput"
						 :key="i" v-show="i < 7">
							{{carInput[i].val}}
						</view>
					</view>
					<view class="SpecialLicensePlate" v-if="isPower">
						<input class="uni-input " placeholder="请手动输入车牌号"  v-model="SpecialInput" style="" />
					</view>
					
				</view>
				<view class="carinput-power">
					<checkbox-group class="checkbox-g" @change="powerChange">
						<label class="checkbox">
							<checkbox value="true" :checked="isPower" />
							特殊车牌
						</label>
					</checkbox-group>
				</view>
				<view class="inputBtn">
					<button type="default" size="mini" @click="carInputCancel">取消</button>
					<button type="primary" size="mini" @click="toBind">确认</button>
				</view>
			</view>
			<tki-float-keyboard ref="keybd" :mode="'car'" :type="keyType" :title="'车牌键盘'" @del="keyCbDel" @val="keyCbVal" @hide="keyCbHide"></tki-float-keyboard>
			<view class="actions">
				<button type="default" size="mini" @click="handleCancel">取消</button>
				<button v-if="type=='add'" type="primary" size="mini" @click="handleConfirm">确认</button>
				<button v-if="type=='edit'" type="primary" size="mini" @click="handleEdit">确认</button>
			</view>

		</view>
		<view v-if="mask" class="cpt-mask">

		</view>
	</view>
</template>

<script>
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	import uniSection from '@/components/uni-section/uni-section.vue'
	import timeSelector from '@/components/wing-time-selector/wing-time-selector.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import variableStr from '../../common/common.js';
	import tkiFloatKeyboard from "@/components/tki-float-keyboard/tki-float-keyboard.vue";
	import {
		getValue
	} from '../../common/request.js';

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
		if ('YYYY-MM-DD HH:mm') return year + "-" + month + "-" + day + " " + hours + ":" + minutes

	}
	export default {
		components: {
			timeSelector,
			// moment,
			uniCollapse,
			uniCollapseItem,
			uniIcons,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				code: "",
				type: 'add',
				id: "",
				item: {},
				secretaryArray: ['是', '否'],
				params: {
					reservationLabelCode: "",
					licenseNumber: [],
					// partnerId: [],
					reservationIncident: "",
					reservationTime: getDate('YYYY-MM-DD HH:mm'),
				},
				partners: [], //高级同行人
				partnersMIDDLE: [], //中级同行人
				isClick: true,
				expand: false,
				time: getDate('YYYY-MM-DD HH:mm'),
				visitorTenantCode: "",
				PartnerSchema: "",
				partnerNumber: "",
				Number: "",
				carIndex: -1,
				carInput: [{
						type: 2,
						val: ""
					},
					{
						type: 4,
						val: ""
					},
					{
						type: 1,
						val: ""
					},
					{
						type: 1,
						val: ""
					},
					{
						type: 1,
						val: ""
					},
					{
						type: 1,
						val: ""
					},
					{
						type: 3,
						val: ""
					}
				],
				keyType: 0,
				isPower: false, // 新能源
				mask: false,
				SpecialInput: '',
				carNumberOld: '',
				beginDate: getDate('YYYY-MM-DD'),
				scheduleType:'',
				ItemImg:'',
			};
		},
		onReady() {},
		onLoad: function(option) {
			console.log(option)
			const code = option.code;
			const that = this;
			this.scheduleType = option.scheduleType;
			const flag = variableStr.isLogin();
			if (flag) {
				const id = option.id;
				if (code) {
					this.type = "add";
					this.initView(code);
				}
				if (id) {
					this.type = "edit";
					this.id = id;
					this.initViewById(id)
				}
				uni.$on('contactsChecked', (data) => {
					let contactsChecked = data.contactsChecked;
					if (data.type == "ADVANCED") { //高级
						let partners = contactsChecked.map(e => {
							let item = JSON.parse(e);
							return item;
						})
						this.partners = this.partners.concat(partners);
					} else if (data.type == "MIDDLE") { //中级
						let partners = contactsChecked.map(e => {
							let item = JSON.parse(e);
							return item;
							console.log(item);
						})
						this.partnersMIDDLE = this.partnersMIDDLE.concat(partners);
					}
				})
			} else {
				uni.showModal({
					title: '提示',
					showCancel: false,
					content: '您还没有登录，请先登录',
					success: function(res) {
						console.log(res)
						if (res.confirm) {
							uni.navigateTo({
								url: "/pages/login/pwdLogin?type=businessCard&code=" + code+"&scheduleType=" + that.scheduleType
							})
						}
					}
				});
			}

			// this.enums()

		},

		onUnload() {
			// 移除监听事件  
			uni.$off('contactsChecked');
		},
		mounted() {
		        this.$nextTick(() => {
		         this.$refs.reservationIncident.blur();
		        });
		      },
		methods: {
			empty(v) {
				let tp = typeof v,
					rt = false;
				if (tp == "number" && String(v) == "") {
					rt = true
				} else if (tp == "undefined") {
					rt = true
				} else if (tp == "object") {
					if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true
				} else if (tp == "string") {
					if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true
				} else if (tp == "function") {
					rt = false
				}
				return rt
			},
			inputKey(e) {
				let that = this;
				let data = e.currentTarget.dataset;
				that.carIndex = data.index;
				that.upKeyType();
				that.keyShow();
			},
			keyCbVal(e) {
				let that = this;
				let index = Number(that.carIndex);
				if (index >= 0 && index < 6) {
					that.carInput[index].val = e;
					that.carIndex = index + 1;
				} else if (index == 6) {
					that.carInput[index].val = e;
					// 不是新能源出输入结束
					// that.keyHide();
					// that.carIndex = -2;
					console.log('非新能源车输入完毕')

				}
				that.upKeyType();
			},
			keyCbDel(e) {
				let index = this.carIndex;
				if (index > 0) {
					if (!this.empty(this.carInput[index].val)) {
						this.carInput[index].val = "";
						this.carIndex = index;
					} else {
						this.carInput[index - 1].val = "";
						this.carIndex = index - 1;
					}
				}
				this.upKeyType();
			},
			upKeyType() {
				if (!this.empty(this.carInput[this.carIndex])) {
					this.keyType = this.carInput[this.carIndex].type;
					console.log(this.keyType)
				}
			},
			keyShow() {
				this.$refs.keybd._keyShow();
			},
			keyHide() {
				this.$refs.keybd._keyHide();
			},
			keyCbHide() {
				if (this.carIndex != -3 || this.carIndex != -2) {
					this.carIndex = -1;
				}
			},
			powerChange(e) {
				this.isPower = !this.isPower
				if (this.isPower) {
					this.keyHide()
				}
			},
			checkCar() {
				// 检查车牌是否输入完成
				let that = this;
				let i = 7;
				let rt = {
					i: -1,
					isempty: false,
					val: ""
				};

				for (let index = 0; index < i; index++) {
					const obj = that.carInput[index];
					if (this.empty(String(obj.val))) {
						rt.i = index;
						rt.isempty = true;
						rt.val = "";
						break;
					}
					rt.val += that.carInput[index].val;
				}
				return rt;
			},
			toBind() {
				if (this.isPower) {
					if(this.SpecialInput == "" || this.SpecialInput == null || this.SpecialInput == undefined || this.SpecialInput ==
					"undefined"){
						uni.showModal({
							title: '提示',
							showCancel: false,
							content: "请输入正确格式的车牌号",
							success: function(res) {
								console.log(res)
								if (res.confirm) {
									return;
								}
							}
						});
						return;
					}else{
						if(!(/^([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[a-zA-Z](([DF]((?![IO])[a-zA-Z0-9](?![IO]))[0-9]{4})|([0-9]{5}[DF]))|[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1})$/.test(this.SpecialInput.trim()))){
							uni.showModal({
								title: '提示',
								showCancel: false,
								content: "请输入正确格式的车牌号",
								success: function(res) {
									console.log(res)
									if (res.confirm) {
										return;
									}
								}
							});
							return;
						}
						
					}
					this.params.licenseNumber.push(this.SpecialInput);
					this.SpecialInput = "";
					this.mask = false;
				} else {
					let that = this
					let ck = that.checkCar();
					if (ck.i == -1 && !ck.isempty) {
						this.mask = false;
						this.params.licenseNumber.push(ck.val)
						this.keyHide();
						this.carInputReset()
					} else {
						uni.showModal({
							title: '提示',
							showCancel: false,
							content: "请输入常规车牌号",
							success: function(res) {
								console.log(res)
								if (res.confirm) {
									// 显示键盘输入
									that.keyShow();
									that.carIndex = ck.i;
									that.keyType = that.carInput[ck.i].type
								}
							}
						});
						
					}
				}
			},
			carInputReset() {
				for (let index = 0; index < 7; index++) {
					this.carInput[index].val = "";
				}
				this.carIndex = -1;
			},
			carInputCancel() {
				this.mask = false;
				this.isPower = false;
				this.carInputReset()
				this.keyHide();
				this.SpecialInput = "";
			},
			async enums() {
				const params = {
					"tenantCode": this.visitorTenantCode
				}
				const res = await this.$get("admin/tenantParameter/getPartnerParameter", params);
				console.log(params)
				console.log(res)
				this.PartnerSchema = res.data.value ? res.data.value : "";
				this.getCarNumber();
			},
			async getCarNumber() {
				const res = await this.$get("admin/userInfo/getCarNumber");
				console.log(res)
				this.carNumberOld = getValue(res, 'data.carNumber').trim();
				if (this.carNumberOld == "" || this.carNumberOld == null || this.carNumberOld == undefined || this.carNumberOld ==
					"undefined") {
					return;
				}
				if (this.type == "edit") {
					return
				} else if (this.type == "add") {
					this.params.licenseNumber.push(getValue(res, 'data.carNumber').trim());
				}

			},
			// 初始化 根据code
			async initView(code) {
				let res = uni.getStorageSync('codeData');
				if(!res){
					res = await this.$get("visitor/reservationLabel/getByCode", {
						"code": code
					});
					res= res.data;
				}
				console.log(res);
				this.Number = getValue(res,"singleUsersNumber");
				console.log(this.Number);
				this.params.reservationLabelCode = code;
				this.visitorTenantCode =getValue(res,"tenantCode");
				this.ItemImg = getValue(res,"interviewee.data.userId.data.avatar")
				this.item =getValue(res,"interviewee.data");
				this.enums();
				// this.time = moment(this.item.reservationTime).format('YYYY-MM-DD HH:mm')
			},
			//初始话 编辑 根据id
			async initViewById(id) {
				const res = await this.$get("visitor/interviewRecord/getInterviewRecordDetail", {
					id,
					scheduleType:this.scheduleType
				});
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				this.PartnerSchema = res.data.partnerSchema ? res.data.partnerSchema : "";
				console.log(res)
				if (res.code != 0) {
					uni.showToast({
						icon: "none",
						title: res.msg
					});
					return;
				}
				const data = res.data;
				data.personType.code == "VISITOR" ? (this.item = data.interviewee.data) : (this.item = data.visitor.data);
				if (this.PartnerSchema == "SIMPLE") {
					this.partnerNumber = data.partnerNumber;
					console.log(this.partnerNumber)
				}
				if (data.interviewPartnerReturnDtoList.length > 0) {
					if (this.PartnerSchema == "MIDDLE") {
						data.interviewPartnerReturnDtoList.map(e => {
							let data = {}
							data.idCard = e.partnerIdCard;
							data.name = e.partnerName;
							this.partnersMIDDLE.push(data)
						})
					} else if (this.PartnerSchema == "ADVANCED") {
						this.partners = data.interviewPartnerReturnDtoList.map(e => {
							return e.partner.data
						})
					}

				}
				let partnerId = []
				if (this.partners.length > 0) {
					partnerId = this.partners.map(e => {
						return e.id;
					})
				}
				let {
					licenseNumber,
					reservationIncident,
					reservationTime
				} = data;
				const fullDate = reservationTime;
				let date = fullDate.substring(0, 16);
				this.params = Object.assign({}, this.params, {
					licenseNumber,
					reservationIncident,
					reservationTime: date,
					partnerId
				})
				this.getCarNumber();
			},
			// 增加车牌号
			addlicenseNumber() {
				this.mask = true;
				// this.$refs.reservationIncident.blur();
				// this.params.licenseNumber.push("")
			},
			deldelLicenseNumber(index) {
				let that = this;
				uni.showModal({
					title: '删除车牌',
					content: '您确定要删除该车牌吗？',
					success: function(res) {
						if (res.confirm) {
							that.params.licenseNumber.splice(index, 1);
						} else if (res.cancel) {}
					}
				});
				
			},

			//简单版同行人
			SIMPLEInput() {
				// if (this.partnerNumber >= this.Number * 1 - 1) {
				// 	uni.showToast({
				// 		icon: "none",
				// 		title: '最多只能添加' + (this.Number * 1 - 1).toString() + '个同行人'
				// 	});
				// 	return false;
				// }
			},
			//中级班手动输入同行人
			ManualInput() {
				// if (this.partnersMIDDLE.length >= this.Number * 1 - 1) {
				// 	uni.showToast({
				// 		icon: "none",
				// 		title: '最多只能添加' + (this.Number * 1 - 1).toString() + '个同行人'
				// 	});
				// 	return false;
				// }
				let data = {
					idCard: "",
					name: ""
				}

				this.partnersMIDDLE.push(data)
			},
			addPartner() {
				// if (this.partnersMIDDLE.length >= this.Number * 1 - 1) {
				// 	uni.showToast({
				// 		icon: "none",
				// 		title: '最大只能添加' + (this.Number * 1 - 1).toString() + '个同行人'
				// 	});
				// 	return false;
				// }
				let filterEmployeeId = [];
				this.partners.map(e => {
					filterEmployeeId.push(e.id)
				})
				uni.navigateTo({
					url: './contacUnit?type=ADVANCED&filterEmployeeId=' + filterEmployeeId,
				})
			},
			addPartnerTwo() {
				// if (this.partnersMIDDLE.length >= this.Number * 1 - 1) {
				// 	uni.showToast({
				// 		icon: "none",
				// 		title: '最大只能添加' + (this.Number * 1 - 1).toString() + '个同行人'
				// 	});
				// 	return false;
				// }

				let filterEmployeeId = [];
				this.partnersMIDDLE.map(e => {
					filterEmployeeId.push(e.id)
				})
				uni.navigateTo({
					url: './contacUnit?type=MIDDLE&filterEmployeeId=' + filterEmployeeId,
				})
			},
			delPartner(index, type) {
				if (type == "ADVANCED") {
					this.partners.splice(index, 1);
				} else if (type == "MIDDLE") {
					this.partnersMIDDLE.splice(index, 1);
				}
			},
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
				this.params.reservationTime = year + "-" + month + "-" + day + " " + hour + ":" + minute;
				// this.params.reservationTime = moment(e.year + "-" + e.month + "-" + e.day + " " + e.hour + ":" + e.minute).format(
				// 	'YYYY-MM-DD HH:mm');
			},
			btnCancel() {
				console.log('取消时间：');
			},
			async saveCarNumber() {
				const res = await this.$post("admin/userInfo/save", {
					"carNumber": this.params.licenseNumber[0]
				});
				console.log(res)
				// this.PartnerSchema = res.data.value ? res.data.value : "";
			},

			// 确认
			async handleConfirm() {
				const url = 'visitor/interviewRecord/saveVisitingCardRegister';
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				if (this.PartnerSchema == "SIMPLE") {
					this.params.partnerNumber = this.partnerNumber; //同行人数量
					console.log(this.params.partnerNumber)

				} else if (this.PartnerSchema == "MIDDLE") {
					let partnerList = []
					this.partnersMIDDLE.map(e => {
						let data = {}
						if (!(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(e.idCard.trim()))) {
							uni.showToast({
								icon: "none",
								title: '请输入正确的身份证号码',
								duration: 3000
							});
							return false;
						}
						data.partnerIdCard = e.idCard;
						data.partnerName = e.name;
						partnerList.push(data)
					})
					this.params.partnerList = partnerList;
				} else if (this.PartnerSchema == "ADVANCED") {
					let partnerId = this.partners.map(e => {
						return e.id;
					})
					this.params.partnerId = partnerId;
				}
				console.log(this.params);
				if (this.params.licenseNumber.length > 0) {

					if (this.carNumberOld == "" || this.carNumberOld == null || this.carNumberOld == undefined || this.carNumberOld ==
						"undefined") {
						this.saveCarNumber();
					}

				}
				const res = await this.$post(url,
					this.params
				);
				console.log(res);
				if (res.code != 0) {
					uni.showToast({
						icon: 'none',
						title: res.msg
					});
					return;
				}
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				uni.hideLoading();
				uni.showToast({
					icon: 'none',
					title: res.msg
				});
				if (res.code != 0) return;
				uni.reLaunch({
					url: '../../pages/schedule/scheduleList'
				});
			},
			// 编辑
			async handleEdit() {
				const url = 'visitor/interviewRecord ';
				uni.showLoading({
					title: '提交中',
					mask: true
				});
				let partnerId = this.partners.map(e => {
					return e.id;
				})
				this.params.partnerId = partnerId;
				let params = this.params;
				params.id = this.id;
				params.scheduleType = this.scheduleType;
				if (this.PartnerSchema == "SIMPLE") {
					this.params.partnerNumber = this.partnerNumber; //同行人数量
				} else if (this.PartnerSchema == "MIDDLE") {
					let partnerList = []
					this.partnersMIDDLE.map(e => {
						let data = {}
						if (!(/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(e.idCard.trim()))) {
							uni.showToast({
								icon: "none",
								title: '请输入正确的身份证号码',
								duration: 3000
							});
							return false;
						}
						data.partnerIdCard = e.idCard;
						data.partnerName = e.name;
						partnerList.push(data)
					})
					this.params.partnerList = partnerList;
				} else if (this.PartnerSchema == "ADVANCED") {
					let partnerId = this.partners.map(e => {
						return e.id;
					})
					this.params.partnerId = partnerId;
				}
				console.log(JSON.stringify(this.params));
				console.log(this.params);
				console.log(this.params);
				if (this.params.licenseNumber.length > 0) {
					if (this.carNumberOld == "" || this.carNumberOld == null || this.carNumberOld == undefined || this.carNumberOld ==
						"undefined") {
						this.saveCarNumber();
					}

				}
				delete params.reservationLabelCode;
				const res = await this.$put(url,
					params
				);
				if (res == "" || res == null || res == undefined || res == "undefined") {
					return;
				}
				uni.hideLoading();
				uni.showToast({
					icon: 'none',
					title: res.msg
				});
				if (res.code != 0) return;
				uni.reLaunch({
					url: '../../pages/schedule/scheduleList'
				});
			},
			// 取消
			handleCancel() {
				if (this.type == 'add') {
					uni.reLaunch({
						url: '../../pages/news/newsList'
					});
				} else if (this.type == 'edit') {
					uni.reLaunch({
						url: '../../pages/schedule/scheduleList'
					});
				}
			},

		}
	}
</script>



<style lang="scss">
	uni-button:after,
		button:after{border:0}
	.cpt-mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #000000;
		opacity: 0.5;
		z-index: 99;
	}

	.carinput {
		position: fixed;
		z-index: 100;
		top: 200upx;
		// left: 5%; 
		width: 90%;
		background: #FFFFFF;
		// margin-top: 74upx;
		display: flex;
		flex-direction: column;
		padding-left: 20upx;
		padding-right: 20upx;
		padding-bottom: 20upx;
	}

	.carinput-title {
		font-size: 30upx;
		color: #333333;
		line-height: 1;
		margin-bottom: 90upx
	}

	.carinput-input {
		margin-top: 60upx;
		display: flex;
		justify-content: center
	}

	.SpecialLicensePlate,
	.inputBtn {
		
		display: flex;
		justify-content: center;
		margin-top: 40rpx;
		
		button{
			width: 160rpx;
			font-size: 30rpx;
			
		}
		

	}

	.contentInput {
		display: flex;
		justify-content: center;
	}

	.SpecialLicensePlate .uni-input {
		width: 420upx;
		margin-top: 6%;
		font-size: 36upx;
		border-bottom: 1px solid #BCBCBC;
	}

	.carinput-input-i {
		height: 22px;
		width: 50upx;
		border-bottom-width: 2upx !important;
		border-bottom-style: solid;
		border-bottom-color: #BCBCBC;
		font-size: 36upx;
		color: #333333;
		line-height: 1;
		margin-right: 12upx;
		padding-bottom: 7upx;
		text-align: center
	}

	.carinput-input-i:nth-last-child(1) {
		margin-right: 0
	}

	.carinput-input .input-active {
		border-bottom-width: 2upx !important;
		border-bottom-style: solid;
		border-bottom-color: #23CCAB;
		color: #23CCAB
	}

	.carinput-power {
		height: 90upx;
		margin-top: 20upx;
		display: flex;
		justify-content: flex-end
		
	}

	.carinput-power .checkbox-g {
		display: flex;
		justify-content: center;
		align-items: center
	}

	.carinput-power .checkbox {
		// margin-right: 92upx;
		font-size: 34upx;
		color: #999999;
		line-height: 1
	}

	.carinput-power .checkbox checkbox {
		transform: scale(.6) translateY(-2px);
		margin-right: 0
	}

	.card-btn {
		margin-top: 40upx
	}

	.card-btn .btn {
		width: 324upx;
		height: 80upx
	}


	.createReservation {
		width: 100%;
		padding-bottom: 180rpx;
		overflow-x: hidden;

		.passCheck {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}


		.space-between {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.licenseNumber {
			padding: 15rpx;
			width: calc(100% - 60rpx);
			border-bottom: 1px solid #EBEEF5;
		}

		.licenseNumber:last-child {
			border-bottom: 0px solid #EBEEF5;
			padding-bottom: 0;
		}

		.actions {
			display: flex;
			position: fixed;
			width: 100%;
			bottom: 0;
			padding: 20rpx 0;
			justify-content: center;
			align-items: center;
			background-color: #ffffff;
			border-top: 1px solid #EBEEF5;
			
			button {
				width: 160rpx;
				font-size: 32rpx;
				
			}
		}

		.schedule-content {
			padding: 0 20rpx;
		}

		.modle {
			.modle-title {
				font-size: 36rpx;
				margin-top: 20rpx;

			}

			.modle-content {
				margin: 20px 0rpx 25rpx 0;
				color: #202022;
				font-size: 36rpx;
			}

			border-bottom: 1px solid #EBEEF5;
		}

		.unit-kind {
			color: #A0A4AA;
		}

		.card {
			// padding: 10rpx;
			paddding: 10rpx 0;
			width: 100%;
			border-color: #ebeef5;
			border-style: solid;
			border-width: 1px;
			-webkit-box-shadow: 0 2rpx 10rpx 0 rgba(0, 0, 0, .1);
			box-shadow: 0 2rpx 10rpx 0 rgba(0, 0, 0, .1);
		}

		.card-item.child {
			width: 100%;
			border-top: 1px solid #EBEEF5;

			.unit-title {
				padding-top: 50rpx;
				// line-height: 60rpx;
			}

			.unit-name {
				font-size: 36rpx;
				padding-bottom: 20rpx;
				padding-top: 15rpx;
			}

		}

		.card-item {
			display: flex;
			align-items: center;

			.card-img {
				// margin: 0 30rpx;
				// width: 130rpx;
				// height: 130rpx;

				margin: 20rpx;
				width: 120upx;
				height: 120upx;
				border-radius: 120upx;
				overflow: hidden;

				img {
					width: 100%;
					height: 100%;
				}
			}

			.card-content {
				flex: auto;

				.card-content-top {
					padding-right: 10rpx;
					position: relative;

					.unit-status {
						position: absolute;
						right: 0;
						top: -0rpx;
					}

					.unit-title {
						color: #202022;
						font-size: 32rpx;
						padding-top: 25rpx;
						// line-height: 60rpx;
					}

					.unit-name {
						font-size: 36rpx;
						line-height: 60rpx;
						// margin-right: 100rpx;
					}
				}

				.unit-num {
					display: flex;
					font-size: 28rpx;
					margin-bottom: 20rpx;
					margin-top: 10rpx;
					// margin-bottom: 25rpx;
					align-items: center;
					justify-content: space-between;

					.expand {
						margin: 0 30rpx;
					}
				}

				.unit-source {
					display: flex;
					align-items: center;
					margin-right: 10rpx;
				}

			}
		}
	}
</style>
