<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	String mode = "0";
	String param = "";
	mode = request.getParameter("mode");
	param = request.getParameter("param");
	if (mode == null) mode = "0";
%>    
<div id="content">                                                 
  <div class="jquery_tab">
  
	  <div class="content_block">
		  <h2 class="jquery_tab_title">Өвчтний бүртгэл</h2>                                    
		  
		  <div style="margin-bottom: 20px; width: 100%">		  			  
		  	
		  	<div style="display: inline-block; width: 350px" >
		  		<input type="text" class="input-combo" id="customer_search" value=""/>		  		
		  		<div class="combo" id="search_filter_button" onclick="search_filter()" title="Нарийвчлан хайх"><span class="filter" id="filter_button"></span></div>
		  	</div>
		  	<div style="float:right; display: none;" id="filter_form">
		  		   <label for="s_gender" class="fixed">Хүйс:</label>
		  		   <select name="s_gender" id="s_gender"  onchange="reload_customers_param()">
		  		   	   <option value="0">бүгд</option>	
					   <option value="1">эр</option>
					   <option value="2">эм</option>
				   </select>
				   
				   <label for="s_min_age" class="fixed">Нас:</label>
				   <select name="s_min_age" id="s_min_age" >
				   	   <option value="0">0</option>
					   <option value="1">1</option>
					   <option value="5">5</option>
					   <option value="10">10</option>
					   <option value="15">15</option>
					   <option value="20">20</option>
					   <option value="25">25</option>
					   <option value="30">30</option>
					   <option value="35">35</option>
					   <option value="40">40</option>
					   <option value="45">45</option>
					   <option value="50">50</option>
					   <option value="55">55</option>
					   <option value="60">60</option>
					   <option value="65">65</option>
					   <option value="70">70</option>
					   <option value="75">75</option>					   	                                               
				   </select>-
				   <select name="s_max_age" id="s_max_age" >					   
					   <option value="5">5</option>
					   <option value="10">10</option>
					   <option value="15">15</option>
					   <option value="20">20</option>
					   <option value="25">25</option>
					   <option value="30">30</option>
					   <option value="35">35</option>
					   <option value="40">40</option>
					   <option value="45">45</option>
					   <option value="50">50</option>
					   <option value="55">55</option>
					   <option value="60">60</option>
					   <option value="65">65</option>
					   <option value="70">70</option>
					   <option value="75">75</option>
					   <option value="80" selected>80</option>	    	                                                
				   </select>
				   
				   <label for="s_country" class="fixed">Улс:</label>
				   <select name="s_country" id="s_country" onchange="reload_customers_param()">
				   	   <option value="0">Бүгд</option>
					   <option value="Монгол">Монгол</option>
					   <option value="Хятад">Хятад</option>
					   <option value="ОХУ">ОХУ</option>
					   <option value="Герман">Герман</option>
				   </select>
				   
				   <label for="s_membershipCode" class="fixed">Гишүүнчлэл:</label>
				   <select name="s_membershipCode" id="s_membershipCode"  onchange="reload_customers_param()">
				   	   <option value="0">бүгд</option>					   
					   <option value="MB1">MB1</option>
					   <option value="MB2">MB2</option>					   
				   </select>
		  	</div>
		  </div>
											  
		  <div id="customer_list">                                    
			 
		  </div>                                                                                                                                                       								
	  </div><!--end content_block-->
	</div><!--end jquery tab-->

	<div class="jquery_tab">
	  <div class="content_block">                                                                                	                
		  <h2 class="jquery_tab_title">Нэмэх</h2>		  				  				
							  							
				<div id="un_customer_lists">				 		 
					<div class="my_full_form_box">	
						<p style="padding:5px;"><b>Бүргэлгүй өвчтний жагсаалтаас сонгох</b></p>					
						<div id="ordered_customer_list">		    			 
						 </div>
						 <div class="my_bottom_box">                            		
			           		<div id="bottom_bar">	                				
		                       	<div id='permission_bar'></div>
		            			<div id='save_bar1'><input class='button' onclick="show_customer_add_box()" id='new' name='new' type='button' value='Шинэ өвчтин'/></div>	          							            		
		         			</div>	
				        </div>
					</div>
					<p>&nbsp;</p>
				</div>				
				<div id="customer_add_form" style="display:none;">
					<div class="my_full_form_box">
						<div class="editform">   	 				 
							  <form id="add_new_customer">      						                                    	
								<div class="my_left_box">									
										<p>
										   <label for="name">Код:</label>
										   <input class="input-small" type="text" value="" name="code" id="code" required="required" disabled onkeyup="show_search_field_customer()"/>									   
				                    	   <input class="input-small" style="width:25px;" type="text" value="0" name="id" id="id" disabled/>									   
										   <input class="input-extra-small" style="width:25px;" type="text" value="0" name="orderID" id="orderID" required="required"/>
										   <input class="input-small" type="text" value="" name="clinicCode" id="clinicCode" required="required"/>                
									   </p>
									   
									   <p>
										   <label for="name">Овог Нэр:</label>
										   <input class="input-small" type="text" value="" name="lastName" id="lastName" required="required"/>
										   <input class="input-small" type="text" value="" name="firstName" id="firstName" required="required" autocomplete="off" onkeyup="show_search_field_customer(this)"/>
									   </p>
									   

										<p>
										   <label for="phone">Утас, Факс:</label>
										   <input class="input-small" type="text" value="" name="phone" id="phone" required="required"  autocomplete="off" onkeyup="show_search_field_customer(this)"/>
										   <input class="input-small" type="text" value="" name="fax" id="fax"/>	                                            
 									    </p>	    
									   									   
										<p>
											<label for="gender">Хүйс, Гэр бүл:</label>
											<select name="gender" id="gender" >
										  		 <option value="1">эр</option>
										 		  <option value="2">эм</option>	                                                
									 	  	</select>
									 	  	<select name="isFamily" id="isFamily" >
										   	   <option value="2">Гэрлээгүй</option>
											   <option value="1">Гэрлэсэн</option>											   	                                                
										   </select>
					                	</p>
						
										<p>
										<label for="birthdate">Төрсөн огноо:</label>
										<input class="input-small birthdate_input" type="text" value="01/01/1984" name="birthdate" id="birthdate" required="required"/>	
									   </p>						                                    	                                      
									   
									   <p>
										   <label for="mail">И-майл:</label>
										   <input class="input-medium" type="text" value="" name="email" id="email"/>	                                            
									   </p>	                                      
										
									   <p>
										   <label for="country">Улс, Хот:</label>
										   <select name="country" id="country" >
											   <option value="Монгол">Монгол</option>
											   <option value="Хятад">Хятад</option>
											   <option value="ОХУ">ОХУ</option>
											   <option value="Герман">Герман</option>
										   </select>
										   <input class="input-small" type="text" value="Улаанбаатар" name="city" id="city" required="required"/>	                                            
									   </p>				   				   								   
									   <p>
										   <label for="address">Хаяг:</label>
										   <input class="input-medium" type="text" value="" name="address" id="address"/>
									   </p>	
									   
									   <p>
										   <label for="mail">Ажил эрхлэлт:</label>
										   <select name="jobStatus" id="jobStatus" >
											   <option value="1">Ажилладаг</option>
											   <option value="2">Сурдаг</option>
											   <option value="3">Тэтгэвэрт</option>
											   <option value="4">Ажилгүй</option>
										   </select>
										   <input class="input-medium" type="text" value="" name="companyName" id="companyName"/>
									   </p>
										
									   <p style="display:none">
										   <label for="url">Мэргэжил:</label>
										   <input class="input-small" type="text" value="" name="jobName" id="jobName"/>	                                            
									   </p>    								  
	
									   <p>
										<label for="url">ЭМДТ дугаар:</label>
										<input class="input-small" type="text" value="" name="healthID" id="healthID"/>
									   </p>	    
										
									   <p>
											<label for="membershipCode">Гишүүнчлэл:</label>
											<select name="membershipCode" id="membershipCode" >
											   <option value="none">Байхгүй</option>
											   <option value="MB1">MB1</option>
											   <option value="MB2">MB2</option>					   
										   </select>
									   </p>								   
									   <p>
										<label for="url">Дуудах хугацаа:</label>
										<select name="recareDelay" id="recareDelay" >
											   <option value="0">------</option>
											   <option value="30">1 сар</option>											   
											   <option value="90">3 сар</option>
											   <option value="180">6 сар</option>
											   <option value="365">1 жил</option>											   
										   </select>
									   </p>
									   
									   <p>
										<label for="bestCallTime">Боломжит цаг:</label>
										<select name="bestCallTime" id="bestCallTime" >
											   <option value="1">09:00-10:00</option>
											   <option value="2">10:00-11:00</option>
											   <option value="3">11:00-12:00</option>
											   <option value="4">12:00-13:00</option>
											   <option value="5">13:00-14:00</option>
											   <option value="6">14:00-15:00</option>
											   <option value="7">15:00-16:00</option>
											   <option value="8">16:00-17:00</option>
											   <option value="9">17:00-18:00</option>
										   </select>
									   </p>
									   <p style="display:none">
						              		<label for="bestCallTime">Баланс:</label>
						              		<input class="input-small" type="number" value="0" name="balance" id="balance"/>				                  
						               </p> 
									   <p>
									   		<label for="uri"><a id="insert_image">Зураг дарах</a></label>
											<input type="hidden" value="" id="uri" name="uri"></input>
											<img id="image" style="width:120px;height:140px;"/>															
									   </p> 																   
								</div>																						 									                                        	                    								                               		                   							                                                                                        							
								<div class="my_bottom_box">                            		
					           		<div id="bottom_bar">	                				
				                       	<div id='permission_bar'></div>
				            			<div id='save_bar'><input class='button' id='submit' name='submit' type='submit' value='Хадгалах'/></div>
				            			<input class="button-gray" onclick="hide_customer_add_box()" id="back" name="back" type="button" value="Бүртгэлгүй жагсаалтаас"/>
				          				<div id="result-log"></div>			            			
				         			</div>	
						        </div>
			        		</form>
			        	</div>		        	
			    </div>		
			</div>			             		     				
	  </div><!--end content_block-->
	  
  </div><!--end jquery tab-->
														  
</div><!--end content-->
<script>
	var mode = '<%=mode%>';
	var param = '<%=param%>';
	var pm = param.split(',');
			
	$(document).ready(function() {
		if (pm[2] > 0)
			fillData('', pm[2], '');
		else
			fillData('', 0, '');
 	});
</script>

<div id="box">
	<div id="box_toolbar"></div>
	<div id="box_content">
		<div id="box_content_text">
		</div>
	</div>
</div>
                    
                      