<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	String who = request.getParameter("who");
	if (who == null) who = "";
%>
<span class='memberinfo_span' id="clinic_id">
	<a style="color:#808080"></a>
</span>                                        
    
    <span class='memberinfo_span' id="basket">
    	<a style="color:#808080" onclick="javascript:show_basket()" class="basket">Захиалга (0)</a>
    </span>

	<%if (who.equals("corporate")) {%>    
    <span class='memberinfo_span' id="chat">
    	<a style="color:#808080" onclick="javascript:show_chat()" class="service">Онлайн зөвлөх</a>
    </span>
    <%} %>
    
    <span class='memberinfo_span'>
    	<a style="color:#808080" onclick="javascript:exit_dental()" class="logout">Нууцлах</a>
    </span>     
              
    <span class='memberinfo_span'>
   	<div class="socials">		
		<a href="http://www.facebook.com/" class="facebook tooltip" original-title="Facebook"></a>
		<a href="http://twitter.com/" class="twitter tooltip" original-title="Twitter"></a>					
		<a href="#" class="google_plus tooltip" original-title="Google plus"></a>														
	</div>                         
</span>  