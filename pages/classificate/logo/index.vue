<template>
	<view class="mine">
		<header-nav></header-nav>
		<header>
			<view class="kongbai">

			</view>
			<u-row>
				<u-col span="9">
				</u-col>
				<u-col span="3">
					<view class="zhiliao" @click="editInfor()">
						<u-icon name="edit-pen" color="#fff" size="20"></u-icon>
						<view class="bjzl">编辑资料</view>
					</view>
				</u-col>
			</u-row>
			<u-row>
				<u-col span="2">
					<view class="iconfont icon-touxiang-kong" v-if="photoFlag">

					</view>
					<u--image v-else shape="circle" :showLoading="true" src="https://cdn.uviewui.com/uview/album/4.jpg"
						width="55px" height="55px" style="margin-left:7px">
					</u--image>
				</u-col>
				<u-col span="10" style="font-size:12px">
					<text class="informate" @click="toLogo()">
						{{logoStatus}}
					</text>
					<view v-if="photoFlag">
						{{vip}}
					</view>
					<view class="iconfont icon-vip" style="font-size: 12px;color: #f3c02c;" v-else>

					</view>
					<text class="intructe">
						{{beginInfor}}
					</text>
				</u-col>
			</u-row>
			<u-row>
				<u-col textAlign="center" style="font-size:12px" :span="item.span" v-for="(item,index) in logoFans"
					:key="index">
					<view>{{item.number}} <span v-show="item.flag">w</span></view>
					<text>{{item.conts}}</text>
				</u-col>
			</u-row>
		</header>
		<section>
			<u-row>
				<u-col span="3" v-for="(item,index) in contents" textAlign='center' :key="index"
					style="padding-top: 2%;">
					<view :class="item.class" :style="{color:item.color}"></view>
					<text style="font-size: 12px;">{{item.title}}</text>
				</u-col>
			</u-row>
		</section>
		<footer>
			<u-cell-group>
				<u-cell :title="items.title" isLink :url="items.url" v-for="(items, index) in infors" :key="index">
					<u-icon slot="icon" :size="items.size" :name="items.name"></u-icon>
				</u-cell>
			</u-cell-group>
		</footer>
	</view>
</template>

<script>
	import headerNav from '../../components/tabsHeader.vue'
	import store from '../../../store/index.js'
	export default {
		components: {
			headerNav
		},
		data() {
			return {
				beginInfor: '更好的简介,可以让更多的小伙伴记住你',
				photoFlag: true,
				logoStatus: '未登录',
				vip: '未认证',
				logoFans: [{
						span: '1'
					}, {
						span: '2',
						number: 0,
						conts: '获赞',
						flag: true
					},
					{
						span: '3',
						number: 0,
						conts: '粉丝',
						flag: true
					},
					{
						span: '3',
						number: 0,
						conts: '关注',
						flag: false
					},
					{
						span: '2',
						number: 0,
						conts: '收藏',
						flag: true
					},
					{
						span: '1'
					}
				],
				contents: [{
						class: 'iconfont icon-wuliudingdan',
						title: '订单',
						color: '#83c4f9'
					},
					{
						class: 'iconfont icon-bangbandaiban',
						title: '代办',
						color: '#605ff6'
					}, {
						class: 'iconfont icon-zijinguiji',
						title: '资金',
						color: '#6a5bab'
					}, {
						class: 'iconfont icon-xiezuozhuanxiangke',
						title: '签到',
						color: '#b38b42'
					}
				],
				infors: [{
					url: '/pages/details/reading/index',
					title: '阅读过的文章',
					name: 'twitter-circle-fill',
					size: '20'
				}, {
					url: '/pages/details/integral/index',
					title: '我的积分',
					name: 'tags',
					size: '20'
				}, {
					url: '/pages/details/question/index',
					title: '问题与反馈',
					name: 'question-circle',
					size: '16'
				}, {
					url: '/pages/details/setting/index',
					title: '设置',
					name: 'setting',
					size: '16'
				}, {
					url: '/pages/details/about/index',
					title: '关于',
					name: 'error-circle',
					size: '16'
				}]
			}
		},
		created() {},
		async mounted() {
			await this.logoMessage()
		},
		methods: {
			async logoMessage() {
				let {
					data,
					code
				} = await this.$https({
					url: 'api/hello',
					method: "get",
				})
				if (code != 200) return
				let {
					attention,
					collect,
					fans,
					praised
				} = data
				this.logoFans.forEach((item, index) => {
					switch (index) {
						case 1:
							item.number = praised
							break;
						case 2:
							item.number = fans
							break;
						case 3:
							item.number = attention
							break;
						case 4:
							item.number = collect
							break;
						default:
							break;
					}
				})
			},
			navigateHandle() {
				let {
					name,
					phone
				} = store.getters.userData
				this.logoStatus = name
				if (phone) return this.photoFlag = !this.photoFlag
			},

			navigateHandles() {
				let {
					intro
				} = store.getters.editUserData
				this.beginInfor = intro
			},
			//switchTab只打开bar页面
			//navigateTo, redirectTo 只能打开非 tabBar 页面
			//reLaunch 可以打开任意页面
			editInfor() {
				uni.navigateTo({
					url: '/pages/details/authority/index'
				})
			},

			toLogo() {
				uni.navigateTo({
					url: '/pages/details/informate/index'
				})
			},
		}
	}
</script>
<style lang="scss">
	.mine {
		height: 100%;
		width: 100%;

		header {
			height: 400rpx;
			// 转图片可以使用image-tools工具
			background-image: url('../../../static/images/mine.jpg');
			background-size: 100% 100%;
			color: #fff;

			.kongbai {
				height: 32%;
			}

			.iconfont {
				font-size: 65px;
			}

			.zhiliao {
				width: 100%;
				display: flex;

				.bjzl {
					font-size: 12px;
				}
			}

			.intructe {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 60%;
			}
		}

		section {
			height: 8%;
			background: #fff;
			margin-top: -10px;
			border-top-left-radius: 5px;
			border-top-right-radius: 5px;

			.iconfont {
				font-size: 30px;
			}
		}

		footer {
			height: auto;
			margin-top: 2%;
			background-color: #fff;

		}
	}
</style>
