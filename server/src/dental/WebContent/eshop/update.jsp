<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String code = request.getParameter("id");	
%>
<div id="content">                                      	   
	<form id="edit_product">    		   
   	 	<div class="my_form_box">   	 		
	    	<div class="editform">    	                                
				<div class="my_left_box">
					<p>
					   <label for="name">Код:</label>
					   <input class="input-small" type="text" value="" name="code" id="code" required="required" disabled/>                                            
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
					   <input class="input-small number" type="number" value="" name="price" id="price" required="required"/>                                            
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
				    	<label for="name"><a id="insert_image">Зураг оруулах</a></label>
						<input type="hidden" value="" id="uri" name="uri"></input>
						<img id="image" style="width:180px;height:180px; border: 2px dashed #ccc;"/>						
				   </p>						    
				</div>				   
	    	</div>
	    	<div class="my_bottom_box">
	    		<div id="bottom_bar">
               		<div id='permission_bar'></div>
               		<div id='update_save_bar'><input class="button" name="submit" type="submit" value="Хадгалах"/><input class="button" name="button" type="button" value="Устгах" id="delete"/></div>
               		<input class="button-gray" id="back" name="back" type="button" value="Буцах"/>
               		<div id="result-log"></div>
             	</div>             		                            		           		             	
	        </div>    	
    </div>         
    </form>
	<script>
		var code = '<%=code%>';
		$(document).ready(function() {					
			init_product_types_select();
			put_module_to_form('edit_product');
			
			/*
			$("#edit_product").submit(function(event) {		                                        
                event.preventDefault(); 
				
                var $form = $("#edit_product"),		                                             
                fields = 'code,name,type,price,company,descr';
                types = ['s','s','t','i','s','d'];
                                                       
                var fds = fields.split(',');
       			var vls = '';
                for (i = 0; i < fds.length; i++) {
                	if (types[i] == 's')
                		vls += types[i]+replaceAll($form.find( 'input[name="'+fds[i]+'"]' ).val(), ',', ';')+',';
                	else
            		if (types[i] == 'd')
                		vls += 's'+replaceAll($form.find( 'textarea[name="'+fds[i]+'"]' ).val(), ',', ';')+',';
            		else
                	if (types[i] == 'i')
                		vls += 'i'+$form.find( 'input[name="'+fds[i]+'"]' ).val()+',';            	            	
                	else
                	if (types[i] == 't')
                		vls += 'i'+$form.find( 'select[name="'+fds[i]+'"]' ).val()+',';
                }
                   
                var code = $form.find( 'input[name="code"]' ).val();
                $.ajax({
                  type: 'POST',	
       			  url: __q_gw,
       			  data: __json_autorize_update('products', 'code,name,type,price,company,descr', vls, " code='"+code+"'"),
       			  success: function(data) {
	       			    updateImage(code, 'products');
	       			    load_customers_one_data('code');
	       			    fill_datas['eshop'] = '';
	       			    reload_products();       			    
	       			 	content_changer('eshop/index.jsp','eshop', 8);
       			  },
       			  error: function(data) {
       				  
       			  }
       			});                
            });	
			
			*/
		});
		
		
	</script>        
</div>