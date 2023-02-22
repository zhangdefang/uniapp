<template>
	<view class="content">
		<header-nav></header-nav>
		<u-row>
			<u-col span="10">
				<view class="title">
					消息
				</view>
			</u-col>
			<u-col span="2">
				<view class="zhiliao">
					<u-icon name="chat" size="18"></u-icon>
					<view class="bjzl">聊天</view>
				</view>
			</u-col>
		</u-row>
		<view class="catory">
			<view class="catory_items" v-for="(item,index) in catories" :key="index" @tap="messHref(item)">
				<view class="imgs">
					<u-avatar :src="item.imgs" size="45" ></u-avatar>
					<u-badge max="99" :type="item.type" shape="circle" :value="item.value"></u-badge>
				</view>
				<view class="infors">
					<view class="infors_header">
						{{item.headerMessage}}
					</view>
					<view class="infors_infor">
						{{item.inforsMessage}}
					</view>
				</view>
				<view class="times">
					<view class="times_all">
						{{item.time}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headerNav from '../../components/tabsHeader.vue'
	export default {
		components:{
			headerNav
		},
		data() {
			return {
				catories: [{
					title: '东',
					type: 'error',
					value: 12,
					headerMessage: '系统通知',
					inforsMessage: '快帮主正式版，即将上线!',
					time: '当前',
					imgs:'https://cdn.uviewui.com/uview/album/1.jpg'
				}, {
					title: '南',
					type: 'warning',
					value: 100,
					headerMessage: '活动推送',
					inforsMessage: '快帮主正式版，即将上线!',
					time: '2023-01-18',
					imgs:'https://cdn.uviewui.com/uview/album/2.jpg'
				}, {
					title: '西',
					type: 'primary',
					value: 41,
					headerMessage: '快帮助手',
					inforsMessage: '快帮主正式版，即将上线!',
					time: '30分钟前',
					imgs:'https://cdn.uviewui.com/uview/album/3.jpg'
				}, {
					title: '豆豆',
					type: 'success',
					value: 1,
					headerMessage: '豆豆',
					inforsMessage: '快帮主正式版，即将上线!',
					time: '2023-01-01',
					imgs:'https://cdn.uviewui.com/uview/album/4.jpg'
				}, {
					title: '豆爸',
					type: 'success',
					value: 1,
					headerMessage: '豆爸',
					inforsMessage: '快帮主正式版，即将上线!',
					time: '2023-01-01',
					imgs:'https://cdn.uviewui.com/uview/album/5.jpg'
				}, {
					title: '豆妈',
					type: 'success',
					value: 1,
					headerMessage: '豆妈',
					inforsMessage: '快帮主正式版，即将上线!',
					time: '2023-01-01',
					imgs:'https://cdn.uviewui.com/uview/album/6.jpg'
				}]
			}
		},
		methods: {
			messHref(item) {
				uni.navigateTo({
					url: '/pages/details/chat/index',
					events: {
						acceptDataFromOpenedPage: function(data) {
							console.log(data)
						},
						someEvent: function(data) {
							console.log(data)
						}
					},
					success: function(res) {
						res.eventChannel.emit('acceptDataFromOpenerPage', item)
					}
				})

			},
		}
	}
</script>

<style lang="scss">
	.content {
		height: calc(100% - 10px);
		width: 100%;
		padding-top: 10px;

		.title {
			text-align: center;
			padding-left: 16%;
			font-size: 20px;
		}

		.zhiliao {
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 12px;
		}

		.catory {
			padding: 0 10px;

			.catory_items {
				display: flex;
				margin-top: 25px;

				.imgs {
					width: 15%;
					position: relative;

					.u-badge {
						position: absolute;
						top: -7%;
						left: 40%;
					}
				}

				.infors {
					width: 60%;

					.infors_header {
						font-size: 17px;
					}

					.infors_infor {
						color: darkgray;
						padding-top: 3px;
					}
				}

				.times {
					width: 25%;
					color: darkgray;
					line-height: 3;
					text-align: right;
				}
			}
		}
	}
</style>
