<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
                 	  				       
    <div id="content">                       
                   
         <div class="jquery_tab">
                   
            <div class="content_block">
            <h2 class="jquery_tab_title">Эмч ажилчид</h2>                                                                        
			<br/>
			<div id="doctor_list">

			</div>								
         </div><!--end content_block-->
      
  	</div><!--end jquery tab-->

	<div class="jquery_tab">
                     
         <div class="content_block">
             <h2 class="jquery_tab_title">Нэмэх</h2>
             
             <form id="add_new_doctor">
             	<div class="my_form_box">
					<div class="editform">			              
			             	<div class="my_left_box">
			              	  <p>
			                      <label for="name">Хэрэглэгчийн нэр:</label>
			                      <input class="input-extra-small" type="text" value="" name="code" id="code" required="required"/>
			                      <input class="input-small" type="text" value="" name="clinicCode" id="clinicCode" required="required"/>                                            
			                  </p>
			                  <p>
				                   <label for="name">Овог Нэр:</label>
				                   <input class="input-small" type="text" value="" name="firstName" id="firstName"/>
				                   <input class="input-small" type="text" value="" name="lastName" id="lastName"/>                                            
				              </p>
			                  <p>
			                      <label for="name">Регистр №:</label>
			                      <input class="input-small" type="text" value="" name="registerCode" id="registerCode" required="required"/>			                                                                 
			                  </p>
			                  <p>
			          			<label for="birthdate">Төрсөн огноо:</label>
			          			<input class="input-small birthdate_input" type="text" value="" name="birthdate" id="birthdate" required="required"/>	
			                  </p>
			                  
			                  <p>
			                      <label for="gender">Хүйс:</label>
			                      <select name="gender" id="gender" >
			                          <option value="1">Эрэгтэй</option>
			                          <option value="2">Эмэгтэй</option>	                                                
			                      </select>
			                  </p>
			                  	                                        
			                  <p>
			                      <label for="degree">Зэрэг:</label>
			                      <select name="degree" id="degree" >
			                          <option value="1">Баклавар</option>
			                          <option value="2">Доктор</option>
			                          <option value="3">Профессор</option>	                                                
			                      </select>
			                  </p>
			                  <p>
			                      <label for="name">Төгссөн сургууль:</label>
			                      <input class="input-medium" type="text" value="" name="education" id="education" required="required"/>                                            
			                  </p>			                 
			                  <p>
			                      <label for="jobStatus">Албан тушаал:</label>
			                      <select name="jobStatus" id="jobStatus" >
			                          <option value="1">Эмч</option>
			                          <option value="2">Их эмч</option>
			                          <option value="3">Сувилагч</option>	
			                          <option value="4">Үйлчилгээний ажилтан</option>
			                          <option value="5">Нярав</option> 
			                          <option value="0">Админ</option>                                                 
			                      </select>
			                  </p>	                                        	                                        
			                  <p>
			          			<label for="joinedDate">Ажилд орсон огноо:</label>
			          			<input class="input-small birthdate_input" type="text" value="" name="joinedDate" id="joinedDate" required="required"/>	
			                  </p>
			                  <p>
			                      <label for="name">Утасны дугаар:</label>
			                      <input class="input-small" type="text" value="" name="phone" id="phone"/>			                                                                 
			                  </p>
			                  <p>
			                      <label for="descr">Тайлбар:</label>
			                      <textarea name="descr" id="descr" cols="60" rows="4"></textarea>
			                  </p>
			                  
			                  <p>
								   	<label for="uri"><a id="insert_image">Зураг дарах</a></label>
									<input type="hidden" value="" id="uri" name="uri"></input>
									<img id="image" style="width:120px;height:140px;"/>															
							  </p> 
			              </div>			              			              			           
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
	</div><!--end content_block-->         	
      
</div><!--end jquery tab-->
                                                            
    
</div><!--end content-->
                   