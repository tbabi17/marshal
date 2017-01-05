function customer_template(item) {
	var badge = (item.membershipCode?'<div class="badge" title="Гишүүнчлэл :'+item.membershipCode+'"></div>':'');
	if (item.recare) {
		var markup = '<div class="customer_box" onclick=javascript:call_customer_view_form("'+item.id+'")>'+badge+'<img src="'+empty_man(item, '')+'"></img><span class="customer_box text"><a onclick=javascript:call_customer_view_form("'+item.id+'")>'+getFullNameEx(item)+'</a></br><b>'+item.code+'</b><br/>'+item.recare+'<br/><span class="phone">'+item.phone+'</span></span></div>';		
		return markup;
	} else {
		var markup = '<div class="customer_box" onclick=javascript:call_customer_view_form("'+item.id+'")>'+badge+'<img src="'+empty_man(item, '')+'"></img><span class="customer_box text"><a onclick=javascript:call_customer_view_form("'+item.id+'")>'+getFullNameEx(item)+'</a></br><b>'+item.code+'</b><br/>'+getAge(item.birthdate)+' нас, '+render_gender(item.gender)+'<br/><span class="phone">'+item.phone+'</span></span></div>';		
		return markup;
	}
}

function un_customer_template(item) {
	var time = item.startDate.substring(11,16)+' - '+item.endDate.substring(11,16);
	var status = '<span style="color:red">бүртгэлгүй</span>';
	var markup = '<div onclick="fillData(\''+item.descr+'\', \''+item.id+'\',\''+item.contactPhone+'\')" class="customer_box" onmouseover=show_close_on('+item.id+','+item.status+') onmouseout=show_close_off('+item.id+','+item.status+')><div class="delete" onclick=delete_order_request('+item.id+','+item.status+') id="delete'+item.id+'" title="Цуцлах эсвэл устгах"></div><img src="'+empty_man(item, '')+'"></img><span class="customer_box text"><a onclick="null"><b>'+item.descr+'</b></a><br/>'+time+'<br/>'+item.contactPhone+'<br/>'+status+'</span></div>';
	return markup;
}

function message_template(item) {	
	var markup = '<div class="message_box"><img src="'+empty_man(item, '')+'"></img><span class="message_box text"><a onclick=""><b>'+item.userCode+'</b></a><br/>'+item.message+'</span><span class="message_box pane">'+item.dateStamp.substring(0, 10)+'</span><span class="message_box actions"><a class="close" onclick="change_flag_message('+item.id+','+item.flag+')"></a></span></div><div class="message_divider"></div>';		
	return markup;
}

function order_bottom_action(userCode) {	
	var markup = '<div class="order_bottom_box"><div id="bottom_bar"><div id=\'save_bar\'><input class=\'button\' id=\'submit\' name=\'submit\' type=\'submit\' value=\'Зөвшөөрөх\' onclick="order_accept('+'\''+userCode+'\''+')"/><input class=\'button-gray\' id=\'clear\' name=\'clear\' type=\'button\' value=\'Цуцлах\' onclick="order_cancel('+'\''+userCode+'\''+')"/></div><div id="result-log"></div></div>';
	return markup;
}

function template_basket_product(item, product) {
	var content = '';
	var name = '';	
	if (isundefined(product.name))
		name = item.name;
	else
		name = product.name;
	if (item.quantity > 1)		
		 content = '<li><img src="'+empty_product(product, '')+'"></img><a><span class="text">'+name+'<br/><b>'+item.quantity+'</b> ширхэг</span></a></li>';	
	  else
		  content = '<li><img src="'+empty_product(product, '')+'"></img><a>'+name+'</a></li>';
	
	return content;
}

function medication_main_template(item, main) {
	var badge = (item.membershipCode?'<div class="badge" title="Гишүүнчлэл :'+item.membershipCode+'"></div>':'');
	var dif = getDay(main.startDate);		
	var time = main.startDate.substring(11,16)+'-'+main.endDate.substring(11,16) + ((dif != -1)?'  <b>'+main.startDate.substring(5, 10).replace('-','/')+'</b>':'');	
	if (dif < -1 && main.status != 2) time = '<span style="text-decoration:line-through;" title="Уг цаг өнгөрсөн байна.">'+time+'</span>';
	
	var status = '';
	if (main.status == 2) status = '<span style="color:white; background: green; padding: 2px; border-radius: 2px;">хаалттай</span>';
	if (main.status == 3) status = '<span style="color:white; background: red; padding: 2px; border-radius: 2px;">цуцлагдсан</span>';
	if (main.status == 4) status = '<span style="color:white; background: brown; padding: 2px; border-radius: 2px;">төлөлт хийгдэх</span>';
	if (main.status == 0) status = '<span style="color:white; background: #FBB117; padding: 2px; border-radius: 2px;">хүлээгдэж буй</span>';
	var param = item.code+','+main.doctorCode+','+main.id+','+main.fullName+','+main.age+','+main.status+','+dif+','+main.recare+','+main.isbaby;
	var vcode = item.code;
	if (vcode.length > 5) vcode = 'кодгүй';
	var markup = '<div class="customer_box" onmouseover=show_close_on('+main.id+','+main.status+') onmouseout=show_close_off('+main.id+','+main.status+')>'+badge+'<span class="delete" onclick=cancel_order_request('+main.id+','+main.status+') id="delete'+main.id+'" title="Цуцлах эсвэл устгах"></span><img src="'+empty_man(item, '')+'"></img><span onclick="javascript:call_main_process_form('+'\''+param+'\''+')" class="customer_box text"><a onclick="javascript:null">'+getFullNameEx(item, item.descr+'')+'</a><br/>'+time+'<br/>'+getShortName(getHash('edit_doctor', main.doctorCode),'')+' <b>'+vcode+'</b><br/>'+status+'</span></div>';
		
	return markup;
}

function tmpl_functions() {
	module_xp['edit_faq']['tmpl_function'] = function (item) {	
		var markup = '<li><img src="'+empty_man(item.userCode, '')+'"><span class="text">'+item.message+'<br/><span style="color:#aaa">'+item._dateStamp+'</span></span></img></li>';
			
		return markup;
	}
	
	module_xp['edit_medication']['tmpl_function'] = function (item) {
		var content = '';
		if (sections.indexOf(item.section+':') == -1) {
			sections += item.section+':';
		  	content += '<div class="my_az_box">'+
		  				 	'<div class="fancy-header">'+
		  						'<span class="nil">'+item.name+'</span>'+
		  					'</div>'+
		  					sub_az_list(read_data, item.section)+														  					
		  			   '</div>';
		}
		
		return content;
	}

	module_xp['edit_doctor']['tmpl_function'] = function (item) {
		var content = '<span class="doctor_button button1">'+													  		
						 '<a href=javascript:call_edit_doctor_dialog("'+item.code+'")><img src="'+empty_man(item, '')+'" style="border:1px #F5e5e5 solid" width="150" height="150"></img></a>'+				                                       				
							 '<a style="line-height:0px; padding: 5px;" href=javascript:call_edit_doctor_dialog("'+item.code+'")><b>'+item.firstName.charAt(0)+'. '+item.lastName+'</b></a>'+
							 '<span class="school">'+render_degree(item.degree)+', '+item.education+'<br></span>'+
							 '<span class="level">'+render_doctor_jobStatus(item.jobStatus)+'</span>'+
							 '<span style="line-height: 10px">&nbsp;</span>'+
							 '<span class="date-tag">Код : '+item.code+'</span>'+
					   '</span>';
		
		return content;
	}

	module_xp['edit_product']['tmpl_function'] = function(item) {	
		var badge = '';	
		//if (getDay(item._dateStamp) < 14)
			//badge = '<div class="badge" title="Шинэ бараа"></div>';
		
		var add = '';
	
		if (logged > 0)						
			add = '<span><table width="100%" cellpadding=0 cellspacing=0><tr><td width="118px" style="border-color: #fff;padding: 2px;">Үлдэгдэл : '+item[logged_user.userID]+'</td><td style="float: right; border-color: #fff;padding: 2px;" width="35px"><input class="input-small" type="text" id="qty_'+item.code+'" value="1" name="qty" style="width:32px; text-align: center;"/></td><td style="border-color: #fff; padding: 2px;"><a onclick="javascript:add_to_basket(\''+item.code+'\')" class="button-extra-small">&nbsp;+&nbsp;</a></td></tr></table></span>';
		//onclick="javascript:call_product_edit_form(\''+item.code+'\')"
		var content = '<span class="eshop_medi_button" id="eshop_'+item.code+'">'+
							badge+
							//'<a onclick="javascript:call_product_edit_form(\''+item.code+'\')"><img src="'+empty_product(item, '')+'" style="padding:4px;" width="172" height="118"></img></a>'+	           							
							'<div class="customer_medi_button" style="height:82px;">'+
						 		'<a style="height: 36px;" onclick="javascript:call_product_edit_form(\''+item.code+'\')">'+item.name+'</a><span style="height: 32px;">'+item.descr+'</span><span class="price" href="">'+render_money(item.price)+'</span>'+						 							 		
							 '</div>'+
							 add+
						'</span>';
			
		return content;			
	}

	module_xp['edit_customer']['tmpl_function'] = function(item) {	
		return customer_template(item);	
	}
}


function medication_main_list(data, status) {
	var content = '';
			
	for (t = 0; t < data.length; t++)
	{	                              					
		var time = data[t].startDate.substring(11,16)+' - '+data[t].endDate.substring(11,16);
		if (status == 2) time = data[t].startDate.substring(0, 10);
		if (status == 3) time = data[t].startDate.substring(0, 10);		
		//var customer = getHash('edit_customer', data[t].code);
		//if (customer == undefined) customer = data[t];
		var customer = data[t];
		counter_status[data[t].status]++;
		content += medication_main_template(customer, data[t]);		
	}
	
	return content;
}

function medication_main_list_where(data, status) {
	var content = '';
			
	for (t = 0; t < data.length; t++)
		if (data[t].status == status) {	                              					
			var time = data[t].startDate.substring(11,16)+' - '+data[t].endDate.substring(11,16);
			if (status == 2) time = data[t].startDate.substring(0, 10);
			if (status == 3) time = data[t].startDate.substring(0, 10);
			//var customer = getHash('edit_customer', data[t].code);
			var customer = data[t];
			content += medication_main_template(customer, data[t]);
		}
	
	return content;
}

function sub_az_list(data, section) {
	var content = '';
	
	for (i = 0; i < data.length; i++) 
		if (data[i].section == section) {
			var name = data[i].name;
			if (name.length > 48) name = name.substring(0, 48)+'..';
			content += '<span><div class="latest-news-item">'+		                              								
							'<a href="javascript:call_medication_edit_form(\''+data[i].code+'\')"><span class="date-tag">'+data[i].code+'</span></a>'+
							'<h5>'+name+' '+render_money_ex(data[i].price)+'</h5>'+
					   '</div></span>';
		}
	
	return content;
}


function mixed_string(item) {
	return item.doctor_id+','+item.medication_id+','+item.start_date+','+item.end_date+','+item.text;											
}

function mixer_where(form_id, value) {
	var tmpl = module_xp[form_id]['wtmpl'];	
	return replaceAll(tmpl, '#', value);
}

function mixer_select_where(form_id, value) {
	var tmpl = module_xp[form_id]['wtmpl'];
	return ' WHERE '+replaceAll(tmpl, '#', value);
}