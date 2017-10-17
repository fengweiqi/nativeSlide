(function() {
	HTMLElement.prototype.getStyle = function(prop) {
		if (this.currentStyle)
			return this.currentStyle[prop]; // ie 
		else
			return document.defaultView.getComputedStyle(this, null)[prop]; // 非ie 
	}

	HTMLElement.prototype.getElementsByClassName = function(className) {

		var elArr = [];
		for (var i = 0;i < this.childNodes.length;i++) {
			if (this.childNodes[i].nodeType == 1) {
				var classReg = new RegExp("(^|\\s)" + className + "(\\s|$)");
				if (classReg.test(this.childNodes[i].className)) {
					elArr.push(this.childNodes[i]);
				}
			}
		}
		return elArr;
	}

	HTMLElement.prototype.removeClass = function(className) {

		var classReg = new RegExp("(^|\\s)" + className + "(\\s|$)");

		this.className = this.className.replace(classReg,' ');
		
	}

	HTMLElement.prototype.addClass = function(className) {

		

		this.className += ' '+className;
		
	}

	Object.assign = function() {
		var o = {};
		for (var i = 0; i < arguments.length; i++) {

			for (var j in arguments[i]) {
				if (arguments[i].hasOwnProperty(j)) {
					o[j] = arguments[i][j];
				}

			}
		}
		return o;
	}
	//返回第一个匹配元素索引
	Array.prototype.index = function(el){

		var index;

		for(var i=0;i<this.length;i++){

			if(this[i]==el){
				
				index = i;
				break;

			}
		}

		return index;
	}
})();