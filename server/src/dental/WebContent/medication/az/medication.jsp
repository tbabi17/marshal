<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String code = request.getParameter("id");
%>
<div id="content">                                      	
   <div class="jquery_tab">
    <div class="vcard" id="vcard">
    	
    </div>                        
         
    <h2>Холбоотой зураг</h2>
    <div id="images">
    	<img src="http://www.johnrcarsondds.com/wp-content/themes/carsondds/images/teeth-before-after.jpg" width="80" height="80"></img>
    	&nbsp;
    	<img src="http://greendentaldelaware.com/images/before_after_cerec.jpg" width="80" height="80"></img>
    </div>    
    
	<script>
		var code = '<%=code%>';
		$(document).ready(function() {			
			medication_reader(code);
		});
	</script>
	<br/>
	<br/>
	<input class="button" name="submit" type="button" value="Шинэчлэх" onclick="javascript:call_medication_edit_form('<%=code%>')"/>
	<input class="button-gray" name="back" type="button" value="Буцах" onclick="javascript:content_changer('medication/az/index.jsp','az', 4)"/>        
</div>
</div>