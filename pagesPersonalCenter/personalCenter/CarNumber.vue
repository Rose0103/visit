<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view style="width: 100%;">
		<view class="carinput">
			<view class="carinput-title">
				请填写车牌号码
			</view>
			<view class="carinput-input" v-if="!isPower">
				<view class="carinput-input-i" :class="{'input-active':carIndex == i}" @tap="inputKey" :data-index="i" v-for="(v,i) in carInput"
				 :key="i" v-show="i < 7">
					{{carInput[i].val}}
				</view>
			</view>
			<view class="SpecialLicensePlate" v-if="isPower">
				<input class="uni-input " placeholder="请输入车牌号" v-model="SpecialInput" style="" />
			</view>
			<view class="carinput-power">
				<checkbox-group class="checkbox-g" @change="powerChange">
					<label class="checkbox">
						<checkbox value="true" :checked="isPower" />
						特殊车牌
					</label>
				</checkbox-group>
			</view>
		</view>
		<view class="card-btn">
			<button class="btn" hover-class="hover-c"  @tap="toBind">
				确定
			</button>
		</view>
		<tki-float-keyboard ref="keybd" :mode="'car'" :type="keyType" :title="'车牌键盘'" @del="keyCbDel" @val="keyCbVal" @hide="keyCbHide"></tki-float-keyboard>
	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import {getValue} from '../../common/request.js';
	export default {
		onLoad(option) {
			this.type = option.type;
			console.log(this.type)
			if (this.type == "edit") {
				this.carNumberId = option.carNumberId
			}
		},
		data() {
			return {
				applyRemark: "",
				tenantCode: "",
				carNumberId: "",
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
				SpecialInput: ""
			}
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
					that.keyHide();
					that.carIndex = -2;
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
				let params = {};
				if (this.type == "edit") {
					params.id = this.carNumberId
				}
				if (this.isPower) {
					params.carNumber = this.SpecialInput;
					this.saveCarNumber(params);
				} else {
					let that = this
					let ck = that.checkCar();
					if (ck.i == -1 && !ck.isempty) {
						params.carNumber = ck.val;
						this.saveCarNumber(params);
					} else {
						// 显示键盘输入
						that.keyShow();
						that.carIndex = ck.i;
						that.keyType = that.carInput[ck.i].type
					}
				}

			},
			async saveCarNumber(params) {
				console.log(params)
				const res = await this.$post("admin/userInfo/save", params);
				if (res.code != 0) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: res.msg,
						success: function(res) {
							console.log(res)
							if (res.confirm) {
								return;
							}
						}
					});
				}
				const rescar = await this.$get("admin/userInfo/getCarNumber");
				const data = {
					"carNumber":getValue(rescar.data,"carNumber"),
					"carNumberId":getValue(rescar.data,"id"),
				}
				
				uni.$emit('update',data);
				uni.navigateBack();

			},
		}
	}
</script>

<style lang="scss" scoped>
	.SpecialLicensePlate {
		display: flex;
		justify-content: center;

	}

	.SpecialLicensePlate .uni-input {
		width: 420upx;
		margin-top: 40upx;
		border-bottom: 1px solid #BCBCBC;
	}

	.hover-c {
		opacity: .5
	}

	.body,
	page {
		height: 100%
	}

	.body {
		overflow: auto
	}

	.carinput {
		margin-top: 74upx;
		display: flex;
		flex-direction: column;
		padding-left: 40upx;
		padding-right: 40upx
	}

	.carinput-title {
		font-size: 30upx;
		color: #333333;
		line-height: 1;
		margin-bottom: 90upx
	}

	.carinput-input {
		display: flex;
		justify-content: center
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
		display: flex;
		justify-content: flex-end
	}

	.carinput-power .checkbox-g {
		display: flex;
		justify-content: center;
		align-items: center
	}

	.carinput-power .checkbox {
		margin-right: 92upx;
		font-size: 28upx;
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
		height: 80upx;
		background-color: #FFB600;
	}
	uni-button:after{
		border: 0;
	}
</style>
