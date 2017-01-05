<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<script>
	var _ptype = 'all';
	var _doctor = 'all';
	var _date = '1';
	var _key_customer = '';
	
	function render_report_customer_list(ptype,doctor,date) {
		var content = '<table id="table_customers" width="80%"  cellspacing="0" style="border-left:1px solid #dadee0;">'+
				 		'<thead>'+				     		
				 			'<th style="border-right:0px solid #dadee0;" width="20%">Үйлчлүүлэгч</th>'+									     			
				 			'<th style="border-right:0px solid #dadee0;" width="16%">Огноо</th>'+
				 			'<th style="border-right:0px solid #dadee0;" width="6%">Эмч</th>'+									     			
				 			'<th style="border-right:0px solid #dadee0; text-align: right" width="9%" align="right">Нийт дүн</th>'+
				 			'<th style="border-right:0px solid #dadee0; text-align: right" width="8%" align="right">Хөнгөлөлт</th>'+
				 			'<th style="border-right:0px solid #dadee0; text-align: right" width="10%" align="right">Төлсөн</th>'+
				 			'<th style="border-right:0px solid #dadee0; text-align: right" width="8%" align="right">Үлдэгдэл</th>'+
				 			'<th style="border-right:0px solid #dadee0;" width="5%">Төрөл</th>'+
				 			'<th style="border-right:0px solid #dadee0;" width="5%">Бүртгэсэн</th>'+
				 		'</thead>';	
		if (date == -1) date = _date;
		if (doctor == -1) doctor = _doctor;
		if (ptype == -1) ptype = _ptype;
		
		_ptype = ptype; _doctor = doctor; _date = date;
 		$.post(__q_gw, __json_autorize_custom('_report_customer_list', date), function(data) {
 			var t = 0;
 			var total = 0, payment = 0, diff = 0, discount = 0;
 			$.each(data.items, function(i, item) {
 				lower = item.fullName.toLowerCase();
 				if ((doctor == 'all' || doctor == item.doctorCode) && (ptype == 'all' || ptype == item.paymentType) && (lower.indexOf(_key_customer) >= 0)) {
 					var ognoo = item.startDate.substring(0, 10)+' '+item.startDate.substring(11, 16)+'-'+item.endDate.substring(11, 16); 					
	 				content += '<tr>'+																		     						
									'<td style="border-right:0px solid #dadee0;" class="'+(t%2==0?"alt":"")+'">'+item.fullName+'</td>'+
									'<td style="border-right:0px solid #dadee0;" class="'+(t%2==0?"alt":"")+'">'+ognoo+'</td>'+
									'<td style="border-right:0px solid #dadee0;" class="'+(t%2==0?"alt":"")+'">'+getFullNameMix(hash['edit_doctor'][item.doctorCode])+'</td>'+					     																     									
									'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+render_money(item.total)+'</td>'+
									'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+render_money(item.discount)+'</td>'+
									'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+render_money(item.payment)+'</td>'+
									'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+render_money(item.total-item.discount-item.payment)+'</td>'+
									'<td style="border-right:0px solid #dadee0;" class="'+(t%2==0?"alt":"")+'">'+item.paymentType+'</td>'+		
									'<td style="border-right:0px solid #dadee0;" class="'+(t%2==0?"alt":"")+'">'+item.userCode+'</td>'+		
								'</tr>';
								
					total += item.total;
					payment += item.payment;
					discount += item.discount;
					diff = total - payment - discount;
					t++;
 				}
 			});
 			
 			content += '<tfood>'+ 										     								
							'<th style="border-right:0px solid #dadee0;"><b>'+t+' эмчилгээ</b></th>'+
							'<th style="border-right:0px solid #dadee0;" colspan="2"> </th>'+
							'<th style="border-right:0px solid #dadee0; text-align: right;">'+render_money_ex(total)+'</th>'+
							'<th style="border-right:0px solid #dadee0; text-align: right;">'+render_money_ex(discount)+'</th>'+
							'<th style="border-right:0px solid #dadee0; text-align: right;">'+render_money_ex(payment)+'</th>'+
							'<th style="border-right:0px solid #dadee0; text-align: right;")>'+render_money_ex(diff)+'</th>'+
							'<th style="border-right:0px solid #dadee0;"></th>'+		
							'<th style="border-right:0px solid #dadee0;"></th>'+		
						'</tfood>';
 			
 			content += "</table>";
 			$("#report_customer_list").html(content);
 	   	});				 	   	 		
	}
	
	function render_report_doctor_list(date) {
		var content = '<table id="table_customers" width="80%"  cellspacing="0" style="border-left:1px solid #dadee0;">'+
				 		'<thead>'+
				 			'<th style="border-right:0px solid #dadee0;" width="20%">Эмч</th>'+
				 			'<th style="border-right:0px solid #dadee0; text-align: right;" width="5%">Эмчилгээний тоо</th>'+
				 			'<th style="border-right:0px solid #dadee0; text-align: right" width="10%" align="right">Нийт дүн</th>'+
				 			'<th style="border-right:0px solid #dadee0; text-align: right" width="10%" align="right">Хөнгөлөлт</th>'+
				 			'<th style="border-right:0px solid #dadee0; text-align: right" width="10%" align="right">Төлсөн</th>'+
				 			'<th style="border-right:0px solid #dadee0; text-align: right" width="10%" align="right">Үлдэгдэл</th>'+				 			
				 		'</thead>';	
		if (!date) date = 0;				 						 			
 		$.post(__q_gw, __json_autorize_custom('_report_doctor_list', date), function(data) {
 			var t = 0;
 			var total = 0, payment = 0, diff = 0, count = 0, discount = 0;
 			$.each(data.items, function(i, item) {
 				content += '<tr>'+												
								'<td style="border-right:0px solid #dadee0;" class="'+(t%2==0?"alt":"")+'">'+getFullNameMix(hash['edit_doctor'][item.doctorCode])+'</td>'+
								'<td style="border-right:0px solid #dadee0; text-align: right;" class="'+(t%2==0?"alt":"")+'">'+item.count+'</td>'+
								'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+render_money(item.total)+'</td>'+
								'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+render_money(item.discount)+'</td>'+
								'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+render_money(item.payment)+'</td>'+
								'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+render_money(item.total-item.payment)+'</td>'+								
							'</tr>';
							
				total += item.total;
				payment += item.payment;
				discount += item.discount;
				diff = total - discount - payment;
				count += item.count;
				t++;
 			});
 			
 			content += '<tfood>'+ 							
 							'<th style="border-right:0px solid #dadee0;"> </th>'+
							'<th style="border-right:0px solid #dadee0; text-align: right;"><b>'+count+'</b></th>'+							
							'<th style="border-right:0px solid #dadee0; text-align: right;">'+render_money_ex(total)+'</th>'+
							'<th style="border-right:0px solid #dadee0; text-align: right;">'+render_money_ex(discount)+'</th>'+
							'<th style="border-right:0px solid #dadee0; text-align: right;">'+render_money_ex(payment)+'</th>'+
							'<th style="border-right:0px solid #dadee0; text-align: right;")>'+render_money_ex(diff)+'</th>'+								
						'</tfood>';
 			
 			content += "</table>";
 			$("#report_doctor_list").html(content);
 	   	});				 	   	 		
	}
	
	function render_report_product_list() {
		var content = '<table id="table_products" width="80%"  cellspacing="0" style="border-left:1px solid #dadee0;">'+
				 		'<thead>'+
				 			'<th style="border-right:0px solid #dadee0;" width="5%">Код</th>'+
				 			'<th style="border-right:0px solid #dadee0;" width="20%">Бараа</th>'+
				 			'<th style="border-right:0px solid #dadee0; text-align: right;" width="5%">Үнэ</th>'+
				 			'<th style="border-right:0px solid #dadee0; text-align: right;" width="5%">Нийт тоо</th>'+
				 			'<th style="border-right:0px solid #dadee0; text-align: right" width="10%" align="right">Эмч 1</th>'+
				 			'<th style="border-right:0px solid #dadee0; text-align: right" width="10%" align="right">Эмч 2</th>'+
				 			'<th style="border-right:0px solid #dadee0; text-align: right" width="10%" align="right">Эмч 3</th>'+				 							 		
				 		'</thead>';						 						 		
 		$.post(__q_gw, __json_autorize_custom('_report_product_list', ''), function(data) {
 			var t = 0;
 			var total = 0; 			
 			$.each(data.items, function(i, item) { 				
 				content += '<tr>'+
 								'<td style="border-right:0px solid #dadee0;" class="'+(t%2==0?"alt":"")+'">'+item.code+'</td>'+
								'<td style="border-right:0px solid #dadee0;" class="'+(t%2==0?"alt":"")+'">'+item.name+'</td>'+
								'<td style="border-right:0px solid #dadee0; text-align: right;" class="'+(t%2==0?"alt":"")+'">'+render_money(item.price)+'</td>'+
								'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+(item.total)+'</td>'+
								'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+(item.user1)+'</td>'+
								'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+(item.user2)+'</td>'+
								'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+(item.user3)+'</td>'+								
							'</tr>';
							
				total += item.total;				
				t++;
 			});
 			
 			content += '<tfood>'+ 							
 							'<th style="border-right:0px solid #dadee0;"> </th>'+
							'<th style="border-right:0px solid #dadee0; text-align: right;"><b>'+count+'</b></th>'+							
							'<th style="border-right:0px solid #dadee0; text-align: right;">'+render_money_ex(total)+'</th>'+
							'<th style="border-right:0px solid #dadee0; text-align: right;">'+render_money_ex(0)+'</th>'+
							'<th style="border-right:0px solid #dadee0; text-align: right;">'+render_money_ex(0)+'</th>'+
							'<th style="border-right:0px solid #dadee0; text-align: right;")>'+render_money_ex(0)+'</th>'+								
						'</tfood>';
 			
 			content += "</table>";
 			$("#report_product_list").html(content);
 	   	});				 	   	 		
	}
	
	function search_report_doctor_filter() {	
		if ($('#filter_report_doctor_form').is(":visible")) {
			$('#filter_report_doctor_form').hide();
			$('#search_report_doctor_filter_button').removeClass('combo_selected');
			$('#search_report_doctor_filter_button').addClass('combo');
			
			$('#filter_report_doctor_button').removeClass('filter_selected');
			$('#filter_report_doctor_button').addClass('filter');
		}
		else {
			$('#search_report_doctor_filter_button').removeClass('combo');
			$('#search_report_doctor_filter_button').addClass('combo_selected');
			$('#filter_report_doctor_form').show();
			
			$('#filter_report_doctor_button').removeClass('filter');
			$('#filter_report_doctor_button').addClass('filter_selected');
		}		
	}
	
	function search_report_customer_filter() {	
		if ($('#filter_report_customer_form').is(":visible")) {
			$('#filter_report_customer_form').hide();
			$('#search_report_customer_filter_button').removeClass('combo_selected');
			$('#search_report_customer_filter_button').addClass('combo');
			
			$('#filter_report_customer_button').removeClass('filter_selected');
			$('#filter_report_customer_button').addClass('filter');
		}
		else {
			$('#search_report_customer_filter_button').removeClass('combo');
			$('#search_report_customer_filter_button').addClass('combo_selected');
			$('#filter_report_customer_form').show();
			
			$('#filter_report_customer_button').removeClass('filter');
			$('#filter_report_customer_button').addClass('filter_selected');
		}		
	}
	
	$(document).ready(function() {
		if (logged == 10) {
			var key = prompt("Нууц дугаар", "");
			if (key == "2015") {
				render_report_customer_list('all','all', -1);
				render_report_doctor_list();
				render_report_product_list();
				init_doctors_select();
			
				search_report_customer_filter();
				search_report_doctor_filter();
			
				$("#report_customer_main_search").keyup(function(){
					_key_customer = $(this).val();
					render_report_customer_list(-1,-1,-1);
				});
			} else {
				alert('access denied !');
				
			}
		} else
			alert('access denied !');
 	});
</script>                        	
<div id="content">                                                                               
	<div class="jquery_tab">                     
          <div class="content_block">
             <h2 class="jquery_tab_title">Үйлчлүүлэгчээр</h2>
			 
			 <div style="margin-bottom: 5px;">
	     	 	<div style="display: inline-block; width: 350px" >			     	 	
	     	 		<input type="text" class="input-combo" id="report_customer_main_search" name="report_customer_main_search"  value=""/>
	     	 		<div class="combo" id="search_report_customer_filter_button" onclick="search_report_customer_filter()" title="Нарийвчлан хайх"><span class="filter" id="filter_report_customer_button"></span></div>
	     	 	</div>
	     	 	<div style="float:right; display: none;" id="filter_report_customer_form">
	     	 		<label for="report_customer_payment_type" class="fixed">Гүйлгээ:</label>
					<select name="report_customer_payment_type" id="report_customer_payment_type" onchange="render_report_customer_list(this.value, -1, -1)">
						<option value='all'>Бүгд</option>
						<option value='бэлнээр'>Бэлнээр</option>
						<option value='банкаар'>Банкаар</option>													
					</select>	
					
					<label for="doctor_medi_main" class="fixed">Эмч:</label>
					<select name="doctor_medi_main" id="doctor_medi_main" onchange="render_report_customer_list(-1, this.value, -1)">
						
					</select>			     	 	
					
					<label for="report_customer_main_date" class="fixed">Хугацаа:</label>
		            <select name="report_customer_main_date" id="report_customer_main_date" required="required" onchange="render_report_customer_list(-1, -1, this.value)">
		             	<option value=0>Бүгдийг</option>
		             	<option value=1 selected>Өнөөдрийн</option>
		             	<option value=7>7 хоногоор</option>	             	
		             	<option value=30>Сараар</option>
		             	<option value=120>Улирлаар</option>
		             	<option value=365>Жилээр</option>							   					                                               
			    	</select>
				</div>
			 </div>
			     	 
			 <div id="report_customer_list">
				                                    
			 </div>																		
		  </div>
	 </div>       
	 
	 <div class="jquery_tab">
                      
        <div class="content_block">
            <h2 class="jquery_tab_title">Эмчээр</h2>
			
			<div style="margin-bottom: 5px;">
	     	 	<div style="display: inline-block; width: 350px" >			     	 	
	     	 		<input type="text" class="input-combo" id="report_doctor_main_search" name="report_doctor_main_search"  value=""/>
	     	 		<div class="combo" id="search_report_doctor_filter_button" onclick="search_report_doctor_filter()" title="Нарийвчлан хайх"><span class="filter" id="filter_report_doctor_button"></span></div>
	     	 	</div>
	     	 	<div style="float:right; display: none;" id="filter_report_doctor_form">
					<label for="report_doctor_main_date" class="fixed">Хугацаа:</label>
		            <select name="report_doctor_main_date" id="report_doctor_main_date" required="required" onchange="render_report_doctor_list(this.value)">
		             	<option value=0>Бүгдийг</option>
		             	<option value=1>Өнөөдөрийн</option>
		             	<option value=7>7 хоногоор</option>	             	
		             	<option value=30>Сараар</option>
		             	<option value=120>Улиралаар</option>
		             	<option value=365>Жилээр</option>							   					                                               
			    	</select>
				</div>
			 </div>
			 	
			<div id="report_doctor_list">
			                                    
			</div>																		
		</div>
	 </div>    
	 
	 <div class="jquery_tab">
                      
              <div class="content_block">
                  <h2 class="jquery_tab_title">Бүтээгдэхүүнээр</h2>
			
			<div id="report_product_list">
			                                    
			</div>																		
		</div>
	 </div>                                             
</div><!--end content-->
                                                
               