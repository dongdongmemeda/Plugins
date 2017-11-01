/**
 *  author: caidong
 *  createdOn: 2017/10/31
 *  desc: vue的js插件
 */

const dong = {}
dong.install = function(Vue, option){
	Vue.mixin({
		created: function (){
			console.log('插件加载')
		}
	})

	//  1.函数实现统计字符串的字符数量，返回对象
	Vue.prototype.countStrNum = function(str){
		return str.split('').reduce((obj, key)=>(obj[key]++ || (obj[key]=1), obj), {})
	}
	//  2.函数实现星级评标,0星到5星，小数四舍五入
	Vue.prototype.playStar = function(num){
		if(0<num && num<5){
			return '★★★★★☆☆☆☆☆'.slice(5-Math.round(num), 10-Math.round(num))
		}
	}
	//  3.函数实现JS对象的深拷贝
	Vue.prototype.deepCopyObj = function(obj){
		return JSON.parse(JSON.stringify(obj))
	}
	//  4.函数实现数组去重
	Vue.prototype.arrDelSame = function(arr){
		return [...new Set(arr)]
	}
	//  5.函数实现长度为len且值都是val的数组
	Vue.prototype.fillArr = function(len, val){
		return Array(len).fill(val)
	}
}

export default dong