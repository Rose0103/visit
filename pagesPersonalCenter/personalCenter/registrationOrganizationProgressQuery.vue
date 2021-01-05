<!--本页面由uniapp切片工具生成，uni-app切片-可视化设计工具(一套代码编译到7个平台iOS、Android、H5、小程序)，软件下载地址：http://www.ymznkf.com/new_view_669.htm -->
<template>
	<view style="width: 100%;">
		<view v-if='code!="REFUSE"'>
			<view class="margin10"></view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">机构全称</text>
					<text decode="true" class="infoContent">{{name}}</text>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">审核状态</text>
					<text decode="true" class="infoContent">{{desc}}</text>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">审核意见</text>
					<text decode="true" class="infoContent">{{auditRemark?auditRemark:"空"}}</text>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle headerImg">
					<text decode="true" class="title">机构Logo</text>
					<image :src="logoImg" mode="aspectFill" class="head"></image>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle ">
					<text decode="true" class="title">机构代码</text>
					<text decode="true" class="infoContent">{{businessLicenseNumber}}</text>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle headerImg">
					<text decode="true" class="title">代码证书</text>
					<image :src="imgList" mode="aspectFill" class="head"></image>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle pickerSpan">
					<text decode="true" class="title">所&nbsp;在&nbsp;省</text>
					<text decode="true" class="infoContent">{{provinceArray}}</text>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle pickerSpan">
					<text decode="true" class="title">所在市县</text>
					<text decode="true" class="infoContent">{{cityArray}}</text>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle pickerSpan">
					<text decode="true" class="title">所在区域</text>
					<text decode="true" class="infoContent">{{regionArray}}</text>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle pickerSpan">
					<text decode="true" class="title">所属行业</text>
					<text decode="true" class="infoContent">{{industryArray}}</text>

				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle pickerSpan">
					<text decode="true" class="title">所属类型</text>
					<text decode="true" class="infoContent">{{typeArray}}</text>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">负&nbsp;&nbsp;责&nbsp;&nbsp;人</text>
					<text decode="true" class="infoContent">{{duty}}</text>

				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">联系电话</text>
					<text decode="true" class="infoContent">{{phone}}</text>
				</view>
			</view>
		</view>
		<view v-if='code=="REFUSE"'>
			
			<view class="margin10"></view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">机构全称</text>
					<input class="inputSpan" type="text" clearable focus v-model="name" placeholder="请输入机构全称" />
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">审核状态</text>
					<text decode="true" class="infoContent">{{desc}}</text>
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">审核意见</text>
					<text decode="true" class="infoContent">{{auditRemark?auditRemark:"空"}}</text>
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
					<input class="inputSpan" type="text" clearable focus v-model="businessLicenseNumber" placeholder="请输入机构代码" />
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
					<input class="inputSpan" type="text" clearable focus v-model="duty" placeholder="请输入负责人" />
				</view>
			</view>
			<view class="listGroupSetting border">
				<view class="headTitle organizationTitle">
					<text decode="true" class="title">联系电话</text>
					<input class="inputSpan" type="text" clearable focus v-model="phone" placeholder="请输入联系电话" />
				</view>
			</view>
			<view class="btn-row">
				<button type="primary" class="primary" @tap="submit">重新注册</button>
			</view>
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
			const item = uni.getStorageSync('applicantDetails');
			this.getAuthRequestBySelf(item)
		},
		data() {
			return {
				userAndEmployeeBaseInfo: "",
				userTenantCode: "",
				areaArray: {
					provinceArray: [],
					cityArray: [],
					regionArray: [],
				},
				provinceTime: 0,
				cityTime: 0,
				regionTime: 0,
				occupationArray: {
					industryArray: [],
					typeArray: [],
				},
				industryTime: 0,
				typeTime: 0,
				provinceArray: "",
				cityArray: "",
				regionArray: "",
				industryArray: "",
				typeArray: "",
				duty: "",
				phone: "",
				name: "",
				desc: "",
				auditRemark: "",
				code: "",
				imgData: {
					logoImg: [{
						url: ""
					}], //机构logo
					imgList: [{
						url: ""
					}] //代码证书
				},
				businessLicenseNumber: "",
				logoImg: "", //机构logo
				imgList: "", //代码证书
			}
		},
		methods: {
			openCamera(list, imgName) {
				uni.chooseImage({
					sourceType: ['camera', 'album'],
					count: 1,
					sizeType: ['compressed'],
					success: async res => {
						let url = 'file/attachment/upload';
						let formdata = new FormData(); // 创建一个form类型的数据
						formdata.append("file", res.tempFilePaths[0]); // 获取上传文件的数据
						formdata.append("name", "name"); // 获取上传文件的数据
						formdata.append("bizType", "appCode"); // 获取上传文件的数据
						let options = {
							formdata: formdata
						}
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
								ids: [list[i]['id']]
							}
							const res = await this.$del(url, options);
							if(res==""||res==null||res==undefined||res=="undefined"){
								return ;
							}
							if(res==0){
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
			async getAuthRequestBySelf(data) {
				this.name = data.name;
				this.duty = data.duty;
				this.desc = data.status.desc;
				this.code = data.status.code;
				this.phone = data.phone;
				this.logoImg = data.logo;
				this.businessLicenseNumber = data.businessLicenseNumber;
				this.imgData.imgList[0]["url"] = data.businessLicense;
				this.imgData.logoImg[0]["url"] = data.logo;
				this.imgList = data.businessLicense;
				this.$options.methods.getAreaOld("", "provinceArray", this, data.areaFirstCode, data.areaSecondCode, data.areaThirdCode);
				this.$options.methods.getIndustryOld("", "industryArray", this, data.industryFirstCode, data.industrySecondCode);
				console.log(data)
			},
			async getAreaOld(id, index, _self, areaFirstCode, areaSecondCode, areaThirdCode) {
				const url = "authority/area";
				const options = {
					parentId: id
				};
				const res = await _self.$get(url, options);
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				_self.areaArray[index] = res.data;
				let ids = '';
				if (index == "provinceArray") {
					for (var i = 0; i < _self.areaArray['provinceArray'].length; i++) {
						if (_self.areaArray['provinceArray'][i]['code'] == areaFirstCode) {
							_self.provinceTime = i;
							_self.provinceArray = _self.areaArray['provinceArray'][i].label;
							ids = _self.areaArray['provinceArray'][i]['id']
						}
					}
					_self.$options.methods.getAreaOld(ids, 'cityArray', _self, areaFirstCode, areaSecondCode, areaThirdCode);
				} else if (index == "cityArray") {
					for (var i = 0; i < _self.areaArray['cityArray'].length; i++) {
						if (_self.areaArray['cityArray'][i]['code'] == areaSecondCode) {
							_self.cityTime = i;
							_self.cityArray = _self.areaArray['cityArray'][i].label;
							ids = _self.areaArray['cityArray'][i]['id']
						}
					}
					_self.$options.methods.getAreaOld(ids, 'regionArray', _self, areaFirstCode, areaSecondCode, areaThirdCode);
				} else if (index == "regionArray") {
					for (var i = 0; i < _self.areaArray['regionArray'].length; i++) {
						if (_self.areaArray['regionArray'][i]['code'] == areaThirdCode) {
							_self.regionArray = _self.areaArray['regionArray'][i].label;
							_self.regionTime = i;
						}
					}
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
			async getIndustryOld(id, index, _self, industryFirstCode, industrySecondCode) {
				const url = "authority/industry";
				const options = {
					parentId: id
				};
				const res = await _self.$get(url, options);
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				_self.occupationArray[index] = res.data;
				let ids = '';
				if (index == "industryArray") {
					for (var i = 0; i < _self.occupationArray['industryArray'].length; i++) {
						if (_self.occupationArray['industryArray'][i]['code'] == industryFirstCode) {
							_self.industryTime = i;
							_self.industryArray = _self.occupationArray['industryArray'][i].label;
							ids = _self.occupationArray['industryArray'][i]['id']
						}
					}
					_self.$options.methods.getIndustryOld(ids, 'typeArray', _self, industryFirstCode, industrySecondCode);
				} else if (index == "typeArray") {
					for (var i = 0; i < _self.occupationArray['typeArray'].length; i++) {
						if (_self.occupationArray['typeArray'][i]['code'] == industrySecondCode) {
							_self.typeTime = i;
							_self.typeArray = _self.occupationArray['typeArray'][i].label;
							ids = _self.occupationArray['typeArray'][i]['id']
						}
					}
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
				if (index == "industryArray") {
					_self.$options.methods.getIndustry(_self.occupationArray[index][0].id, 'typeArray', _self);
				}
			},
			async submit(){
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
				if(this.imgData.logoImg =="" || this.imgData.imgList == "" ){
					uni.showToast({
						icon: "none",
						title: '请输入上传图片',
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
				console.log(options);
				const res = await this.$post(url, options);
				if(res==""||res==null||res==undefined||res=="undefined"){
					return ;
				}
				if(res.code==0){
					uni.showModal({
						title: '提示',
						showCancel: false,
						content: '申请成功，待审核',
						success: function(res) {
							console.log(res)
							if (res.confirm) {
								uni.navigateTo({
									url: '../../pages/personalCenter/personal',
								})
							}
						}
					});
				}else{
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
