<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<div id="content">                                                 
  <div class="jquery_tab">
  
	  <div class="content_block">
		  <h2 class="jquery_tab_title">Ирсэн захидал</h2>                                    
		  
		  <div style="margin-bottom: 20px">		  
		  	<div style="display: inline-block; width: 350px" >
				<input class="input-combo" type="text" id="message_search" name="message_search" value="" onkeypress="javascript:reload_message_filter(this)"></input>
          		<div class="combo" id="search_filter_button" onclick="search_filter()" title="Нарийвчлан хайх"><span class="filter" id="filter_button"></span></div>
			</div>                   			            			                   	                  
		  	
          	
          	<div style="float:right; display: none;" id="filter_form">
	             <label for="message_filter" class="fixed">Төрөл:</label>
	             <select name="message_filter" id="message_filter" required="required" onchange="reload_message_by_type(this.value)">
	             	<option>Бүх мессеж</option>
	             	<option>Уншаагүй мессеж</option>
	             	<option>Архивлагдсан</option>	             	
	             	<option>Спам</option>							   					                                               
		    	</select>
		    	
		    	<label for="message_date" class="fixed">Хугацаа:</label>
	             <select name="message_date" id="message_date" required="required" onchange="reload_message_by_type(this.value)">
	             	<option value=0 selected>Бүгдийг</option>
	             	<option value=1>Өнөөдөрийн</option>
	             	<option value=7>7 хоногоор</option>	             	
	             	<option value=30>Сараар</option>
	             	<option value=120>Улиралаар</option>
	             	<option value=365>Жилээр</option>						   					                                               
		    	</select>
		    </div>	     
          </div>
                   			
											  
		  <div id="message_list">                                    
			   
		</div>                                                                                                                                                       								
	  </div><!--end content_block-->
	</div><!--end jquery tab-->															 
  
</div><!--end content-->

                    
                      