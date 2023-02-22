<script>
	import store from './store/index.js'
	export default {
		onLaunch: function() {
			this.getPhoneHeight()
		},
		onShow: function() {
			// console.log('App Show')
		},
		onHide: function() {
			// console.log('App Hide')
		},
		methods: {
			getPhoneHeight() {
				let that = this;
				wx.getSystemInfo({
					success(res) {
						store.commit('setStatusBarHeight', res.statusBarHeight)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
	@import url("./static/iconfont/iconfont.css");

	page {
		height: 100%;
		background-color: #f8f8f8;
		font-size: 12px;
	}
</style>
