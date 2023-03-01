<template>
	<view class="content">
		<header-nav></header-nav>
		<header>
			<view class="hearder_head">
				<view class="header_map">
					<u-icon name="map" color="#fff"></u-icon>
					<view class="header_title">
						豆子的位置
					</view>
				</view>
				<view class="header_input">
					<u--input placeholder="搜一搜~生活变得更精彩" prefixIcon="search" shape="circle" clearable
						customStyle="background:#fff" style="width:20px">
					</u--input>
				</view>
				<view class="header_fabu">
					<u-icon name="edit-pen" color="#fff" size="18"></u-icon>
					<view class="header_fabu_title">
						发布
					</view>
				</view>
			</view>
			<u-row>
				<u-col span="3" v-for="item in contents" textAlign='center' :key="item.id" style="padding-top: 5%;">
					<view :class="item.class" :style="{color:item.color,fontSize:item.size}"></view>
					<text style="font-size: 12px;" :style="{paddingTop:item.pad}">{{item.title}}</text>
				</u-col>
			</u-row>
		</header>
		<view>
			<u-tabs cancelable='false' @click="itemClick" :list="list4" lineWidth="30" lineColor="#007bfe" :activeStyle="{
			            color: '#007bfe',
			            fontWeight: 'bold',
			            transform: 'scale(1.05)'
			        }" :inactiveStyle="{
			            color: '#606266',
			            transform: 'scale(1)'
			        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
			</u-tabs>
		</view>
		<section>
			<scroll-view scroll-y="true" v-if="flagId === 'first'">
				<u-back-top :scroll-top="scrollTop"></u-back-top>
				<view class="cantory" v-for="(item,index) in content" :key="item.ratio">
					<view class="number">
						<view class="paixu">
							{{index + 1}}
						</view>
						<view class="ratio">
							评分
						</view>
						<view class="retio_number">
							{{item.ratio}}
						</view>
					</view>
					<view class="photos">
						<u--image radius="5px" :showLoading="true" :src="item.src" width="80px" height="80px">
						</u--image>
						<view class="badges" v-if="item.vFlag">
							v
						</view>
					</view>
					<view class="infors">
						<view class="informate" v-for="items in item.infors" :key="item.address">
							<u-icon :name="items.name" size="18" :color="items.color"></u-icon>
							<view class="more_infors">{{items.address}}</view>
						</view>
					</view>
				</view>
			</scroll-view>

			<scroll-view v-if="flagId === 'second'">

			</scroll-view>
		</section>
	</view>
</template>

<script>
	import store from '../../store/index.js'
	import headerNav from '../components/tabsHeader.vue'
	export default {
		components: {
			headerNav
		},
		data() {
			return {
				list4: [{
					name: '排行榜单',
					id: 'first'
				}, {
					name: '热门精选',
					id: 'second'
				}, {
					name: '为您推荐',
					id: 'third'
				}, {
					name: '口碑好评',
					id: 'fourth'
				}, {
					name: '好物分享',
					id: 'five'
				}],
				scrollTop: 0,
				contents: [{
						class: 'iconfont icon-wuliudingdan',
						title: '家装修',
						color: '#fff',
						size: '37px',
						pad: '0px',
						id: '1'
					},
					{
						class: 'iconfont icon-bangbandaiban',
						title: '找工作',
						color: '#fff',
						size: '35px',
						pad: '3px',
						id: '2'
					}, {
						class: 'iconfont icon-zijinguiji',
						title: '拼车团',
						color: '#fff',
						size: '30px',
						pad: '7px',
						id: '3'
					}, {
						class: 'iconfont icon-xiezuozhuanxiangke',
						title: '购物圈',
						color: '#fff',
						size: '30px',
						pad: '7px',
						id: '4'
					}
				],
				content: [{
					ratio: 20.2,
					src: 'https://cdn.uviewui.com/uview/album/1.jpg',
					vFlag: false,
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县半塔镇东晓庄开发区'
					}]
				}, {
					ratio: 50.5,
					src: 'https://cdn.uviewui.com/uview/album/6.jpg',
					vFlag: true,
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 97,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					vFlag: true,
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 96,
					vFlag: true,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 95,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 94,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 93,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 92,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 91,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 12,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 11,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 13,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 14,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 15,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 16,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 17,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 18,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 66,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}, {
					ratio: 9,
					src: 'https://cdn.uviewui.com/uview/album/7.jpg',
					infors: [{
						color: '#1f8cff',
						name: 'account',
						address: '豆豆'
					}, {
						color: '#ffa940',
						name: 'phone',
						address: '132****767'
					}, {
						color: '#c866c9',
						name: 'map',
						address: '安徽省滁州市来安县'
					}]
				}],
				flagId: 'first'
			}
		},
		onLoad() {

		},
		async mounted() {
			await this.request()
		},
		methods: {
			async request() {
				this.$https({
					url: '/api/hello',
					method: "get",
					success: res => {
						console.log(res)
					}
				})
			},
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			itemClick(item) {
				let {
					id
				} = item
				this.flagId = id
			},
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		height: 100%;

		header {
			padding-top: 10px;
			height: calc(17% - 10px);
			width: 100%;
			color: #fff;
			background-image: linear-gradient(to right, #0082ff, #00a5ff, #00baf7);

			.hearder_head {
				display: flex;
				padding: 0 10px;
				width: 100%;

				.header_map {
					width: 12%;
					display: flex;

					.header_title {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding: 10px 0 0 5px;
					}
				}

				.header_input {
					width: 68%;

					.u-input {
						width: 95% !important;
					}
				}

				.header_fabu {
					width: 20%;
					display: flex;
					padding-left: 2%;

					.header_fabu_title {
						padding: 10px 0 0 5px;
					}
				}
			}
		}

		section {
			height: calc(100% - 17%);
			overflow-y: scroll;

			.cantory {
				display: flex;
				height: calc(20% - 15px);
				width: calc(100% - 30px);
				padding: 0 15px;
				padding-top: 15px;

				.number {
					width: 20%;

					.paixu {
						width: 45%;
						height: 30%;
						border-top-right-radius: 16px;
						border-bottom-right-radius: 16px;
						background-color: red;
						text-align: center;
						line-height: 2;
						color: #fff;
						font-weight: 600;
					}

					.ratio {
						font-size: 12px;
						color: darkgray;
						padding-top: 30%;
					}

					.retio_number {
						font-size: 17px;
						font-weight: 600;
					}
				}

				.photos {
					width: 23%;
					position: relative;

					.badges {
						position: absolute;
						right: -6%;
						bottom: 10%;
						border-radius: 50%;
						background: #f9ae3d;
						width: 18px;
						color: #fff;
						text-align: center;
						font-size: 13px;
					}
				}

				.infors {
					width: calc(57% - 8px);
					padding-left: 8px;
					font-size: 15px;

					.informate {
						display: flex;
						padding-top: 3.5%;

						.more_infors {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							width: 90%;
						}
					}
				}
			}

			.cantory:last-child {
				margin-bottom: 35px;
			}
		}
	}
</style>
