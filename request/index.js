export default {
	request(options){
		return new Promise((resolve,reject)=>{
			uni.request({
				...options,
				success:res=>{
					if(options.native){
						resolve(res)
					}
					if(res.statusCode === 200){
						resolve(res.data)
					}else{
						reject(res)
					}
				}
			})
			
		})
	},
	get(url,data={},options={}){
		options.url = url;
		options.data = data;
		options.method = 'get';
		return this.request(options)
	},
	post(url,data={},options={}){
		options.url = url;
		options.data = data;
		options.method = 'post';
		return this.request(options)
	}
}