<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String id = request.getParameter("id");
%>    
<div id="content">                                      	
   <div class="jquery_tab">
	<div id="sub_main">
		
		<div id="sub_content">                                                                               			 
                <div class="content_block">		
                	Цуцлагдсан үзлэгийн хуваарийг сэргээх үү ? Үзлэгийн дугаар <%=id%>		     		     
			     	     <script>
                			var id = '<%=id%>';
					     	function restore_medi_actions() {					     			                            					     
					     		$.ajax({
									  url: "httpGW?xml="+generateXML('update', 'WRITER', 'orders', 'status', 'i0', ' id='+id),
									  success: function(data) {										  
										  reload_main_list();										  
										  $('#success').html('<div class="message success"><p><strong>Амжилтгүй!</strong>  Алдаа сэргээлээ !</p></div>').delay(2000).fadeOut(0);
										  jQuery( "#dialog" ).dialog( "close" );
									  },
									  error: function(data) {
										  $('#success').html('<div class="message error"><p><strong>Амжилтгүй!</strong>  Алдаа гарлаа !</p></div>').delay(2000).fadeOut(0);
									  }
					     		});
					     	}
					     	
					     	function delete_medi_actions() {					     		
					     		$.ajax({
									  url: "httpGW?xml="+generateXML('delete', 'WRITER', 'orders', ' ', ' ', ' id='+id),
									  success: function(data) {
										  reload_main_list();
										  $('#success').html('<div class="message success"><p><strong>Амжилтгүй!</strong>  Алдаа устгалаа !</p></div>').delay(2000).fadeOut(0);
										  jQuery( "#dialog" ).dialog( "close" );
									  },
									  error: function(data) {
										  $('#success').html('<div class="message error"><p><strong>Амжилтгүй!</strong>  Алдаа гарлаа !</p></div>').delay(2000).fadeOut(0);
									  }
					     		});
					     	}
					     </script>
					     <div class="my_bottom_box">					     	
					     	<br/>
					     	 <p>
                                 <div id="success"></div>
                                 <div id="error"></div>                                        
                             </p>
					     	 <input class="button" name="submit" type="button" value="Сэргээх" onclick="restore_medi_actions()"/>					     	 
					     	 <input class="button" name="delete" type="button" value="Устгах" onclick="delete_medi_actions()"/>
					     	 <input class="button" name="back" type="button" value="Буцах" onclick="javascript:content_changer('medication/main/index.jsp','main', 3)"/>					     						     
					     </div>	
					     					     				   				     					     		     					  
					</div>					
				</div>			
	</div>
</div>
</div>