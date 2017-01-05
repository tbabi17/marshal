<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String code = request.getParameter("id");	
%>
<div id="content">                                      	
   <div class="jquery_tab">    
   	
   		<div class="my_form_box">
		    <div class="editform">
		    	<form id="edit_medication" action="">
		           	<div class="my_left_box">
                        	<p>
                                <label for="name">Код:</label>
                                <input class="input-small" type="text" value="" name="code" id="code" required="required" readonly/>
                                <input class="input-small" type="text" value="" name="clinicCode" id="clinicCode" required="required"/>                                            
                            </p>
                            <p>
                                <label for="name">Нэр:</label>
                                <input class="input-medium" type="text" value="" name="name" id="name" required="required"/>                                            
                            </p>
                            <p>
                                <label for="name">Бүлэг:</label>
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
                                <input class="input-small" type="text" value="" name="price" id="price" required="required"/>                                            
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
                		<div id='update_save_bar'>
                		<input class="button" name="submit" type="submit" value="Хадгалах" id="save"/>
                		<input class="button" name="button" type="button" value="Устгах" id="delete"/></div>
                		<input class="button-gray" id="back" name="back" type="button" value="Буцах"/>
                		<div id="result-log"></div>
             		</div>
				</div>
		   </form> 
		</div>             		
	<script>
		var code = '<%=code%>';
		
		$(document).ready(function() {			
			put_module_to_form('edit_medication');				
			init_az_area_select();
		});
	</script>        
 </div>
</div>