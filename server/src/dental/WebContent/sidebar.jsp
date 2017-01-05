<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div id="search-bar">
	<input type="input" class="input-search" id="tags" name="searchField" value="Хайх зүйлээ бичнэ үү..." onfocus="if(this.value==this.defaultValue)this.value='';" onblur="if(this.value=='')this.value=this.defaultValue;">
</div>    
<ul class="nav">	
    <li id="item1" class="current">
    	<a class="headitem item1" onclick="javascript:content_changer('content_index.jsp','index', 1)">Үндсэн цонх</a>    							      
    </li>
    <li id="item2">
    	<a class="headitem item2" onclick="javascript:content_changer('schedule/index.jsp','schedule', 2)">Цагийн бүртгэл</a>						                                   
    </li>
    <li id="item3">
    	<a class="headitem item3" onclick="javascript:content_changer('medication/main/index.jsp','main', 3)">Эмчилгээ</a>        
    </li>
    <li>
    	<a class="headitem item4" href="#">Бүртгэл</a>
    	<ul>
        	<li id="item6"><a class="hand" onclick="javascript:content_changer('customers/index.jsp','customer', 6)">Өвчтний мэдээлэл</a></li>
        	<li id="item4"><a class="hand" onclick="javascript:content_changer('medication/az/index.jsp','medication', 4)">Тариф/Онош</a></li>
        	<li id="item5"><a class="hand" onclick="javascript:content_changer('medication/doctors/index.jsp','doctor', 5)">Эмч ажилчид</a></li>        	
        </ul>						        
    </li>    
</ul><!--end subnav-->
 
<div class="flexy_datepicker"></div>                           
<ul>
	 <li><a class="headitem item7" href="#">Бусад</a>
         <ul>         	 
    	     <li id="item8"><a class="hand" onclick="javascript:content_changer('eshop/index.jsp','product', 8)">Бараа бүтээгдэхүүн</a></li>
    	     <li id="item9"><a class="hand" onclick="javascript:content_changer('edocs/index.jsp','edocs', 9)">Эмнэлэгийн стандарт</a></li>
    	     <li id="item10"><a class="hand" onclick="javascript:content_changer('traige/index.jsp','traige', 10)">Зөвлөмжүүд</a></li>
    	     <li id="item11"><a class="hand" onclick="javascript:content_changer('settings/index.jsp','settings', 11)">Системийн тохиргоо</a></li>
         </ul>
     </li>
</ul>  
