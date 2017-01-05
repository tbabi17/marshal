<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<div id="search-bar">
		<input type="input" class="input-search" id="tags" name="" value="Хайх зүйлээ бичнэ үү..." onfocus="if(this.value==this.defaultValue)this.value='';" onblur="if(this.value=='')this.value=this.defaultValue;">
</div>    
<ul class="nav">	
    <li id="item1" class="current">
    	<a class="headitem item1" onclick="javascript:content_changer('content_index.jsp','index', 1)">Эмнэлэгүүд</a>						        
    </li>
    <li id="item2">
    	<a class="headitem item2" onclick="javascript:content_changer('schedule/index.jsp','schedule', 2)">Цагийн бүртгэл</a>						                                   
    </li>
    <li><a class="headitem item4" href="#">Эмчилгээ</a>
        <ul>
        	<li id="item3"><a class="hand" onclick="javascript:content_changer('medication/main/index.jsp','main', 3)">Эмчилгээний бүртгэл</a></li>
        	<li id="item4"><a class="hand" onclick="javascript:content_changer('medication/az/index.jsp','az', 4)">Эмчилгээний жагсаалт</a></li>
        	<li id="item5"><a class="hand" onclick="javascript:content_changer('medication/doctors/index.jsp','doctors', 5)">Эмч нар</a></li>
        </ul>
    </li>    
</ul><!--end subnav-->
 
<div class="flexy_datepicker"></div>
<ul>
	 <li><a class="headitem item7" href="#">Хэрэгцээт</a>
         <ul>
         	 <li id="item7"><a class="hand" onclick="javascript:content_changer('messages/index.jsp','messages', 7)">Ирсэн захидал (<b>1</b>)</a></li>
    	     <li><a class="hand" onclick="javascript:content_changer('eshop/index.jsp','eshop', 7)">Бараа бүтээгдэхүүн</a></li>
         </ul>
     </li>
</ul>  
