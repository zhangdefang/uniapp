<template>
	<view class="u-page">
		<view class="u-demo-block">
			<view class="u-demo-block__content">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u--form labelPosition="left" :model="model1" ref="form1">
					<u-form-item label="姓名" prop="userInfo.name" borderBottom ref="item1">
						<u--input v-model="model1.userInfo.name" border="none" placeholder="姓名,只能为中文"></u--input>
					</u-form-item>
					<u-form-item label="性别" prop="userInfo.sex" borderBottom @click="showSex = true; hideKeyboard()"
						ref="item1">
						<u--input v-model="model1.userInfo.sex" disabled disabledColor="#ffffff" placeholder="请选择性别"
							border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="生日" prop="userInfo.birthday" borderBottom
						@click="showBirthday = true; hideKeyboard()" ref="item1">
						<u--input v-model="model1.userInfo.birthday" disabled disabledColor="#ffffff"
							placeholder="请选择生日" border="none"></u--input>
						<u-icon slot="right" name="arrow-right"></u-icon>
					</u-form-item>
					<u-form-item label="验证码" prop="code" labelWidth="80" borderBottom>
						<u--input v-model="model1.code" border="none" placeholder="请填写验证码"></u--input>
						<u-button slot="right" @tap="getCode" :text="tips" type="success" size="mini"
							:disabled="disabled1"></u-button>
					</u-form-item>
					<u-form-item label="兴趣爱好" prop="checkboxValue1" borderBottom labelWidth="80" ref="item3">
						<u-checkbox-group v-model="model1.checkboxValue1" shape="square" @change="change">
							<u-checkbox :customStyle="{marginRight: '16px'}" v-for="(item, index) in checkboxList1"
								:key="index" :label="item.name" :name="item.name">
							</u-checkbox>
						</u-checkbox-group>
					</u-form-item>
					<u-form-item label="简介" prop="intro" borderBottom ref="item3">
						<u--textarea placeholder="不低于3个字" v-model="model1.intro" count></u--textarea>
					</u-form-item>

				</u--form>
				<u-button type="primary" text="提交" customStyle="margin-top: 50px" @click="submit"></u-button>
				<u-button type="error" text="重置" customStyle="margin-top: 10px" @click="reset"></u-button>
				<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" description="如果选择保密会报错"
					@close="showSex = false" @select="sexSelect">
				</u-action-sheet>
				<u-code ref="uCode" @change="codeChange" seconds="20" @start="disabled1 = true"
					@end="disabled1 = false"></u-code>
				<u-datetime-picker :show="showBirthday" :value="birthday" mode="date" closeOnClickOverlay
					@confirm="birthdayConfirm" @cancel="birthdayClose" @close="birthdayClose"></u-datetime-picker>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '../../../store/index.js'
	export default {
		data() {
			return {
				fileList1: [],
				disabled1: false,
				tips: '',
				value: '',
				showCalendar: false,
				showBirthday: false,
				model1: {
					userInfo: {
						name: '',
						sex: '',
						birthday: ''
					},
					checkboxValue1: [],
					intro: '',
					code: ''
				},
				showSex: false,
				birthday: Number(new Date()),
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},
					{
						name: '保密',
					},
				],
				rules: {
					'userInfo.name': [{
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
					code: {
						type: 'string',
						required: true,
						len: 4,
						message: '请填写4位验证码',
						trigger: ['blur']
					},
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择男或女',
						trigger: ['blur', 'change']
					},
					checkboxValue1: {
						type: 'array',
						min: 2,
						required: true,
						message: '不能太宅，至少选两项',
						trigger: ['change']
					},
					intro: {
						type: 'string',
						min: 3,
						required: true,
						message: '不低于3个字',
						trigger: ['change']
					},
					'userInfo.birthday': {
						type: 'string',
						required: true,
						message: '请选择生日',
						trigger: ['change']
					},
				},
				checkboxList1: [{
						name: '羽毛球',
						disabled: false
					},
					{
						name: '跑步',
						disabled: false
					},
					{
						name: '爬山',
						disabled: false
					}
				]
			}
		},
		onShow: function() {
			if (store.getters.editUserData.code) {
				this.model1 = store.getters.editUserData
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			this.$refs.form1.setRules(this.rules)
		},
		methods: {
			afterRead(event) {
				this.fileList1.push({
					url: event.file,
					status: 'uploading',
					message: '上传中'
				})
			},
			groupChange(n) {
				// console.log('groupChange', n);
			},
			radioChange(n) {
				// console.log('radioChange', n);
			},
			navigateBack() {
				uni.navigateBack()
			},
			sexSelect(e) {
				this.model1.userInfo.sex = e.name
				this.$refs.form1.validateField('userInfo.sex')
			},
			change(e) {
				// console.log(e);
			},
			formatter(day) {
				const d = new Date()
				let month = d.getMonth() + 1
				const date = d.getDate()
				if (day.month == month && day.day == date + 3) {
					day.bottomInfo = '有优惠'
					day.dot = true
				}
				return day
			},
			calendarConfirm(e) {
				this.showCalendar = false
			},
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				if (this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					setTimeout(() => {
						uni.hideLoading();
						// 这里此提示会被this.start()方法中的提示覆盖
						uni.$u.toast('验证码已发送');
						// 通知验证码组件内部开始倒计时
						this.$refs.uCode.start();
					}, 2000);
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			calendarClose() {
				this.showCalendar = false
			},
			birthdayClose() {
				this.showBirthday = false
				this.$refs.form1.validateField('userInfo.birthday')
			},
			birthdayConfirm(e) {
				this.showBirthday = false
				this.model1.userInfo.birthday = uni.$u.timeFormat(e.value, 'yyyy-mm-dd')
				this.$refs.form1.validateField('userInfo.birthday')
			},
			submit() {
				// 如果有错误，会在catch中返回报错信息数组，校验通过则在then中返回true
				this.$refs.form1.validate().then(res => {
					if (res) {
						store.commit('setEditUser', this.model1);
						uni.switchTab({
							url: '/pages/classificate/logo/index',
							success: function(e) {
								var page = getCurrentPages()[0]
								if (page == undefined || page == null) return;
								page.navigateHandles();
							}
						})
					}
				}).catch(errors => {
					uni.$u.toast('校验失败')
				})
			},
			reset() {
				const validateList = ['userInfo.name', 'userInfo.sex', 'checkboxValue1', 'intro', 'code',
					'userInfo.birthday'
				]
				this.$refs.form1.resetFields()
				this.$refs.form1.clearValidate()
				setTimeout(() => {
					this.$refs.form1.clearValidate(validateList)
					this.model1 = {
						userInfo: {
							name: '',
							sex: '',
							birthday: ''
						},
						checkboxValue1: [],
						intro: '',
						code: ''
					}
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
</style>
