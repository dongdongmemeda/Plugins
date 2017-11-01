/**
 *  author: caidong
 *  createdOn: 2017/11/1
 *  desc: vue的动态打字插件
 */

// import JianLi from './JianLi.vue' 
export default {
	install(Vue, option){
		// const VueJianLi = Vue.extend(JianLi)
		// let jian = null
		// function $jian(){
		// 	return promise((resolve, reject)=>{
		// 		if(!jian){
		// 			jian = new VueJianLi()
		// 			jian.$mount()
		// 			document.querySelector(option.app || 'body').appendChild(jian.$el)
		// 		}
		// 		jian.show()
		// 		resolve()
		// 	})
		// }
		Vue.mixin({
			created: function(){
				console.log('插件开始加载')
			}
		})
	}
}