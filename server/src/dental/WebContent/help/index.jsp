<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<style>
p {
	font-size: 12px;
	line-height: 16px;
	padding: 0px;
	margin-top: 10px;
}

h5 {
	font-size: 12px;
	font-weight: bold;
}

ul.help {
	margin-left: 20px;
	padding: 10px;
	font-size: 12px;
}

ul.help li {
	font-size: 11px;

}

p a {
	font-size: 12px;
}
</style>    
<div id="content">                                                 	
	<div class="jquery_tab">  
	  <div class="content_block">
		  <h2 class="jquery_tab_title">Ашиглах заавар</h2>   		  		    		  
		  
		  	
   		
   		<script>
	   			function help_window(page) {
					$('.my_help_right_box').load('help/'+page, function(response, status, xhr) {
						
					});					
				}
	   			
		   		$(document).ready(function() {                         		
		   			help_window('01.jsp');			
		    	});
   		</script>										
		  <div id="help_list">
		  	   
		  	   <div class="my_help_box">   		
			  		<h5>Үндсэн хэсэг</h5>
			  		<ul class="uiList mtm -cx-PRIVATE-hc2HTML__marginBottom uiListBulleted">
			  			<li class="uiListVerticalItemBorder active"><a onclick="help_window('01.jsp')">Танилцуулга</a></li>			  					  		
			  		</ul>			  		
			  		<br/><br/>
			  		<h5>Бүртгэлийн хэсэг</h5>
			  		<ul class="uiList mtm -cx-PRIVATE-hc2HTML__marginBottom uiListBulleted">
			  			<li class="uiListVerticalItemBorder"><a onclick="help_window('02.jsp')">Эмч, ажилчдын бүртгэл</a></li>
			  			<li class="uiListVerticalItemBorder"><a onclick="help_window('03.jsp')">Эмчилгээний тариф, онош</a></li>
			  			<li class="uiListVerticalItemBorder"><a onclick="help_window('04.jsp')">Өвчтний бүртгэл</a></li>
			  			<li class="uiListVerticalItemBorder"><a onclick="help_window('05.jsp')">Бараа материалын бүртгэл</a></li>			  						  						  	
			  		</ul>
			  		<br/><br/>
			  		<h5>Ашиглалтын талаар</h5>
			  		<ul class="uiList mtm -cx-PRIVATE-hc2HTML__marginBottom uiListBulleted">
			  			<li class="uiListVerticalItemBorder"><a onclick="help_window('06.jsp')">Өвчтин хүлээн авах</a></li>
			  			<li class="uiListVerticalItemBorder"><a onclick="help_window('07.jsp')">Эмчилгээний бүртгэл</a></li>
			  			<li class="uiListVerticalItemBorder"><a onclick="help_window('08.jsp')">Төлбөр тооцоотой ажиллах</a></li>
			  			<li class="uiListVerticalItemBorder"><a onclick="help_window('09.jsp')">Бараа материалын бүртгэл</a></li>			  			
			  			<li class="uiListVerticalItemBorder"><a onclick="help_window('10.jsp')">Тайлангууд</a></li>
			  			<li class="uiListVerticalItemBorder"><a onclick="help_window('10.jsp')">Системийн тохиргоо</a></li>			  			
			  		</ul>	
			  		
			  		<br/><br/>
			  		<h5>Бусад</h5>
			  		<ul class="uiList mtm -cx-PRIVATE-hc2HTML__marginBottom uiListBulleted">
			  			<li class="uiListVerticalItemBorder"><a onclick="help_window('06.jsp')">Асуулт ба хариулт</a></li>
			  			<li class="uiListVerticalItemBorder"><a onclick="help_window('07.jsp')">Эмчилгээний бүртгэл</a></li>			  						  		
			  		</ul>			  				  		
		  	   </div>		 
		  	   
		  	   <div class="my_help_right_box">
		  	   	test
		  	   </div>		  	    		                                
		  </div>
	  </div>	  
	</div>	
</div>