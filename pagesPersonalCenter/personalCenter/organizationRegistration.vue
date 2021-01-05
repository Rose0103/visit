<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view>
		<view class="margin10"></view>
		<view class="listGroupSetting ">
			<view class="headTitle organizationTitle">
				<navigator url="addOrganization"><text decode="true" style="width: 600upx;color: #FF9400;">填写邀请码,加入机构</text></navigator>
			</view>
		</view>
		<view class="margin10"></view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">机构全称</text>
					<input class="inputSpan" type="text"  clearable focus v-model="name"  placeholder="请输入机构全称" ></input>
					<!-- <text decode="true" class="word">15051889698</text> -->
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle headerImg">
					<text decode="true" class="title">机构Logo</text>
					<view class="add-img-item" v-for="(item, index) in imgData['logoImg']" :key="index">
						<image :src="item.url" mode="aspectFill" class="head"></image>
						<image class="add-img-del" @click="delImg(index,imgData['logoImg'])" src="../../static/img/delete.png"></image>
					</view>
					<view v-if="imgData['logoImg'].length < 1 " class="add-img-item" @click="openCamera(imgData['logoImg'],'logoImg')">
						<image ref='img' src="../../static/img/add.png" class="head"></image>
					</view>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle ">
					<text decode="true" class="title">机构代码</text>
					<input class="inputSpan" type="text"  clearable  v-model="businessLicenseNumber" placeholder="请输入机构代码"></input>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle headerImg">
					<text decode="true" class="title">代码证书</text>
					<view class="add-img-item" v-for="(item, index) in imgData['imgList']" :key="index">
						<image :src="item.url" mode="aspectFill" class="head"></image>
						<image class="add-img-del" @click="delImg(index,imgData['imgList'])" src="../../static/img/delete.png"></image>
					</view>
					<view v-if="imgData['imgList'].length < 1 " class="add-img-item" @click="openCamera(imgData['imgList'],'imgList')">
						<image src="../../static/img/add.png" class="head"></image>
					</view>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle pickerSpan">
					<text decode="true" class="title">所&nbsp;在&nbsp;省</text>
					<picker id="provinceid" @change="bindPickerChange($event)" :value="provinceTime" :range="areaArray.provinceArray"
					 :range-key="'label'">
						<view class="ApassCheck">
							<text decode="true" class="word">{{areaArray.provinceArray[provinceTime]?areaArray.provinceArray[provinceTime].label:""}}</text>
							<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
						</view>
					</picker>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle pickerSpan">
					<text decode="true" class="title">所在市县</text>
					<picker id="cityid" @change="bindPickerChange($event)" :value="cityTime" :range="areaArray.cityArray" :range-key="'label'">
						<view class="ApassCheck">
							<text decode="true" class="word">{{areaArray.cityArray[cityTime]?areaArray.cityArray[cityTime].label:""}}</text>
							<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
						</view>
					</picker>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle pickerSpan">
					<text decode="true" class="title">所在区域</text>
					<picker id="regionid" @change="bindPickerChange($event)" :value="regionTime" :range="areaArray.regionArray"
					 :range-key="'label'">
						<view class="ApassCheck">
							<text decode="true" class="word">{{areaArray.regionArray[regionTime]?areaArray.regionArray[regionTime].label:""}}</text>
							<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
						</view>
					</picker>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle pickerSpan">
					<text decode="true" class="title">所属行业</text>
					<picker id="industryid" @change="bindoccupationChange($event)" :value="industryTime" :range="occupationArray.industryArray"
					 :range-key="'label'">
						<view class="ApassCheck">
							<text decode="true" class="word">{{occupationArray.industryArray[industryTime]?occupationArray.industryArray[industryTime].label:""}}</text>
							<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
						</view>
					</picker>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle pickerSpan">
					<text decode="true" class="title">所属类型</text>
					<picker id="typeid" @change="bindoccupationChange($event)" :value="typeTime" :range="occupationArray.typeArray"
					 :range-key="'label'">
						<view class="ApassCheck">
							<text decode="true" class="word">{{occupationArray.typeArray[typeTime]?occupationArray.typeArray[typeTime].label:""}}</text>
							<uni-icons type="arrowright" size="14" class="icon"></uni-icons>
						</view>
					</picker>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">负&nbsp;&nbsp;责&nbsp;&nbsp;人</text>
					<input class="inputSpan" type="text" clearable  v-model="duty" placeholder="请输入负责人"></input>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">联系电话</text>
					<input class="inputSpan" type="number" maxlength="11" clearable  v-model="phone" placeholder="请输入联系电话"></input>
				</view>
			</view>
			<view class="btn-row">
				<!-- <button type="submit" class="primary" >提交注册</button> -->
				<button type="primary" class="primary" @tap="submit">提交注册</button>
			</view>

	</view>
</template>

<script>
	import uniIcons from '@/components/uni-icons/uni-icons.vue';
	import {
		buildUrl
	} from '@/common/request.js';
	export default {
		onLoad() {
			this.getArea("", "provinceArray", this);
			this.getIndustry("", "industryArray", this)
		},
		data() {
			return {
				
				areaArray: {
					provinceArray: [],
					cityArray: [],
					regionArray: [],
				},
				occupationArray: {
					industryArray: [],
					typeArray: [],
				},
				provinceTime: 0,
				cityTime: 0,
				regionTime: 0,
				industryTime: 0,
				typeTime: 0,
				duty: "",
				phone: "",
				name: "",
				businessLicenseNumber: "",
				imgData: {
					logoImg: [], //机构logo
					imgList: [], //代码证书
				},
				imgList: [], //图片数组
				cloudimgList: [],
				// imgCount: 1,//最多支持9张上传，可以修改
			}
		},
		methods: {
			bindPickerChange(e) {
				var nowId = e.target.id; //当前picker的ID id需要自己设置 在picker中
				switch (nowId) { //判断是哪个picker  如多个用switch  数量少时可用if
					case "provinceid": //第一个picker
						this.provinceTime = e.target.value;
						this.cityTime = 0;
						this.$options.methods.getArea(this.areaArray["provinceArray"][e.target.value].id, 'cityArray', this);
						break;
					case "cityid": //第二个picker
						this.cityTime = e.target.value;
						this.regionTime = 0;
						this.$options.methods.getArea(this.areaArray["cityArray"][e.target.value].id, 'regionArray', this);
						break;
					case "regionid":
						this.regionTime = e.target.value;
						break;
				}
				// console.log(this.areaArray.provinceArray[provinceTime].fullName)
				// this.provinceTime = e.target.value
			},
			bindoccupationChange(e) {
				var nowId = e.target.id; //当前picker的ID id需要自己设置 在picker中
				switch (nowId) { //判断是哪个picker  如多个用switch  数量少时可用if
					case "industryid": //第一个picker
						this.industryTime = e.target.value;
						this.typeTime = 0;
						this.$options.methods.getIndustry(this.occupationArray["industryArray"][e.target.value].id, 'typeArray', this);
						break;
					case "typeid": //第二个picker
						this.typeTime = e.target.value;
						break;
				}
			},
			async getArea(id, index, _self) {
				const url = "authority/area";
				const options = {
					parentId: id
				};
				const res = await _self.$get(url, options);
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				_self.areaArray[index] = res.data;
				if (index == "provinceArray") {
					_self.$options.methods.getArea(_self.areaArray[index][0].id, 'cityArray', _self);
				} else if (index == "cityArray") {
					_self.$options.methods.getArea(_self.areaArray[index][0].id, 'regionArray', _self);
				}
			},
			async getIndustry(id, index, _self) {
				const url = "authority/industry";
				const options = {
					parentId: id
				};
				const res = await _self.$get(url, options);
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				_self.occupationArray[index] = res.data;
				// console.log(_self.occupationArray[index]);
				if (index == "industryArray") {
					_self.$options.methods.getIndustry(_self.occupationArray[index][0].id, 'typeArray', _self);
				}
			},
			openCamera(list, imgName) {
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					count: 1,
					sizeType: ['compressed'],
					success: async res => {
						await uni.uploadFile({
							url: buildUrl() + 'file/attachment/upload',
							filePath: res.tempFilePaths[0],
							name: 'file',
							formData: {
								'bizType': 'appCode'
							},
							success: (uploadFileRes) => {
								let data = JSON.parse(uploadFileRes.data).data;
								list = [...list, ...res.tempFiles];
								this.imgData[imgName] = list;
								this.imgData[imgName][0]["url"] = data['url'];
								this.imgData[imgName][0]["id"] = data['id'];
								console.log(this.imgData[imgName])
								// console.log(data);
							}
						});

					},
				});
			},
			delImg(i, list) {
				uni.showModal({
					content: '确定删除图片',
					success: async res => {
						// console.log(list[i]['id']);
						if (res.confirm) {
							const url = "file/attachment";
							const options = {
								"ids[]":[list[i]['id']]
							}
							const res = await this.$del(url, options);
							if(res==""||res==null||res==undefined||res=="undefined"){
								return ;
							}
							if(res.code==0){
								list.splice(i, 1);
							}else{
								uni.showToast({
									icon: "none",
									title: res.msg,
									duration: 3000
								});
							}
							
						} else if (res.cancel) {

						}
					}
				});
			},
			async submit() {
				if (this.name.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '请输入机构全称',
						duration: 3000
					});
					return false;
				}
				if (this.businessLicenseNumber.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '请输入机构代码',
						duration: 3000
					});
					return false;
				}
				if (this.duty.trim() == "") {
					uni.showToast({
						icon: "none",
						title: '请输入负责人',
						duration: 3000
					});
					return false;
				}
				
				if (this.phone.trim() == "" ) {
					uni.showToast({
						icon: "none",
						title: '请输入联系电话',
						duration: 3000
					});
					return false;
				}else {
					console.log(this.phone.trim())
					if(!(/^1[3456789]\d{9}$/.test(this.phone.trim()))){
						uni.showToast({
							icon: "none",
							title: '请输入正确的手机号码哦',
							duration: 3000
						}); 
						return false; 
					}
				}
				if(this.imgData.logoImg =="" || this.imgData.imgList == ""){
					uni.showToast({
						icon: "none",
						title: '请上传图片',
						duration: 3000
					});
					return;
				}
				const url = "authority/tenantAudit/save";
				const options = {
					areaFirstCode: this.areaArray.provinceArray[this.provinceTime]["code"], //地区一级code
					areaSecondCode: this.areaArray.cityArray[this.cityTime]["code"], //地区二级code
					areaThirdCode: this.areaArray.regionArray[this.regionTime]["code"], //地区三级code
					businessLicense: this.imgData.imgList[0]["url"], //代码证书
					businessLicenseNumber: this.businessLicenseNumber, //机构代码
					duty: this.duty, //负责人
					industryFirstCode: this.occupationArray.industryArray[this.industryTime]["code"], //行业一级code
					industrySecondCode: this.occupationArray.typeArray[this.typeTime]["code"], //行业二级code
					logo: this.imgData.logoImg[0]["url"], //logo
					phone: this.phone, //联系电话
					name: this.name, //联系电话
				};
				const res = await this.$post(url, options);
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				if (res.code == 0) {
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '注册成功，待审核',
						success: function(res) {
							if (res.confirm) {
								uni.redirectTo({
									url: 'personalSettings',
								})
							}
						}
					});
				} else {
					uni.showToast({
						icon: "none",
						title: res.msg,
						duration: 3000
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '../../static/css/personal.css';
	@import '../../static/css/common.css';
	@import '../../static/css/uni.css';
</style>
