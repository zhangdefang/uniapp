module.exports = {
	devServer:{
		port:'8080',
		disableHostCheck:true,
		proxy:{
			'/api':{
				target:'http://localhost:3000',
				changeOrigin:true,
				pathRewrite:{
					'^/api': ''
				}
			}
		}
	}
}