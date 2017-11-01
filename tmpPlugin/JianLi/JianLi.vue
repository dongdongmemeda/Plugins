<template>
	<pre class="contain">
		<span id="show" v-html="html"></span>
		<span id="timer" v-bind:style="{visibility: isVisible}">|</span>
	</pre>
</template>
<script>
export default {
	data (){
		return {
			html: '',
			test: ['A', 'I', 'C', 'D', 'P'],
			interval: null,
			isVisible: 'visible',
			isTrans: false
		}
	},
	props: ['string'],
	mounted: function(){
		//  竖线‘|’不断跳动
		this.interval = setInterval(function(){
			this.isVisible = this.isVisible == 'visible'?'hidden':'visible'
		}, 300)
		//  初始化的动作，延迟1.5s开始运行
		setTimeout(function(){
			console.log('props["string"]: ', this.string)
			// this.timeout(this.string.split(''), [], document.getElementById('show'), [])
		}, 1500)
	},
	methods: {
		//  主要运行函数
		timeout: function (arr, dest, el, prev){
			let t = Math.random()*200 | 0 + 100
			if(t>=250){
				t = 700
			}
			setTimeout(function(){
				let d = [...dest]
				if(d[d.length-1]==']' && this.test.includes(d[d.length-2]) || d[d.length-1]=='：'){
					this.isTrans = true
				}
				if(this.isTrans){
					this.html = [...prev, ...dest].join('')
					.replace(/(\[I)/g, '<i class="gray">//')
					.replace(/(I\])/g, '</i>')
					.replace(/(\[P)/g, '<p>')
					.replace(/(P\])/g, '</p>')
					.replace(/(\[A)/g, '<a class="blue" href="https://github.com/dongdongmemeda">')
					.replace(/(A\])/g, '</a>')
					.replace(/(\[D)/g, '<span class="yellow">')
					.replace(/(D\])/g, '</span>')
					.replace(/(\[C)/g, '<style>')
					.replace(/(C\])/g, '</style>')
					.replace(/：/g, '<span class="red">：</span>')
				this.isTrans = false
				dest = this.html.split('')
				}
				if(arr.length != 0){
					let tmp = arr.shift()
					dest.push(tmp)
					arguments.callee(arr, dest, el, prev)
				}else{
					clearInterval(this.interval)
					this.isVisible = 'hidden'
				}
			}, t)
		}
	}
}
</script>
<style>
span{font-size: 28px;}
p{display: inline;}
#timer{font-weight: 800;}
.blue{color: #80c6fc;}
.gray{color: #75715e;}
.gray{color: #75715e;}
.red{color: #f92672;}
.yellow{color: #e6db74;}
.green{color: #a6e22e;}
.sky{color: #66d9ef;}
</style>