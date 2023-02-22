<template>
	<view>
		<view class="wx_height" :style="{height:wx_height}">
		</view>
	</view>
</template>

<script>
	import store from '../../store/index.js'
	export default{
		data(){
			return{
				wx_height: 0,
			}
		},
		mounted() {
			this.wx_height = `${store.getters.statusBarHeight}px`
		}
	}
</script>

<style>
</style>