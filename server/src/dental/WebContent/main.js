function exit_dental() {
	logged = 0;
	all_hide_popups();
	$.post('session.jsp?user=batman&_group=0', function(data) {
		logged = 0;
	  	user = '';
	  	location.reload();
	});	
}

function init_login_error_check(el) {
	$("#login_form").find( 'input[name="'+el+'"]' ).removeClass("input-small-error");
	$("#login_form").find( 'input[name="'+el+'"]' ).addClass("input-small");
}

function init_login_form(form_id, _class, _class_error) {	
	$("#"+form_id).find( 'input[name="user"]' ).removeClass(_class_error);
	$("#"+form_id).find( 'input[name="user"]' ).addClass(_class);
	
	$("#"+form_id).find( 'input[name="pass"]' ).removeClass(_class_error);
	$("#"+form_id).find( 'input[name="pass"]' ).addClass(_class);
	
	$("#"+form_id).submit(function(event) {		                                        
        event.preventDefault(); 
                
        var user = $("#"+form_id).find( 'input[name="user"]' ).val();
        var pass = $("#"+form_id).find( 'input[name="pass"]' ).val();
        var __q = __json_autorize_custom('_check_auth', user+','+pass);
        
        $.post(__q_gw, __q, function(data) {        	
        	if (data.items.length > 0) {
	      	  	$.each(data.items, function(i, item) {	      	  			      	  		
	      	  		$("#"+form_id).find( 'input[name="user"]' ).val('');
	      	  		$("#"+form_id).find( 'input[name="pass"]' ).val('');	      	  			      	  		
	      	  		success_login(item);	
	      	  		location.reload();
	      	  	});
        	} else {
        		$("#"+form_id).find( 'input[name="user"]' ).removeClass(_class);
        		$("#"+form_id).find( 'input[name="user"]' ).removeClass(_class_error);
        		$("#"+form_id).find( 'input[name="user"]' ).addClass(_class_error);
        		
        		$("#"+form_id).find( 'input[name="pass"]' ).removeClass(_class);
        		$("#"+form_id).find( 'input[name="pass"]' ).removeClass(_class_error);
        		$("#"+form_id).find( 'input[name="pass"]' ).addClass(_class_error);
        	}
      	}, 'json');
	});
}

function make_code(code) {
	var xp = module_xp['edit_settings'];
	var __q = __json_autorize(xp['table'], xp['fields'], xp['types'], space);
	$.post(__q_gw, __q, function(data) {		  
		  $.each(data.items, function(i, item) {
			  var value = 0;
			  if (item.name == 'code_index') {
				  value = item.value;
				  yes_code(code, value);
			  }
		  });
	});		
}

function yes_code(code, index) {
	var ch = code.split(',');
	var it = parseInt(ch[1]);
	var id = parseInt(index);	
	if (it < id && it > 10000) {
		jAlert('Коммандыг зөвшөөрөхгүй !', 'Confirmation Dialog', function(r) {									
			
		});
		
		return;
	}
		
	jConfirm('Шинэ код олгох уу ?', 'Confirmation Dialog', function(r) {									
		if(r==true) {
			var __q = __json_autorize_custom_writer('_make_code', code);
	        $.post(__q_gw, __q, function(data) {        	
	        	customer_reader(ch[0]);
	      	}, 'json');
	        
		} else {
			
		}
	});
}

function call_customer_view_form(code) {
	$("#tags").val('');
	content_changer(module_xp['edit_customer']['folder']+'/customer.jsp?id='+code, 'customer_info', 6);	
}

function call_customer_edit_form(code) {
	$("#tags").val('');
	content_changer(module_xp['edit_customer']['folder']+'/update.jsp?id='+code, 'customer_info', 6);	
}

function call_product_edit_form(code) {
	if (logged == 0) {
		if (typeof hash['edit_product'][code]== 'undefined') return;
		
		$("#selected_product").height(0);
		$("#selected_product").show();
		$("#selected_product").animate({"height" : "175"}, 500);
		if (ecode != '')
			$("#eshop_"+ecode).removeClass('active');				
				
		$("#eshop_"+code).addClass('active');		
		$("#eshop_image").attr("src", 'fileGW?fn='+code);
		$("#eshop_name").html(hash['edit_product'][code].name);
		$("#eshop_type").html(hash['edit_product_types'][hash['edit_product'][code].type].name);
		$("#eshop_info").html(hash['edit_product'][code].descr);
		$("#eshop_company").html(hash['edit_product'][code].company);
		$("#eshop_price").html('₮'+hash['edit_product'][code].price);
		ecode = code;
	} else
		content_changer(module_xp['edit_product']['folder']+'/update.jsp?id='+code, 'product_info', 8);	
}

function load_index_left_right_pane() {		
	var lcontent = '';
	var __q = __json_autorize_custom('_last_customer_list', space);
	
	$.post(__q_gw, __q, function(data) {	  
	  $.each(data.items, function(i, item) {				
		  //var customer = getHash('edit_customer', item.code);
		  
		  lcontent += customer_template(item);
	  });												  
	  $("#last_customers").html(lcontent);
	});	
	
	var rcontent = '';
	__q = __json_autorize_custom('_recare_customer_list', space);
	$.post(__q_gw, __q, function(data) {	  
	  $.each(data.items, function(i, item) {
		//  var customer = getHash('edit_customer', item.code);
		  rcontent += customer_template(item);		  
	  });												  
	  $("#recare_customers").html(rcontent);
	});
}

function fillData(descr, orderID, phone) {	
	var $form = $("#add_new_customer");	
	//$form.find( 'input[name="lastName"]' ).val(descr);
	
	var xp = module_xp['edit_settings'];
	var __q = __json_autorize(xp['table'], xp['fields'], xp['types'], space);
	$.post(__q_gw, __q, function(data) {		  
		  $.each(data.items, function(i, item) {
			  if (item.name == 'code_index')
				  $form.find( 'input[name="code"]' ).val(item.value);
		  });
	});
	
	$form.find( 'input[name="orderID"]' ).val(orderID);
	$form.find( 'input[name="phone"]' ).val(phone);
	$form.find( 'input[name="clinicCode"]' ).val(logged_user.clinicCode);
	
	if (orderID > 0) {
		$('#customer_add_form').show();
		$('#un_customer_lists').hide();
		$form.find( 'input[name="orderID"]' ).css({'background-color' : '#F56C13'});
		$form.find( 'input[name="orderID"]' ).css({'color' : '#fff'});				
	}
	
	if (phone != '') {
		$form.find( 'input[name="phone"]' ).css({'background-color' : '#F56C13'});
		$form.find( 'input[name="phone"]' ).css({'color' : '#fff'});
	}
}

function show_customer_add_box() {
	var $form = $("#add_new_customer");	
	$form.find( 'input[name="orderID"]' ).val(0);
	$form.find( 'input[name="phone"]' ).val('.');
	$form.find( 'input[name="clinicCode"]' ).val(logged_user.clinicCode);
	$('#un_customer_lists').hide();
	$('#customer_add_form').show();
	
	$form.find( 'input[name="orderID"]' ).css({'background-color' : '#fff'});
	$form.find( 'input[name="orderID"]' ).css({'color' : '#606060'});	
	
	$form.find( 'input[name="phone"]' ).css({'background-color' : '#fff'});
	$form.find( 'input[name="phone"]' ).css({'color' : '#606060'});
}


function hide_customer_add_box() {
	$('#un_customer_lists').show();
	$('#customer_add_form').hide();
}


function reload_customers_param() {
	session = ' TOP 32';
	var keyvalue = $("#customer_search").val();
	var gender = $("#s_gender").val();
	var mina = $("#s_min_age").val();
	var maxa = $("#s_max_age").val();
	var country = $("#s_country").val();
	var member = $("#s_membershipCode").val();
	var where = '';		
			
	any_select_action('edit_customer', mina+','+maxa+','+gender+','+country+','+member+','+keyvalue+',customer:');	
	return;
}

function reload_customers() {		
	session = ' TOP 32';
	//if (!fill_check('edit_customer')) { 			
		any_select_action('edit_customer', space);
	//} else
	//	$('#customer_list').html(fill_datas['edit_customer']);	
	
	character_putment();
	reload_un_customers();
}

function reload_un_customers() {
	var uncontent = '';
    
	$.post(__q_gw, __json_autorize_custom('_un_customer_list', space), function(data) {
		  $.each(data.items, function(i, item) {	  			  			 
			  uncontent += un_customer_template(item);
		  });
		  $('#ordered_customer_list').html(uncontent);
	});
}

procedure_xp['edit_customer'] = function init_customers() {
	$("#customer_search").keyup(function(){
		if( $(this).val() != "") {
			//$("#customer_list div").hide();
			//$("#customer_list span:contains-ci('" + $(this).val() + "')").parent("div").show();
			reload_customers_param();			
		}
		else {
			//$("#customer_list div").show();
		}
	});	
	put_module_insert_action('edit_customer');	
	reload_customers();
}


//schedule

var sections=[];
var count = 0;
var sch_data = [];
var settings = [];

procedure_xp['edit_schedule'] = function init_schedule() {		
	  sections = [];
	  settings = [];
	  sch_data = [];
	  count = 0;
	
	  $.each(indexed_hash['edit_doctor'], function(i, item) {
		  sections[count] = {key:item.code, label: item.lastName};
	  	  count++;
	  });
		 
	  settings['start_time'] = 9;
	  settings['end_time'] = 21;		 		 
	  var medications=[
			{key:1, label:"Үзлэг, зөвлөгөө"},
			{key:2, label:"Эмчилгээ"}
	  ];
				
	  scheduler.locale.labels.unit_tab = "Эмч нар";
	  scheduler.locale.labels.section_doctor="Эмчийн нэр";
	  scheduler.locale.labels.section_medication="Эмчилгээний төрөл";
	  scheduler.locale.labels.section_description="Мэдээлэл";
	  scheduler.locale.labels.section_time="Авах цаг";
	  scheduler.locale.labels.section_contactPhone="Утасны дугаар";
	  scheduler.config.details_on_create=true;
	  scheduler.config.details_on_dblclick=true;
	  scheduler.config.first_hour = settings['start_time'];
	  scheduler.config.last_hour = settings['end_time'];
	  scheduler.config.xml_date="%Y-%m-%d %H:%i";
	  
	  scheduler.templates.event_class=function(start,end,event){														
		    switch ( event.type ){
		    	  case 0 : return "active_event";
		          case 1 : return "past_event";
		          case 2 : return "current_event";
		          case 3 : return "canceled_event";
		    }
	  }																										
		
	  scheduler.config.lightbox.sections=[			                                      
			{name:"description", height:64, map_to:"text", type:"textarea" , focus:true},
			{name:"contactPhone", height:23, map_to:"contactPhone", type:"textarea"},
			{name:"doctor", height:23, type:"select", options:sections, map_to:"doctor_id" },					
			{name:"medication", height:23, type:"select", options:medications, map_to:"medication_id" },														
			{name:"time", height:72, type:"time", map_to:"auto"}
	  ];
																												
	  scheduler.createUnitsView("unit","doctor_id",sections);		  
	  scheduler.init('scheduler_here',current_date,"unit");												
	  scheduler.load('postGW?xml='+__json_autorize_custom('_order_list', current_date.format('yyyy-mm-dd')), 'json', function() {
		 indexed_data(eval(scheduler.toJSON()));
	  });
	  
	  if (logged == 1)
			$('#permission_bar').attr('id', '');	  	  	  
}			

function indexed_data(data) {
	$.each(data, function(i, item) {
		sch_data[item.id] = mixed_string(item);  
	});
}

function save_schedule() {
	if (logged == 2) {
    	$('#result-log').html(denyMsg).delay(1200).fadeOut(function() {
	  		$(this).html('');
	  		$(this).fadeIn();		  		
	  	});	
    	
    	return;
    }
		
	var data = eval(scheduler.toJSON());								
	var orders = [];
	var count = 0;
	
	$('#result-log').html('<img src="images/preloader.gif"></img>');  	
	
	$.each(data, function(i, item) {
		var param = item.text.split(' ');		
		var customer = getHash('edit_customer', param[0]);		
		if (customer != param[0]) {
			item.code = customer.code;
			item.firstName = customer.firstName;
			item.lastName = customer.lastName;
		} else {
			item.code = '';
			item.firstName = '';
			item.lastName = '';
		}				
		
		if (item.id > 100000000) {
			if (sch_data[item.id] != mixed_string(item)) {
				sch_data[item.id] = mixed_string(item); 				
				var xp = module_xp['edit_schedule'];
				var vls = 's'+item.code+',s'+item.firstName+',s'+item.lastName+',s'+item.doctor_id+',s'+item.medication_id+',s'+item.start_date+',s'+item.end_date+',s'+param[0]+',dCURRENT_TIMESTAMP,s'+item.contactPhone+',s'+logged_user.userCode+',s'+logged_user.clinicCode;
				var __q = __json_autorize_insert(module_xp['edit_schedule']['table'], module_xp['edit_schedule']['fields'], vls, " id="+item.id);
				
				$.ajax({
					type: 'POST',
			  		url: __q_gw,
			  		data: __q,
			  		success: function(data) {													  			
			  			$('#result-log').html('<strong>Амжилттай!</strong>').delay(1200).fadeOut(function() {
					  		$(this).html('');
					  		$(this).fadeIn();
						});
			  		},
					error: function(data) {
						$('#result-log').html(errorMsg).delay(1200).fadeOut(function() {
					  		$(this).html('');
					  		$(this).fadeIn();
						});  
					}
				});
			}
		} else if (sch_data[item.id] != indexed_data(item)) {			
			var xp = module_xp['edit_schedule'];
			var fld = module_xp['edit_schedule']['fields'];
			fld = replaceAll(fld, '_dateStamp,', '');
			var vls = 's'+item.code+',s'+item.firstName+',s'+item.lastName+',s'+item.doctor_id+',s'+item.medication_id+',s'+item.start_date+',s'+item.end_date+',s'+param[0]+',s'+item.contactPhone+',s'+logged_user.userCode+',s'+logged_user.clinicCode;
			var __q = __json_autorize_update(module_xp['edit_schedule']['table'], fld, vls, " id="+item.id);
			$.ajax({
				type: 'POST',
		  		url: __q_gw,
		  		data: __q,
			    success: function(data) {													  			
		  			$('#result-log').html('<strong>Амжилттай!</strong>').delay(1200).fadeOut(function() {
				  		$(this).html('');
				  		$(this).fadeIn();
					});
		  	    },
			    error: function(data) {
					$('#result-log').html(errorMsg).delay(1200).fadeOut(function() {
				  		$(this).html('');
				  		$(this).fadeIn();
					});  
			    }
			});
		}
	});
}


function delete_schedule(id) {			
	if (logged == 2) {
    	$('#result-log').html(denyMsg).delay(1200).fadeOut(function() {
	  		$(this).html('');
	  		$(this).fadeIn();		  		
	  	});	
    	
    	return;
    }
	alert(id);
	
	//var __q = __json_autorize_delete('orders', mixer_where('edit_schedule', id));
	var __q = __json_autorize_delete('orders', 'id='+id);
	$.ajax({  		
  		type: 'POST',
  		url: __q_gw,
  		data: __q,
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


//az

function init_az_area_select() {
	var types = '';	
	$.each(hash['edit_medication_categories'], function(i, item) {
		if (item) 
			types += '<option value="'+item.id+'">'+item.name+'</option>';
	});		
		
	$("#section").html(types);			
}

function call_medication_edit_form(code) {
	$("#tags").val('');
	content_changer(module_xp['edit_medication']['folder']+'/update.jsp?id='+code, 'medication_info', 4);	
}

procedure_xp['edit_medication'] = function az_init() {				
	init_az_area_select();
	put_module_insert_action('edit_medication');	
	character_putment();	
	reload_az_list();	
	$("#az_search").keyup(function(){	
		val = $(this).val();		
		medication_query = 'WHERE code like \'%'+val+'%\' or name like N\'%'+val+'%\'';
		fill_datas['edit_medication'] = '';
		reload_az_list();
		/*
		if( $(this).val() != "") {
			$("#medication_list div div div").hide();
			$("#medication_list div div span:contains-ci('" + $(this).val() + "')").parent("div").show();
		}
		else {
			$("#medication_list div div div").show();
		}*/
	});	
}


function reload_az_list() {				
   	if (!fill_check('edit_medication')) {   		
   		sections = '';
   		any_select_action('edit_medication', medication_query);		
   	} else
   		$('#medication_list').html(fill_datas['edit_medication']);
}

//doctors

function init_doctors_select() {
	var types = '<option value="all">Бүгд</optin>';	
	$.each(indexed_hash['edit_doctor'], function(i, item) {
		types += '<option value="'+item.lastName+'">'+item.lastName+'</option>';		
	});
		
	$("#doctor_medi_main").html(types);	
}

function call_edit_doctor_dialog(i) {
	var _path = module_xp['edit_doctor']['folder'];
	content_changer(_path+'/update.jsp?id='+i, 'doctor_info', 5);
}

function reload_doctors() {
	if (!fill_check('edit_doctor')) {
		any_select_action('edit_doctor', ' ');		
	} else
		$('#doctor_list').html(fill_datas['edit_doctor']);
}

procedure_xp['edit_doctor'] = function init_doctors() {
	put_module_insert_action('edit_doctor');
	reload_doctors();
}


//main

var main_array_data = [];

function call_main_restore_form(id) {		
	content_changer('medication/main/restore.jsp?id='+id, 'main_info', 3);
} 																			    
  
function call_main_process_form(param) {	
	var pm = param.split(",");	
		
	if (param.substring(0, 5) =='undef' || pm[3] == '') {
		jConfirm('Үйлчлүүлэгч системд бүртгэгдээгүй байна. Бүртгэлийг хийхүү ?', 'Confirmation Dialog', function(r) {									
			if(r==true) {
				 //$('li#list'+I).fadeOut('slow', function() {$(this).remove();});
				$('li#list'+1).fadeOut('slow', function() {$(this).remove();});
				 content_changer('customers/index.jsp?mode=1&param='+param, 'customer', 6);
			} else {
				
			}
		});				
		return;
	} else {	
		if (pm[6] > -1) {
			jAlert('Үйлчлүүлэгчийн цаг болоогүй байна !', 'Confirmation Dialog', function(r) {									
				
			});
			return;
		}
			
		var sp = param.split(',');
		if (true || sp[1] == logged_user.userCode || logged_user._group > 1) {		
			var action = 'write';
			if (sp[5] == '2') action = 'read';		
			param = replaceAll(param, ' ', '%20');		
			content_changer('medication/main/process.jsp?data='+param+'&action='+action+'&age='+sp[4], 'customer_info', 3);
		} else {			
			jAlert('Коммандыг зөвшөөрөхгүй ! Өөр эмчийн цаг байна.', 'Confirmation Dialog', function(r) {									
				
			});
		}
	}
}																				

function call_main_process_form_read(item) {	
	var param = item.code+','+item.doctorCode+','+item.id+','+item.fullName;	
	content_changer('medication/main/process.jsp?data='+param+'&action=read&age='+item.age, 'customer_info', 3);							
}	

function call_main_process_form_read_ex(code, doctor, id, fullName, birthdate) {
	//var customer = hash['edit_customer'][code];
	fullName = replaceAll(fullName, ' ', '%20');
	var param = code+','+doctor+','+id+','+fullName;
	var age = birthdate;
	if (age > 100)
		age = getAge(birthdate);
	content_changer('medication/main/process.jsp?data='+param+'&action=read&age='+getAge(birthdate), 'customer_info', 3);							
}	

function hash_reload_main_list(status, mode) {
	if (mode == 1) {
		if( status != "" && status != 'all') {
			$("#main_medication_list div").hide();
			$("#main_medication_list span:contains-ci(" + status + ")").parent("div").show();
		}
		else {
			$("#main_medication_list div").show();
		}
		
		return;
	}
	
	var content = '';
	if (status == -1)
		content += '<div class="content_block" id="main_medication_box'+i+'">'+
						medication_main_list(main_array_data, status)+
  				   '</div>';
	else
		content += '<div class="content_block" id="main_medication_box'+i+'">'+
						medication_main_list_where(main_array_data, status)+
				   '</div>';	  												  	  
	  												  
	$('#main_medication_list').html(content);
}

function show_close_on(v, s) {	
	$("#delete"+v).show();	
}

function show_close_off(v, s) {	
	$("#delete"+v).hide();	
}

function delete_order_request(v, s) {
	if (logged_user._group == 10) {
		jConfirm('Сонгосон үйлчлүүлэгчийн мэдээллийг устгах уу ?', 'Confirmation Dialog', function(r) {									
			if(r==true) {			 
				 var __q = __json_autorize_delete('orders', ' id='+v);
				 $.ajax({
					  type: 'POST',
					  url: __q_gw,
					  data: __q,
					  success: function(data) {
						  reload_un_customers();
					  },
					  error: function(data) {
						  
					  }
				});
			} else {
				
			}
		});
	} else {
		jAlert('Коммандыг зөвшөөрөхгүй !', 'Confirmation Dialog', function(r) {									
			 
		});
	}
}

function cancel_order_request(v, s) {
	if (s== 0) {
		jConfirm('Сонгосон үйлчлүүлэгчийн цагийг цуцлах уу ?', 'Confirmation Dialog', function(r) {									
			if(r==true) {			 
				 var __q = __json_autorize_update('orders', 'status', 'i3', ' id='+v);
				 $.ajax({
					  type: 'POST',
					  url: __q_gw,
					  data: __q,
					  success: function(data) {
						  reload_main_list();
					  },
					  error: function(data) {
						  
					  }
				});
			} else {
				
			}
		});
	} else if (s == 3) {
		jConfirm('Сонгосон үйлчлүүлэгчийн цагийг устгах уу ?', 'Confirmation Dialog', function(r) {									
			if(r==true) {			 
				 var __q = __json_autorize_delete('orders', ' id='+v);
				 $.ajax({
					  type: 'POST',
					  url: __q_gw,
					  data: __q,
					  success: function(data) {
						  reload_main_list();
					  },
					  error: function(data) {
						  
					  }
				});
			} else {
				
			}
		});
	} else {
		jAlert('Коммандыг зөвшөөрөхгүй !', 'Confirmation Dialog', function(r) {									
			
		});
	}
}

function reload_main_list() {
	var content = '';
	var val = $("#medication_main_date").val();
	main_date_sel = val;
	
	$('#main_medication_list').html('<img src="images/preloader.gif"></img>');
	counter_status = [0, 0, 0, 0, 0];
   	$.post(__q_gw, __json_autorize_custom('_medication_list', val), function(data) {   		
   		main_array_data = data.items;
   		
	    content += medication_main_list(data.items, 0);	    
		$('#main_medication_list').html(content);
		
		var total = counter_status[0] + counter_status[2] + counter_status[3] + counter_status[4];
	   	$("#summary_row").html("Бүгд ("+total+")<span class='pixel'>&nbsp;</span>Хүлээгдэж буй ("+counter_status[0]+")<span class='pixel'>&nbsp;</span>Цуцлагдсан ("+counter_status[3]+")<span class='pixel'>&nbsp;</span>Төлөлт хийгдэх ("+counter_status[4]+")<span class='pixel'>&nbsp;</span>Амжилттай ("+counter_status[2]+")");
   	});   	   	   	   
}

procedure_xp['edit_main'] = function init_main() {	
	$("#medication_main_date").val(main_date_sel);
	reload_main_list();
	init_doctors_select();
	$("#main_search").keyup(function(){
		if( $(this).val() != "") {
			$("#main_medication_list div").hide();
			$("#main_medication_list span:contains-ci('" + $(this).val() + "')").parent("div").show();
		}
		else {
			$("#main_medication_list div").show();
		}
	});			
}

//eshop

function reload_products() {			
	//session = ' TOP '+$("#show_size").val();		
	if ($("#show_size").val() == 0) session = '';	
	if (!fill_check('edit_product')) {
		any_select_action('edit_product', ' ');		
		reload_orders();
	} else {
		$('#product_list').html(fill_datas['edit_product']);		
	}
}

function order_accept(userCode) {
	jConfirm('Бараа захиалагын жагсаалтыг олгох уу ?', 'Confirmation Dialog', function(r) {									
		if(r==true) {
			var __q = __json_autorize_custom_writer('_order_accept', userCode);
	        $.post(__q_gw, __q, function(data) {        	
	        	reload_orders();
	      	}, 'json');
	        
		} else {
			
		}
	});
}

function order_cancel(userCode) {
	jConfirm('Бараа захиалагын жагсаалтыг цуцлах уу ?', 'Confirmation Dialog', function(r) {									
		if(r==true) {
			var __q = __json_autorize_custom_writer('_order_cancel', userCode);
	        $.post(__q_gw, __q, function(data) {        	
	        	reload_orders();
	        	reload_basket();
	        	all_hide_popups();
	      	}, 'json');
	        
		} else {
			
		}
	});
}

function reload_orders() {	
	var content_list = '';
	$('#order_list').html('');
	$.each(indexed_hash['edit_doctor'], function(i, item) {
		var userCode = item.code;		
		var content = '<div id="order_box"><div class="order_top_box"><div id="bottom_bar"><b>'+userCode+'</b></div></div><ul class="c">';
		var __q = __json_autorize_custom('_basket_list', userCode);
		$.post(__q_gw, __q, function(data) {
			  var count = 0;
			  $.each(data.items, function(i, item) {													 
				  count++;
				  var product = getHash('edit_product', item.productCode);
				  content+= template_basket_product(item, product);
			  });			  		  		  		  		 
			  content += '</ul>';
			  
			  content += order_bottom_action(userCode);
			  content += '</div>';
			  
			  if (count > 0)				
				  $('#order_list').append(content);			  			  
		});				
	});
}

function reload_products_all_filter() {
	var show_my = $("#show_my").attr('checked');
	var type = $("#product_type").val();
	var filter = $("#product_search").val();
	var sort = $("#sort").val();
	
	session = ' TOP '+$("#show_size").val();	
	if ($("#show_size").val() == 0) session = '';
	
	fill_datas['edit_product'] = '';
	var sort_type = sql_param[1]+'type';
	if (sort == '1') 
		sort_type = sql_param[1]+'type';
	if (sort == '2')
		ort_type = sql_param[1]+'name'+sql_param[3];
	if (sort == '3')
		ort_type = sql_param[1]+'name'+sql_param[4];
	if (sort == '4')
		ort_type = sql_param[1]+'price'+sql_param[3];
	if (sort == '5')
		ort_type = sql_param[1]+'price'+sql_param[4];
	
	var spec = ' and ';	
	if (show_my == 'checked')
		spec =  sql_param[5]+'user1 @ 0';
	else 
	if (filter == '')
		spec = '';
	
	if (type == 'all' && filter == '')
		any_select_action('edit_product', sql_param[0]+"1=1"+spec+sort_type);
	else
	if (type == 'all' && filter != '')
		any_select_action('edit_product', sql_param[0]+"1=1"+spec+"name"+sql_param[2]+"'"+filter+".'"+" "+sort_type);
	else
	if (type != 'all' && filter == '')
		any_select_action('edit_product', sql_param[0]+"1=1"+spec+"type="+type+" "+sort_type);
	else
	if (type != 'all' && filter != '')
		any_select_action('edit_product', sql_param[0]+"1=1"+spec+"type="+type+sql_param[5]+"name"+sql_param[2]+"'"+filter+".'"+" "+sort_type);	
}

function init_product_types_select() {
	var types = '';
	$.each(indexed_hash['edit_product_types'], function(i, item) {
		types += '<option value="'+item.id+'">'+indexed_hash['edit_product_types'][i].name+'</option>';		
	});		
	
	$("#type").html(types);
	$("#product_type").html(types);			
}

procedure_xp['edit_product'] = function init_eshop() {
	init_product_types_select();
	put_module_insert_action('edit_product');			
	reload_products();
	search_filter();
}

//messages
function check_message_notify(t, p, u) {	  
	  if (typeof logged_user == 'undefined' && user == 'batman') {
		  exit_dental();
		  return;
	  }
		
	  /*
	  if (t > 0) {
		  $('#message_notify').html('Ирсэн захидал (<b>'+t+'</b>)');
	  	  $('#message_notify_top').html('<span class="notify-tag null">'+t+'</span>Ирсэн захидалууд');	  	  	  	  
	  } else {
		  $('#message_notify').html('Ирсэн захидал');
	  	  $('#message_notify_top').html('Ирсэн захидалууд');	  	  	  	  
	  }*/
	  
	  
	  if (p > 0) {
		  $('#schedule_notify_top').html('<span class="notify-tag null">'+p+'</span>Цаг авсан үйлчлүүлэгчид');	  	  	  	  	  	  
	  } else {
		  $('#schedule_notify_top').html('Цаг авсан үйлчлүүлэгчид');	  	  	  	
	  }
	  
	  if (u > 0) {
		  $('#un_customer_notify_top').html('<span class="notify-tag null">'+u+'</span>Бүртгэлгүй үйлчлүүлэгч');	  	  	  	  	  	  
	  } else {
		  $('#un_customer_notify_top').html('Бүртгэлгүй үйлчлүүлэгч');	  	  	  	
	  }
	  
	  if (t+p+u > 0)
		  $("#clinic_id").html( '<a style="color:#808080" class="profile" onclick="javascript:show_account()"><span class="all-notify-tag null">'+(t+p+u)+'</span>Оптимал Дент</a>');
	  else
		  $("#clinic_id").html( '<a style="color:#808080" class="profile" onclick="javascript:show_account()">Оптимал Дент</a>');
}

function change_flag_message(id,flag) {
	var vls = 'i'+(1-flag);
	var __q = __json_autorize_update('messages', 'flag', vls, " id="+id);
	$.ajax({		  
		  type: 'POST',
		  url: __q_gw,
		  data: __q,
		  success: function(data) {
			  reload_messages();
			  reload_notifys();
		  },
		  error: function(data) {
			  jAlert('<b style="color:red">Алдаа гарлаа !</span>', 'Алдаа');
		  }
	});
}

procedure_xp['edit_messages'] = function reload_messages() {
	$("#message_search").keyup(function(){
		if( $(this).val() != "") {
			$("#message_list div").hide();
			$("#message_list span:contains-ci('" + $(this).val() + "')").parent("div").show();
		}
		else {
			$("#message_list div").show();
		}
	});
	
	var content = '';
	var t = 0;
	var xp = module_xp['edit_messages'];
	var __q = __json_autorize(xp['table'], xp['fields'], xp['types'], sql_param[0]+'dateStamp'+sql_param[4]);
	$.post(__q_gw, __q, function(data) {				  
		  $.each(data.items, function(i, item) {
			  content += message_template(item);
			  t+=item.flag;
		  });
		  
		  content += '</tbody></table>';
		  
		  $('#message_list').html(content);		  		 
	});			
}

function reload_notifys() {		
	var __q = __json_autorize_custom('_notify_counts', space);
	
	$.post(__q_gw, __q, function(data) {		
		$.each(data.items, function(i, item) {
			check_message_notify(item.mc, item.oc, item.uc);
			loaded = true;
		});				
	});				
}

function reload_always() {
	load_index_left_right_pane();
	reload_basket();
	reload_notifys();
}

function success_login(item) {
	logged_user = item;
	$.post('session.jsp?user='+item.userCode+'&_group='+item._group, function(data) {});
	
	logged = item._group;
	user = item.userCode;
}

function reload_logins_data() {	
	if (!loaded) {	
		var __q = __json_autorize_custom('_check_auth_after', user);
		
		$.post(__q_gw, __q, function(data) {        	
	    	if (data.items.length > 0) {
	      	  	$.each(data.items, function(i, item) {	      	  		      	  		
	      	  		success_login(item);	      	  		
	      	  		load_modules();	      	  		
	      	  	});
	    	}
	  	}, 'json');	 	      	  		        
	}
}

function reload_basket() {
	var content = '<ul class="c">';
	var __q = __json_autorize_custom('_basket_list', logged_user.userCode);
	$.post(__q_gw, __q, function(data) {		  		
		  customers_array_data = data.items;
		  var count = 0, total = 0;
		  $.each(data.items, function(i, item) {													 
			  count++;
			  total += item.quantity;
			  var product = getHash('edit_product', item.productCode);			  
			  content+= template_basket_product(item, product);
		  });			  		  
		  
		  content+='<li class="more"><a onclick="javascript:order_cancel('+'\''+logged_user.userCode+'\''+')">Захиалагыг цуцлах</a></li>';		  
		  content += '</ul>';
		  
		  if (count == 0) {
			  content = '<ul class="c">';
			  content+='<li class="more"><a>Хоосон байна</a></li>';		  
			  content += '</ul>';
			  $('#basket_item_list').html(content);
		  }
		  
		  if (count > 0) {
			  $("#basket").animate({opacity: 0}, 200, function() {
				  $("#basket").animate({opacity: 1}, 200);
				  $('#basket').html('<a style="color:#808080" onclick="javascript:show_basket()" class="basket"><span class="all-notify-tag null">'+(total)+'</span>Захиалга</a>');
				  $('#basket_item_list').html(content);
			  });
		  }
		  else
			  $('#basket').html('<a style="color:#808080" onclick="javascript:show_basket()" class="basket">Захиалга</a>');		  		  
	});
}

function add_to_basket(code) {		
	var vls = 's'+logged_user.userCode+',s'+code+',i'+$('#qty_'+code).val()+',dCURRENT_TIMESTAMP,s500';
	any_insert_action('edit_basket', vls);		
}

function show_basket() {
	$('#basket_item_list').html('<img src="data:image/gif;base64,R0lGODlhEAAQAKUAAERCRKSipNTS1HRydOzq7FxaXLy+vIyKjPT29GRmZLSytOTi5JyanFRSVExKTKyqrNza3Hx6fPTy9GRiZMzKzJSSlPz+/GxubERGRKSmpNTW1HR2dOzu7FxeXIyOjPz6/GxqbLS2tOTm5JyenMzOzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJBgAlACwAAAAAEAAQAAAGbcCScIggkBQky3DJLFkMEU1zWuKADNQmp0HKMjOFj3coAlDGQgtgJChcJFkJwBMBADJZEoDhsSeyBwAGGnYAIVOEGAglA4VYSxANa0IiknYDISQGgQAJYkILHYWjAG9MCBmWdh0hSlQLFCQiTUEAIfkECQYAJQAsAAAAABAAEACFREJEpKKkdHJ01NLUXFpc7OrsjI6MxMbE9Pb0VFJUrK6sfH58ZGZk5OLknJqcTEpMrKqsfHp8ZGJk9PL0zM7M/P78REZEpKakdHZ03NrcXF5c7O7slJKUzMrM/Pr8VFZUtLK0hIaEbGps5ObknJ6c////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABm3AknAorExGxKRyAsoon0JSB6qsRJwlT4VaymBKg0eiwdVkFgAAibsgCdIXdggNcHA/nEuaQe0AFA1pAFNKCBoABSUhaWNJCBgABkIbH2kWFyMVBSCVGghDBQyCowAME44XlYIfCltQIwcHSElBACH5BAkGACMALAAAAAAQABAAhURCRKSmpNTW1HR2dOzu7FxaXIyOjLy6vOTi5FRSVPz6/JyanKyurGRmZExKTNze3ISChPT29JSWlMTGxOzq7ERGRKyqrNza3PTy9GRiZJSSlOTm5FRWVPz+/JyenLSytGxqbIyKjMzKzP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZvwJFwSCwajRFMsXMUbi7DTwUUaR42I4wDAJg0FaHRgVtRNkMbAxfSFAYOEK6nPfp41IB5W7L4rNsKHAwUZARNARUII3gDCkZjbCMRBVwNAkMPcRyGQgQNXAAJDQlcBVhECgEcoKEBVU0PExMPTERBACH5BAkGACYALAAAAAAQABAAhURCRKSipNTW1Hx6fLy6vOzu7FxeXIyOjExOTKyurOTi5MzKzPz6/JyanISGhGRmZKyqrNze3MTCxPT29JSWlFRWVERGRKSmpNza3ISChLy+vPTy9GRiZJSSlFRSVLS2tOzq7MzOzPz+/JyenIyKjGxqbP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZyQJNwSCwORYlGwWgkAQAOJmP4eUKZk42JUXkatMyQaWGNMIWSQuCZOQsFksPz4zYJIJSnpi5JEJ4XdQdpFgAPbiAIEyZ5AAlYJW0mEwZPI4tDCwYIIEMgD08IAwcZXR5mRBMXCFYAFhRgRiIYGgQCU0RBACH5BAkGACUALAAAAAAQABAAhURCRKSipNTS1HRydLy6vOzq7FxaXIyKjMTGxPT29ExOTLSytNze3JSWlGxubKyqrNza3MTCxPTy9GRiZMzOzPz+/FRWVJyenERGRKSmpNTW1Ly+vOzu7FxeXJSSlMzKzPz6/FRSVLS2tOTi5JyanP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZxwJKwVLgEEsNkcoEBAC5KZcDphEaFHyrmAroKO87OyFspQZyYgreUAD2qayGj4dTES4iLU73miAh1cQQUHE0NaxUDXQcAGAxeAVYJBgAhFEogAR1dQgVgAA4ZERsXBhZjSQkXClSNB3xRIBQiDwgSSkEAIfkECQYAJgAsAAAAABAAEACFREJEpKak1NbUdHJ07O7sXFpcvLq8jIqM5OLkZGZk/Pr8xMbEVFJUrK6sfHp8lJaUTEpM3N7c9Pb0ZGJkxMLE7OrsbG5sREZErKqs3NrcdHZ09PL0XF5cvL68lJKU5ObkbGps/P78zMrMtLK0fH58nJqc////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABnFAk9AkaWgKHMFwKVwwAFCAgzkcRaMBqkkQvRw6Si0IaiFohxEoR3IeNqCL9vABuITkJkUJUMCbPlZ2chsRBBcAcW0jdwcAHApnAhhCG08WG1QCGpBCHwUADAEfJiERHpdMEh6HdXUlnFQSHQEBBphLQQAh+QQJBgAjACwAAAAAEAAQAIVEQkSkoqTU0tR0cnTs6uyMioy0srRcWlz09vSEgoSUlpRUUlSsqqzk4uS8urxMSkzc2tx8enz08vSUkpRkZmT8/vxERkSkpqTU1tR0dnTs7uyMjoy0trT8+vyEhoScmpysrqy8vrxsamz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGbsCRcNQJFUSUyAUxbAoOgKjU0xSGpFjAoAqRLhQc0CbRqIqiCma12QVs1msGwKKGDyeAjL2qAFD3QwYAIoBDBHMagBJCCQAFewgQQgQLACBwCAwVQxiVHolCRQV1k40WIgkZFCAddhocASAYm01BACH5BAkGACYALAAAAAAQABAAhURCRKSipHR2dNTS1FxaXLy6vIyOjOzq7PT29ExOTKyurISChGRmZMzKzJyanExKTKyqrHx+fOTi5GRiZMTCxPTy9Pz+/ERGRKSmpHx6fNTW1FxeXLy+vJSWlOzu7Pz6/FRSVLS2tIyKjGxubMzOzJyenP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZsQJPQZGl0MgJRATFsDiaAqDQRapo40qy0KtRcooIQJRSRGoYMwINklQhGh26UYq2bMICRvW4AlPZWfQqATRAAHYRDEgATiUMCAA2OJhIXBB57FU0kDxsaVhUkH20ZeSUKAR0cFnseDRwUEnVBACH5BAkGACMALAAAAAAQABAAhURCRKSipNTS1Hx+fOzq7FxeXLy6vJSSlPT29ExOTNze3GxqbMTGxJyanKyurNza3ISGhPTy9GRmZPz+/FRWVMzOzERGRKSmpNTW1ISChOzu7GRiZJSWlPz6/FRSVOTi5GxubMzKzJyenP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZswJFwNKk0BhlOaDJsCjaAqLQQao4M0qzUMRREEw4FoQLJMohQEMKKSUQLowrAorEKMdHFSATg2IcVAQQjZWd/VmUPh1Z8FYtOABePTRIFHZNCDxYimEIhCRyXmAQcGw0hCg8PdYcdDwwhg1ZBACH5BAkGACMALAAAAAAQABAAhURCRKSipNTS1HR2dOzq7FxaXMTCxJSSlNze3ExOTPT29KyurGRmZMzKzJyanNza3Hx+fOTm5FRWVPz+/ERGRKSmpNTW1Ozu7FxeXMTGxJSWlOTi5FRSVPz6/LSytGxqbMzOzJyenISChP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZxwJFwNGloRKKQZcgcNTCAqJTxaHqkCQlFSjEMG9EBQqhYJKKUaqcA0DRHEU6UMcoAGJP3CCQFHQAZekIMURoDAAqCIxVRFQMFiiMdCwsTBxKRTHYEmUITDCGdQhsFS6IbHw2iIwoBGgIdohMbFgSJTUEAIfkECQYAJAAsAAAAABAAEACFREJEpKKkdHJ01NbU7O7sXFpcjIqMvL68TE5MfH585OLk/Pr8rK6sZGZklJaUzM7MTEpM3N7c9Pb0xMbEhIaEbG5sREZEpKakdHZ03Nrc9PL0lJKUxMLEVFJUhIKE5Obk/P78tLa0bGpsnJ6c////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABmxAkpC0mDgSntFgyCRNCoCotKJoXqKIBKUhtTyGnChDMoxwAZYPSdIBfJuSM4YUAgSaw4w04kEs8ENnDCIUgEMUURsVI4ZCBlEGIwaNJBtiZpQEGyNkHm+UQgQYZKBCHxukpQscEX+lQhIghkEAIfkECQYAIwAsAAAAABAAEACFREJEpKKk1NLUdHJ07OrsjIqMvLq8XFpc9Pb0fH58lJaUTE5MrK6s3N7czM7MfHp89PL0lJKUxMLEZGZk/P78TEpMpKak1NbUdHZ07O7sjI6MvL68/Pr8hIKEnJqcVFJUtLK05OLkbG5s////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABm/AkXDE2WgeCc9lyBwZFoCoVBRqKqKYAENxiFYEQwZg0mAiroAKYQSpiBBNoSaaGDEqmbgQIc10NHpDD1EbCRKBQgVRAQUOiCMJiwwbiBxQAAYEEYgbUlUecHoGWEIQBoEcFgp5QhlVj0wcHLC0TEEAIfkECQYAKAAsAAAAABAAEACFREJEpKak1NbUdHJ0vL687O7sjIqMXFpcTE5MzMrMtLK05OLkhIKE/Pr8lJaUTEpMrK6s3N7cfHp8xMbE9Pb0ZGZkVFZU1NLUnJ6cREZErKqs3NrcdHZ0xMLE9PL0lJKUVFJUzM7MtLa07OrshIaE/P78nJqcbGps////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABm9AlBDlgZAGHEdoyCwFHoCotLJokgCVQEhAYEQzl+FTwRReEADECNV4EMrDSZSEmkjgzAog48F08EMYURMGa4AoAVEQHxSHKAaKIgWHDWgAEwVLgCZfjRuAIlIGQg2NcAdRCB6OKB9pEaxCEaaxZUEAIfkECQYAJgAsAAAAABAAEACFREJEpKKk1NLUdHJ0XF5cvLq87OrsjIqMrK6s9Pb0TE5MbGpslJaU5ObkxMbErKqs3NrchIaEZGZk9PL0tLa0/P78VFZUnJ6czM7MREZEpKak1NbUdHZ0ZGJk7O7slJKUtLK0/Pr8VFJUbG5snJqczMrM////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABnFAk9BkCHA6i4OjMmxeMgCFAkDtbJomhgjhEXoQFkCmNHRIJliTZxRtmCoLQ9o7jZgEmvmQRE1ounomJVQOIIFCGFQgGIcmD1QUboEVHVQYIUx6F1QKCYEJDFQAF4ElU1QEnnoDohaAeo8AB6qHDa9CQQAh+QQJBgApACwAAAAAEAAQAIVEQkSkoqR0cnTU0tSMiozs7uxcWly8urxMTkx8fnzc3tyUlpT8+vzExsSsrqxsamxMSkx8enzc2tyUkpT09vRUVlSEhoTk5uTMzsxERkSkpqR0dnTU1tSMjoz08vRcXly8vrxUUlSEgoTk4uScmpz8/vzMysy0srRsbmz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGbcCUMFUIPCqfxIExbIJCqMkEBQAYBs2UI3JpXiLVxhAzKWWFJECmmyKZz0JqIiVRwIemqkdyH1LCBX1CDFUOb30cVSeCQgRVHIwgVQiHZx5phXAKFigZVQAPTGcPn1UPgXAbnxkBFH1FAQ2uTUEAIfkECQYAJAAsAAAAABAAEACFREJEpKKk1NLUdHJ0XFpcvLq87OrsTE5MlJaUxMbE9Pb0rK6s3N7chIKEbGpsTEpMfHp8ZGJkxMLE9PL0VFZUzM7M/P78tLa0REZE1NbUdHZ0XF5cvL687O7sVFJUnJ6czMrM/Pr8tLK05OLk////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABnBAkpAU4jQ2lMFiMmyCBp9ERTQAHBJNEkdkyUoegMuQkckOBRgMQzgyNz8ACLHrFnYAAEM9GwFw9k0OAAuAQiEHYYVaeBWFI4gedEMTdCEXHniETQhWDg5geBqSQoh4pgADCmZwpxQLo00GHAsXGbBBACH5BAkGACMALAAAAAAQABAAhURCRKSmpNTW1GxqbOzu7MTCxHx+fFxaXOTi5LSytHR2dFRSVPz6/NTS1IyKjExKTKyurNze3HRydMzKzGRiZOzq7ERGRKyqrNza3GxubPT29MTGxISChOTm5Ly6vHx6fPz+/IyOjGRmZP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZzwJFwxCiEJBIOhDBsYiANAqOTODw8zRGBmdVwAIEhiJEdMkSARnktAGTWawoAAc86ANj6MATWDyUAEH4jFRZpQxFcTQwKAA8gQhcAFhcaQx2AgUONAJMSBmidGZBCE4adqJ0Klk0dHKedB3lrGg0eGxFlQQAh+QQJBgAhACwAAAAAEAAQAIVEQkSkoqTU1tR0cnRUVlS8urzs7uyMioxkYmTExsT8+vycmpxMTkysqqzc3txcXlz09vSUkpTMzsxMSkykpqTc2tx0dnRcWly8vrz08vSMjoxkZmTMysz8/vycnpxUUlSsrqz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAGacCQUFjBNA6RhGLI7Bg6Q0eEkGBarZKJ58oNFQDVrhXxgIqHHoDgPPyC2MLvFp6mhCiE+bXzACsAgAVcDQAMS32AFEtCHRSJQg6AgAQHARoXgAMQQwIMkp8AmlYZC56SDwVmew4JCQZXQQA7" style="display:block; margin-left:110px; padding:10px; -webkit-filter: grayscale(0%);"></img>');
	reload_basket();
	
	$('#basket_box').show();
	all_hide_popups();
	var pos = $("#basket").offset();    
    var eWidth = $("#basket").outerWidth();
    var mWidth = $('#basket_box').outerWidth();
    var left = (pos.left + eWidth - 80) + "px";
    var top = (16+pos.top) + "px";
    $('#basket_box').css( { 
        position: 'absolute',
        zIndex: 5000,
        left: left, 
        top: top
    } );
    
	$('#basket_box').fadeIn(100);  
}

function show_chat() {
	$('#chat_box').show();
	all_hide_popups();
	var pos = $("#chat").offset();    
    var eWidth = $("#chat").outerWidth();
    var mWidth = $('#chat_box').outerWidth();
    var left = (pos.left + eWidth - 110) + "px";
    var top = (16+pos.top) + "px";
    $('#chat_box').css( { 
        position: 'absolute',
        zIndex: 5000,
        left: left, 
        top: top
    } );
    
    reload_faq();
	$('#chat_box').fadeIn(100);  		
}

function show_tips() {
	$('#tip_box').show();
	all_hide_popups();
	var pos = $("#tips").offset();    
    var eWidth = $("#tips").outerWidth();
    var mWidth = $('#tip_box').outerWidth();
    var left = (pos.left - 280) + "px";
    var top = (12+pos.top) + "px";
    $('#tip_box').css( { 
        position: 'absolute',
        zIndex: 5000,
        left: left, 
        top: top
    } );
        
	$('#tip_box').fadeIn(100);  		
}

function show_search_field(val, mode, foot, x, y, put) {
	if (!$('#search_box').is(":visible")) {
		all_hide_popups();
		$('#search_box').show();	
		if (x == 0 && y == 0) {
			var pos = $("#tags").offset();    
			var eWidth = $("#tags").outerWidth();
			var mWidth = $('#search_box').outerWidth();
			var left = (pos.left);
			var top = (25+pos.top);
			x = left; y = top;
		}
	    $('#search_box').css( { 
	        position: 'absolute',
	        zIndex: 5000,
	        left: x+'px', 
	        top: y+'px'
	    });	    
    
	    $('#search_box').fadeIn(100);
	}
		
	var content = '<ul class="c">';
	var array = [], array_count = [];
	array['people'] = '<li class="caption">Хүмүүс</li>';
	array['product'] = '<li class="caption">Бүтээгдэхүүн</li>';
	array['medication'] = '<li class="caption">Эмчилгээ</li>';
	array['diagnostic'] = '<li class="caption">Оношилгоо</li>';
	array_count['people'] = 0;
	array_count['product'] = 0;
	array_count['medication'] = 0;
	array_count['diagnostic'] = 0;
	$.post(__q_gw, __json_autorize_custom(mode, val), function(data) {		  
		  var count = 0;
		  if (data.items.length == 0) {
			  $('#search_box').hide();
			  return;
		  }
		  
		  $.each(data.items, function(i, item) {			  
			  if (item.type == 'people') {
				  //var customer = getHash('edit_customer', item.code);
				  var data = [];
				  if (item.data)
					  data = item.data.split(',');
				  array[item.type]+='<li><img src="'+empty_man(item, '')+'"></img><span class="text"><a onclick="javascript:call_customer_view_form(\''+item.id+'\')"><b>'+item.code+'</b> '+data[0]+' '+data[1]+'<br/>Утас : '+data[2]+'</a></span></li>';
			  } else
			  if (item.type == 'product') {
				  var product = getHash('edit_product', item.code); 
				  array[item.type]+='<li><img src="'+empty_product(product, '')+'"></img><span class="text"><a onclick="javascript:call_product_edit_form(\''+product.code+'\')">'+product.name+'<br/>'+product.company+'</a></span></li>';
			  } else
			  if (item.type == 'medication') {
				  var medication = getHash('edit_medication', item.code); 
				  var name = medication.name;
				  if (name.length > 48) name = name.substring(0, 48)+'..';
				  if (put)
					  array[item.type]+='<li><img src="'+empty_medication(medication, '')+'"></img><span class="text"><a onclick="javascript:put_code_field(\''+put+'\',\''+medication.code+'\')">'+name+'<br/><b>'+medication.code+'</b> | '+render_money(medication.price)+' ₮</a></span></li>';
				  else
					  array[item.type]+='<li><img src="'+empty_medication(medication, '')+'"></img><span class="text"><a onclick="javascript:call_medication_edit_form(\''+medication.code+'\')">'+name+'<br/><b>'+medication.code+'</b> | '+render_money(medication.price)+' ₮</a></span></li>';
			  } else
			  if (item.type == 'diagnostic') {
				  var medication = getHash('edit_medication', item.code); 
				  if (put)
					  array[item.type]+='<li><img src="'+empty_medication(medication, '')+'"></img><span class="text"><a onclick="javascript:put_code_field(\''+put+'\',\''+medication.code+'\')">'+eclipses(medication.name)+'<br/>'+medication.code+'</a></span></li>';
				  else
					  array[item.type]+='<li><img src="'+empty_medication(medication, '')+'"></img><span class="text"><a onclick="javascript:call_medication_edit_form(\''+medication.code+'\')">'+eclipses(medication.name)+'<br/>'+medication.code+'</a></span></li>';
			  }
			  
			  array_count[item.type]++;
			  count ++;
		  });
		  
		  if (array_count['people'] > 0) content += array['people'];
		  if (array_count['product'] > 0) content += array['product'];
		  if (array_count['medication'] > 0) content += array['medication'];
		  if (array_count['diagnostic'] > 0) content += array['diagnostic'];
			  
		  if (foot) {
			  if (count > 0)
				  content += '<li class="more"><a style="padding-left:0px">Бусад үр дүн<br/>Эхний '+count+' үр дүн танд харагдаж байна</a></li>';
			  else
				  content = '<ul class="c"><li class="more"><a style="padding-left:0px">Хайлтын үр дүн олдсонгүй !</a></li>';
		  }
		  content+='</ul>';
		  		  
		  $('#search_item_list').html(content);
	});		
}

function put_code_field(field, val) {
	$("#"+field).val(val);
	all_hide_popups();
}

function show_search_field_medication() {
	all_hide_popups();
	var val = $("#code").val(); 
	
	var pos = $("#code").offset();    	
	var left = pos.left;
	var top = (pos.top+24);
	
	show_search_field(val, '_search_medication', false, left, top);
}

function show_menu(x, y) {		
	if (!$('#search_box').is(":visible")) {
		all_hide_popups();
		$('#search_box').show();			
	    $('#search_box').css( { 
	        position: 'absolute',
	        zIndex: 5000,
	        left: x+'px', 
	        top: y+'px'
	    });    
    
	    $('#search_box').fadeIn(100);
	}
	
	var content = '<ul class="c">';	
	var title = '<li class="caption">Хүмүүс</li>';
	content = '<ul class="c"><li class="more"><a style="padding-left:0px">Хайлтын үр дүн олдсонгүй !</a></li>';
	content+='</ul>';		 
	$('#search_item_list').html(content);
}


function show_search_field_medicationCode() {
	all_hide_popups();
	var val = $("#medicationCode").val(); 
	
	var pos = $("#medicationCode").offset();    	
	var left = pos.left;
	var top = (pos.top+24);	
	show_search_field(val, '_search_medication', false, left, top, 'medicationCode');
}

function show_search_field_customer(field) {
	all_hide_popups();
	var val = $("#"+field.name).val(); 
	
	var pos = $("#"+field.name).offset();    	
	var left = pos.left;
	var top = (pos.top+24);
	
	show_search_field(val, '_search_customer', false, left, top);
}

function show_search_field_eshop() {
	all_hide_popups();
	var val = $("#code").val(); 
	var pos = $("#code").offset();    	
	var left = pos.left;
	var top = pos.top+24;
	
	show_search_field(val, '_search_product', false, left, top);
}

function put_code_schedule(code) {
	var param = code.split(',');
	$('#schedule_description').val(param[0]+' '+param[1]);
	$('#schedule_phone').val(param[2]);
	$('#schedule_search_box').hide();
}

function show_schedule_search_field() {	
	var val = $("#schedule_description").val(); 
	if (val.length < 3) return;
	var content = '<ul class="c">';
	var array = [], array_count = [];
	array['people'] = '<li class="caption">Хүмүүс</li>';	
	array_count['people'] = 0;	
	$.post(__q_gw, __json_autorize_custom('_search_content', val), function(data) {		  
		  var count = 0;
		  if (data.items.length == 0 || val == '') {
			  $('#schedule_search_box').hide();
			  return;
		  } else {
			    all_hide_popups();
				$('#schedule_search_box').show();				    	   
			    $('#schedule_search_box').css( { 
			        position: 'absolute',
			        zIndex: 11000,
			        left: 10, 
			        top: 85
			    });	    
		    
			    $('#schedule_search_box').fadeIn(100);
		  }
		  
		  $.each(data.items, function(i, item) {			  
			  if (item.type == 'people') {
				  //var customer = getHash('edit_customer', item.code);
				  var data = [];
				  if (item.data)
					  data = item.data.split(',');
				  var param = item.code+','+data[0]+' '+data[1]+','+data[2];
				  array[item.type]+='<li><img src="'+empty_man(item, '')+'"></img><span class="text"><a onclick="javascript:put_code_schedule(\''+param+'\')">'+data[0]+' '+data[1]+'<br/>Утас : '+data[2]+'</a></span></li>';
			  }			  
			  
			  array_count[item.type]++;
			  count ++;
		  });
		  
		  if (array_count['people'] > 0) content += array['people'];			  		  
		  content+='</ul>';
		  		  
		  $('#schedule_search_item_list').html(content);
	});
}

function show_account() {
	$('#account_box').show();
	all_hide_popups();
	var pos = $("#clinic_id").offset();    
    var eWidth = $("#clinic_id").outerWidth();
    var mWidth = $('#account_box').outerWidth();
    var left = (pos.left + eWidth - 100) + "px";
    var top = (16+pos.top) + "px";
    $('#account_box').css( { 
        position: 'absolute',
        zIndex: 5000,
        left: left, 
        top: top
    } );
    
	$('#account_box').fadeIn(100);  
	
	$('#bg_wrapper').click(function (e){		
		$('#account_box').fadeOut(0, function(e){
			all_hide_popups();
		});		
    });		
}

function all_hide_popups() {
	$('#basket_box').hide();	
	$('#account_box').hide();
	$('#tip_box').hide();
	$('#chat_box').hide();
	$('#search_box').hide();
	$('#schedule_search_box').hide();
}

//membership
function delete_membsership_medi(mediCode, code) {
	jConfirm('Гишүүнчлэлээс эмчилгээг мэдээлэлийг устгах уу ?', 'Confirmation Dialog', function(r) {									
		if(r==true) {
			 var __q = __json_autorize_delete(module_xp['edit_membership_medications']['table'], " membershipCode='"+code+"' and medicationCode='"+mediCode+"'");
			 $.ajax({
				  type: 'POST',		
				  url: __q_gw,
				  data: __q,
				  success: function(data) {					  
					  reload_memberships();
				  },
				  error: function(data) {
					  jAlert('<b style="color:red">Алдаа гарлаа !</span>', 'Алдаа');
				  }
			 });
		}
	});	
}

function delete_membership(code) {						
	jConfirm('Сонгосон барааны мэдээлэлийг устгах уу ?', 'Confirmation Dialog', function(r) {									
		if(r==true) {
			 var __q = __json_autorize_delete(module_xp['edit_membership']['table'], mixer_where('edit_membership', code));
			 $.ajax({					 
				  type: 'POST',		
				  url: __q_gw,
				  data: __q,
				  success: function(data) {
					var __q = __json_autorize_delete(module_xp['membership_medications']['table'], mixer_where('membership_medications', code));
					$.ajax({
						  type: 'POST',		
						  url: __q_gw,
						  data: __q,
						  success: function(data) {						
							reload_memberships();													   
						  },
						  error: function(data) {
							  jAlert('<b style="color:red">Алдаа гарлаа !</span>', 'Алдаа');
						  }
					});
				  },
				  error: function(data) {
					  jAlert('<b style="color:red">Алдаа гарлаа !</span>', 'Алдаа');
				  }
			 });
		}
	});
}

function reload_memberships() {
	reload_any('edit_membership_medication', space);
	
	var content = '<table id="table_memberships" width="100%" cellspacing="0" style="border-left:1px solid #dadee0;">'+
        			'<caption>Хүснэгт: Гишүүнчлэлийн мэдээлэл</caption>'+
                    '<thead>'+                      
                      '<th scope="col" width="1%"></th>'+
                      '<th style="text-align:center" scope="col" align="left" width="10%">Код</th>'+
                      '<th scope="col" align="left" width="10%">Нэр</th>'+
                      '<th scope="col" align="left" width="5%">Хугацаа</th>'+
                      '<th style="text-align:left" scope="col" width="60%">Хөнгөлөлтөнд хамрагдах эмчилгээнүүд</th>'+                      
                      '<th scope="col" width="8%">Нэмэх эмчилгээ</th>'+
                    '</thead>'+
                    '<tbody>';			  
	
	var xp = module_xp['edit_membership'];
	var __q = __json_autorize(xp['table'], xp['fields'], xp['types'], space);
	$.post(__q_gw, __q, function(data) {		  
		  $.each(data.items, function(i, item) {			  			  			  			  
			  
			  content += '<tr>'+
				'<td align="right" scope="row" class="'+(i%2==0?"alt":"")+'"><h5>'+(i+1)+'</h5></td>'+			  				
			    '<td align="center" class="'+(i%2==0?"alt":"")+'"><span class="close-tag">'+item.code+'<a class="close" onclick="javascript:delete_membership(\''+item.code+'\')"></a></span></td>'+
			    '<td class="'+(i%2==0?"alt":"")+'"><h5>'+item.name+'</h5></td>'+
			    '<td class="'+(i%2==0?"alt":"")+'"><h5>'+item.months+' сар</h5></td>'+
			    '<td align="left" class="'+(i%2==0?"alt":"")+'">###</td>'+
			    '<td align="center" class="'+(i%2==0?"alt":"")+'"><input class="input-extra-small" name="medicationCode" id="medicationCode" value="" onkeydown="javascript:membership_add_medication(event, \''+item.code+'\', this)"></input></td>'+	    
			  '</tr>';
			  
			  xp = module_xp['edit_membership_medications'];
			  var __qt = __json_autorize(xp['table'], xp['fields'], xp['types'], " WHERE membershipCode='"+item.code+"'");
			  var mlist = '';
			  $.post(__q_gw, __qt, function(data) {				  
				  $.each(data.items, function(i, item) {
					  mlist += item.medicationCode +',';
				  });				  				 
			  });
			  			  
			  content = replaceAll(content, '###', mlist);
		  });
		  
		  content += '</tbody></table>';		  
		  $('#membership_list').html(content);
		  $('#table_memberships').tablesorter();
	});					
}

function membership_add_medication(event, code, e) {
	if (event.keyCode == 13) {
		var vls = 's'+e.value+',s'+code;
		any_insert_action('edit_membership_medications', vls);
	}		
}

function reload_schedule_settings() {
	var xp = module_xp['edit_settings'];
	var __q = __json_autorize(xp['table'], xp['fields'], xp['types'], space);
	$.post(__q_gw, __q, function(data) {		  
		  $.each(data.items, function(i, item) {
			  var $form = $("#update_settings");
			  $form.find( 'input[name="'+item.name+'"]' ).val(item.value);
		  });
	});
}

procedure_xp['edit_settings'] = function reload_settings() {
	put_module_insert_action('edit_membership');
	reload_memberships();
	reload_schedule_settings();	
}

function password_form() {
	$("#change_password").submit(function(event) {		                                        
        event.preventDefault(); 
        var current = $("#change_password").find( 'input[name="current"]' ).val();
        var newp = $("#change_password").find( 'input[name="new"]' ).val();
        var refill = $("#change_password").find( 'input[name="refill"]' ).val();
        if (newp == refill) {
	        var __q = __json_autorize_update('doctors', 'password', 's'+newp, "code='"+logged_user.userCode+"' and password='"+current+"'");
	        $.post(__q_gw, __q, function(data) {
	        	$('#result-log').html('<strong>Амжилттай!</strong>').delay(1200).fadeOut(function() {
	        		exit_dental();
			  		$(this).html('');
			  		$(this).fadeIn();
				});
	      	}, 'json');
        } else 
        	jAlert('Мэдээлэл буруу байна, дахин шалгана уу !', 'Confirmation Dialog', function(r) {									
    			
    		});
	});
}

function reload_settings() {
	put_module_insert_action('edit_membership');
	reload_memberships();
	reload_schedule_settings();
	password_form();
}

function show_settings() {
	content_changer('settings/index.jsp','settings', 11);
}

//faq
function reload_faq() {
	if (logged_user) {
		var where = sql_param[0]+"userCode='"+logged_user.userCode+"' and clinicCode='"+logged_user.company+"'"+sql_param[1]+" _dateStamp"; 
		any_select_action('edit_faq', where);
	}
}

function send_faq() {
	var message = $("#faq").val();
	$("#faq").val('');	
	var vls = 's'+message+',s'+logged_user.userCode+',s'+logged_user.company+',dCURRENT_TIMESTAMP';
	any_insert_action('edit_faq', vls);
}

// search 
function search_filter() {	
	if ($('#filter_form').is(":visible")) {
		$('#filter_form').hide();
		$('#search_filter_button').removeClass('combo_selected');
		$('#search_filter_button').addClass('combo');
		
		$('#filter_button').removeClass('filter_selected');
		$('#filter_button').addClass('filter');
	}
	else {
		$('#search_filter_button').removeClass('combo');
		$('#search_filter_button').addClass('combo_selected');
		$('#filter_form').show();
		
		$('#filter_button').removeClass('filter');
		$('#filter_button').addClass('filter_selected');
	}
	reload_customers_param();
}


//permission
function permission_set() {
	var access = "<span class='locked'></span>";
	var save = "<input class='button' id='submit' name='submit' type='submit' value='Хадгалах'/>";
	$('#permission_bar').html(access);
	$('#save_bar').html(save);
}
