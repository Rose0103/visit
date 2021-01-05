<template>
	<view :class="['side-nav',{'left':direction == 'left'},{'right':direction == 'right'},{'show':show}]" >
		<view class="item" > 
			<view class="body" >
				<slot />
			</view>
		</view>
		<view class="item"  style="margin-top: 120rpx;">
			<view class="item.two" >
				<button class='cancel' @tap="cancel">取消</button>
				<button class='confirm'  @tap="ensure">搜索</button>
			</view>
				
		</view>	
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex';
	export default {
		props: {
			show: {
				type: Boolean,
				default: false
			},
			//方向  left：右往左滑动  right:左往右边滑动
			direction: {
				type: String,
				default: 'left'
			}
		},
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {
			cancel() {
				this.$emit('cancel');
			},
			ensure() {
				this.$emit('ensure');
			}
		}

	}
</script>

<style lang="less">
	/* flex */
	
	.item{
		display: flex;
		flex-wrap: wrap;
		margin: auto;
	}
	
	button{
		width:412rpx;
		height:70rpx;
		border-radius:40rpx;
		font-size: 30rpx;
		line-height: 70rpx;
		color: #FFFFFF;
		text-align: center;
	}
	.confirm{
		width:412rpx;
		background: #FFB600;
		margin-left: 18%;
		
	}
	.cancel{
		background: #dcdfe6;
		font-size: 36rpx;
	}
	

	.side-nav {
		z-index: 999;
		position: fixed;
		left: 0;
		top: -30rpx;
		height: 100%;
		width: 83%;
		background-color: #fff;
		overflow-x: hidden;
		transition: 0.8s;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 5px #888888;
		margin-top: 30rpx;
		padding-top: 50rpx;
		
		
		&.left{
			transform: translateX(760upx);
			&.show {
				transform: translateX(150upx);
			}
			
		}
		
		&.right{
			transform: translateX(-760upx);
			&.show {
				transform: translateX(0);
			}
			
		}

	
		.body {
		}


		// .item:nth-of-type(1) {
		// 	height: 0;
		// }

		// .item:nth-of-type(1) {
		// 	flex: 1 0 auto;
		// }

	
	}



	/* #ifdef H5 */
	// .side-nav {
	// 	padding-top: 44px;
	// 	box-sizing: border-box;
	// }

	/* #endif */
</style>
