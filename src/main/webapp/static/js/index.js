
var Tab = {
	
	option:{
		element_tab_bar:"tab_bar",
		element_main_frame:"main_frame"
	},

	//已打开的Tab 数组
	tabList : new Array(),

	style:{
		tab_selected:"tab_selected",
		tab_close:"tab_close"
	},
	
	//增加Tab
    addTab:function(title,id,url){
		 var _this = this;

		 //判断Tab是否已经打开
    	 if($.inArray(id, _this.tabList)==-1){
			_this.tabList.push(id);

			$("#"+_this.option.element_tab_bar+" li a").removeClass(_this.style.tab_selected);
			
			var add_li = $('<li id="tab_li_'+id+'"><a class="'+_this.style.tab_selected+'" id="'+id+'"><span>' + title + '</span><span  class="'+_this.style.tab_close+'"    onclick="Tab.closeTab('+id+')">×</span></a></li>');
			var add_ifame = $('<iframe name="' + id + '" src="'+RootPath()+"/"+url+'" ></iframe>');
			
			$("#"+_this.option.element_main_frame+" iframe").hide();
			
			$("#"+_this.option.element_tab_bar).append(add_li);
			$("#"+_this.option.element_main_frame).append(add_ifame);
		}else{
			alert("此菜单已经打开");
		}	
     },

	//关闭Tab
	closeTab:function(id){
		 var _this = this;
		
		//从已打开Tab数组中删除需关闭Tab的id
		_this.tabList = $.grep(_this.tabList, function(value) {
			return value != id;
		});

		if($("#tab_li_"+id+" a").hasClass(_this.style.tab_selected)){
			var lastOpenedTabId = _this.tabList[_this.tabList.length-1];
			$("#tab_li_"+lastOpenedTabId +" a").addClass(_this.style.tab_selected);
			$("#"+_this.option.element_main_frame+" iframe[name="+lastOpenedTabId+"]").show();
		}

		$("#"+_this.option.element_main_frame+" iframe[name="+id+"]").remove();
		$("#tab_li_"+id).remove();	
	},

	//Tab事件初始化
	init:function(){
		var _this = this;

		$("#"+_this.option.element_tab_bar).on('click','li a',function(){
			if($(this).hasClass(_this.style.tab_selected)){
				return false;
			}else{
				$("#"+_this.option.element_tab_bar+" li a").removeClass(_this.style.tab_selected);
			    $(this).addClass(_this.style.tab_selected);
				var id = $(this).attr("id");
				$("#"+_this.option.element_main_frame+" iframe").hide();
				$("#"+_this.option.element_main_frame+" iframe[name="+id+"]").show();
			}
		});
	}
}


var Menu = {
	
	init:function(){
		var menusJson=[{"id":"1","title":"系统管理","children":[{"id":"1","title":"系统管理","url":"table.html"}]}];

		

	}

}