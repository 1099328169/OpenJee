/**
 * @author ljn Json表格
 * @param $
 */

(function($){

$.fn.mygrid = function(options) {
	
	this.initialize = function(currentPage){
		if(options.url){
			return this.initialize4Url(currentPage);
		}else if(options.jsonArray){
			return this.initialize4JsonArray(currentPage);
		}
	};
	
	this.buildTable = function(){
		var table$ = $("<table  border='0' cellpadding='0' cellspacing='1'></table>");
		return table$;
	};
	
	this.buildHeader = function(table$){
		//build header
    	var headerTr$ = $('<tr/>');
    	if(!IsNullOrEmpty(options.keyColumn)){
    		headerTr$.append($('<th/>').html("<input type='checkbox' id='headKeyColumn' />"));
    	}
 	    for (var i = 0 ; i < options.columnList.length ; i++) {
 	         headerTr$.append($('<th/>').html(options.columnList[i].title));
 	    }
 	    table$.append(headerTr$);
	};
	
	this.buildDataList = function(dataList,table$){
		for (var i = 0 ; i < dataList.length ; i++) {
	        var row$ = $('<tr/>');
	        if(!IsNullOrEmpty(options.keyColumn)){
	        	row$.append($('<td/>').html("<input type='checkbox' name='keyColumn' value='"+dataList[i][options.keyColumn]+"' />"));
	        }
	        for (var colIndex = 0 ; colIndex < options.columnList.length ; colIndex++) {
	            var cellValue = dataList[i][options.columnList[colIndex].column];

	            if (cellValue == null) { cellValue = ""; }
	            
	            if(options.columnList[colIndex].formatter)
	            {
	            	 cellValue = options.columnList[colIndex].formatter(cellValue,dataList[i]);
	            }
	           

	            row$.append($('<td/>').html(cellValue));
	        }
	        table$.append(row$);
	        //$(selector).append(row$);
	    }
		return table$;
	};
	
	this.buildPager = function(currentPage,totalSize,totalPage){
		//set page
	   
	    var flip$ = $("<div class='Flip'  >"); 

	    flip$.append(" <div class='Left'>总记录：<span>"+totalSize+"</span>条，总页数：<label>"+totalPage+"</label>页</div>");
	    var pageNumStr = "";
	    /*for (var index=1;index<=totalPage;index++)
	    {
	    	if(currentPage==index){
	    		pageNumStr += " <a class='current' href='#' id="+index+">"+index+"</a>";
	    	}else{
	    		pageNumStr += " <a href='#' id="+index+">"+index+"</a>";
	    	}
	    	
	    }*/
	    
	   //分页算法
	   var nums = [];
	   
	   
	   var beginIndex = currentPage-2;
	   var endIndex = currentPage+2;
	   if(beginIndex<2){
		   beginIndex = 2;
		   //endIndex = endIndex +2;
	   }
	   
	   if(endIndex>(totalPage-1)){
		   endIndex = totalPage-1;
		   //beginIndex = beginIndex -2;
	   }
	   
	   nums.push(1);
	   if(beginIndex>2){
		   nums.push("...");
	   }
	   for(var index=beginIndex;index<=endIndex;index++){
		   nums.push(index);
	   }
	   if(endIndex<totalPage-1){
		   nums.push("...");
	   }
	   if(totalPage>1){
		   nums.push(totalPage);
	   }
	  
	   
	   for(var index=1;index<=nums.length;index++){   
		   
		   var numValue = nums[index-1];
		   
		   if(numValue=="..."){
			   pageNumStr += " "+numValue+"";
		   }
		   else
		   {
			   if(currentPage==numValue){
		    		pageNumStr += " <a class='current' href='#' id="+numValue+">"+numValue+"</a>";
		    	}else{
		    		pageNumStr += " <a href='#' id="+numValue+">"+numValue+"</a>";
		    	}
		   }
	   }
	   
	    
	    //pageNumStr += " <a class='current' href='#' id=1>1</a>";
		/*for(var index = 1; index <= totalPage; index++) {

			if(index == 2 && totalPage - 6 > 1) {
				index = currentPage - 6;
			}else if(index == currentPage + 6 && currentPage + 6 < totalPage) {
				index = totalPage - 1;
			}else{
				if(currentPage==index){
		    		pageNumStr += " <a class='current' href='#' id="+index+">"+index+"</a>";
		    	}else{
		    		pageNumStr += " <a href='#' id="+index+">"+index+"</a>";
		    	}
			}
		}*/
		
		//pageNumStr += " <a href='#' id="+totalPage+">"+totalPage+"</a>";
		
	    flip$.append("<div class='Right'> "+pageNumStr+" </div>");
	    
	    return flip$;
	    
	    //set page
	};
	
	this.buildEvent = function(){
		var _this = this;
		$(".Flip div a").on("click",function(event){
	    	return _this.initialize(this.id);
	    });
	    
		if(!IsNullOrEmpty(options.keyColumn)){
		    $("#headKeyColumn").on("change",function(event){
		    	if($("#headKeyColumn").is(':checked')){   
		            $("input[name='keyColumn']").prop("checked", true);//1.6+的jquery操作checkbox要用prop替换attr
		        }else{   
		        	$("input[name='keyColumn']").prop("checked",false);
		        } 
		    });
		}
	};
	
	
	this.initialize4JsonArray = function(currentPage){
		var selector = this.selector;
		$(selector).empty();

		var table$ = this.buildTable();
		
		this.buildHeader(table$);
			
		
		if(options.pager){
	 	    var totalSize = options.jsonArray.length;
	 	    var pageSize = options.pageSize;
	 	    var beginIndex = (currentPage - 1) * pageSize; 
	 	    
	 	    var endIndex = beginIndex + pageSize;
	 	    if(endIndex>totalSize){
	 	    	endIndex = (totalSize);
	 	    }
	 	    
	 	    
	 	    var totalPage = 0;
	 	   if(totalSize % pageSize == 0) {  
	           totalPage = totalSize / pageSize;  
	       } else {  
	           totalPage = parseInt(totalSize / pageSize) + 1;  
	       }
	    
	       
	       var dataList = [];
	       for(var rowIndex=beginIndex;rowIndex < endIndex;rowIndex++){
	    	   dataList.push(options.jsonArray[rowIndex]);
	       }
	       
	       this.buildDataList(dataList,table$);
		}else{
			this.buildDataList(options.jsonArray,table$);
		}
	       
	   $(selector).append(table$);
	   //set table
	     
	   if(options.pager){
	       $(selector).append(this.buildPager(currentPage,totalSize,totalPage)); 
	   }
	     
	   this.buildEvent(); 

	    return this;
	};
	
	
    this.initialize4Url = function(currentPage) {
    	var _this = this;
    	var selector = this.selector;
    	//debugger; 
    	var dataParam = options.data;
    	if(options.pager){
    		dataParam = $.extend(options.data,{currentPage:currentPage,pageSize:options.pageSize});
    	}

    	AjaxJson(options.url,dataParam,function(data){
    		
    		$(selector).empty();
    		
    		var table$ = _this.buildTable();
    	
    		_this.buildHeader(table$);
    			
    		
    		var dataList = [];
    		//alert(options.pager);
    		if(options.pager){
    			dataList = data.results;
    		}else{
    			dataList = data;
    		}
    		
    		_this.buildDataList(dataList,table$);
    	       
    	   $(selector).append(table$);
    	   //set table
    	     
    	   if(options.pager){
    	       $(selector).append(_this.buildPager(data.currentPage,data.totalSize,data.totalPage)); 
    	   }
    	     
    	   _this.buildEvent();
    	});
    		
        return this;
    };

    this.getSelectedValue=function(){
    	var selector = this.selector;
    	 var reVal = "";
   	  $(selector).find("input:checkbox[name='keyColumn']:checked").each(function (r) {
   		  reVal += $(this).val()+",";
   		  
   	    });
   	  if(reVal!=""){
   		  reVal = reVal.substr(0, reVal.length - 1);
   	  }
   	  return reVal;
    };
    
    
    return this.initialize(1);
};
})(jQuery);



