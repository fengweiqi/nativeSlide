	(function(){

			function NativeSlide(options){

				this.opt = {
					slideEl:null,//轮播
					slideBoxClassName:'nativeSlide-Box',
					slideItemClassName:'slideItem',
					prevClassName:'prev',
					nextClassName:'next',
					activeClassName:'active',
					ItemSpacing:10,//选项之间间距
					speed:3000,
					loop:true,

				}

				this.opt = Object.assign(this.opt,options);

				this.slideEl = this.opt.slideEl;

				this.slideBox = this.slideEl.getElementsByClassName(this.opt.slideBoxClassName)[0];


				this.slideItem = this.slideBox.getElementsByClassName(this.opt.slideItemClassName);

				this.slideItemWidth = this.slideItem[0].clientWidth;

				this.activeIndex = this.slideItem.index(this.slideBox.getElementsByClassName(this.opt.activeClassName)[0]);

				this.init();
				
			}

			NativeSlide.prototype.init = function(){
				var that=this;


				//初始化样式
				for(var i=0;i<this.slideItem.length;i++){
					this.slideItem[i].style.left = (i-this.activeIndex)*parseInt(this.slideItemWidth)+'px';
				} 

				this.slideEl.getElementsByClassName(this.opt.prevClassName)[0].onclick = function(){
					that.prev();
				};

				this.slideEl.getElementsByClassName(this.opt.nextClassName)[0].onclick = function(){
					that.next();
				};


			}

			NativeSlide.prototype.setActiveClass = function(index){

				this.slideItem[this.activeIndex].removeClass(this.opt.activeClassName);
				this.activeIndex = index;
				this.slideItem[this.activeIndex].addClass(this.opt.activeClassName);

			}



			NativeSlide.prototype.slide = function(index){
				
				this.setActiveClass(index);


				for(var i=0;i<this.slideItem.length;i++){
					this.slideItem[i].animate({
						left:(i-this.activeIndex)*parseInt(this.slideItemWidth)+'px'
					},this.opt.speed,'easeOut',function(){
						console.log('执行完毕');
					});
					
				} 



			}

			NativeSlide.prototype.prev = function(){

				this.activeIndex--;
				if(this.opt.loop){
					this.activeIndex<0?this.activeIndex=this.slideItem.length-1:false;
					console.log(this.activeIndex);

				}else{
					this.activeIndex<0?this.activeIndex=0:false;
				}

				console.log(this.activeIndex);

				this.setActiveClass(this.activeIndex);

				this.slide(this.activeIndex);

				
			}

			NativeSlide.prototype.next = function(){

				this.activeIndex++;
				if(this.opt.loop){
					this.activeIndex>this.slideItem.length-1?this.activeIndex=0:false;
					console.log(this.activeIndex);

				}else{
					this.activeIndex>this.slideItem.length-1?this.activeIndex=this.slideItem.length-1:false;
				}

				console.log(this.activeIndex);

				this.setActiveClass(this.activeIndex);

				this.slide(this.activeIndex);

				
			}

			window.NativeSlide = NativeSlide;
})();