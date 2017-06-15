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
    
<title>Insert title here</title>
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
				  //  data: {dictTypeCode:selectedDictTypeCode} ,
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
					             }
					             ]
				}		
			);
	 
}


</script>
</head>
<body> 
<div class="Content_Right">
		
		<div class="List_Table" id="gridTable">
			
		</div>
	</div>
</body>
</html>