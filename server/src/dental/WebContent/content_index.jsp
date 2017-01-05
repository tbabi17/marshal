<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<div id="content">
    <div class="jquery_tab">
    
        <div class="content_block">
            <h2 class="jquery_tab_title">Үндсэн цонх</h2>                                                                        
            
            <span class="dashboard_button button2" onclick="javascript:content_changer('schedule/index.jsp','schedule', 2)">
                <span class="dashboard_button_heading">Цагийн бүртгэл</span>
                <span>Цагийн хуваарь, цаг авах, хуваарьлах</span>
            </span><!--end dashboard_button-->
            
            <span class="dashboard_button button3" onclick="javascript:content_changer('medication/main/index.jsp','main', 3)">
                <span class="dashboard_button_heading">Эмчилгээ</span>
                <span>Эмчилгээний бүртгэл, өвчтний стор</span>
            </span><!--end dashboard_button-->
            
            <span class="dashboard_button button4" onclick="javascript:content_changer('medication/az/index.jsp','medication', 4)">
                <span class="dashboard_button_heading">Үнэ тариф</span>
                <span>Эмчилгээ, оношилгоо, үнэ тариф</span>
            </span><!--end dashboard_button-->
            
            <span class="dashboard_button button5" onclick="javascript:content_changer('medication/doctors/index.jsp','doctor', 5)">
                <span class="dashboard_button_heading">Эмч, ажилчид</span>
                <span>Эмч, ажилчдын мэдээлэл</span>
            </span><!--end dashboard_button-->
            
            <span class="dashboard_button button6" onclick="javascript:content_changer('customers/index.jsp','customer', 6)">
                <span class="dashboard_button_heading two_lines">Өвчтний бүртгэл</span>
                <span>Өвчтний жагсаалт, дэлгэрэнгүй мэдээлэл</span>
            </span><!--end dashboard_button-->
            
            <span class="dashboard_button button9" href="#">
                <a href="medication/az/"><span class="dashboard_button_heading two_lines">Захидал</span></a>
                <span>Үйлчлүүлэгчээс ирсэн захидал</span>
            </span><!--end dashboard_button--> 
            
            <span class="dashboard_button button7" onclick="javascript:content_changer('report/index.jsp','report', 7)">
                <span class="dashboard_button_heading two_lines">Тайлан мэдээ</span>
                <span>Үйл ажиллагаа, орлогын тайлан</span>
            </span><!--end dashboard_button-->                                                                                                                                                                        
            
            
            <span class="dashboard_button button8" onclick="javascript:content_changer('eshop/index.jsp','product', 7)">
                <span class="dashboard_button_heading two_lines">Бараа бүтээгдэхүүн</span>
                <span>Шүдний бараа бүтээгдэхүүн харах</span>
            </span><!--end dashboard_button-->  
         
            <span class="dashboard_button button12" onclick="javascript:content_changer('help/index.jsp','traige', 13)">
                <span class="dashboard_button_heading">Ашиглах заавар</span>
                <span>Програм ашиглах талаарх зааварчилгаа</span>
            </span><!--end dashboard_button-->
                                                                                                                                                                                                                     
		</div><!--end content_block-->
		
				                              
		<div class="index_bottom_box">
		  <div id="last-customers" class="index-box">	
		     	<div class="fancy-header"><span class="near">Сүүлд үйлчлүүлсэн үйлчлүүлэгчид</span></div>
		        <div id="last_customers" class="content_layout">
		        </div>                      
		  </div>
		                                         
		  <div id="recare-customers" class="index-box" style="float:right">
		  	<div class="fancy-header"><span class="near">Дуудах шаардлагатай үйлчлүүлэгчид</span></div>                                    	                                    	
		     	<div id="recare_customers" class="content_layout">
		        </div>
		  </div>
		 </div>    
   </div><!-- end jquery_tab -->                                
    
</div><!--end content-->