1、uniapp中使用switchTab非bar和bar页面切换的时候传参不行，通过vuex传递参数，
   非bar页面的switchTab在success方法中加上page.navigateHandle();方法，然后在bar页面上navigateHandle获取数据。
2、配置uniapp的tabsBar主要是在pages.json里面进行。
3、在APP.vue里面wx.getSystemInfo()方法来获取每个设备的高度，设置成一个header的公用组件。
4、使用iconfont的时候在页面上引用上iconfont的css,全局引入放在app.vue里面,
   注意在使用iconfont引入的时候iconfont.css文件需要修改路径,放在static静态资源里面。
5、onLoad:监听页面加载，接受上个页面传递的参数。onShow：监听页面显示，只要页面出现就会触发。onReady：监听页面初始化渲染完成。onHide:监听页面隐藏。
   onUnload：监听页面卸载。
6、ignore忽略文件：新建.gitignore文件（执行命令touch .gitignore）第二步将ignore文件使用记事本打开将需要忽略的名字添加上去，第三步提交上去（如果已经提交了unpackage的话执行命令git rm -r --cached unpackage）   