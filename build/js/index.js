var pcObj=$(".pc").eq(0);
$(function(){
	var CLICK_EV =('createTouch' in document)|| ("ontouchstart" in window) ? "touchend": "click",
		moveing=false;//翻屏
	setRem();
	/*禁止页面默认事件*/
	function touchHandlerDummy(e){moveing=true;}
	function touchHandlerStart(e){moveing=false;}
	$(document).bind("touchstart",touchHandlerStart);
	$(document).bind("touchmove",touchHandlerDummy);
	$(window).resize(function(){
		setRem();
	});
	if($("#slider").length>0){
		var slider=new slidingbox({
			id:"slider",
			effect:3,//1 左右 2 上下 3 渐变.
			disRadio:0.1,//触发翻屏的最小移动比例
			duration:500,//动画时间
			autoplay:true,//自动播放
			touchEvent:false,
			before:function(){
				$(".slider_nav a").eq(this.index).addClass("cur").siblings(".cur").removeClass("cur");
			},
			after:function(){}
		});
		$(".slider_nav a").bind(CLICK_EV,function(){
			if(!moveing){
				var index=$(this).index();
				slider.slide(index);
			}
		});
	}
	$(".arc_nav li").bind(CLICK_EV,function(){//最新资讯
		if(!moveing){
			var index=$(this).index();
			$(this).addClass("cur").siblings(".cur").removeClass("cur");
			$(".arc_c ul").eq(index).addClass("cur").siblings(".cur").removeClass("cur");
		}
	});
	$(".gl_down").bind(CLICK_EV,function(){//下载游戏
		if(!moveing){
			$(this).parents(".gl_r").siblings(".gameHot_code").addClass("cur");
		}
	});
	$(".gl_c").bind("mouseleave",function(){
		$(this).find(".gameHot_code").removeClass("cur");
	});
	$(".favorite").bind(CLICK_EV,function(e){//添加收藏
		if(!moveing){
			e=e?e:event;
			if ( e && e.preventDefault ){
				e.preventDefault();
			}else{
				e.returnValue = false;
		    }
			add_favorite(this);
		}
	});
	$(".setHome").bind(CLICK_EV,function(e){//设置首页
		if(!moveing){
			e=e?e:event;
			if ( e && e.preventDefault ){
				e.preventDefault();
			}else{
				e.returnValue = false;
		    }
			SetHome(this);
		}
	});
});
function add_favorite(a, title, url) {
	url = url || a.href;
	title = title || a.title;
	try {
		window.external.addFavorite(url, title);
	} catch(e) {
		try {
			window.sidebar.addPanel(title, url, "");
		} catch(e) {
			if (/Opera/.test(window.navigator.userAgent)) {
				a.rel = "sidebar";
				a.href = url;
				return true;
			}
			alert("加入收藏失败，请使用 Ctrl+D 进行添加");
		}
	}
	return false;
}
function SetHome(obj,url){
	url = url || obj.href;
	try{
        obj.style.behavior='url(#default#homepage)';
        obj.setHomePage(url);
    }catch(e){
        if(window.netscape){
            try{
                netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
            }catch(e){
                alert("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
            }
        }else{
            alert("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【"+url+"】设置为首页。");
        }
    }
}
function setRem(){
	var win_width=document.documentElement.clientWidth||window.innerWidth,
		psSize=win_width/800;
	if(!isPC()){
		FS=(psSize>1?1:psSize) * 100;
		document.documentElement.style.fontSize=FS + 'px';
	}else{
		document.documentElement.style.fontSize='';
	}
}
function isPC(){ 
	return pcObj.is(":visible");
}