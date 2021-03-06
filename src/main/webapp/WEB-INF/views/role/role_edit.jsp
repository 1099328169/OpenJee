<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link rel="stylesheet" href="<%=request.getContextPath() %>/static/css/Default.css">
 
<script src="<%=request.getContextPath() %>/static/js/jquery-3.2.1.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/static/js/jquery-latest.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/static/js/tool.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/static/js/Grid.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/static/js/jquery.json.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/static/js/Dialog.js" type="text/javascript"></script>

<title>角色编辑</title>

<script type="text/javascript">

$(document).ready(function(){
	initForm();
	var bind_name = 'input';
	//兼容IE浏览器
    if(!!window.ActiveXObject || "ActiveXObject" in window){
	   if(navigator.userAgent.indexOf("MSIE 8.0")>0||navigator.userAgent.indexOf("MSIE 7.0")>0){
		  //兼容IE8 或者IE7
		   bind_name = 'propertychange';
	    }
		   $('#rolecode').bind(bind_name, function(){
			   onKeyups();
			})
    }else{
   	 //兼容火狐浏览器
		 $("#rolecode").bind("keyup",function (){
			 onKeyups();
		 }) ;
    }
});

function initForm(){
	var roleid = GetQuery("roleid");
	$("#roleid").val(roleid);
	if(roleid!=""){
		AjaxJson('/role/getRoleById.action',{roleId:roleid},function(role){
			$("#oldcode").val(role.rolecode);
			SetForm(role,"#roleEditForm");
		});
	}
}
//保存角色
function saveRole(){
	var role = {
		roleid :  $("#roleid").val(),
		rolecode : $("#rolecode").val(),
		rolename : $("#rolename").val()
	};
	var roleJson = $.toJSON( role );
	if($("#errorlab").text()==""){
		AjaxJson("/role/saveRole.action",{roleJson:roleJson},
				function(result){
				tipDialog(result.message, "0.5", 1);
				top.frames[tabiframeId()].GetGrid();
				closeDialog();
		});
	}
}

//获取iframe的对应name
function tabiframeId() {
    var tabs_container = top.$("#tab_bar");
    var id = tabs_container.find('.tab_selected').attr('id');
    return id;
}

// 判断编码是否存在
function onKeyups(){
	if($("#rolecode").val()!=$("#oldcode").val()){
		 AjaxJson('/role/roleCodeIsExist.action',{roleCode:$("#rolecode").val()},function(result){
			  if(result){
				  $("#errorlab").text("");
			  }else{
				  $("#errorlab").text("编码已存在");
			  }
		 });
	}
}

</script>
</head>
<body>
	<form id="roleEditForm"	action="<%=request.getContextPath()%>/role/saveRole.action"	method="post">
		<input type="hidden" name="roleid" id="roleid">
		<input type="hidden" name="oldcode" id="oldcode">
		<div id="editWindow" class="Form_Table">
		     <table border="0" cellpadding="0" cellspacing="1">	        
		         <tr>
		         	 <th>角色编码</th>
		             <td><input id="rolecode" name="rolecode" type="text" value=""   class="Text_Auto required " /><label style="color: red" id="errorlab"></label></td>
		         </tr>
		         <tr>
		         	 <th>角色名称</th>
		             <td><input id="rolename" name="rolename" type="text" value=""   class="Text_Auto required " /><label style="color: red" id="errorlab"></label></td>
		         </tr>
		     </table>
		</div>
		<div class="Center_Button">
			<table border="0" cellpadding="0" cellspacing="0">
		    	<tr>
		        	<td><a href="###" id="save" onclick="saveRole()">保存</a></td>
			    </tr>
			</table>
		</div>
	</form>
</body>
</html>