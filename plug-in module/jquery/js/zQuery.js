// 绑定事件的兼容性函数
function bind(obj,evType,evFn){
	if(obj.addEventListener){
		obj.addEventListener(evType,evFn,false);
	}else if(obj.attachEvent){
		obj.attachEvent("on"+evType,evFn);
	}else {
		// 传统绑定方式
		obj['on'+evType] = evFn;
	}
	
}
function getByClass(myClass,parent){
	var arr = [];
	parent = parent || document;
	var allEles = parent.getElementsByTagName("*");
	for(var i = 0; i < allEles.length; i++) {
		
		var arrClassNames = allEles[i].className.split(" ");
		for(var j = 0; j < arrClassNames.length; j++) {
			if(arrClassNames[j] == myClass){
				arr.push(allEles[i]);
				break;
			}
		}
	}
	return arr;
}


// 封装一个获取兼容性样式的函数
function getStyle(obj,attr) {
	return obj.currentStyle? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}

function ZaG(arg){
	
	return new zQuery(arg); // 返回zQuery对象
}

function zQuery(arg){
	// 建立一个数组 用来存获取到的元素
	this.eles = [];
	
	
	// 通过判断类型 来区分是获取元素还是入口函数
	if(typeof arg =="function") {
		// 说明是入口函数   注意 jq里面的入口函数 不会发生覆盖  另外入口函数 当dom结构渲染完毕就可以触发
		// window.unload 不用他      "DOMContentLoaded"做绑定
		// addEventListener  attachEvent
		
		bind(window,"DOMContentLoaded",arg);
	}else if(typeof arg =="string"){  // 如果是字符串类型那么意味着你要获取元素
		// 获取元素要细分
//		"#div" ".div" "div"
		switch (arg.charAt(0)) {
			case "#":
			this.eles.push(document.getElementById(arg.substring(1)));
			break;
			case ".":
				this.eles =	getByClass(arg.slice(1));
			break;
			default :
				this.eles = document.getElementsByTagName(arg);
			break;
		}
	}
	
	
}

zQuery.prototype.css = function(attr,value){
	// 如果要是只传一个参数 读取 或者 {}设置
	
	if(arguments.length == 1) {
		
		if(typeof arguments[0] == 'object') {
			//是json格式
			
			for(var k in arguments[0]){
				
				for(var i = 0; i < this.eles.length; i++) {
					
					this.eles[i].style[k] = arguments[0][k];
				}
				
			}
			
		}else{
			// 读取 一堆元素 只读取第一个  getStyle()
//			this.eles[0].style[attr]
			return getStyle(this.eles[0],attr)
		}
		
		
	}else if(arguments.length==2) {
		// 单条设置 全部设置
		for(var i = 0; i < this.eles.length; i++) {
			
			this.eles[i].style[attr] = value;
			
		}
		
	}
	return this; // 为了链式操作
}


zQuery.prototype.html = function(str){
	// 如果不传参数
	if(str) {
		// 全部设置
		for(var i = 0; i < this.eles.length; i++) {
			
			this.eles[i].innerHTML = str;
			
		}
		
	}else {
		// 读取
		return this.eles[0].innerHTML;
		
	}
	
	return this;
	
}

zQuery.prototype.click = function(fn){
	for(var i = 0; i < this.eles.length; i++) {
		
		bind(this.eles[i],"click",fn);
		
	}
}
zQuery.prototype.mouseover = function(fn){
	for(var i = 0; i < this.eles.length; i++) {
		
		bind(this.eles[i],"mouseover",fn);
		
	}
}

//eq()
//
//text innerText
