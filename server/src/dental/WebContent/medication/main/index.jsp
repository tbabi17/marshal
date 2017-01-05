<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
     <div id="content">                             	
 		<div class="jquery_tab">                    
                     
          <div class="content_block">
            <h2 class="jquery_tab_title">Эмчилгээ</h2>
		
			<div>
			     <div class="medication-box">
			     	 <div style="margin-bottom: 5px;">
			     	 	<div style="display: inline-block; width: 350px" >			     	 	
			     	 		<input type="text" class="input-combo" id="main_search" name="main_search"  value=""/>
			     	 		<div class="combo" id="search_filter_button" onclick="search_filter()" title="Нарийвчлан хайх"><span class="filter" id="filter_button"></span></div>
			     	 	</div>
			     	 	<div style="float:right; display: none;" id="filter_form">
			     	 		<label for="selection_medi_main" class="fixed">Төлөв:</label>
							<select name="selection_medi_main" id="selection_medi_main" onchange="hash_reload_main_list(this.value, -1)">
								<option value=-1>Бүгд</option>
								<option value=0>Хүлээгдэж буй</option>
								<option value=2>Амжилттай</option>
								<option value=4>Төлөлт хийгдэх</option>
								<option value=3>Цуцлагдсан</option>								
							</select>	
							
							<label for="doctor_medi_main" class="fixed">Эмч:</label>
							<select name="doctor_medi_main" id="doctor_medi_main" onchange="hash_reload_main_list(this.value, 1)">
								
							</select>			     	 	
							
							<label for="medication_main_date" class="fixed">Хугацаа:</label>
				            <select name="medication_main_date" id="medication_main_date" required="required" onchange="reload_main_list()">
				             	<option value=0>Бүгдийг</option>
				             	<option value=1>Нээлттэй</option>
				             	<option value=3>3 хоногоор</option>	
				             	<option value=7>7 хоногоор</option>	             	
				             	<option value=30>Сараар</option>
				             	<option value=120>Улиралаар</option>
				             	<option value=365>Жилээр</option>							   					                                               
					    	</select>
						</div>
			     	 </div>
			     	 
			     	 <div style="width:100%; float: left;">
			     	 	<div id="summary_row">
			     	 		Бүгд (5)<span class="pixel">&nbsp;</span>Хүлээгдэж буй (0)<span class="pixel">&nbsp;</span>Цуцлагдсан (1)<span class="pixel">&nbsp;</span>Төлөлт хийгдэх (1)<span class="pixel">&nbsp;</span>Амжилттай (1)
			     	 	</div>
			     	 </div>
			     	 
			     	 <div id="main_medication_list">
			     	 
			     	 </div>
			     	 			     	 
			     </div> 
			     <script>
			     	$(document).ready(function() {
			     		search_filter();			     		
			     	});
			     </script>     			     			           
			</div>									
		</div>
		
		
 	</div>    
                                                                                                
</div><!--end content-->
                    