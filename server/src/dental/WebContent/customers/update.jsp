<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String code = request.getParameter("id");	
%>
		<div id="content">
			<div class="my_full_form_box">
				<form id="edit_customer" action="">                                      	      
			    	<div id="editform">			    	
			           	<div class="my_left_box">
			            	<p>
			                    <label for="name">Код:</label>			                    
			                    <input class="input-small" type="text" value="" name="code" id="code"/>
			                    <input class="input-small" style="width:25px;" type="text" value="" name="orderID" id="orderID" disabled/>
			                    <input class="input-small" style="width:25px;" type="text" value="" name="id" id="id" disabled/>
			                    <input class="input-small" type="hidden" value="" name="clinicCode" id="clinicCode" required="required"/>			                                                               
			                </p>
			                
			                <p>
			                    <label for="name">Овог Нэр:</label>
			                    <input class="input-small" type="text" value="" name="lastName" id="lastName"/>
			                    <input class="input-small" type="text" value="" name="firstName" id="firstName"/>
			                </p>
					                               
							<p>
								<label for="gender">Хүйс, Гэр бүл:</label>
								<select name="gender" id="gender" >
								   <option value="1">эр</option>
								   <option value="2">эм</option>	                                                
							   </select>
							   <select name="isFamily" id="isFamily" >
		                           <option value="1">Гэрлэсэн</option>
		                           <option value="2">Гэрлээгүй</option>	                                                
		                       </select>
			                </p>
					
							<p>
			           			<label for="birthdate">Төрсөн огноо:</label>
			           			<input class="input-small birthdate_input" type="text" value="__ / __ / ____" name="birthdate" id="birthdate"/>	
			                </p>			
							<p>
				                 <label for="phone">Утас, Факс:</label>
				                 <input class="input-small" type="text" value="" name="phone" id="phone"/>
				                 <input class="input-small" type="text" value="" name="fax" id="fax"/>	                                            
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
				                 <input class="input-medium" type="text" value="Улаанбаатар" name="city" id="city"/>	                                            
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
				                 <input class="input-medium" type="text" value="." name="companyName" id="companyName"/>
				             </p>
				             	
				             <p style="display:none">
				                 <label for="url">Мэргэжил:</label>
				                 <input class="input-small" type="text" value="." name="jobName" id="jobName"/>				                 	                                           
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
				              	<label for="healthID">ЭМДТ дугаар:</label>
				              	<input class="input-small" type="text" value="" name="healthID" id="healthID"/>
				              </p>
				              
				              <p>
				              	<label for="recareDelay">Давтамж:</label>
				              	<select name="recareDelay" id="recareDelay" >
				                      <option value="1">1 сар</option>
				                      <option value="2">2 сар</option>
				                      <option value="3">3 сар</option>
				                      <option value="4">4 сар</option>
				                      <option value="5">5 сар</option>
				                      <option value="6">6 сар</option>
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
				              		<label for="balance">Баланс:</label>
				              		<input class="input-small" type="number" value="0" name="balance" id="balance"/>				                  
				              </p>
				              <p>
				              		<label for="uuri"><a id="insert_image">Зураг дарах</a></label>
				              		<input type="hidden" value="" id="uri" name="uri"></input>
				                 	<img id="image" style="width:120px; height:140px;"/>
							  </p>                                  	                                        
					</div>					
			    </div>
			    <div class="my_bottom_box">   
			    	<div id="bottom_bar">
               			<div id='permission_bar'></div>
               			<div id='update_save_bar'><input class="button" name="submit" type="submit" value="Хадгалах" id="save"/><input class="button" name="delete" id="delete" type="button" value="Устгах" id="delete"/></div>
               			<input class="button-gray" id="back" name="back" type="button" value="Буцах"/>
               			<div id="result-log"></div>
             		</div>               	                         		          			             	
		     </div>    
	   </form>
     </div>   
	<script>
		var code = '<%=code%>';
									
		$(document).ready(function() {		
			put_module_to_form('edit_customer');						
		});				
	</script>        
</div>