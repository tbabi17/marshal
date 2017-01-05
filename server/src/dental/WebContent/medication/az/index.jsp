<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>                	                    	
                	
       <div id="content">                                                                               
			 <div class="jquery_tab">
                        
                <div class="content_block">
                    <h2 class="jquery_tab_title">Эмчилгээ</h2>
										
					<div style="margin-bottom: 15px;">
			     	 	<div style="display: inline-block; width: 350px" >			     	 	
			     	 		<input type="text" class="input-combo" id="az_search" name="az_search"  value=""/>
			     	 		<div class="combo" id="search_filter_button" onclick="search_filter()" title="Нарийвчлан хайх"><span class="filter" id="filter_button"></span></div>
			     	 	</div>				     	 	
			     	</div>				     	 				     	 
					
					<div id="medication_list">
					     
					</div>																		
				</div>
			 </div>
			 
			 <div class="jquery_tab">                        
                   <div class="content_block">
                       <h2 class="jquery_tab_title">Нэмэх</h2>
						<form id="add_new_medication">                                
                            <div class="my_form_box">
								<div class="editform">                                   
                                  	<div class="my_left_box">
                                   	   <p>
                                           <label for="code">Код:</label>
                                           <input class="input-small" type="text" value="" name="code" id="code" required="required" onkeyup="show_search_field_medication()">
                                           <input class="input-small" type="text" value="" name="clinicCode" id="clinicCode" required="required"/>                                            
                                       </p>
                                       <p>
                                           <label for="name">Нэр:</label>
                                           <input class="input-medium" type="text" value="" name="name" id="name" required="required"/>                                            
                                       </p>
                                       <p>
                                           <label for="section">Бүлэг:</label>
                                           <select name="section" id="section" >
                                           </select>                                                                                      
                                       </p>
                                       <p>
                                           <label for="area">Хамрах хүрээ:</label>
                                           <select name="area" id="area" >
                                               <option value="1">Mouth</option>
                                               <option value="2">Bridge</option>
                                               <option value="3">Tooth</option>
                                               <option value="4">Surface</option>                                                                                             
                                           </select>
                                       </p>
                                       <p>
                                           <label for="name">Цаг:</label>
                                           <select name="timelen" id="timelen" >
                                               <option value="10">10 минут</option>
                                               <option value="20">20 минут</option>
                                               <option value="30">30 минут</option>
                                               <option value="40">40 минут</option>
                                               <option value="50">50 минут</option>
                                               <option value="60">60 минут</option>
                                           </select>
                                       </p>
                                       <p>
                                           <label for="price">Үнэлэгээ:</label>
                                           <input class="input-small" type="number" value="" name="price" id="price" required="required"/>                                            
                                       </p>
                                       <p>
                                           <label for="descr">Тайлбар:</label>
                                           <textarea name="descr" id="descr" class="richtext" cols="60" rows="4"></textarea>
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
                    </form>
                 </div>
         </div>
</div><!--end content-->
                                                
               