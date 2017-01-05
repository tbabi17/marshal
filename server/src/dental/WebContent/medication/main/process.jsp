<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String data = request.getParameter("data");
	String action = request.getParameter("action");
	String age = request.getParameter("age");
	String fullName = mxc.dental.erp.toolController.toUTF8(data.split(",")[3]);
	String code = data.split(",")[0];
	String recare = "";
	String isbaby = "";
	if (data.split(",").length >= 7) {
		recare = data.split(",")[7];
		isbaby = data.split(",")[8];
	}
%>    
      	
<div id="content">                                      	
   <div class="jquery_tab">	                             	                                                                               			
         <div class="content_block">		
          	<h2 class="jquery_tab_title">Эмчилгээ</h2>
               <div class="my_zfull_form_box">
				  <div class="fillform"> 			
					<div id="main_medication_list">
					     <div id="active_order_list">			     				
			     								     						     							     	
			     			<div id="dent_image" style="float:right; display: block">			     						     				
			     				<canvas id="dent_chart" width="601" height="265">				     							     				
			     				</canvas>
			     				<div style="width: 600px; align: center;">			     				 
			     				 <p>
			     				 		<a onmousedown="remove_status()"><img id="remove_status" src="images/remove.png" style="margin: 6px; position: absolute;" title="Цэвэрлэх"></img></a>
		                            	<label for="service">Dental status:</label>
		                            	<select name="dentStatus" id="dentStatus" onchange="main_status_change(1)">
		                            	   <option value=""></option>
		                            	   <option value=" ">Хэвийн</option>
		                                   <option value="c1_black">C1 хар</option>
		                                   <option value="c_red">C улаан</option>
		                                   <option value="f_black">F хар</option>
		                                   <option value="f_red">F улаан</option>
		                                   <option value="s_black">S хар</option>
		                                   <option value="s_red">S улаан</option>
		                                   <option value="-">Авхуулсан</option>
		                                   <option value="O">Ургаж буй</option>
		                                   <option value="ACr">Au Cr</option>
		                                   <option value="PCr">PFM Cr</option>
		                                   <option value="MCr">Metal Cr</option>
		                                   <option value="PoCr">Porcetain Cr</option>
		                                   <option value="Yaz">Язгуур</option>
		                                </select>
		                                <label for="service">Gingival pocket:</label>
		                            	<input class="input-small" type="text" value="" name="g_pocket" id="g_pocket" style="width: 32px; text-align: center;" onchange="main_status_change(2)"/>
		                            	<label for="service">Calculus status:</label>
		                            	<select name="calculus" id="calculus" onchange="main_status_change(3)">
		                            	   <option value=""></option>
		                            	   <option value="">Хэвийн</option>
		                                   <option value="yes">Чулуутай</option>		                                   		                                  
		                                </select>		                                                          
		                            </p>
		                            
		                            <p align="center">
				     				 	<input type="checkbox" id="flag_current_status" name="flag_current_status" checked onclick="chart_status_flag()">Current status</input>&nbsp;&nbsp;<input type="checkbox" id="flag_dental_status" name="flag_dental_status" checked onclick="chart_status_flag()">Dental status</input>&nbsp;&nbsp;<input type="checkbox" id="flag_peno_status" name="flag_peno_status" checked onclick="chart_status_flag()">Perio status</input>				     				 					     				 
				     				 	</br>
				     				 	</br>
				     				 </p>						     				                          			     			
			     				</div>	     				
			     			</div>
		     						     				
		     				<div class="my_right1_box" style="float:left">	
		     					<p>
		     						<label for="baby">Хүүхдийн шүд:</label>
		     						<input type="checkbox" name="isbaby" id="isbaby" onchange="check_baby(this)"/>
		     					</p>	     						
	     						<p>
	     							<label for="fullName">Өвчтин, нас:</label>
	     							<input class="input-small" type="text" value="<%=code+" "+fullName%>" name="fullName" id="fullName" style="width: 160px;" disabled/>
	     							<input class="input-small" type="text" value="<%=age%>" name="age" id="age" style="width: 16px; align: center;" disabled/>		     							
	     						</p>	     						
		     					<form id="tooth_form" action="#">	
		     						<p>	
		                            	<label for="service">Төрөл:</label>	                            	
		                            	<select name="service" id="service" onchange="serviceCheck(this.value)">
		                                   <option value="0">Эмчилгээ ба үзлэг</option>
		                                   <option value="1">Шүд сольсон</option>
		                                </select>		                                
		                            </p>	     						
			     					<p>				     					
				     					<select name="updown" id="updown" style="display:none;">
		                                   <option value="0">Дээд шүд</option>
		                                   <option value="1">Доод шүд</option>
		                                   <option value="2">Бүгд</option>                                   
		                                </select>
		                                <select name="direction" id="direction" style="display:none;">	                                   
		                                   <option value="0">Зүүн тал</option>
		                                   <option value="1">Баруун тал</option>
		                                   <option value="2">Бүгд</option>
		                                </select>
		                                <select name="tooth" id="tooth" style="display:none;">
		                                   <option value="1">1</option>
		                                   <option value="2">2</option>
		                                   <option value="3">3</option>
		                                   <option value="4">4</option>
		                                   <option value="5">5</option>
		                                   <option value="6">6</option>		                                   
		                                   <option value="7">7</option>
		                                   <option value="8">8</option>		                                   
		                                   <option value="0">Бүгд</option>
		                                </select>
		                                
		                                <label for="tIndex">Шүд №:</label>
		                                <input class="input-small" type="text" style="width: 50px; text-align: center; background: yellow;" value="" maxlength="4" name="tIndex" id="tIndex" required="required" onkeyup="put_tooth_params(this.value)"/>
		                                <a onmousedown="selectAll()"><img id="allshud" src="images/node-select-all.png" style="margin: 6px; position: absolute;" title="Бүх шүдийг сонгох"></img></a>
		                                
		                            </p>		                            		                            		                            
		                           	<p>
		                           		<label for="toothSide">Гадаргуу:</label>
		                           		<input type="checkbox" name="buc" value="1" onchange="toothSides()" checked/>BUC
		                           		<input type="checkbox" name="ling" value="2" onchange="toothSides()"/>LING
		                           		<input type="checkbox" name="mes" value="3" onchange="toothSides()"/>MES
		                           		                           				                           		
		                           	</p>
		                           	
		                           	<p>
		                           		<label for="toothSide"></label>
		                           		<input type="checkbox" name="dis" value="4" onchange="toothSides()"/>DIS
		                           		<input type="checkbox" name="occ" value="5" onchange="toothSides()"/>OCC		                           				                           		
		                           	</p>
		                           	                            
		                            <p>
		                            	<label for="service">Эмчилгээ код:</label>
		                            	<input class="input-small" type="text" value="" maxlength="4" name="medicationCode" id="medicationCode" required="required" onkeyup="show_search_field_medicationCode()" style="display:inline;"/>
		                            	<a onmousedown="show_search_field_medicationCode()"><img id="search" src="images/search_zoom.png" style="margin: 6px; position: absolute;"></img></a>
		                            </p>
		                            <p>		     
		                            	<label for="toothQty">Тоо, хөнгө%:</label>                       	
		                                <input class="input-small" style="width: 32px;" type="number" value="1" maxlength="4" name="toothQty" id="toothQty" required="required"/>
		                                <input class="input-small" style="width: 32px;" type="number" value="0" maxlength="4" name="toothDiscount" id="toothDiscount" required="required"/>
		                            </p>

		                            <p style="margin-left: 116px;">			                            	
		                            	<% if (action.equals("write")) {%><input class="button" name="submit" type="submit" value="Нэмэх" />
		                            	<input class="button-gray" name="clear" type="button" value="Цэвэрлэх" onclick="reset_tooth_actions()" />
		                            	<%} %>		                            														                         
		                            </p>
		                        </form>	                            	                            
		     				</div>
					     </div>    
					     <script>					     	
					     	data = '<%=data%>';
					     	action = '<%=action%>';
					     	age = '<%=age%>';					     						     	
					     	reset_values();				
					     	var count_rows = 0;
					     	var uldegdel = 0;
					     	var code = '<%=code%>';
					     	var recare = '<%=recare%>';
					     	var newly = false;
					     	var isbaby1 = '<%=isbaby%>';
					     	
					     	function selectAll() {
					     		var $form = $("#tooth_form");
					     		$form.find( 'input[name="tIndex"]' ).val(0);
					     		$form.find( 'select[name="updown"]' ).val(2);
				     			$form.find( 'select[name="direction"]' ).val(2);
				     			$form.find( 'select[name="tooth"]' ).val(2);	
					     	}
					     	
					     	function render_medi_table() {	
					     		count_rows = 0;					     		
					     		var content = '<table id="table_customers" width="80%"  cellspacing="0" style="border:0px solid #dadee0; margin-bottom: 2px;">'+
					     						'<thead>'+
					     							'<th colspan="9" onclick="show_history()"><img src="images/toggle_small.png" style="float: left;"></img>Өвчтний түүх</th>'+					     							
					     						'</thead>'+
					     						'<tr style="display: none;" id="history_row">'+
						     						'<td colspan="4">Оношын дугаар : <input class="input-small" type="text" value="" maxlength="6" name="onoshCode" id="onoshCode" style="display:inline;"/>'+
					     							'<select style="background: #fff; color: black; font-size: 11px; width: 430px;" multiple="multiple" name="history_option" size="10" id="history_option"></select></td>'+
						     						'<td><a onmousedown="move_history()"><img src="images/arrow.png" width="24px"></img></a></td>'+
					     							'<td colspan="4"><textarea name="history" id="history" rows="11" cols="70"></textarea>'+
					     							'<a onmousedown="save_history()"><img src="images/floppy.png" style="margin: 6px; position: absolute;" title="Түүх хадгалах"></img></a>'+
					     							'<a onmousedown="clear_history()"><img id="clear" src="images/101.png" style="margin-left: 6px; margin-top: 28px; position: absolute;" title="Түүх цэвэрлэх"></img></a>'+
					     							'</td>'+
					     						'</tr>';

									     		
					     		content += '<thead>'+
				     							'<th colspan="9" onclick="show_busad()"><img src="images/toggle_small.png" style="float: left;"></img>Бусад тэмдэглэгээ</th>'+					     							
				     						'</thead>'+
				     						'<tr style="display: none;" id="busad_row">'+
					     						'<td colspan="9">'+
							     						'<table style="width:100%; border: 1px solid #e1e1e1;">'+
							     						'<tr>'+
							     							'<td style="text-align: left; width: 25%">Салстын байдал</td>'+
							     							'<td style="text-align: left; width: 25%">Шүдний паалангийн өөрчлөлт</td>'+				     							
							     							'<td style="text-align: left; width: 25%">Эрүү шүдний гажиг</td>'+
							     							'<td style="text-align: left; width: 25%">Эрүү чамархайн үений үнэлгээ</td>'+
							     						'</tr>'+
							     						'<tr>'+
							     							'<td style="text-align: left;">'+
							     								'<input type="checkbox" name="a11_0" id="a11_0" onchange="check_baidal(this)"/>0 - Хэвийн</br>'+
							     								'<input type="checkbox" name="a11_1" id="a11_1" onchange="check_baidal(this)"/>1 - Хэлний хөвч богино</br>'+
							     								'<input type="checkbox" name="a11_2" id="a11_2" onchange="check_baidal(this)"/>2 - Уруулын хөвч богино</br>'+
							     								'<input type="checkbox" name="a11_3" id="a11_3" onchange="check_baidal(this)"/>3 - Үүдэвч богино</br>'+
							     								'<input type="checkbox" name="a11_4" id="a11_4" onchange="check_baidal(this)"/>4 - Өнгөнийн өөрчлөлт</br>'+
							     								'<input type="checkbox" name="a11_5" id="a11_5" onchange="check_baidal(this)"/>5 - Хавсарсан</br>'+							     											     						
							     							'</td>'+
							     							'<td style="text-align: left;">'+
							     								'<input type="checkbox" name="a12_0" id="a12_0" onchange="check_baidal(this)"/>0 - Үгүй</br>'+
							     								'<input type="checkbox" name="a12_1" id="a12_1" onchange="check_baidal(this)"/>1 - Толбо</br>'+
							     								'<input type="checkbox" name="a12_2" id="a12_2" onchange="check_baidal(this)"/>2 - Гипоплази</br>'+
							     								'<input type="checkbox" name="a12_3" id="a12_3" onchange="check_baidal(this)"/>3 - Тетрациклин</br>'+
							     								'<input type="checkbox" name="a12_4" id="a12_4" onchange="check_baidal(this)"/>4 - Элэгдэл</br>'+
							     								'<input type="checkbox" name="a12_5" id="a12_5" onchange="check_baidal(this)"/>5 - Флюорози</br>'+
							     								'<input type="checkbox" name="a12_6" id="a12_6" onchange="check_baidal(this)"/>6 - Хавсарсан</br>	'+			     							
							     							'</td>'+
							     							'<td style="text-align: left;">'+
							     								'<input type="checkbox" name="a13_0" id="a13_0" onchange="check_baidal(this)"/>0 - Хэвийн</br>'+
							     								'<input type="checkbox" name="a13_1" id="a13_1" onchange="check_baidal(this)"/>1 - Зуултын</br>'+
							     								'<input type="checkbox" name="a13_2" id="a13_2" onchange="check_baidal(this)"/>2 - Эгнээний</br>'+
							     								'<input type="checkbox" name="a13_3" id="a13_3" onchange="check_baidal(this)"/>3 - Шүдний</br>'+
							     								'<input type="checkbox" name="a13_4" id="a13_4" onchange="check_baidal(this)"/>4 - Хавсарсан</br>'+				     								
							     							'</td>'+
							     							'<td style="text-align: left;">'+
							     								'<input type="checkbox" name="a14_0" id="a14_0" onchange="check_baidal(this)"/>0 - ЭЧҮ хэвийн</br>'+
							     								'<input type="checkbox" name="a14_1" id="a14_1" onchange="check_baidal(this)"/>1 - ЭЧҮ дуутай</br>'+
							     								'<input type="checkbox" name="a14_2" id="a14_2" onchange="check_baidal(this)"/>2 - ЭЧҮ өөрөө засардаг гацалт</br>'+
							     								'<input type="checkbox" name="a14_3" id="a14_3" onchange="check_baidal(this)"/>3 - ЭЧҮ мултрал</br>'+
							     								'<input type="checkbox" name="a14_4" id="a14_4" onchange="check_baidal(this)"/>4 - ЭЧҮ холбоотой өвдөлт</br>'+
							     								'<input type="checkbox" name="a14_5" id="a14_5" onchange="check_baidal(this)"/>5 - ам ангайлт хязгаарлагдмал /30 мм доош/</br>'+	
							     							'</td>'+
							     						'</tr>'+
							     					'</table>'+				     								
				     							'</td>'+					     						
				     						'</tr>';
				     						
								content += '<thead">'+
									     		'<th style="border-right:0px solid #dadee0; width:1%;"></th>'+
								     			'<th style="border-right:0px solid #dadee0; width:5%;">Шүд</th>'+									     			
								     			'<th style="border-right:0px solid #dadee0; width:5%;">Хэсэг</th>'+
								     			'<th style="border-right:0px solid #dadee0; width:35%;">Эмчилгээ</th>'+
								     			'<th style="border-right:0px solid #dadee0; text-align:right; width:5%;">Тоо</th>'+
								     			'<th style="border-right:0px solid #dadee0; text-align:right; width:12%;">Үнэ</th>'+
								     			'<th style="border-right:0px solid #dadee0; text-align:right; width:12%;">Дүн</th>'+
								     			'<th style="border-right:0px solid #dadee0; text-align:right; width:5%;">%</th>'+
								     			'<th style="border-right:0px solid #dadee0; width:10%;">Эмч</th>'+								     			
							     		   '</thead>';
                                           
								var t = 0, total = 0, payments = 0, discount = 0;
						     	for (i = 0; i < 3; i++) 
						     		if (medi_bool[i]) {
					     			for (j = 1; j <= 18; j++) {					     				
					     				if (medi_bool[i][j] == true)
					     					for (k = 0; k < medi_actions[i][j].length; k++) {
					     						var item = medi_actions[i][j][k];
					     						
							     				if (hash['edit_medication'][item.medCode].section != 99) {									     												     				
							     					content += '<tr>'+				
							     									'<td style="border-right:0px solid #dadee0;" class="'+(t%2==0?"alt":"")+'"> <% if (action.equals("write")) {%><a href="javascript:remove_row('+i+','+j+','+k+')">X</a><%} %></td>'+					     									
							     									'<td style="border-right:0px solid #dadee0;" class="'+(t%2==0?"alt":"")+'">'+toothIndexTitle(item)+'</td>'+
							     									'<td style="border-right:0px solid #dadee0;" class="'+(t%2==0?"alt":"")+'">'+toothSideTitle(item.toothSide)+'</td>'+
							     									'<td style="border-right:0px solid #dadee0;" class="'+(t%2==0?"alt":"")+'">'+getMedicationName(item)+'</td>'+
							     									'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+item.qty+'</td>'+
							     									'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+render_money(item.price)+'</td>'+
							     									'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+render_money(item.amount)+'</td>'+
							     									'<td style="border-right:0px solid #dadee0;" align="right" class="'+(t%2==0?"alt":"")+'">'+item.discount+'</td>'+
							     									'<td style="border-right:0px solid #dadee0;" class="'+(t%2==0?"alt":"")+'">'+item.doctorCode+'</td>'+							     									
							     								'</tr>';
													total += item.amount;
													payments += item.payment;
													discount += item.amount * item.discount / 100;
							     					t++;							     				
							     					count_rows++;							     					
							     				}
					     					}
					     			}
					     		}	     		
					     		uldegdel = total - discount - payments;
					     		
						     	if (action == 'write') {
							     	content += '<tr>'+														
										'<td style="border-right:0px solid #dadee0;" align="right" colspan="10" class="nobg">'+					     									
										'<b class="summary">Нийт дүн : '+render_money_ex(total)+'</b>'+
										'<input class="input-small" style="width:80px" type="hidden" id="total" name="total" value="'+total+'"/>'+
										'</td>'+										
									'</tr>';
									
									if (discount > 0) {
										content += '<tr>'+														
											'<td style="border-right:0px solid #dadee0;" align="right" colspan="10" class="nobg">'+					     									
											'<b class="summary">Хөнгөлөлт  : '+render_money_ex(discount)+'</b>'+											
											'</td>'+										
										'</tr>';
										content += '<tr>'+														
											'<td style="border-right:0px solid #dadee0;" align="right" colspan="10" class="nobg">'+					     									
											'<b class="summary">Төлбөл зохих : '+render_money_ex(total-discount)+'</b>'+
											'<input class="input-small" style="width:80px" type="hidden" id="total" name="total" value="'+total+'"/>'+
											'</td>'+										
										'</tr>';
									}
									
									if (payments > 0) {
								     	content += '<tr>'+														
											'<td style="border-right:0px solid #dadee0;" align="right" colspan="10" class="nobg">'+					     									
											'<b class="summary">Төлсөн : '+render_money_ex(payments)+'</b>'+						
											'</td>'+										
										'</tr>';
										
										if (total - discount - payments > 0) {
									     	content += '<tr>'+														
												'<td style="border-right:0px solid #dadee0;" align="right" colspan="10" class="nobg">'+					     									
												'<b class="summary">Үлдэгдэл : '+render_money_ex(total-discount-payments)+'</b>'+										
												'</td>'+										
											'</tr>';
										}
									}									
									if (total - payments > 0 && logged_user._group > 1 && !newly) {
										if (payments == 0) {
											content += '<tr>'+														
														'<td style="border-right:0px solid #dadee0;" align="right" colspan="10" class="nobg">'+					     									
														'<b class="summary">Хөнгөлөх дүн : </b>'+
														'<input class="input-large rd" style="width:90px" type="number" align="right" id="precent" name="precent" value="0"/>&nbsp;'+													
														'<input class="button-gray" style="float: right;" name="submit" type="button" value="Бодох" onclick="update_precent()"/>'+
														'</td>'+										
													'</tr>';
										}
										
								     	content += '<tr>'+														
											'<td style="border-right:0px solid #dadee0;" align="right" colspan="10" class="nobg">'+					     									
											'<b class="summary">Төлсөн/Хариулт : </b>'+
											'<input class="input-large rd" style="width:90px" type="number" align="right" id="payed" name="payed" value="0" onkeyup="diff_value()"/>&nbsp;'+
											'<input class="input-large rd" style="width:90px" type="number" align="right" id="diff" name="diff" disabled value="0"/>'+
											'<select id="pay_type"><option value="бэлнээр">бэлнээр</option><option value="дансаар">дансаар</option></select>'+
											'</td>'+										
										'</tr>';
									}
						     	} else {
						     		content += '<tr>'+														
										'<td style="border-right:0px solid #dadee0;" align="right" colspan="10" class="nobg">'+					     									
										'<b class="summary">Нийт дүн : '+render_money_ex(total)+'</b>'+
										'<input class="input-small" style="width:80px" type="hidden" id="total" name="total" value="'+total+'"/><input class="input-small" style="width:80px" type="hidden" id="payed" name="payed" value="'+total+'"/>'+
										'</td>'+										
									'</tr>';
									if (discount > 0) {
										content += '<tr>'+														
											'<td style="border-right:0px solid #dadee0;" align="right" colspan="10" class="nobg">'+					     									
											'<b class="summary">Хөнгөлөлт  : '+render_money_ex(discount)+'</b>'+											
											'</td>'+										
										'</tr>';
										content += '<tr>'+														
											'<td style="border-right:0px solid #dadee0;" align="right" colspan="10" class="nobg">'+					     									
											'<b class="summary">Төлбөл зохих :'+render_money_ex(total-discount)+'</b>'+
											'<input class="input-small" style="width:80px" type="hidden" id="total" name="total" value="'+total+'"/>'+
											'</td>'+										
										'</tr>';
									}
						     		content += '<tr>'+														
										'<td style="border-right:0px solid #dadee0;" align="right" colspan="10" class="nobg">'+					     									
										'<b class="summary">Төлсөн : '+render_money_ex(payments)+'</b>'+										
										'</td>'+										
									'</tr>';
						     	}
								
						     	content += '<tr>'+														
									'<td style="border-right:0px solid #dadee0;" colspan="10" class="nobg">'+					     									
									'<b class="summary">Дуудах хугацаа : <select id="recare" onchange="save_recare()" name="recare"><option value="0">-------</option><option value="14">14 хоног</option><option value="21">21 хоног</option><option value="30">30 хоног</option><option value="45">45 хоног</option><option value="90">3 сар</option><option value="180">6 сар</option><option value="365">1 жил</option></select></b>'+										
									'</td>'+										
								'</tr>';
								
								content += '</table>';
								$("#medilist").html(content);
								
								action_before(dts[2]);
								
								if (total == 0)
									$("#print").hide();
					     	}
					     	
					     	function get_baidal() {
					     		var xp = module_xp['edit_currents'];
					     		var where = ' WHERE '+replaceAll(xp['wtmpl'], '#', code);
					     		var __q = __json_autorize(xp['table'], xp['fields'], xp['types'], where);	
					     		$.post(__q_gw, __q, function(data) {				
					     			  $.each(data.items, function(i, item) {			  
					     				 	for(var key in item) {
					     				 		if (document.getElementById(key))
						     			   			document.getElementById(key).checked = item[key] == 1;
						     			 	}
					     			  });					     			  					     			 
					     		});
					     	}
					     	
					     	function check_baidal(e) {		
					     		var v = (e.checked?1:0);					     		
				     			$.ajax({
				     				  type: 'POST',
									  url: __q_gw,
									  data: __json_autorize_update('currents', e.id, 'i'+v, " customerCode="+code),
									  success: function(data) {										  
										  $('#result-log').html(successMsg).delay(2000).fadeOut(function() {
										  		$(this).html('');
										  		$(this).fadeIn();
										  	});
									  },
									  error: function(data) {
										  $('#result-log').html(errorMsg).delay(2000).fadeOut(function() {
										  		$(this).html('');
										  		$(this).fadeIn();
										  	});
									  }
					     		});					     		
					     	}
					     	
					     	function anketchange(e) {		
					     		var v = e.value;
					     		if (e.id == 'anket_2' || e.id == 'anket_3') {					     			
					     			$.ajax({
					     				  type: 'POST',
										  url: __q_gw,
										  data: __json_autorize_update('customers', e.id+','+e.id+'_descr', 'i'+v+',s'+$('#'+e.id+'_descr').val(), " code='"+code+"'"),
										  success: function(data) {										  
											  $('#result-log').html(successMsg).delay(2000).fadeOut(function() {
											  		$(this).html('');
											  		$(this).fadeIn();
											  	});
										  },
										  error: function(data) {
											  $('#result-log').html(errorMsg).delay(2000).fadeOut(function() {
											  		$(this).html('');
											  		$(this).fadeIn();
											  	});
										  }
						     		});	
					     		} else {
					     			$.ajax({
					     				  type: 'POST',
										  url: __q_gw,
										  data: __json_autorize_update('customers', e.id, 'i'+v, " code='"+code+"'"),
										  success: function(data) {										  
											  $('#result-log').html(successMsg).delay(2000).fadeOut(function() {
											  		$(this).html('');
											  		$(this).fadeIn();
											  	});
										  },
										  error: function(data) {
											  $('#result-log').html(errorMsg).delay(2000).fadeOut(function() {
											  		$(this).html('');
											  		$(this).fadeIn();
											  	});
										  }
						     		});	
					     		}
					     	}
					     	
					     	function put_tooth_params(val) {
					     		var $form = $("#tooth_form");
								if (val > 10 && val < 50 && isbaby) {
									$form.find( 'input[name="tIndex"]' ).val('');
									alert('Шүдний дугаар буруу байна !');
									return;
								} else 
								if (val > 50 && val < 90 && !isbaby) {
									$form.find( 'input[name="tIndex"]' ).val('');
									alert('Шүдний дугаар буруу байна !');
									return;
								} else
								if (val >= 90) {
									$form.find( 'input[name="tIndex"]' ).val('');
									alert('Шүдний дугаар буруу байна !');
									return;
								}
								
						     		if (val > 80) {
						     			$form.find( 'select[name="updown"]' ).val(1);
						     			$form.find( 'select[name="direction"]' ).val(1);
						     			$form.find( 'select[name="tooth"]' ).val(val-80);					     			
						     		} else
					     			if (val > 70) {
						     			$form.find( 'select[name="updown"]' ).val(1);
						     			$form.find( 'select[name="direction"]' ).val(0);
						     			$form.find( 'select[name="tooth"]' ).val(val-70);					     			
						     		} else
					     			if (val > 60) {
						     			$form.find( 'select[name="updown"]' ).val(0);
						     			$form.find( 'select[name="direction"]' ).val(0);
						     			$form.find( 'select[name="tooth"]' ).val(val-60);					     			
						     		} else
					     			if (val > 50) {
						     			$form.find( 'select[name="updown"]' ).val(0);
						     			$form.find( 'select[name="direction"]' ).val(1);
						     			$form.find( 'select[name="tooth"]' ).val(val-50);					     			
						     		} else			     			
					     			if (val > 40) {
						     			$form.find( 'select[name="updown"]' ).val(1);
						     			$form.find( 'select[name="direction"]' ).val(1);
						     			$form.find( 'select[name="tooth"]' ).val(val-40);					     			
						     		} else
					     			if (val > 30) {
						     			$form.find( 'select[name="updown"]' ).val(1);
						     			$form.find( 'select[name="direction"]' ).val(0);
						     			$form.find( 'select[name="tooth"]' ).val(val-30);					     			
						     		} else
						     		if (val > 20) {
						     			$form.find( 'select[name="updown"]' ).val(0);
						     			$form.find( 'select[name="direction"]' ).val(0);
						     			$form.find( 'select[name="tooth"]' ).val(val-20);		
						     		} else
						     		if (val > 10) {
						     			$form.find( 'select[name="updown"]' ).val(0);
						     			$form.find( 'select[name="direction"]' ).val(1);
						     			$form.find( 'select[name="tooth"]' ).val(val-10);		
						     		}

					     		
					     		if (calculus_status[val])
					     			$("#calculus").val(calculus_status[val].v);
					     		else
					     			$("#calculus").val('');
					     		
					     		if (main_status[val])
					     			$("#dentStatus").val(main_status[val].v);
					     		else
					     			$("#dentStatus").val('');
					     		
					     		if (gingival_status[val])
					     			$("#g_pocket").val(gingival_status[val].v);
					     		else
					     			$("#g_pocket").val('');
					     	} 
					     	
					     	function main_status_change(index) {
					     		var id = $('#tIndex').val();
								var side_all = parseInt(toothSides());//$('#toothSide').val();
								var v1 = $("#dentStatus").val();
								var v2 = $("#g_pocket").val();
								var v3 = $("#calculus").val();
								if (parseInt(id) > 0) {	
									while (side_all > 0) {
										side = side_all%10;
										side_all /= 10; side_all = parseInt(side_all);										
										if (side == 0) continue;										
										if (index == 1) {											
											var e = {id: id, s:side, v: v1, x: 0, y: 0, c: "black"};
						     				main_status[id] = e;
						     				send_status(e, "dental");
						     				$("#dentStatus").val('');
										} else 
										if (index == 2) {											
											var e = {id: id, s:side, v: v2, x: 0, y: 0, c: "black"};
						     				main_status[id] = e;
						     				send_status(e, "g_pocket");
						     				$("#g_pocket").val('');
										} else 
										if (index == 3) {											
											var e = {id: id, s:side, v: v3, x: 0, y: 0, c: "black"};
						     				main_status[id] = e;
						     				send_status(e, "calculus");
						     				$("#calculus").val('');
										}										
									}
								} else
									jAlert('Шүдний дугаар сонгоно уу ?', 'Confirmation Dialog', function(r) {									
				     					$form.find( 'input[name="medicationCode"]' ).val('');
				     				});
					     	}
					     	
					     	function chart_status_flag() {					     		
					     		flag_current_status = $('#flag_current_status').is(':checked');
					     		flag_dental_status = $('#flag_dental_status').is(':checked');
					     		flag_peno_status = $('#flag_peno_status').is(':checked');
					     		receive_status(code);
					     	}
					     	
					     	function remove_status() {
					     		remove_all_status(code);
					     	}
					 
					     	$(document).ready(function() {					     							     	
					     		upload();
					     		isbaby = (isbaby1 == 1?true:false);
					     		$('#isbaby').attr('checked', isbaby);
					     		newly = false;
					     		$('#medicationCode').keyup( function()
				                    {					                        
				                        $('#medicationCode').val($('#medicationCode').val().toUpperCase());
				                    }
					            );
					     		customer_reader1(code);					     		
					     		var c=document.getElementById("dent_chart");
					     		var ctx=c.getContext("2d");
					     		var img = new Image();
					     		img.onload = function(){
					     			ctx.drawImage(img,0,0);
					     		};
					     
					     		$("#dent_chart").click(function(e){
					     		    var x = Math.floor((e.pageX-$("#dent_chart").offset().left));
					     		    var y = Math.floor((e.pageY-$("#dent_chart").offset().top));
					     		    								
					     		    var blockX = [13, 51, 89, 127, 162, 196, 230, 265, 299, 334, 368, 403, 437, 471, 510, 547];
					     			var blockY = [90, 136];
					     			 {					     				
					     				var minx = 1000;
					     				var k = 0;
					     				var tr = (!isbaby?0:40);
					     				for (i = 0; i < blockX.length; i++) {
					     					var tx = blockX[i] + 16;
					     					if (Math.abs(tx - x) < minx) {
					     						minx = Math.abs(tx - x);
					     						k = i;
					     					}
					     				} 
					     				if (blockY[0] + 50 >= y) {
					     					if (k < 8) { 
					     						$('#tIndex').val(11+(7-k)+tr);
					     						$('#ud').val(1);
					     					}
					     					else $('#tIndex').val(21+(k-8)+tr);
					     				} else {
					     					if (k < 8) $('#tIndex').val(41+(7-k)+tr);
					     					else $('#tIndex').val(31+(k-8)+tr);
					     				}
					     				
					     				$('#medicationCode').focus();
					     				put_tooth_params($('#tIndex').val());
					     				
					     				var pos = findPos(this);
					     			    var x = e.pageX - pos.x;
					     			    var y = e.pageY - pos.y;					     			    
					     			    var c = this.getContext('2d');
					     			    var p = c.getImageData(x, y, 1, 1).data;
					     			    console.log(avg(p[0], p[1], p[2])+' '+y);
					     			    var id = $('#tIndex').val();
					     			    if (y < 80 || y > 160) {
						     			    if (avg(p[0], p[1], p[2]) >= 230 || p[0] == 255) { 						     			    	
						     			    	var v = prompt("TOOTH MOBILITY", "1");
						     		    		if (v != null) {	    					
						     		    			if (y > 150) y = 192;
						     		    			else y = 72;
						     		    			var e = {id: id, s:0, v: v, x: blockX[k] + 16, y: y, c: "red"};					     		    			
						     		    			dent_status[id] = e;  						     		    			
						     		    			reload_customer_tooth_data('dent_chart');
						     		    			send_status(e, "mobility");
						     		    		}
						     			    } else
						     			    if ((id % 10 == 6 || id % 10 == 7) && (y > 200 || y < 60) && avg(p[0], p[1], p[2]) >= 120 && avg(p[0], p[1], p[2]) < 230 && p[2] < 200) {
						     			    	var v = prompt("FURCATION LESIONS", "1");
						     		    		if (v != null) {	    					
						     		    			if (y > 150) y = 210;
						     		    			else y = 52;
						     		    			var e = {id: id, s:0, v: v, x: blockX[k] + 16, y: y, c: "blue"};					     		    			
						     		    			furca_status[id] = e;		    								     		    			
						     		    			reload_customer_tooth_data('dent_chart');
						     		    			send_status(e, "furca");
						     		    		}
						     			    }
					     			    }
					     			}
					     			
					     		 });
					     		
					     		if (!isbaby)
					     			img.src="medication/main/images/dent_chart.png";
					     		else
					     			img.src="medication/main/images/dent_chart.png";
					     							     							     		
					     		$("#tooth_form").submit(function(event) {
                                    	event.preventDefault();                                     	
                                    	newly = true;
        					     		var $form = $("#tooth_form"),
        					     			ud = $form.find( 'select[name="updown"]' ).val(),
        					     			dir = $form.find( 'select[name="direction"]' ).val(),
        					     			tooth = $form.find( 'select[name="tooth"]' ).val(),
        					     			service = $form.find( 'select[name="service"]' ).val(),
        					     			medCode = $form.find( 'input[name="medicationCode"]' ).val(),
        					     			toothSide = toothSides();//$form.find( 'select[name="toothSide"]' ).val();
        					     			toothQty = $form.find( 'input[name="toothQty"]' ).val();
        					     			discount = $form.find( 'input[name="toothDiscount"]' ).val();				     
        					     			if (medCode != '' && hash['edit_medication'][medCode]) {
	        					     			var price = hash['edit_medication'][medCode].price;
		        					     		var item = {ud: ud, dir: dir, tooth: tooth, service: service, medCode: medCode, toothSide: toothSide, price: price, qty: toothQty, amount: price*toothQty, doctorCode: dts[1], payment: 0, discount: discount};
	        					     			render_tooth_chart(item, 'dent_chart');	        				
	        					     			if (!contains(medi_actions[parseInt(ud)][parseInt(dir)*8+parseInt(tooth)], item))
		        					     			medi_actions[parseInt(ud)][parseInt(dir)*8+parseInt(tooth)].push(item);	        					     		
		        					     		medi_bool[parseInt(ud)][parseInt(dir)*8+parseInt(tooth)] = true;		        					     		
		        					     		render_medi_table();
        					     			} else
        					     				jAlert('Коммандыг зөвшөөрөхгүй !', 'Confirmation Dialog', function(r) {									
        					     					$form.find( 'input[name="medicationCode"]' ).val('');
        					     				});
					     		});
					     			
					     		receive_status(code);	
					     		get_anket();
					     	});					     						     						     						     	
					     	
					     	function toothSides() {
					     		var $form = $("#tooth_form");
					     		var buc = ($form.find( 'input[name="buc"]' ).attr('checked') ? $form.find( 'input[name="buc"]' ).val():0);
					     		var ling = ($form.find( 'input[name="ling"]' ).attr('checked') ? $form.find( 'input[name="ling"]' ).val():0);
					     		var mes = ($form.find( 'input[name="mes"]' ).attr('checked') ? $form.find( 'input[name="mes"]' ).val():0);
					     		var dis = ($form.find( 'input[name="dis"]' ).attr('checked') ? $form.find( 'input[name="dis"]' ).val():0);
					     		var occ = ($form.find( 'input[name="occ"]' ).attr('checked') ? $form.find( 'input[name="occ"]' ).val():0);
					     		
					     		var val = buc+''+ling+''+mes+''+dis+''+occ;							     		
					     		return val;					     		
					     	}
					     	
					     	function remove_row(i, j, k) {
					     		medi_actions[i][j].splice(k, 1);
					     		if (medi_actions[i][j].length == 0) {
						     		if (medi_actions[i][j].service == 1)
						     			un_render_tooth_chart_all('dent_chart');
						     		else
						     			un_render_tooth_chart(medi_actions[i][j], 'dent_chart');
						     		
						     		medi_bool[i][j] = false;					     							     										     		
					     		}
					     		
					     		render_medi_table();
					     	}
					     						     	
					     	function reset_tooth_actions() {
					     		for (i = 0; i < 3; i++) {
					     			medi_bool[i] = [];
					     			medi_actions[i] = [];
					     			for (j = 0; j <= 18; j++) medi_actions[i][j] = [];
					     		}				
					     		render_medi_table();
					     		un_render_tooth_chart_all('dent_chart');
					     	}					     						     	
					     	
					     	function cancel_medi_actions() {
					     		$.ajax({
									  url: __q_gw,
									  data: __json_autorize_update('orders', 'status', 'i3', ' id='+dts[2]),
									  success: function(data) {										  
										  $('#result-log').html(successMsg).delay(2000).fadeOut(function() {
										  		$(this).html('');
										  		$(this).fadeIn();
										  	});
									  },
									  error: function(data) {
										  $('#result-log').html(errorMsg).delay(2000).fadeOut(function() {
										  		$(this).html('');
										  		$(this).fadeIn();
										  	});
									  }
					     		});
					     	}
					     	
					     	function update_precent() {
					     		var precent = parseInt($('#precent').val());		
					     		precent = precent*100/uldegdel;
					     		$.ajax({
									  type: 'POST',
									  url: __q_gw,
									  data: __json_autorize_update('tooths', 'discount', 'f'+precent, " orderID="+dts[2]),
									  success: function(data) {																		  
										  $('#result-log').html(successMsg).delay(2000).fadeOut(function() {
										  		$(this).html('');
										  		$(this).fadeIn();
										  });										  
										  reload_customer_tooth_data('dent_chart');										  
									  },
									  error: function(data) {
										  $('#result-log').html(errorMsg).delay(2000).fadeOut(function() {
										  		$(this).html('');
										  		$(this).fadeIn();
										  	});
									  }
								});	
					     	}
					     	
					     	function confirm_medi_actions() {
					     		if (count_rows == 0) {
					     			jAlert('Коммандыг зөвшөөрөхгүй !', 'Confirmation Dialog', function(r) {									
					     				
					     			});
					     			return;
					     		}
					     		
					     		jConfirm('Сонгосон үйлчлүүлэгчийн эмчилгээний мэдээллийг хадгалах уу ?', 'Confirmation Dialog', function(r) {									
					    			if(r==true) {			 
					    				save_medi_actions();
					    			} else {
					    				
					    			}
					    		});
					     	}
					     	
					     	function diff_value() {
					     		var payed = parseInt($('#payed').val()),
					  	  			diff = payed - uldegdel;		
				     			$('#diff').val(Math.round(diff));
					     	}
					     	
					     	function update_medi_actions() {
					     		var total = $('#total').val(), 
					  	  			payed = parseInt($('#payed').val()),
					  	  			diff = uldegdel - payed;
					     		if (diff < 0) payed = uldegdel; //herev iluu tololt avdag bol ene bagadniig avch hayah
					     			
					     		$('#payed').val(0);
					     								     			
					     		var loaded = false;	
					     		var status = (diff > 0 ? 4:2);
					     		for (i = 0; i < 3; i++) 
						     		if (medi_bool[i]) {	     			
					     			for (j = 1; j <= 18; j++) {					     				
					     				if (medi_bool[i][j] == true) {	
					     					for (k = 0; k < medi_actions[i][j].length; k++) {
						     					var item = medi_actions[i][j][k];
						     					
												if (item.amount > item.payment && item.amount > 0) {
													var amount = item.amount - item.payment;
													var dec = (amount < payed ? amount: payed);
													amount = item.payment + dec;													
													payed -= dec;
													
													if (amount > 0) {
														$.ajax({
															  type: 'POST',
															  url: __q_gw,
															  data: __json_autorize_update('tooths', 'payment', 'f'+amount, " id="+item.id),
															  beforeSend: function(){
																  $("#save").attr('disabled','disabled');
																  $("#save").val('Уншиж байна түр хүлээнэ үү...');
															  },
															  success: function(data) {																		  
																  $('#result-log').html(successMsg).delay(2000).fadeOut(function() {
																  		$(this).html('');
																  		$(this).fadeIn();
																  });
																  if (payed <= 0 && loaded == false) {
																  	action_after(dts[2], status);
																  	loaded = true;
																  }
															  },
															  error: function(data) {
																  $('#result-log').html(errorMsg).delay(2000).fadeOut(function() {
																  		$(this).html('');
																  		$(this).fadeIn();
																  	});
															  }
														});																												
													}
												}
					     					}
										}
							     	}
						    	}
					     		
					     		var pay_type = $('#pay_type').val();
					     		$.ajax({
									  type: 'POST',
									  url: __q_gw,
									  data: __json_autorize_update('orders', 'paymentType', 's'+pay_type, " id="+dts[2]),
									  success: function(data) {										  
									  },
									  error: function(data) {										  
									  }
								});
					     	}
					     	
					     	function save_medi_actions() {					     		
					     		var $form = $("#tooth_form"),		                                             
                                fields = 'ud,direction,toothID,toothSide,service,newToothID,medicationCode',
                                types = ['i','i','i','i','i','i','s'];
                                
					     		var total = $('#total').val(), 
						  	  		payed = parseInt($('#payed').val()),
						  	  		diff = total - payed;
					     		
					     		if (payed > 0) {
					     			update_medi_actions();					     			
					     			return;
					     		}
					     		
	                            var fds = fields.split(',');
								var vals = '';
	                            for (i = 0; i < fds.length; i++) {	                            	
	                            	vals += types[i]+$form.find( 'select[name="'+fds[i]+'"]' ).val()+',';
	                            }
                            		                            
	                            vals = 's'+logged_user.clinicCode+',s'+dts[0]+',s'+dts[1]+',';	                            
	                            	    	                            
	                            $.ajax({
	                            	  type: 'POST',
									  url: __q_gw,
									  data: __json_autorize_delete('tooths', ' orderID='+dts[2]),
									  beforeSend: function(){
										  console.log('medi action before');
										  $("#save").attr('disabled','disabled');
										  $("#save").val('Уншиж байна түр хүлээнэ үү...');
									  },
									  success: function(data) {										  
										  for (i = 0; i < 3; i++) 
									     		if (medi_bool[i]) {	     			
								     			for (j = 1; j <= 18; j++) {					     				
								     				if (medi_bool[i][j] == true) {								     			
								     					for (k = 0; k < medi_actions[i][j].length; k++) {
									     					var item = medi_actions[i][j][k];
															var price = hash['edit_medication'][item.medCode].price;
															var qty = item.qty;
															var amount = qty * price;
									     					var vls = vals+ 'i'+item.ud+',i'+item.dir+',i'+item.tooth+',i'+item.toothSide+',i'+item.service+',i0,s'+item.medCode+',f'+qty+',f'+price+',f'+amount+',s ,dCURRENT_TIMESTAMP,i'+dts[2]+',f0';									     					
									     					var __q = __json_autorize_insert('tooths', 'clinicCode,customerCode,doctorCode,ud,direction,toothID,toothSide,service,newToothID,medicationCode,qty,price,amount,descr,_dateStamp,orderID,payment', vls, space);									     					
										     					
									     					$.ajax({
									     						  type: 'POST',
																  url: __q_gw,
																  data: __q,
																  beforeSend: function(){
																	  $("#save").attr('disabled','disabled');
																	  $("#save").val('Уншиж байна түр хүлээнэ үү...');
																  },
																  success: function(data) {																	  
																	  count_rows--;
																	  if (count_rows <= 0) {
																		  action_after(dts[2], 4);
																		  newly = false;
																	  }
																  },
																  error: function(data) {
																	  $("#save").removeAttr('disabled');
																	  $('#result-log').html(errorMsg).delay(2000).fadeOut(function() {
																	  		$(this).html('');
																	  		$(this).fadeIn();
																	  	});
																  }
															});
									     				}
								     				}
								     			}
									     	}
									  },
									  error: function(data) {
										  $("#save").removeAttr('disabled');
										  $('#result-log').html(errorMsg).delay(2000).fadeOut(function() {
										  		$(this).html('');
										  		$(this).fadeIn();
										  });
									  }
								});				                            	                            
					     	}
					     	
					     	function save_recare() {
					     		$.ajax({
									  type: 'POST',
									  url: __q_gw,
									  data: __json_autorize_update('customers', 'recareDelay', 'i'+$('#recare').val(), " code='"+code+"'"),
									  success: function(data) {																		  
										  
									  },
									  error: function(data) {
										  $('#result-log').html(errorMsg).delay(2000).fadeOut(function() {
										  		$(this).html('');
										  		$(this).fadeIn();
										  	});
									  }
								});
					     	}
					     	
					     	function action_before(id) {
					     		$('#history_option').load('list.jsp', function() {
					     			$('#history_option').filterByText($('#onoshCode'), true);
					     		});
					     		$('#history').load('rentGW?fd=memo&id='+dts[2]);  	
					     		$('#recare').val(recare);
					     	}
					     	
					     	function move_history() {					     		
					     		$('#history_option :selected').each(function(i, selected){		
					     			 if ($('#history').val() == '.') $('#history').val('');
					     			 var val = $('#history').val() + "DS : "+$(selected).text() + "\n\n";
					     			 $("#history").val(val);    			 					     			 					     			 
					     		});					     	
					     		$('#history').focus();
					     	}
					     	
					     	function clear_history() {
					     		$('#history').val('');
					     	}
					     	
					     	function show_history() {					     		
					     		$('#history_row').toggle();

					     	}
					     	
					     	function show_busad() {					     		
					     		$('#busad_row').toggle();
					     		get_baidal();
					     	}
					     	
					     	function save_history() {
					     		var vals = $('#history').val();					     							     						     							     		
					     		var fd = new FormData();           			
								var xhr = new XMLHttpRequest();
								rloaded = $('#loaded').val();
								fd.append( 'id', dts[2]);
								fd.append( 'clinicCode', logged_user.clinicCode);
								fd.append( 'table', 'orders');
								fd.append( 'data', vals);
								fd.append( 'field', 'memo');			
								xhr.open( 'POST', 'rentgenGW', true );		
								xhr.send( fd );
								xhr.onreadystatechange = function() {
									$('#result-log').html(successMsg).delay(2000).fadeOut(function() {
								  		$(this).html('');
								  		$(this).fadeIn();
								  	});
								}
					     	}
					     	
					     	function action_after(id, status) {
					     		var val = $('#history').val();
					     		val = replaceAll(val, '<', '');
					     		val = replaceAll(val, '>', '');
					     		val = replaceAll(val, ',', ';');
					     		val = replaceAll(val, '’', ' ');
					     		val = replaceAll(val, '“', ' ');						     		
					     		var vals = 'i'+status+',i'+(isbaby?1:0)+',s'+val;
					     		
					     		$.ajax({
								  type: 'POST',
								  url: __q_gw,
								  data: __json_autorize_update('orders', 'status,isbaby,memo', vals, " id="+id),
								  success: function(data) {
									  $("#save").removeAttr('disabled');
									  $("#save").val("Хадгалах");
									  $('#result-log').html(successMsg).delay(2000).fadeOut(function() {
									  		$(this).html('');
									  		$(this).fadeIn();
									  	});
									  //reset_tooth_actions();
									  print_padaan();
									  reload_customer_tooth_data();
								  },
								  error: function(data) {
									  $('#result-log').html(errorMsg).delay(2000).fadeOut(function() {
									  		$(this).html('');
									  		$(this).fadeIn();
									  	});
								  }
								});
					     	}
					     	
					     	function get_anket() {					     		
					     		var xp = module_xp['edit_customer'];
					     		var where = " WHERE code='"+code+"'";
					     		var __q = __json_autorize(xp['table'], xp['fields'], xp['types'], where);	
					     		$.post(__q_gw, __q, function(data) {				
					     			  $.each(data.items, function(i, item) {			  
					     				 	for(var key in item) {
					     				 		if (key.substring(0, 5) == 'anket') {
				     				 				document.getElementById(key).value = item[key];
				     				 			} else
					     				 		if (document.getElementById('anket_'+key)) {					     				 			
					     				 			if (key == 'gender') {
					     				 				if (item[key] == 2)
					     				 					document.getElementById('anket_'+key).innerHTML = 'эм';
					     				 				else
					     				 					document.getElementById('anket_'+key).innerHTML = 'эр';
					     				 			} else
						     			   				document.getElementById('anket_'+key).innerHTML = item[key];
					     				 								     				 			
					     				 		}
						     			 	}
					     			  });					     			  					     			 
					     		});						     	
					     		
					     	}
					     	
					     	function print_padaan() {					     		
					     		window.open("medication/main/padaan.jsp?orderID="+dts[2], "Падаан","location=1,status=1,scrollbars=1,width=400,height=600");
					     	}
					     </script>
					     
					     <div class="table_bottom_box">
					     	<div id="medilist">
						     	<table width="100%">
						     		<tr>
						     			<th>Шүдний ID</th>
						     			<th>Эмчилгээ</th>
						     			<th>Хэсэг</th>
						     			<th>Үнэ</th>
						     		</tr>
						     	</table>
					     	</div>                               
					     </div>	
					     					    
					</div>
				</div>
				<div class="my_bottom_box">                            		
          			<p style="padding: 4px;">
               			<% if (action.equals("write")) {%>                           
                            	<input class="button" name="submit" type="button" id='save' value="Хадгалах" onclick="confirm_medi_actions()"/>
					     	 	<input class="button" name="cancel" type="button" value="Цуцлах" onclick="cancel_medi_actions()" style="display:none;"/>
                            <%}%>
                            <input class="button" id="print" name="print" type="button" value="Хэвлэх" onclick="print_padaan()"/>					     	 					     	 				     						
                            <input class="button-gray" name="submit" type="button" value="Буцах" onclick="javascript:content_changer('medication/main/index.jsp','main', 4)"/>
            		</p>
            		
            		<p style="float:right; padding: 4px;">
            			<div id="result-log"></div>
            		</p>               		
		     	</div>
		    </div>
		       					     					     				   				     					     		     					  
	</div>	
	
	</div>
	
	<div class="jquery_tab">
                      
        <div class="content_block">
            <h2 class="jquery_tab_title">Хавсралт</h2>
			
			<div class="content">				
				
				<div id="drop-files" ondragover="return false">					
					<img id="rentgen_1" value="2" src="" width="140px" height="130px" class="rentgen"/>
					<img id="rentgen_2" value="3" src="" width="140px" height="130px" class="rentgen"/>
					<img id="rentgen_3" value="4" src="" width="140px" height="130px" class="rentgen"/>
					<img id="rentgen_4" value="5" src="" width="140px" height="130px" class="rentgen"/>
					<img id="rentgen_5" value="6" src="" width="140px" height="130px" class="rentgen"/>
					<img id="rentgen_6" value="1" src="" width="140px" height="130px" class="rentgen"/>
					</br></br>
					Оруулах зургийн дугаар:
					<input type="text" id="loaded" value="1" style="width:40px;"/>
					<input type="button" class="button-gray" value="Зураг устгах" onclick="deleteRentgen()"/>
					</br>
					Энд Рентгэн зургийг чирж оруулна уу !
				</div>
				<img src="" id="selected_rentgen" style="display: none; width: 75%; height: 75%;"/>
				
				<div id="uploaded-holder">
					<div id="dropped-files">
						<div id="upload-button">
							<a href="#" class="upload"><i class="ss-upload"> </i> Upload!</a>
							<a href="#" class="delete"><i class="ss-delete"> </i></a>
							<span>0 Files</span>
						</div>
					</div>
					<div id="extra-files">
						<div class="number">
							0
						</div>
						<div id="file-list">
							<ul></ul>
						</div>
					</div>
				</div>
				
				<div id="loading">
					<div id="loading-bar">
						<div class="loading-color"> </div>
					</div>
					<div id="loading-content">Uploading file.jpg</div>
				</div>
				
				<div id="file-name-holder">
					<ul id="uploaded-files">
						<h1>Uploaded Files</h1>
					</ul>
				</div>								
			</div>			
       	</div>
    </div>
    
    
 	<div class="jquery_tab">
                      
        <div class="content_block">
            <h2 class="jquery_tab_title">Түүх</h2>
            
            <img class="cimage" src="" height="195" width="170" border="0" alt="зураг" id="cimage" name="cimage" />
    
		    <div class="vcard" id="vcard">
		    	
		    </div>    
		                
		    <br/>    
		    <div id="history_1">
		    	
		    </div>
		    <br/>
		             
		    <div class="cimage">
		    	<canvas id="dent_chart_1" width="601" height="265">				     							     				
				</canvas>
				
				<textarea id="history_text_1" name="history_text_1" cols="66" rows="16" style="background: #eee;" disabled></textarea>
		    </div>    

       	</div>
    </div>
        
        
   <div class="jquery_tab">
                      
        <div class="content_block">
            <h2 class="jquery_tab_title">Анкет</h2>
            
            <table style='border: 1px solid #e1e1e1; margin: 10px; background: #fff; padding: 10px;' class="anket">
            	<tr>
            		<td>Картын дугаар</td>
            		<td colspan='2'><span id='anket_code'></span></td>            		
            	</tr>
            	<tr>
            		<td>Овог: <span id='anket_lastName'></span></td>
            		<td>Нэр: <span id='anket_firstName'></span></td>
            		<td>Хүйс: <span id='anket_gender'></span></td>
            	</tr>
            	<tr>
            		<td>Төрсөн он сар өдөр: <span id='anket_birthdate'></span></td>
            		<td>Мэргэжил: <span id='anket_jobName'></span></td>
            		<td>Регистр: <span id='anket_register'></span></td>
            	</tr>
            	<tr>
            		<td>Ажлын газар: <span id='anket_companyName'></span></td>
            		<td colspan='2'>Гэрийн хаяг: <span id='anket_address'></span></td>            		
            	</tr>
            	<tr>
            		<td>Утас: <span id='anket_phone'></span></td>
            		<td colspan='2'>Тус эмнэлэгт хандах болсон шалтгаан</td>            		
            	</tr>
            	<tr>
            		<td colspan='3'>
            			<table class="anket" style="border: 0px solid #e1e1e1; border-spacing: 0px;" >
            				<tr>
            					<td colspan="2" style="text-align: center;"></br><span>Өвчлөлийн түүх</span></td>            					
            				</tr>
            				<tr>
            					<td>Одоо таны биеийн байдал сайн байна уу?</td>
            					<td>
            						<select id="anket_1" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>Танд байнга хэрэглэдэг эм тариа бий юу? Тийм бол ямар?
            					<input type='text' id='anket_2_descr' name='anket_2_descr' value=''/></td>
            					<td>
            						<select id="anket_2" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>Та ямар нэгэн эмийн харшилтай юу? Тийм бол ямар?
            					<input type='text' id='anket_3_descr' name='anket_3_descr' value=''/>
            					</td>
            					<td>
            						<select id="anket_3" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>Та урьд нь шүдний эмнэлэгт үзүүлж байхдаа ерөнхий биеийн хүндрэлтэй учирч байсан уу?</br> Ухаан алдах, бие эвгүйрхэх гэх мэт</td>
            					<td>
            						<select id="anket_4" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>Та жирэмсэн үү? </td>
            					<td>
            						<select id="anket_5" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td colspan='2'>Дараах өвчин эмгэгүүд танд бий юу? </td>
            				</tr>
            				<tr>
            					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Зүрхний эмгэг эсвэл хэрх өвчин </td>
            					<td>
            						<select id="anket_6" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Даралт ихсэх өвчин</td>
            					<td>
            						<select id="anket_7" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Цус алдамтгай байдал эсвэл цус бүлэгнэлтийн эсрэг эм хэрэглэдэг эсэх</td>
            					<td>
            						<select id="anket_8" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Чихрийн шижин </td>
            					<td>
            						<select id="anket_9" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Татаж унах</td>
            					<td>
            						<select id="anket_10" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Толгой хүзүүний орчим туяа эмчилгээ хийлгэж байсан эсэх </td>
            					<td>
            						<select id="anket_11" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Өөр өвчин байвал тодруулж бичнэ үү? </td>
            					<td>
            						<select id="anket_12" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>Та урьд нь дараах өвчнөөр өвчилж байсан ба одоо уг өвчин бий юу? </td>
            					<td>
            						<select id="anket_13" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Сүрьеэ </td>
            					<td>
            						<select id="anket_14" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Халдварт шар </td>
            					<td>
            						<select id="anket_15" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ДОХ-ын халдвар</td>
            					<td>
            						<select id="anket_16" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>Та тамхи татдаг уу?  </td>
            					<td>
            						<select id="anket_18" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            				<tr>
            					<td>Хар тамхи хэрэглэж байсан эсвэл одоо хэрэглэдэг үү? </td>
            					<td>
            						<select id="anket_17" onchange="anketchange(this)">
            							<option value='0'></option>
            							<option value='1'>Тийм</option>
            							<option value='2'>Үгүй</option>
            						</select>
            					</td>
            				</tr>
            			</table>
            		</td>
            	</tr>
            </table>           
       	</div>
    </div>
          
</div>
