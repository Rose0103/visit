<template>
	<view class="">
		<!-- <view class="title" :style="{ lineHeight: refreshSize < 80 ? 80 : refreshSize + 'rpx' }" v-if="hasTop">标题</view> -->

		<scroll
			id="scroll"
			:requesting="requesting"
			:empty-show="emptyShow"
			:end="end"
			:listCount="listCount"
			:has-top="hasTop"
			:refresh-size="refreshSize"
			:bottom-size="bottomSize"
			:color="color"
			@refresh="refresh"
			@more="more"
		>
			<view class="cells">
				<view class="cell" v-for="(item, index) in listData" :key="index">
					<view class="cell__hd"><image mode="aspectFill" :src="item.images" /></view>
					<view class="cell__bd">
						<view class="name">{{ item.title }}</view>
						<view class="des">{{ item.description }}</view>
					</view>
				</view>
			</view>
		</scroll>

		<view :class="['control-panel', isIphoneX ? 'isX' : '']" :style="{ height: bottomSize + 'rpx' }">
			<view class="panel-item">
				<view class="panel-item__hd">refresh-size:</view>
				<view class="panel-item__bd"><slider @changing="refreshChange" :value="refreshSize" show-value :min="80" :max="200" :step="10" /></view>
			</view>

			<view class="panel-item">
				<view class="panel-item__hd">bottom-size:</view>
				<view class="panel-item__bd"><slider @changing="bottomChange" :value="bottomSize" show-value :min="250" :max="400" :step="10" /></view>
			</view>

			<view class="panel-item">
				<view class="panel-item__hd">has-top:</view>
				<view class="panel-item__bd"><switch :checked="hasTop" @change="hasTopChange" /></view>

				<view class="panel-item__hd">空列表:</view>
				<view class="panel-item__bd"><switch :checked="empty" @change="emptyChange" /></view>
			</view>

			<view class="panel-item">
				<view class="panel-item__hd">color:</view>
				<view class="panel-item__bd">
					<radio-group class="radio-group" @change="radioChange">
						<label class="radio" v-for="(item, index) in items" :key="index">
							<radio :value="item.value" :checked="item.checked" />
							{{ item.name }}
						</label>
					</radio-group>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
const app = getApp()
let pageStart = 0
let pageSize = 15

let testData = [
	{
		title: '这个绝望的世界没有存在的价值，所剩的只有痛楚',
		description: '思念、愿望什么的都是一场空，被这种虚幻的东西绊住脚，什么都做不到',
		images: '/static/img/swipe/1.png'
	},
	{
		title: '我早已闭上了双眼，我的目的，只有在黑暗中才能实现',
		description: '有太多的羁绊只会让自己迷惘，强烈的想法和珍惜的思念，只会让自己变弱',
		images: '/static/img/swipe/2.png'
	},
	{
		title: '感受痛苦吧，体验痛苦吧，接受痛苦吧，了解痛苦吧。不知道痛苦的人是不会知道什么是和平',
		description: '但我已经在无限存在的痛苦之中，有了超越凡人的成长。从凡人化为神',
		images: '/static/img/swipe/3.png'
	},
	{
		title: '我决定了 从今天起 我要选择一条不会让自己后悔的路 我要创造出属于自己的忍道 ',
		description: '我才不要在这种时候放弃,即使当不成中忍,我也会通过其他的途径成为火影的,这就是我的忍道',
		images: '/static/img/swipe/4.png'
	},
	{
		title: '为什么你会这么弱？就是因为你对我的仇恨...还不够深...',
		description: '你没有杀的价值...愚蠢的弟弟啊...想要杀死我的话...仇恨吧！憎恨吧！然后丑陋地活下去吧！逃吧 逃吧...然后苟且偷生下去吧！',
		images: '/static/img/swipe/5.png'
	},
	{
		title: '对于忍者而言怎样活着无所谓，怎样死去才是最重要的...',
		description: '所谓的忍者就是忍人所不能忍，忍受不了饿肚子，而沦落为盗贼的人，根本不能称之为忍者',
		images: '/static/img/swipe/6.png'
	},
	{
		title: '在这世上，有光的地方就必定有黑暗，所谓的胜者，也就是相对败者而言',
		description: '若以一己之思念要维持和平，必会招致战争，为了守护爱，变回孕育出恨。此间因果，是无法斩断的。现实就是如此',
		images: '/static/img/swipe/7.png'
	},
	{
		title: '世界上...只有没有实力的人,才整天希望别人赞赏...',
		description: '很不巧的是我只有一个人，你说的那些家伙们已经一个都没有了，已经??全部被杀死了',
		images: '/static/img/swipe/8.png'
	},
	{
		title: '千代婆婆，父亲大人和母亲大人回来了吗？？？',
		description: '明明剩下的只有痛苦了，既然你这么想活命，我就方你一条生路好了。不过，你中的毒不出三日就会要了你的命',
		images: '/static/img/swipe/9.png'
	},
	{
		title: '艺术就是爆炸！！~~ 嗯 ~~ 芸术は爆発します！',
		description: '我的艺术就是爆炸那一瞬，和蝎那种让人吃惊的人偶喜剧从根本上就是不同的！',
		images: '/static/img/swipe/10.png'
	}
]

import Scroll from '@/components/scroll/index'

export default {
	components: {
		scroll: Scroll
	},
	data() {
		return {
			isIphoneX: app.globalData.isIphoneX,
			requesting: false,
			end: false,
			emptyShow: false,
			page: pageStart,
			listData: [],
			hasTop: true,
			refreshSize: 90,
			bottomSize: 350,
			color: '#3F82FD',
			items: [{ name: '蓝', value: '#3F82FD', checked: 'true' }, { name: '红', value: '#ff4158' }],
			empty: false
		}
	},
	computed: {
		listCount() {
			return this.listData.length
		}
	},
	onLoad() {
		this.getList('refresh', pageStart)
	},
	methods: {
		hasTopChange(e) {
			this.hasTop = e.detail.value
		},
		refreshChange(e) {
			this.refreshSize = e.detail.value
		},
		bottomChange(e) {
			this.bottomSize = e.detail.value
		},
		radioChange(e) {
			this.color = e.detail.value
		},
		emptyChange(e) {
			if (e.detail.value) {
				this.listData = []
				this.emptyShow = true
				this.end = true
			} else {
				this.listData = testData
				this.emptyShow = false
				this.end = false
			}
		},
		getList(type, currentPage) {
			this.requesting = true

			uni.showNavigationBarLoading()

			setTimeout(() => {
				this.requesting = false

				uni.hideNavigationBarLoading()

				if (type === 'refresh') {
					this.listData = testData
					this.page = currentPage + 1
				} else {
					this.listData = this.listData.concat(testData)
					this.page = currentPage + 1
					this.end = false
				}
			}, 1000)
		},
		// 刷新数据
		refresh() {
			this.getList('refresh', pageStart)
			this.empty = false
		},
		// 加载更多
		more() {
			this.getList('more', this.page)
		}
	}
}
</script>

<style lang="scss">
@import '~@/static/css/variables';

$top-height: 90rpx;

.title {
	position: fixed;
	left: 0;
	top: 0;
	/* #ifdef H5 */
	top: var(--window-top);
	/* #endif */
	z-index: 99;
	width: 100%;
	background-color: #ffffff;
	line-height: 90rpx;
	text-align: center;
	font-weight: bold;
	box-shadow: $shadow;
}

.cells {
	background: #ffffff;
	margin-top: 20rpx;
}

.cell {
	display: flex;
	padding: 20rpx;

	&:not(:last-child) {
		border-bottom: 1rpx solid $lineColor;
	}

	&__hd {
		font-size: 0;

		image {
			width: 160rpx;
			height: 160rpx;
			margin-right: 20rpx;
			border-radius: 12rpx;
		}
	}

	&__bd {
		flex: 1;

		.name {
			@include line(2);
			font-size: 28rpx;
			margin-bottom: 12rpx;
		}

		.des {
			@include line(2);
			color: $mainBlack2;
			font-size: 24rpx;
		}
	}
}

.control-panel {
	border-top: 1rpx solid $lineColor;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 12213;
	background: #ffffff;
	padding: 20rpx;
	box-sizing: border-box;

	&.isX {
		padding-bottom: 60rpx;
	}
}

.panel-item {
	display: flex;
	align-items: center;

	&_hd {
	}

	&__bd {
		flex: 1;
	}
}
</style>
