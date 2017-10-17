(function(){

	

	
	HTMLElement.prototype.animate = function(styles,speed,easing,callback){

		var opts = {

			styles:null,
			speed:null,
			easing:'linear',
			callback:function(){}
		}

		opts.styles = styles;

		opts.speed = speed;

		if(typeof arguments[2]=='string'){
			opts.easing = arguments[2];
		}else if(typeof arguments[2]=='function'){
			opts.callback = arguments[2];
		}else if(arguments[3]){
			opts.callback = arguments[3];
		}

		var fps = 60;//帧频

		var startTime = Date.now();//动画开始时间

		var startPos = {};

		for(var i in opts.styles){
			startPos[i] = parseFloat(this.getStyle(i));
		}

		var Tween = {
				linear:function(t){return t;},
				easeIn:function(t){return Math.pow(t,3);},
				easeOut:function(t){return 1-Math.pow((1-t),3);},
				easeInOut:function(t){return t-Math.sin(t*2*Math.PI)/(2*Math.PI)}
		}

		var that = this;


		var timer = setInterval(function() {

				var percent = (Date.now()-startTime)/opts.speed;//动画完成度
				
				if(percent<=1){

					for(var i in opts.styles){

						var endPos =parseFloat(opts.styles[i]);//最后状态

						var nowPos = startPos[i]+(endPos-startPos[i])*Tween[opts.easing](percent);//动画执行一帧后状态

						if (i == "opacity") {

       							 that.style.filter = "alpha(opacity : "+(nowPos*100)+" )"; 
        						 that.style.opacity = nowPos; 
        				}else{

        					that.style[i] = nowPos+'px';

        				}
					}

				}else{
					opts.callback();
					clearInterval(timer);
				}

		}, 1000/fps);

	}

	


})();