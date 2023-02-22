<template>
	<view class="infore">
		<view class="header">
			<u-icon name="arrow-left" size="20" @click="back()"></u-icon>
			<u-avatar :src="imgs" fontSize="16" size="23" class="photo"></u-avatar>
			<span class="title">
				{{title}}
			</span>
			<view class="buttn">
				<u-button style="width:10%;float: right;" :plain="true" size="small" icon="plus" type="error"
					shape="circle" text="关注"></u-button>
			</view>
		</view>
		<view class="content">
			<view class="time">
				<u-row>
					<u-col span="10">
						<span> {{date}}</span>
					</u-col>
					<u-col span="2">
						<u-icon name="heart-fill" style="padding-left: 40%;" size="20" @click="iconClick('1')" color="red">
						</u-icon>
					</u-col>
				</u-row>
			</view>

			<!-- <u-swiper :autoplay="false" :list="list3" indicator indicatorMode="line" circular></u-swiper> -->
		</view>
		<view class="bottom_evaluation">
			<view class="input">
				<u--input placeholder="拉近彼此的距离~从评论开始" prefixIcon="edit-pen" shape="circle"
					prefixIconStyle="font-size: 22px;color: #909399" class="fix"></u--input>
			</view>
			<u-icon name="heart" size="30" @click="iconClick('2')" style="padding-left:10px;" v-if="iconFlag"></u-icon>
			<u-icon name="heart-fill" size="30" @click="iconClick('1')" color="red" style="padding-left:10px;" v-else>
			</u-icon>
			<u-icon name="star" size="30" style="padding-left:20px" @click="starClick('2')" v-if="starFlag"></u-icon>
			<u-icon name="star-fill" size="30" color="red" @click="starClick('1')" style="padding-left:20px" v-else>
			</u-icon>
		</view>
	</view>
</template>

<script>
	import {
		date
	} from '../common.js'
	import {
		nextTick
	} from "vue"
	export default {
		data() {
			return {
				title: '',
				hrefData: {},
				imgs: '',
				date: date(),
				iconFlag: true,
				starFlag: true,
				list3: [
					'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				],
			}
		},
		onLoad: function(option) {

		},
		watch: {

		},
		created() {},
		mounted() {
			this.getNum()
		},
		methods: {
			getNum() {
				let self = this
				const eventChannel = self.getOpenerEventChannel();
				eventChannel.on('acceptDataFromOpenerPage', function(data) {
					self.hrefData = data
					let {
						headerMessage,
						inforsMessage,
						time,
						title,
						type,
						value,
						imgs
					} = data
					// nextTick进行数据的重新赋值
					self.$nextTick(() => {
						self.title = title
						self.imgs = imgs
					})

				})
			},
			back() {
				uni.navigateBack({
					delta: 1
				});
			},
			iconClick(flag) {
				if (flag === '2') {
					this.iconFlag = false
				} else {
					this.iconFlag = true
				}
			},
			starClick(flag) {
				if (flag === '2') {
					this.starFlag = false
				} else {
					this.starFlag = true
				}
			}
		}

	}
</script>

<style lang="scss" scoped>
	.infore {
		padding-top: 10px;
		height: calc(100% - 10px);
		width: 100%;

		.header {
			display: flex;

			.photo {
				padding-left: 10px
			}

			.title {
				font: 500 16px '微软雅黑';
				padding-left: 20px;
			}

			.buttn {
				width: 75%;
			}
		}

		.content {
			padding: 30px 10px 20px 10px;
		}

		.bottom_evaluation {
			display: flex;
			height: 30px;
			width: calc(100% - 20px);
			position: fixed;
			bottom: 0;
			border-top: 1px solid #dedede;
			padding: 10px;

			.input {
				width: 80%;

				.fix {
					width: 90%;
					height: 20px;
					background: #f2f2f2;
				}
			}
		}
	}
</style>
