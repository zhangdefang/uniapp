/**
 * 封装网络请求
 */

import indexConfig from '../config/index.config.js'

module.exports = (params) => {
	// let url = indexConfig.baseUrl + params.url;					// 线上环境中开启
	let url = "/dpc/" + params.url; // 本地访问时开启
	let method = params.method;
	let header = params.header || {};
	let data = params.data || {};
	// 请求方式 get post
	if (method) {
		method = method.toUpperCase(); // 小写转大写
		if (method == "POST") {
			header = {
				// 'Content-Type': 'application/x-www-form-urlencoded',
				'Access-Control-Allow-Origin': '*'
			};
		}
	}
	//	发起请求 加载动画
	if (!params.hideLoading) {
		uni.showLoading({
			title: "加载中"
		})
	}
	//	发起网络请求
	uni.request({
		url: url,
		method: method || "GET",
		header: header,
		data: data,
		dataType: "json",
		sslVerify: false, //	是否验证ssl证书
		success: res => {
			if (res.statusCode && res.statusCode != 200) {
				//	api错误
				uni.showModal({
					content: res.msg
				})
				return;
			}
			typeof params.success == "function" && params.success(res.data);
			uni.hideLoading()
		},
		fail: err => {
			// console.log(err)
			uni.hideLoading()
			uni.showModal({
				content: err.errMsg
			})
			typeof params.fail == "function" && params.fail(err.data);
		},
		complete: (e) => {
			// console.log("请求完成");
			// uni.hideLoading()
			typeof params.complete == "function" && params.complete(e.data);
			return;
		}
	})
}
