<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">

<link rel="stylesheet" href="<%=request.getContextPath() %>/static/css/Default.css">
 
<script src="<%=request.getContextPath() %>/static/js/jquery-latest.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/static/js/tool.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/static/js/Grid.js" type="text/javascript"></script>

<script src="<%=request.getContextPath() %>/static/js/Dialog.js" type="text/javascript"></script>
   
<title>角色列表</title>
<script type="text/javascript">
$(document).ready(function(){
	   GetGrid();
	});

var mygrid;
//加载表格
function GetGrid() {
	mygrid =$("#gridTable").mygrid(
		{
			url: '/role/getAllRole.action' ,
			//jsonArray : testJsonArray,
		  	//data: {dictTypeCode:selectedDictTypeCode} ,
		    keyColumn: 'roleid', 
		    pager:false,
		    pageSize:20, 
			columnList: [
			            {
			            	 title:'角色id',
			            	 column:'roleid'
			            },
			            {
			            	 title:'角色编码',
			            	 column:'rolecode'
			            },
			            {
			            	 title:'角色名称',
			            	 column:'rolename'
			            }
			            ]
		}		
	); 
}

	// 角色新增及修改
	function openRoleEditPage(type){
		if(type == 'add'){
			var url = "/role/toRoleEdit.action";
			Dialog(url, "", "新增角色", 550, 350);
		}else if(type == 'update'){
			var roleIds = mygrid.getSelectedValue();
			var roleIdArray = roleIds.split(",");
			if(roleIds==""){
				alert("请选择需要修改的角色！");
				return;
			}else if(roleIdArray.length>1){
				alert("一次只能修改一条！");
				return;
			}else{
				var url = "/role/toRoleEdit.action?roleid="+roleIdArray[0];
				Dialog(url, "", "修改角色", 550, 350);
			}
		}
	}
	
	// 删除角色
	function deleteRole(){
		var roleIds = mygrid.getSelectedValue();
		var roleIdArray = roleIds.split(",");
		if(roleIds==""){
			alert("请选择需要删除的数据项!");
			return;
		}else{
			confirmDialog("确认对话框", "确定删除这【"+roleIdArray.length+"】条数据项吗？", function (result) {
				if(result == 1){
					AjaxJson('/role/deleteRoleByIds.action' ,{roleIds:roleIds},function (returnMessage) {			    	
						tipDialog(returnMessage.message, "0.5", 1);
				    	GetGrid();
				    });
				}
			});
		}
	}


</script>
</head>
<body> 
<div class="Content_Right">
	<div class="BreadCrumb">
       <div class="BreadCrumb_Right" style="background-color:#000000;">
           <a href="###" onclick="openRoleEditPage('add')">新增角色</a>
           <a href="###" onclick="openRoleEditPage('update')">修改角色</a>
           <a href="###" onclick="deleteRole()">删除角色</a>
       </div>
    </div>
	<div class="List_Table" id="gridTable" style="width:1280px;">
		
	</div>
</div>
</body>
</html>