import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		statusBarHeight: 0,
		userData: {},
		editUserData:{},
	},
	getters: {
		statusBarHeight: state => {
			return state.statusBarHeight
		},
		userData: state => {
			return state.userData
		},
		editUserData: state=>{
			return state.editUserData
		}
	},
	mutations: {
		setStatusBarHeight(state, num) {
			state.statusBarHeight = num;
		},
		setUserData(state,data){
			state.userData = data;
		},
		setEditUser(state,data){
			state.editUserData = data;
		}
	},
	actions: {

	}
})
export default store
