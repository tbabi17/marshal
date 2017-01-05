<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<div id="content">                                                 
  
	<div class="jquery_tab">  
	  <div class="content_block">
		  <h2 class="jquery_tab_title">Нууц үг өөрчлөх</h2>   		  		    		  
		  
		  <div class="my_form_box">
		  	<form id="change_password">
				<div class="miniform">                 
                  	<div class="my_left_box">
                   	   <p>
                           <label for="code">Одоогийн нууц үг:</label>
                           <input class="input-medium" type="password" value="" name="current" id="current" required="required"/>                                            
                       </p>
                       <p>
                           <label for="name">Шинэ нууц үг:</label>
                           <input class="input-medium" type="password" value="" name="new" id="new" required="required"/>                                            
                       </p>
                       <p>
                           <label for="name">Дахин бичнэ үү:</label>
                           <input class="input-medium" type="password" value="" name="refill" id="refill" required="required"/>                                            
                       </p>
                   </div>			                                    			                                                
            		<div class="my_bottom_box">                            		
	          			<div id="bottom_bar">	                				
	                       	<div id='permission_bar'></div>
	            			<div id='save_bar'><input class='button' id='submit' name='submit' type='submit' value='Солих'/></div>
	          				<div id="result-log"></div>			            			
	         			</div>              		
		     		</div>          		
      			</div>
      		</form>
  	 	</div>		   	
	  </div>	  
	</div>
	
	
	<div class="jquery_tab">  
	  <div class="content_block">
		  <h2 class="jquery_tab_title">Гишүүнчлэл</h2>   		  		    		  
		  
		  <div class="my_form_box">
		  	<form id="add_new_membership">
				<div class="miniform">                 
                  	<div class="my_left_box">
                   	   <p>
                           <label for="code">Код:</label>
                           <input class="input-small" type="text" value="" name="code" id="code" required="required"/>                                            
                       </p>
                       <p>
                           <label for="name">Нэр:</label>
                           <input class="input-medium" type="text" value="" name="name" id="name" required="required"/>                                            
                       </p>                       
                       <p>
                           <label for="months">Хугацаа:</label>
                           <select name="months" id="months" >
                               <option value="1">1 сар</option>
                               <option value="2">2 сар</option>
                               <option value="3">3 сар</option>
                               <option value="4">4 сар</option>
                               <option value="5">5 сар</option>
                               <option value="6">6 сар</option>
                           </select>
                       </p>                       
                   </div>			                                    			                                                
            		<div class="my_bottom_box">                            		
	          			<div id="bottom_bar">	                				
	                       	<div id='permission_bar'></div>
	            			<div id='save_bar'><input class='button' id='submit' name='submit' type='submit' value='Нэмэх'/></div>
	          				<div id="result-log"></div>			            			
	         			</div>              		
		     		</div>          		
      			</div>
      		</form>
  	 	</div>		
   		
   										
		  <div id="membership_list">                                    
			 <table id="table_memberships" cellspacing="0">
				<caption>Хүснэгт: Гишүүнчлэлийн мэдээлэл</caption>
				<tr>
				  <th width="2%">ID</th>
				  <th width="5%">Код</th>
				  <th width="20%">Нэр</th>
				  <th width="50%">Хөнглөлт үзүүлэх эмчилгээ</th>				  
				</tr>                                                                    
			  </table>			 
		  </div>	
		  	  		  		              
	  </div>	  
	</div>
	
	<div class="jquery_tab">  
	  <div class="content_block">
		  <h2 class="jquery_tab_title">Цагийн хуваарь</h2>
		  	 <div class="my_form_box">
		  	 <form id="update_settings">
				<div class="miniform">                 
                  	<div class="my_left_box">
                   	   <p>
                           <label for="code">Ажил эхлэх цаг:</label>
                           <input class="input-small" type="number" value="" name="start_time" id="start_time" required="required"/>                                            
                       </p>
                       <p>
                           <label for="name">Ажил дуусах цаг:</label>
                           <input class="input-small" type="number" value="" name="end_time" id="end_time" required="required"/>                                            
                       </p>                       
                       <p>
                           <label for="name">Амралтын цаг:</label>
                           <input class="input-small" type="text" value="" name="pause_time" id="pause_time" required="required"/>                                            
                       </p>                                             
                    </div>			                                    			                                                
            		<div class="my_bottom_box">                            		
	          			<div id="bottom_bar">	                				
	                       	<div id='permission_bar'></div>
	            			<div id='save_bar'><input class='button' id='submit' name='submit' type='submit' value='Хадгалах'/></div>
	          				<div id="result-log"></div>			            			
	         			</div>              		
		     		</div>          		
      			</div>
      		</form>   
      		</div>
	  </div>
	</div>	
	
	
	<script>
   		$(document).ready(function() {                         		
   			reload_settings();
    	});
   	</script>
	
</div>