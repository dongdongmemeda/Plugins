<template>
	<pre class="contain">
		<span id="show" v-html="html"></span>
		<span id="timer" :style="{visibility: isVisible}">|</span>
	</pre>
</template>
<script>
export default {
	props: ["article"],
	data (){
		return {
			html: '',
			test: ['A', 'I', 'C', 'D', 'P'],
			interval: null,
			isVisible: 'visible',
			isTrans: false
		}
	},
	mounted: function(){
		const _ = this
		//  竖线‘|’不断跳动
		this.interval = setInterval(function(){
			_.isVisible = _.isVisible == 'visible'?'hidden':'visible'
		}, 300)
		//  初始化的动作，延迟1.5s开始运行
		setTimeout(function(){
			_.timeout(_.article.split(''), [])
		}, 1500)
	},
	methods: {
		//  主要运行函数
		timeout: function (arr, dest){
			const _ = this, t = 40
			setTimeout(function(){
				let d = [...dest]
				if(d[d.length-1]==']' && _.test.includes(d[d.length-2]) || d[d.length-1]=='：'){
					_.isTrans = true
				}
				_.html = dest.join('')
				if(_.isTrans){
					_.html = dest.join('')
					.replace(/(\[I)/g, '<i class="gray">//').replace(/(I\])/g, '</i>')
					.replace(/(\[P)/g, '<p>').replace(/(P\])/g, '</p>')
					.replace(/(\[A)/g, '<a class="blue" href="https://github.com/dongdongmemeda">').replace(/(A\])/g, '</a>')
					.replace(/(\[D)/g, '<span class="yellow">').replace(/(D\])/g, '</span>')
					.replace(/(\[C)/g, '<style>').replace(/(C\])/g, '</style>')
					.replace(/：/g, '<span class="red">：</span>')
				_.isTrans = false
				dest = _.html.split('')
				}
				if(arr.length != 0){
					let tmp = arr.shift()
					dest.push(tmp)
					_.timeout(arr, dest)
				}else{
					clearInterval(_.interval)
					_.isVisible = 'hidden'
				}
			}, t)
		}
	}
}
</script>
<style>
.contain{margin: 0;}
p{display: inline;}
span{font-size: 28px;}
#timer{font-weight: 800;}
.blue{color: #80c6fc;}
.gray{color: #75715e;}
.red{color: #f92672;}
.yellow{color: #e6db74;}
</style>