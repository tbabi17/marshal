<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String orderID = request.getParameter("orderID");	
%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Падаан</title>
<style>
	@page {
  		size: A5;
	}
	table {
	    border-collapse: collapse;
	}
	td {
		font-family: "Times New Roman",tahoma,verdana,arial,sans-serif;
		font-size: 9px;
		font-weight:bold;
		border: 0px solid #aaa;	
		padding: 2px;	
	}
</style>
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js"></script>
<script type='text/javascript' src='../../init.js'></script>
<script type='text/javascript' src='../../tools.js'></script>
<script type='text/javascript' src='../../lv.js'></script>         
<script>
	$(document).ready(function() {		
		var __q = __json_autorize_custom('_padaan_list', '<%=orderID%>');		
		$.post('../../'+__q_gw, __q, function(data) {			
			$("#table").html(data.items[0].xml);
							       	        
	        print();	        
		});
	});
</script>
</head>
<body>
<div id="table">
</div>
</body>
</html>