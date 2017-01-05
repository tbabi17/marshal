<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String code = request.getParameter("id");		
%>
<div id="content">                                      	
   <div class="jquery_tab">	   
    <img class="cimage" src="" height="195" width="170" border="0" alt="зураг" id="cimage" name="cimage" />
    
    <div class="vcard" id="vcard<%=code%>">
    	
    </div>    
                
    <br/>    
    <div id="history<%=code%>">
    	
    </div>
    <br/>
             
    <div class="cimage">
    	<canvas id="dent_chart" width="601" height="265">				     							     				
		</canvas>
		
		<textarea id="history_text_<%=code%>" name="history_text_<%=code%>" cols="66" rows="16" style="background: #eee;" disabled></textarea>
    </div>    
	<script>
		var code = '<%=code%>';
		$(document).ready(function() {
			customer_reader(code);
		});
	</script>
	<br/><br/>
	
	<input class="button" name="submit" type="button" value="Шинэчлэх" onclick="javascript:call_customer_edit_form('<%=code%>')"/>
	<input class="button-gray" name="back" type="button" value="Буцах" onclick="javascript:content_changer('customers/index.jsp','customer', 6)"/>
</div>
</div>	