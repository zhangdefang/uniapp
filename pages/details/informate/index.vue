<template>
	<view class="u-page">
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="left" :model="model1" ref="form1">
					<u-form-item label="姓名:" prop="userInfo.username" borderBottom ref="item1">
						<u--input v-model="model1.userInfo.username" placeholder="姓名,只能为中文"></u--input>
					</u-form-item>
					<u-form-item label="密码:" prop="userInfo.password" borderBottom ref="item1">
						<u--input v-model="model1.userInfo.password" type="password" placeholder="输入密码"></u--input>
					</u-form-item>
				</u--form>
				<u-button type="primary" text="提交" customStyle="margin-top: 30px" @click="submit"></u-button>
				<u-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '../../../store/index.js'
	export default {
		data() {
			return {
				model1: {
					userInfo: {
						username: '',
						password: ''
					},
				},
				rules: {
					'userInfo.username': [{
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					}, {
						// 此为同步验证，可以直接返回true或者false，如果是异步验证，稍微不同，见下方说明
						validator: (rule, value, callback) => {
							// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
							return uni.$u.test.chinese(value);
						},
						message: "姓名必须为中文",
						// 触发器可以同时用blur和change，二者之间用英文逗号隔开
						trigger: ["change", "blur"],
					}],
					'userInfo.password': {
						type: 'string',
						required: true,
						message: '请输入密码',
						trigger: ['blur', 'change']
					}
				}
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			async logoIn() {
				// let res = await this.$request({
				// 	url:'',
				// })
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form1.validate().then(async res => {
					let {
						userInfo
					} = this.model1
					if (res) {
						let {
							code,
							data,
							msg
						} = await this.$https({
							url: '/logo',
							method: 'post',
							data: userInfo
						})
						if (!data) return
						store.commit('setUserData', userInfo)
						// redirectTo,switchTab无法
						uni.switchTab({
							url: '/pages/classificate/logo/index',
							success: function(e) {
								var page = getCurrentPages()[0]
								if (page == undefined || page == null) return;
								page.navigateHandle();
							}
						})
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			reset() {
				const validateList = ['userInfo.username']
				this.$refs.form1.resetFields()
				this.$refs.form1.clearValidate()
				setTimeout(() => {
					this.$refs.form1.clearValidate(validateList)
					// 或者使用 this.$refs.form1.clearValidate()
				}, 10)
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		},
	}
</script>

<style lang="scss" scoped>
	.u-page {
		height: 100%;
		padding: 0 10px;
		width: calc(100% - 20px);
	}

	::v-deep .u-line {
		border: 0px !important;
	}
</style>
