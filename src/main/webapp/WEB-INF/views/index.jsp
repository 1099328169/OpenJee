<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title>OpenJee</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="<%=request.getContextPath() %>/static/css/resmenu.css">
<link rel="stylesheet" href="<%=request.getContextPath() %>/static/css/tab.css">

<script src="<%=request.getContextPath() %>/static/js/jquery-3.2.1.min.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/static/js/jquery.resmenu.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/static/js/tool.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/static/js/index.js" type="text/javascript"></script>
<script src="<%=request.getContextPath() %>/static/js/Grid.js" type="text/javascript"></script>
<title>Insert title here</title>
<script>
	$(document).ready(function() {
		Tab.init();
	});
</script>
</head>
<body>

		<div class="menu_container">
            <ul class="toresponsive" id="menu1">
                <li><a href="#" >Home</a></li>
                <li>
                    <a href="#">权限管理</a>
                    <ul>
                        <li><a href="#" onclick="Tab.addTab('角色管理',1,'/role/toRoleList.action')">角色管理</a></li>
                        <li><a href="#">菜单管理</a></li>
                        <li><a href="#">应用管理</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        
	

	<div id="div_tabs">
		<ul id="tab_bar"></ul>
	</div>


	<div id="main_frame">

	</div>
</body>
</html>