var loaded = false;
var dates = '';
var chosen = '';
var module_xp = [], procedure_xp = [];
var map;
var hash = [], indexed_hash = [];
var config = [];
var counter_status = [];
var max_types = 0;
var logged_user;
var fill_datas = [];
var current_uri;
var sections = '';
var read_data, c_data;
var space = ' ';
var loaded = false;
var session = '';
var ecode = '';
var main_date_sel = 1;
var district = 1;
var current_date = new Date();
var data = '';

var __q_gw = 'httpGW';
var sql_param = [' WHERE ', ' ORDER BY ', ' like N', ' asc', ' desc', ' and '];
var denyMsg = '<strong style="color:red">Хандалтыг зөвшөөрөхгүй байна !</strong>';
var successMsg = '<strong>Амжилттай!</strong>';
var errorMsg = '<strong style="color:red">Амжилтгүй!</strong>';
var degree = ['', 'Баклавар', 'Доктор', 'Профессор'];

var medication_query = ' ';

function load_modules() {	
	var __q = __json_autorize_custom('_module_list', space);
	
	module_xp = [];
	$.post(__q_gw, __q, function(data) {
	    $.each(data.items, function(i, item) {	    	
		   module_xp[item.module] = [];		   
		   module_xp[item.module]['fields'] = item.fields;
		   module_xp[item.module]['table'] = item.tableName;
		   module_xp[item.module]['types'] = item.types;
		   module_xp[item.module]['caption'] = item.caption;
		   module_xp[item.module]['folder'] = item.folder;
		   module_xp[item.module]['key'] = item.keyz;
		   module_xp[item.module]['insert'] = item.insertAction;
		   module_xp[item.module]['tmpl'] = item.tmpl;
		   module_xp[item.module]['list'] = item.list;
		   module_xp[item.module]['wtmpl'] = item.wtmpl+"'#'";
		   module_xp[item.module]['top'] = item.topRows;
		   module_xp[item.module]['imaged'] = item.imaged;
	    });
	    loaded = true;
	    tmpl_functions();
	    if (logged == 0) {
	    	session = '';	    		   
	    	
	    //	initmap('3', 3);
	    	
	    	init_login_form("main_login_form", "input-login", "input-login-error");
	    	init_login_form("login_form", "input-small", "input-small-error");  
			search_filter();	
			kriesi_tab('#main_content','.jquery_tab_title','.jquery_tab', ' posed');		
		
		//	reload_product_types();			
		//	reload_products();
	    } else {
	    	load_datas();	    	  	  		
	    }
	});
		
	$(document).keydown(function (e) {
		  if (e.which == 9) {
			  all_hide_popups();
		  }
		  
		  if (e.which === 8 && !$(':focus').length) {
			  e.preventDefault();
		      return false;
		  }
		  
		  if (e.which == 39) {
			$('ul.c li a').focus().hover();
		  }
		  
		  if (e.which == 27)
			  all_hide_popups();		  		  
	});
}

function load_datas() {
	hash = [];	
	reload_any('edit_doctor', space);
	//reload_any('edit_customer', 'active');
	hash['edit_customer'] = [];
	reload_any('edit_medication', space);	
	reload_any('edit_medication_categories', space);					
	//reload_any('edit_membership_medication', space);
	reload_product_types();
		
	reload_always();
}

function reload_product_types() {
	reload_any('edit_product', space);
	reload_any('edit_product_types', space);	
}

function reload_any(module, where) {	
	if (typeof hash[module] == 'undefined' || true) {
		var xp = module_xp[module];		
		if (typeof module_xp[module] == 'undefined') return;
		
		var __q = __json_autorize(xp['table'], xp['fields'], xp['types'], where);
		hash[module] = [];
		indexed_hash[module] = [];
		var fd = xp['fields'].split(',');
		$.post(__q_gw, __q, function(data) {
			  $.each(data.items, function(i, item) {
				  hash[module][item[fd[0]]] = item;
				  indexed_hash[module][i] = item;
			  }); 
			  
			  if (module == 'edit_product_types')
				 init_product_types_select();			  
		});
	}	
}

function customer_reader(code) {	
	//var item = hash['edit_customer'][code];
	var xp = module_xp['edit_customer'];		
	var __q = __json_autorize(xp['table'], xp['fields'], xp['types'], " WHERE id="+code);
	$.post(__q_gw, __q, function(data) {		  
		  var item = data.items[0];
		  var value = item.id+','+item.code;
		  $('#vcard'+item.id).html('<h1 class="fn" id="name">'+item.firstName+' '+item.lastName+'</h1>'+
				  			 '<p>'+
				  			 	'<span class="type">Код</span>: '+
				  			 	'<span>'+item.code+'&nbsp;</span><a onclick="make_code('+'\''+value+'\''+')"><img src="images/code.png" style="margin-top: 2px;" title="Код оноох"></img></a><br/>'+
				  				'<span class="type">Төрсөн огноо</span>: '+
				         		'<span>'+item.birthdate+'</span><br/>'+
				         		'<span class="type">Хүйс</span>: '+	
				         		'<span>'+render_gender(item.gender)+'</span><br/>'+
				         		'<span class="type">Гэр бүлийн байдал</span>: '+
				         		'<span>'+render_isfamily(item.isFamily)+'</span><br/>'+
				         		'<span class="type">Мэргэжил, Ажлын газар</span>: '+
				         		'<span>'+item.jobName+', '+item.companyName+'</span><br/>'+					         		
				         		'<span class="type">Гишүүнчлэл</span>: '+
				         		'<span>'+item.membershipCode+'</span><br/>'+
				         		'<span class="type">Үлдэгдэл төлбөр</span>: '+
				         		'<span>'+render_money_ex(item.balance)+'</span><br/>'+
				  			 '</p>'+
					         '<p>'+								         	
					         	'<span class="tel">'+
					         		'<span class="type">Утас</span>: '+
					         		'<span class="value">'+item.phone+'</span>'+
					         		'<br />'+
					         		'<span class="type">Факс</span>: '+
					         		'<span class="value">'+item.fax+'</span></span>'+
					         		'<br />'+
					         	'<span class="email">'+
					         		'<span class="type">И-майл</span>: '+ 
					         		'<a href="mailto:#" class="value">'+item.email+'</a></span>'+
					         		'<br />'+
					         	'<span class="address">'+
					         		'<span class="type">Хаяг</span>: '+ 
					         		'<span class="value">'+item.country+' '+item.city+', '+item.address+'</span>'+								         		
					         '</p>');			  
		  $('#cimage').attr('src', empty_man(item, ''));
			  
		age = getAge(item.birthdate);
		fullName = item.firstName+' '+item.lastName;
		data = '';
		reset_values();
		un_render_tooth_chart_all();
		var code = item.code;	
		var id = item.id;
		$.post(__q_gw, __json_autorize_custom('_customer_tooth_list', code), function(data) {
			  var content = '<table id="table_customers" cellspacing="0">'+
			  '<tr>'+	
				'<th>Огноо</th>'+
				'<th>Эмчилгээний нэр</th>'+
				'<th style="text-align:center">Шүдний код</th>'+
				'<th>Эмчийн нэр</th>'+
				'<th>Хавсралт</th>'+
			  '</tr>'+
			  '<tbody>';
			  var date = '', val = '';
			  dates = '';			  
			  $.each(data.items, function(i, item) {
				  var item1 = {id: item.id, ud: item.ud, dir: item.direction, tooth: item.toothID, service: item.service, toothSide: item.toothSide};
				  date = item._date.substring(0, 10);				  
				  if (dates.indexOf(date+',') != -1) date = '';	
				  else dates += date+',';
				  var customer = hash['edit_customer'][item.code];
				  content += '<tr>'+
					  			'<td class="'+(i%2==0?"alt":"")+'"><a onclick="javascript:call_main_process_form_read_ex(\''+item.code+'\''+','+'\''+item.doctorCode+'\''+','+'\''+item.orderID+'\''+','+'\''+fullName+'\''+','+'\''+age+'\')">'+date+'</a></td>'+
								'<td class="'+(i%2==0?"alt":"")+'">'+hash['edit_medication'][item.medicationCode].code+' '+hash['edit_medication'][item.medicationCode].name+'</td>'+
								'<td style="text-align:center" class="'+(i%2==0?"alt":"")+'">'+toothIndexTitle(item1)+'</td>'+
								'<td class="'+(i%2==0?"alt":"")+'">'+getFullName(hash['edit_doctor'][item.doctorCode])+'</td>'+
								'<td class="'+(i%2==0?"alt":"")+'">'+item.file+'</td>'+
							 '</tr>';
				  			  				
				  reload_customer_tooth_data_chart(item.orderID);
			  });
			  
			  content += '</tbody></table>';
			  $('#history'+id).html(content);
		});	
		
		
		$.post(__q_gw, __json_autorize_custom('_customer_history_text', code), function(data) {
			var content = '';
			$.each(data.items, function(i, item) {
				  memo = replaceAll(item.memo, '$', '\n');
				  content += item.startDate.substring(0, 10)+'\n\n'+memo+'\n\n';
			}); 
			
			$('#history_text_'+id).val(content);
		});	
	
	});
}


function customer_reader1(code) {	
	//var item = hash['edit_customer'][code];
	var xp = module_xp['edit_customer'];		
	var __q = __json_autorize(xp['table'], xp['fields'], xp['types'], " WHERE code='"+code+"'");	
	$.post(__q_gw, __q, function(data) {		  
		  var item = data.items[0];
		  var value = item.id+','+item.code;
		  var dt = '<h1 class="fn" id="name">'+item.firstName+' '+item.lastName+'</h1>'+
					 '<p>'+
					 	'<span class="type">Код</span>: '+
					 	'<span>'+item.code+'&nbsp;</span><a onclick="make_code('+'\''+value+'\''+')"><img src="images/code.png" style="margin-top: 2px;" title="Код оноох"></img></a><br/>'+
						'<span class="type">Төрсөн огноо</span>: '+
		      		'<span>'+item.birthdate+'</span><br/>'+
		      		'<span class="type">Хүйс</span>: '+	
		      		'<span>'+render_gender(item.gender)+'</span><br/>'+
		      		'<span class="type">Гэр бүлийн байдал</span>: '+
		      		'<span>'+render_isfamily(item.isFamily)+'</span><br/>'+
		      		'<span class="type">Мэргэжил, Ажлын газар</span>: '+
		      		'<span>'+item.jobName+', '+item.companyName+'</span><br/>'+					         		
		      		'<span class="type">Гишүүнчлэл</span>: '+
		      		'<span>'+item.membershipCode+'</span><br/>'+
		      		'<span class="type">Үлдэгдэл төлбөр</span>: '+
		      		'<span>'+render_money_ex(item.balance)+'</span><br/>'+
					 '</p>'+
			         '<p>'+								         	
			         	'<span class="tel">'+
			         		'<span class="type">Утас</span>: '+
			         		'<span class="value">'+item.phone+'</span>'+
			         		'<br />'+
			         		'<span class="type">Факс</span>: '+
			         		'<span class="value">'+item.fax+'</span></span>'+
			         		'<br />'+
			         	'<span class="email">'+
			         		'<span class="type">И-майл</span>: '+ 
			         		'<a href="mailto:#" class="value">'+item.email+'</a></span>'+
			         		'<br />'+
			         	'<span class="address">'+
			         		'<span class="type">Хаяг</span>: '+ 
			         		'<span class="value">'+item.country+' '+item.city+', '+item.address+'</span>'+								         		
			         '</p>';
		  $('#vcard').html(dt);					  
		  $('#cimage').attr('src', empty_man(item, ''));
			  
		age = getAge(item.birthdate);
		fullName = item.firstName+' '+item.lastName;
		data = '';
		reset_values();
		un_render_tooth_chart_all('dent_chart_1');
		var code = item.code;	
		var id = item.id;
		$.post(__q_gw, __json_autorize_custom('_customer_tooth_list', code), function(data) {
			  var content = '<table id="table_customers" cellspacing="0">'+
			  '<tr>'+	
				'<th>Огноо</th>'+
				'<th>Эмчилгээний нэр</th>'+
				'<th style="text-align:center">Шүдний код</th>'+
				'<th>Эмчийн нэр</th>'+
				'<th>Хавсралт</th>'+
			  '</tr>'+
			  '<tbody>';
			  var date = '', val = '';
			  dates = '';			  
			  var orderID = 0;
			  $.each(data.items, function(i, item) {
				  orderID = item.orderID;
				  var item1 = {id: item.id, ud: item.ud, dir: item.direction, tooth: item.toothID, service: item.service, toothSide: item.toothSide};
				  date = item._date.substring(0, 10);				  
				  if (dates.indexOf(date+',') != -1) date = '';	
				  else dates += date+',';
				  var customer = hash['edit_customer'][item.code];
				  content += '<tr>'+
					  			'<td class="'+(i%2==0?"alt":"")+'"><a onclick="javascript:call_main_process_form_read_ex(\''+item.code+'\''+','+'\''+item.doctorCode+'\''+','+'\''+item.orderID+'\''+','+'\''+fullName+'\''+','+'\''+age+'\')">'+date+'</a></td>'+
								'<td class="'+(i%2==0?"alt":"")+'">'+hash['edit_medication'][item.medicationCode].code+' '+hash['edit_medication'][item.medicationCode].name+'</td>'+
								'<td style="text-align:center" class="'+(i%2==0?"alt":"")+'">'+toothIndexTitle(item1)+'</td>'+
								'<td class="'+(i%2==0?"alt":"")+'">'+getFullName(hash['edit_doctor'][item.doctorCode])+'</td>'+
								'<td class="'+(i%2==0?"alt":"")+'">'+item.file+'</td>'+
							 '</tr>';
				  			  				
				  reload_customer_tooth_data_chart_1(item.orderID, 'dent_chart_1');
			  });
			  
			  content += '</tbody></table>';
			  $('#history_1').html(content);
			  
			    $('#rentgen1').click(function() {
					  var path = 'medication/main/';						  
					  window.open(path+'/picture.jsp?id=rentgen1&orderID='+orderID, 'Зурах оруулах', 'width=650,height=360,left=600,top=300,resize=0');
				});
				
				$('#rentgen2').click(function() {
					  var path = 'medication/main/';						  
					  window.open(path+'/picture.jsp?id=rentgen2&orderID='+orderID, 'Зурах оруулах', 'width=650,height=360,left=600,top=300,resize=0');
				});
				
				$('#rentgen3').click(function() {
					  var path = 'medication/main/';						  
					  window.open(path+'/picture.jsp?id=rentgen3&orderID='+orderID, 'Зурах оруулах', 'width=650,height=360,left=600,top=300,resize=0');
				});
		});	
		
		
		$.post(__q_gw, __json_autorize_custom('_customer_history_text', code), function(data) {
			var content = '';
			$.each(data.items, function(i, item) {
				  memo = replaceAll(item.memo, '$', '\n');
				  content += item.startDate.substring(0, 10)+'\n\n'+memo+'\n\n';
			}); 
			
			$('#history_text_1').val(content);
		});	
	
	});		
}


//index
function class_swapper(index) {
	for (i = 1; i <= 12; i++) 
		if (i == index)
			$("#item"+i).addClass("current");
		else
			$("#item"+i).removeClass("current");
}                    	

function content_changer(url, page, index) {
	if (!loaded) {
		alert('Түр хүлээнэ үү !');
		return;
	}
	all_hide_popups();
	for_loading();
	$("#main").animate({opacity: 0}, 100, function() {                    			
		$("#main").load(url, function(response, status, xhr) {	                    			
			if (page == 'index') 
				load_index_left_right_pane();                        	
								
			if (procedure_xp['edit_'+page])				
				procedure_xp['edit_'+page]();
										
			all_hide_popups();
			class_swapper(index);
			permission_set();
			
			$("#main").animate({opacity: 1}, 100);
			jquery_date_elements_init();
			kriesi_tab('#content','.jquery_tab_title','.jquery_tab');
			
			if (typeof mode != 'undefined' && mode == '1')				
				setactive();
		});
	});
}

function show_login_form() {
	if (!$("#login_info").is(":visible"))
		$("#login_info").show();
	else
		$("#login_info").hide();
}

function init_login_page() {	
	$("#member_info").hide();	
	$("#sidebar").hide();
	$("#default_info").show();	
	
	$("#main").load("public_index.jsp", function(response, status, xhr) {
		load_modules();
	});
}

function initmap(dis, d) {
	map = new GMap2($("#map").get(0));
	var burnsvilleMN = new GLatLng(44.797916,-93.278046);
	map.setCenter(burnsvilleMN, 8);
	$("#d"+district).removeClass('clinic_district-active');
	district = d;
	$("#d"+district).addClass('clinic_district-active');
	
	// setup 10 random points
	var bounds = map.getBounds();
	var southWest = bounds.getSouthWest();
	var northEast = bounds.getNorthEast();
	var lngSpan = northEast.lng() - southWest.lng();
	var latSpan = northEast.lat() - southWest.lat();
		
	var form_id = 'edit_clinics';
	var table = module_xp[form_id]['table'];
	var fields = module_xp[form_id]['fields'];
	var types = module_xp[form_id]['types'];
	var list = module_xp[form_id]['list'];
	var tmpl = module_xp[form_id]['tmpl'];
	var key = module_xp[form_id]['key'];		
	session = '';
	var __q = __json_autorize(table, fields, types, sql_param[0]+" district=N'"+dis+"' "+sql_param[1]+"name");	
	$.post(__q_gw, __q, function(data) {
		  c_data = data.items;
		  if (typeof c_data != 'undefined') {
			  var markers = [];		  
			  for (var i = 0; i < c_data.length; i++) {
				    var point = new GLatLng(southWest.lat() + latSpan * Math.random(),
				        southWest.lng() + lngSpan * Math.random());
				    var m = {title: ''};
				    var icon = new GIcon(G_DEFAULT_ICON);
					icon.image = 'icons/marker.png';
					icon.iconSize = new GSize(32, 32);
					icon.shadowSize = new GSize(1, 1);
					m.icon = icon;
				    
					marker = new GMarker(point, m);					
					map.addOverlay(marker);					
					markers[i] = marker;
				}
				
			    $("#list").html('');
				$(markers).each(function(i,marker){
					$("<li />")
						.html('<b>'+c_data[i].name+'</b></br><span style="color:#aaa">'+c_data[i].phone+'</span>')
						.click(function(){
							displayPoint(marker, i, '<b>'+c_data[i].name+'</b></br>'+c_data[i].owner+'</br>'+c_data[i].phone+'</br>'+c_data[i].address+'</br>'+c_data[i].descr);
						})
						.appendTo("#list");
					
					GEvent.addListener(marker, "click", function(){
						displayPoint(marker, i);
					});
				});
		  } else initmap(dis, d);
	});
		
	$("#mmessage").appendTo(map.getPane(G_MAP_FLOAT_SHADOW_PANE));		
}

function searchmap(name) {
	if (name.length <= 1) return;
	
	map = new GMap2($("#map").get(0));
	var burnsvilleMN = new GLatLng(44.797916,-93.278046);
	map.setCenter(burnsvilleMN, 8);	
	
	var bounds = map.getBounds();
	var southWest = bounds.getSouthWest();
	var northEast = bounds.getNorthEast();
	var lngSpan = northEast.lng() - southWest.lng();
	var latSpan = northEast.lat() - southWest.lat();
		
	var form_id = 'edit_clinics';
	var table = module_xp[form_id]['table'];
	var fields = module_xp[form_id]['fields'];
	var types = module_xp[form_id]['types'];
	var list = module_xp[form_id]['list'];
	var tmpl = module_xp[form_id]['tmpl'];
	var key = module_xp[form_id]['key'];		
	session = '';
	var __q = __json_autorize(table, fields, types, sql_param[0]+"name "+sql_param[2]+"'"+name+"%'"+sql_param[1]+"name");	
	$.post(__q_gw, __q, function(data) {
		  c_data = data.items;
		  var markers = [];		  
		  for (var i = 0; i < c_data.length; i++) {
			    var point = new GLatLng(southWest.lat() + latSpan * Math.random(),
			        southWest.lng() + lngSpan * Math.random());
				marker = new GMarker(point);
				map.addOverlay(marker);
				markers[i] = marker;
			}
			
		    $("#list").html('');
			$(markers).each(function(i,marker){
				$("<li />")
					.html('<b>'+c_data[i].name+'</b></br><span style="color:#aaa">'+c_data[i].phone+'</span>')
					.click(function(){
						displayPoint(marker, i, c_data[i].owner+'</br>'+c_data[i].phone+'</br>'+c_data[i].address+'</br>'+c_data[i].descr);
					})
					.appendTo("#list");
				
				GEvent.addListener(marker, "click", function(){
					displayPoint(marker, i);
				});
			});
	});
				
	$("#mmessage").appendTo(map.getPane(G_MAP_FLOAT_SHADOW_PANE));		
}

function displayPoint(marker, index, text){
	$("#mmessage").hide();
	$("#mmessage").html(text);
	var moveEnd = GEvent.addListener(map, "moveend", function(){
		var markerOffset = map.fromLatLngToDivPixel(marker.getLatLng());
		$("#mmessage")
			.fadeIn()
			.css({ top:markerOffset.y, left:markerOffset.x });
	
		GEvent.removeListener(moveEnd);
	});
	map.panTo(marker.getLatLng());
}

function noBack() {
	window.history.forward(1);
}


function init_logged_page() {
	jquery_elements_init();
	$("#login_info").hide();
	$("#member_info").show();
	$("#sidebar").show();
	$("#default_info").hide();
	
	for_corporate();	
	$("#member_info").load('member_info.jsp');
	
	$('#bg_wrapper').click(function (e){
		if (e.srcElement.id != 'search')
			all_hide_popups();		
    });		
	
	$.extend($.expr[":"], 
	{
	    "contains-ci": function(elem, i, match, array) 
		{		    	
			return (elem.textContent || elem.innerText || $(elem).text() || "").toLowerCase().indexOf((match[3] || "").toLowerCase()) >= 0;
		}
	});		
}

function for_loading() {
	$("#main").html(
    	"<div class='centered'>"+
			"<img src='data:image/gif;base64,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'></img>"+
		"</div>");
}

function for_corporate() {
	for_loading();	
	$("#main").load("content_index.jsp", function(response, status, xhr) {		
		reload_logins_data();
	});                      	              	
	
	$("#sidebar").load("sidebar.jsp", function(response, status, xhr) {
		jquery_elements_init();                 
		
		$("#tags").bind('keyup', function(e) {
            e.preventDefault();	                   	            
	       	show_search_field($("#tags").val(), '_search_content', true, 0, 0);
        });
		
		$("#faq").bind('keyup', function(e) {
            e.preventDefault();	             
            if (e.keyCode == 13) {
            	send_faq();
            }
        });                      
	});
}


jQuery.fn.filterByText = function(textbox, selectSingleMatch) {
  return this.each(function() {
    var select = this;
    var options = [];
    $(select).find('option').each(function() {    	
      options.push({value: $(this).val(), text: $(this).text()});
    });
    $(select).data('options', options);
    $(textbox).bind('change keyup', function() {
      var options = $(select).empty().scrollTop(0).data('options');
      var search = $.trim($(this).val());
      var regex = new RegExp(search,'gi');

      $.each(options, function(i) {
        var option = options[i];
        if(option.text.match(regex) !== null) {
          $(select).append(
             $('<option>').text(option.text).val(option.value)
          );
        }
      });
      if (selectSingleMatch === true && 
          $(select).children().length === 1) {
        $(select).children().get(0).selected = true;
      }
    });
  });
};

$.fn.focusToEnd = function() {
   return this.each(function() {
       var v = $(this).val();
       $(this).focus().val("").val(v);
   });
};