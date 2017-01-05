<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
                   
  <div id="content">                       
               <div class="jquery_tab">
               
                   <div class="content_block">
                   		<h2 class="jquery_tab_title">Барааны жагсаалт</h2>
                   		
                   		<div style="margin-bottom: 20px">                          		
                   			<div style="display: inline-block; width: 300px" >
						  		<input class="input-combo" type="text" id="product_search" name="product_search" value="" onkeyup="reload_products_all_filter()"></input>
                   				<div class="combo" id="search_filter_button" onclick="search_filter()" title="Нарийвчлан хайх"><span class="filter" id="filter_button"></span></div>                   				
						  	</div>                   			            			                   	                   			                   	
                   			
                   			<div style="float:right; display: none;" id="filter_form">
                   				<label for="product_type" class="fixed">Төрөл:</label>
                   				<select name="product_type" id="product_type" required="required" onchange="reload_products_all_filter()">							   					                                               
						    	</select>
						    	
						    	<label for="sort" class="fixed">Эрэмбэ:</label>
                   				<select name="sort" id="sort" required="required" onchange="reload_products_all_filter()">
                   					<option value=1>Төрлөөр</option>
		         					<option value=2>Нэр А-Я</option>
		         					<option value=3>Нэр Я-А</option>         					
		         					<option value=4>Үнэ багаас ихрүү</option>
		         					<option value=5>Үнэ ихээс багаруу</option>
								</select>
						    	
						    	<label for="show" class="fixed">Харуулах:</label>
		         				<select name="show_size" id="show_size" required="required" onchange="reload_products_all_filter()">
		         					<option value="0">Бүгд</option>
		         					<option value="10">10</option>
		         					<option value="30">30</option>         					
		         					<option value="50">50</option>
		         					<option value="100">100</option>
		         					<option value="200">200</option>
								</select>
								
								
                   				<input type="checkbox" name="show_my" id="show_my" onchange="reload_products_all_filter()"><span style="font-size:10px">Миний</span></input>                   				
						    </div>	                                		
                   		</div>
                   		                   	
                   		<div id="product_list">
                   		
                   		</div>                                    	                                    					                                                                                                      						
           			</div><!--end content_block-->
           		</div><!--end jquery tab-->
		 	<div class="jquery_tab">
		 		<div class="content_block">                                                                                	                
		  			<h2 class="jquery_tab_title">Ирсэн захиалга</h2>		  			
		  			<div class="my_fill_form_box">
			  			<div id="order_list">
						
	                   	</div>
	                </div>			  					  				
		  		</div>
		 	</div>
		 	
           <div class="jquery_tab">
	  			<div class="content_block">                                                                                	                
		  			<h2 class="jquery_tab_title">Бараа нэмэх</h2>
		  			
		  			<div class="my_form_box">
		  				<form id="add_new_product"> 
		    			<div class="editform">				  			                                   
								<div class="my_left_box">
									<p>
									   <label for="name">Код:</label>
									   <input class="input-small" type="text" value="" name="code" id="code" required="required" onkeyup="show_search_field_eshop()"/>                                            
								    </p>
								    
								    <p>
									   <label for="name">Нэр:</label>
									   <input class="input-medium" type="text" value="" name="name" id="name" required="required"/>                                            
								    </p>
								    
								    <p>
									   <label for="name">Төрөл:</label>
									   <select name="type" id="type" required="required">
							   					                                                
						   			   </select>							                                              
								    </p>
								    
								    <p>
									   <label for="name">Үнэ:</label>
									   <input class="input-small number" type="text" value="" name="price" id="price" required="required"/>                                            
								    </p>
								    <p>
									   <label for="name">Нийлүүлэгч:</label>
									   <input class="input-medium" type="text" value="" name="company" id="company" required="required"/>                                            
								    </p>
								
									<p>
									   <label for="name">Тайлбар:</label>
									   <textarea name="descr" id="descr" cols="60" rows="4"></textarea>                                            
								    </p>
								    <p>
								    	<label for="uri"><a id="insert_image">Зураг оруулах</a></label>
										<input type="hidden" value="" id="uri" name="uri"></input>
										<img id="image" style="width:180px;height:180px; border: 2px dashed #ccc;"/>										
								   	</p>						    								
		                         </div>		                     
		                </div>
		                <div class="my_bottom_box">                            		
			          		<div id="bottom_bar">	                				
		                       	<div id='permission_bar'></div>
		                       	<input type="checkbox" name="still" id="still">Цэвэрлэхгүй байх</input>		                       	
		            			<div id='save_bar'><input class='button' id='submit' name='submit' type='submit' value='Хадгалах'/></div>
		          				<div id="result-log"></div>		          				
		         			</div>	            		
					     </div>  					     
		             </div>
					</form>		             
       			</div><!--end content-->
       	   </div>
    </div>      