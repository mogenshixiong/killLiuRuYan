<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area font-blod">
			<text class="title">{{title}}</text>
		</view>
		
		<view class="flex items-center justify-content">
			<view>1</view>
			<view>2</view>
			<view>3</view>
			<view>4</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onReady } from '@dcloudio/uni-app'

onReady(() => {
	console.log('page index is ready')
})
		
const title = ref('Hello111222')
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
