/********
接收地址栏参数
**********/
function GetQuery(key) {
    var search = location.search.slice(1); //得到get方式提交的查询字符串
    var arr = search.split("&");
    for (var i = 0; i < arr.length; i++) {
        var ar = arr[i].split("=");
        if (ar[0] == key) {
            if (unescape(ar[1]) == 'undefined') {
                return "";
            } else {
                return unescape(ar[1]);
            }
        }
    }
    return "";
}
/*
自动给控件赋值
*/
function SetForm(data,element) {
    try {
        for (var key in data) {
        	var item = $(element +' [name='+key+']');    //$('form1 [name='code']')
        	if(item && item.length>0){
        		var value = $.trim(data[key]).replace(" ", "").replace(/</g, "<").replace(/>/, ">");
                var type = item.attr('type');
                switch (type) {
	                case "checkbox":
	                    if (value == 1) {
	                        item.prop("checked", true);
	                    } else {
	                        //item.removeAttr("checked");
	                    	item.prop("checked",false);
	                    }
	                    break;
	                case "radio":
	                    $("input[name='"+key+"'][value="+value+"]").prop("checked",true);  
	                    break;
	                default:
	                    item.val(value);
	                    break;
	            }
        	}
        }
    } catch (e) {
        alert(e);
    }
}


/*绑定数据字典下拉框
ControlId:控件ID
Code:分类编码
Memo:默认显示
*/
function BindDictSelect(ControlId, TypeCode, Memo) {
    $(ControlId).html("");
    if (!IsNullOrEmpty(Memo)) {
        $(ControlId).append("<option value=''>" + Memo + "</option>");
    }
    AjaxJson('/sys/dict/findDictDetailListByDictTypeCode.action', { dictTypeCode: TypeCode }, function (dictJson) {
        //var itemjson = eval("(" + data + ")");
        $.each(dictJson, function (i) {
        	if(dictJson[i].enable==1){
        		$(ControlId).append($("<option></option>").val(dictJson[i].code).html(dictJson[i].name));
        	}
        });
    });
}

/**
 * 获取字典名称
 * @param TypeCode  字典类型编码
 * @param DetailCode  字典项值
 * @returns {String}
 */
function GetDictDetailName(TypeCode,DetailCode){
	 var name = "";
	 AjaxJsonSync('/sys/dict/findDictDetailByTypeCodeAndDetailCode.action', { dictTypeCode: TypeCode,dictDetailCode: DetailCode }, function (dictDetail) {
		 name = dictDetail.name;
	 });
	 return name;
}

/*
中间加载对话窗
*/
function Loading(bool, text) {
    var ajaxbg = $("#loading_background,#loading");
    if (!!text) {
        $("#loading").css("left", (top.$('body').width() - top.$("#loading").width()) / 2);
        $("#loading span").html(text);
    } else {
        $("#loading").css("left", (top.$('body').width() - top.$("#loading").width()) / 2);
        $("#loading span").html("正在为您加载…");
    }
    if (bool) {
        ajaxbg.show();
    } else {
        ajaxbg.hide();
    }
}

/**
 * 设置未来(全局)的AJAX请求默认选项
 * 主要设置了AJAX请求遇到Session过期的情况
 */
function AjaxSetup(){
	$.ajaxSetup({
		contentType : "application/x-www-form-urlencoded;charset=utf-8",
		complete : function(xhr, textStatus) {
			
			if (xhr.status == 911) 
			{
				//session timeout
				$.MsgBox.Confirm("由于您长时间没有操作, session已过期, 请重新登录",function(){
					var top = getTopWinow();
					top.location = RootPath() + "/";//返回应用首页
					return;
				});
			}
			else if(xhr.status == 912)
			{
				//DSRCM业务异常
				$.MsgBox.Error(xhr.responseText);
			}else if(xhr.status == 500){
				//未知异常
				$.MsgBox.Error("系统异常,请联系管理员!");
			}
		}
	});
}

/**
 * 同步的ajax请求
 * @param url  请求地址
 * @param postData  请求参数
 * @param callBack  回调方法
 */
function AjaxJsonSync(url, postData, callBack) {
    try {
    	Loading(true);
        $.ajax({
            url: RootPath() + url,
            type: "post",
            data: postData,
            dataType: "json",
            async: false,
            success: function (data) {
            	Loading(false);
            	callBack(data);
            },
            error: function (data) {
            	Loading(false);
            	$.MsgBox.Error("系统异常,请联系管理员!");
            }
        });
    } catch (e) {

    }
}

/**
 * 封装的异步ajax请求
 * @param url 请求地址
 * @param postData  请求参数
 * @param callBack  回调方法
 */
function AjaxJson(url, postData, callBack) {
    try {
    	Loading(true);
        $.ajax({
            url: RootPath() + url,
            type: "post",
            data: postData,
            dataType: "json",
            async: false,
            success: function (data) {
            	Loading(false);
            	callBack(data);
            },
            error: function (data) {
            	Loading(false);
            	$.MsgBox.Error("系统异常,请联系管理员!");
            }
        });
    } catch (e) {

    }
}
/*
验证是否为空
*/
function IsNullOrEmpty(str) {
    var isOK = false;
    if (str == undefined || str == "" || str == 'null') {
        isOK = true;
    }
    return isOK;
}
/**
格式化时间显示方式、用法:format="yyyy-MM-dd hh:mm:ss";
*/
formatDate = function (date, format) {
	 if (!date) return;   
	    if (!format) format = "yyyy-MM-dd";   
	    switch(typeof date) {   
	        case "string":   
	            date = new Date(date.replace(/-/, "/"));   
	            break;   
	        case "number":   
	            date = new Date(date);   
	            break;   
	    }    
	    if (!date instanceof Date) return;   
	    var dict = {   
	        "yyyy": date.getFullYear(),   
	        "M": date.getMonth() + 1,   
	        "d": date.getDate(),   
	        "H": date.getHours(),   
	        "m": date.getMinutes(),   
	        "s": date.getSeconds(),   
	        "MM": ("" + (date.getMonth() + 101)).substr(1),   
	        "dd": ("" + (date.getDate() + 100)).substr(1),   
	        "HH": ("" + (date.getHours() + 100)).substr(1),   
	        "mm": ("" + (date.getMinutes() + 100)).substr(1),   
	        "ss": ("" + (date.getSeconds() + 100)).substr(1)   
	    };       
	    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {   
	        return dict[arguments[0]];   
	    });    
};

/**
 * 在页面中任何嵌套层次的窗口中获取顶层窗口
 * @return 当前页面的顶层窗口对象
 */
function getTopWinow(){
    var p = window;
    while(p != p.parent){
        p = p.parent;
    }
    return p;
}


//js获取网站根路径(站点及虚拟目录)
function RootPath() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    
    
   // alert(prePath + postPath);
    return (prePath + postPath);
    
   
    
    //return (prePath);
	//return "/taurus";
}
/**
*获取UUID的算法
*/
function getUUID(){
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
  
    var uuid = s.join("");
    return uuid;
}