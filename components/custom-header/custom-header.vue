<template>
	<view class="custom-header-container" :style="containerStyle">
		<view class="custom-header-status-bar" :style="{height:getStausBarHeight}"></view>
		<view class="custom-header-top-container" :style="headerStyle">
			<view :class="backBtnClass" style="height: 44px;width: 38px;margin: 0;padding: 0;border-radius: 0 !important;display: flex;align-items: center;justify-content: center;"
			 v-if="showBack" @tap="backTap"></view>
			<view v-if="!showExpand" class="custom-header-title" :style="titleStyle">
				{{title}}
			</view>
			<view v-else class="custom-header-title" :style="titleStyle">
				<picker @change="bindPickerChange" :value="index" :range="titles" range-key="title">
					<view class="uni-input">{{titles[index].title}}
						<uni-icons v-if="showExpand" :type="!expand?'arrowright':'arrowdown'" size="14" class="icon expand"></uni-icons>
					</view>
				</picker>
			</view>


		</view>
	</view>
</template>

<script>
	export default {
		props: {

			/**
			 * 导航文字
			 */
			title: String,
			/**
			 * 顶部导航容器样式字符串
			 */
			containerStyle: String,
			/**
			 * 标题导航样式字符串
			 */
			headerStyle: String,
			/**
			 * 左侧返回按钮样式类
			 */
			backBtnClass: String,
			/**
			 * 标题样式字符串
			 */
			titleStyle: String,
			/**
			 * 是否显示返回
			 */
			showBack: Boolean,
			expand: false,
			showExpand: false,
			titles: Array,
			// index: Number,
			range: []
		},
		watch: {
			range(newValue, oldValue) {
				this.range = this.title.map(e => e.title)
				console.log(this.range)
			}
		},
		computed: {
			getStausBarHeight() {
				try {
					const res = uni.getSystemInfoSync();
					return res.statusBarHeight + 'px';
				} catch (e) {}
			},
		},
		data() {
			return {
				index: 0,
				// array: ['中国', '美国', '巴西', '日本'],
			}
		},
		methods: {
			backTap(e) {
				this.$emit('backTap')
			},
			bindPickerChange(val) {
				if (this.index == val.detail.value) return;
				this.index = val.detail.value;
				this.$emit('bindPickerChange', this.index)
			}

		}
	}
</script>

<style>
	.custom-header-top-container {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		width: 100%;
	}

	.custom-header-back-btn {
		height: 44px;
		width: 38px;
		margin: 0;
		padding: 0;
		border-radius: 0 !important;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.custom-header-container {
		z-index: 1;
		width: 750upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		position: sticky;
		top: 0;
	}

	.custom-header-status-bar {
		width: 100%;
		top: 0;
		position: sticky;
		z-index: 100;
	}

	.custom-header-title {
		height: 44px;
		align-self: flex-start;
		margin-left: 30upx;
		line-height: 44px;
		font-size: 15px;
	}
</style>
