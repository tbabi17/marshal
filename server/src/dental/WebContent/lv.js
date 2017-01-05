function __json_autorize(table, fields, types, where) {	
	return __q_donate(table, 'SELECT', table, fields, types, where); 
}

function __json_autorize_custom(fun, where) {	
	return __q_donate(fun, 'SELECT', space, space, space, where);	
}

function __json_autorize_custom_writer(fun, where) {	
	return __q_donate(fun, 'WRITER', space, space, space, where);	
}

function __json_autorize_insert(table, fields, types, where) {	
	return __q_donate('insert', 'WRITER', table, fields, types, where);	
}

function __json_autorize_update(table, fields, types, where) {	
	return __q_donate('update', 'WRITER', table, fields, types, where);	
}

function __json_autorize_delete(table, where) {	
	return __q_donate('delete', 'WRITER', table, space, space, where);	
}

function put_module_to_form(form_id) {
	var table = module_xp[form_id]['table'];
	var fields = module_xp[form_id]['fields'];
	var types = module_xp[form_id]['types'];
	
	if (module_xp[form_id]['imaged'] == 'true') {
		fields += ',image';
		types += ',s';
	}	
	back_call_function(form_id);	
	var __q = __json_autorize(table, fields, types, mixer_select_where(form_id, code));	
	$.post(__q_gw, __q, function(data) {		  
		  $.each(data.items, function(i, item) {
			  var $form = $("#"+form_id);        	  
              var fd = fields.split(',');
              var tp = types.split(',');
			  for (i = 0; i < fd.length; i++) {
				if (tp[i] == 'i') {					
					var val = item[fd[i]];					
					$form.find( 'select[name="'+fd[i]+'"]' ).val(val);
				}
				else
				if (fd[i] == 'descr')
					$form.find( 'textarea[name="'+fd[i]+'"]' ).val(item[fd[i]]);
				if (fd[i] == 'image') { 
					$('#image').attr('src', item[fd[i]]);
					$form.find( 'input[name="uri"]' ).val(item[fd[i]]);
				}
				else {
					var val = item[fd[i]];
					if (val == '' && (tp[i] == 'f' || tp[i] == 'i')) val = '0';
					else if (val == '') val = '.';					
 					$form.find( 'input[name="'+fd[i]+'"]' ).val(val);
				}
			  }
			  
			  put_module_to_delete_dialog(form_id);
			  $('#insert_image').click(function() {
				  var path = module_xp[form_id]['folder'];						  
		    	  window.open(path+'/picture.jsp'+(table == 'products'?'#dataurlmaker':''), 'Зурах оруулах', 'width=560,height=300,left=600,top=300,resize=0');
			  });
		  });
	});
	
	if (logged == 1)
		$('#permission_bar').attr('id', '');
	
	$("#save").click(function(event) {		
        event.preventDefault();        
        if (logged == 2) {
        	$('#result-log').html(denyMsg).delay(1200).fadeOut(function() {
		  		$(this).html('');
		  		$(this).fadeIn();
		  	});	
        	
        	return;
        }
        
        $('#result-log').html('<img src="images/preloader.gif"></img>');
                
        var $form = $("#"+form_id),		                                             
        fields = module_xp[form_id]['fields'],
        types = module_xp[form_id]['types'],
        table = module_xp[form_id]['table'];
        
        var fds = fields.split(',');
        var cfd = '';
        var tps = types.split(',');
        var vls = '';
        var imaged = false;
        if (module_xp[form_id]['imaged'] == 'true') { imaged = true;  }
        for (i = 0; i < fds.length; i++) {
        	if (fds[i] == 'id' || fds[i].substring(0, 5) == 'anket') continue;
        	cfd += fds[i]+',';
        	if (fds[i] == 'image') { vls += 'none,'; continue;};
        	if (fds[i] == '_dateStamp') {        		        		
        		vls += tps[i]+'CURRENT_TIMESTAMP,';
        	} else
        	if (fds[i] == 'descr') {
        		var obj = $form.find( 'textarea[name="'+fds[i]+'"]' );
        		vls += tps[i]+replaceAll(obj.val(), ',', ';')+',';
        	} else {
        		var obj = $form.find( 'input[name="'+fds[i]+'"]' );        	
        		if (obj.val())
        			vls += tps[i]+replaceAll(obj.val(), ',', ';')+',';        		        		
        		else {
        			var obj = $form.find( 'select[name="'+fds[i]+'"]' );
        			if (obj.val())
        				vls += tps[i]+replaceAll(obj.val(), ',', ';')+',';
        			else {
        				obj = $form.find( 'input[name="'+fds[i]+'"]' );        	                		
                		vls += tps[i]+replaceAll(obj.val(), ',', ';')+','; 
        			}
        				
        		}
        	}        	 
        	
        	if (i == 17 && table == 'customers')
        		vls += 's,';
        }                
                
        cfd = cfd.substring(0, cfd.length-1);
        var __q = __json_autorize_update(table, cfd, vls, mixer_where(form_id, code));
          
        $.ajax({
              type: 'POST',
			  url: __q_gw,
			  data: __q,
			  success: function(data) {
			  	if (imaged)
					updateImage($form.find( 'input[name="code"]' ).val(), table);
					
				$('#result-log').html(successMsg).delay(1200).fadeOut(function() {
			  		$(this).html('');
			  		$(this).fadeIn();
			  		any_action_after_call_function(form_id);
			  	});				
			  },
			  error: function(data) {
				  $('#result-log').html(errorMsg).delay(1200).fadeOut(function() {
				  		$(this).html('');
				  		$(this).fadeIn();
				  });
			  },
			  statusCode: {
				  404: function() {
					  $('#result-log').html(errorMsg).delay(1200).fadeOut(function() {
					  		$(this).html('');
					  		$(this).fadeIn();
					  });
				  }
			  }
		});
	});
	
	$(document).keydown(function (e) {
		if (e.which === 8 && !$(':focus').length) {
			e.preventDefault();
			return false;
		}
	});
}

function put_module_insert_action(form_id) {	
	var table = module_xp[form_id]['table'];	
	var fields = module_xp[form_id]['fields'];
	var types = module_xp[form_id]['types'];
	var action = module_xp[form_id]['insert'];
	var path = module_xp[form_id]['folder'];
	
	$('#insert_image').click(function() {		  
		  var path = module_xp[form_id]['folder'];				  
		  window.open(path+'/picture.jsp'+(table == 'products'?'#dataurlmaker':''), 'Зурах оруулах', 'width=560,height=300,left=600,top=300,resize=0');
	});
	
	if (logged == 1)
		$('#permission_bar').attr('id', '');
	
	$("#clinicCode").val(logged_user.clinicCode);
	$("#clinicCode").hide();
	
	$("#"+action).submit(function(event) {
        event.preventDefault();
        
        if (logged == 2) {
        	$('#result-log').html(denyMsg).delay(1200).fadeOut(function() {
		  		$(this).html('');
		  		$(this).fadeIn();
		  	});	
        	
        	return;
        }
                
        $('#result-log').html('<img src="images/preloader.gif"></img>');
        
        var $form = $("#"+action),		                                             
        fields = module_xp[form_id]['fields'],
        types = module_xp[form_id]['types'],
        table = module_xp[form_id]['table'],
        key = module_xp[form_id]['key'];
        
        var fds = fields.split(',');
        var tps = types.split(',');
        var cfd = '';
        var vls = '';
        var imaged = false;
        if (module_xp[form_id]['imaged'] == 'true') { imaged = true; }
        
        for (i = 0; i < fds.length; i++) {   
        	if (fds[i].substring(0, 5) == 'anket') continue;
        	cfd += fds[i]+',';    
        	if (fds[i] == '_dateStamp') {        		        		
        		vls += tps[i]+'CURRENT_TIMESTAMP,';
        	} else
        	if (fds[i] == 'descr') {
        		var obj = $form.find( 'textarea[name="'+fds[i]+'"]' );        		
        		vls += tps[i]+replaceAll(obj.val(), ',', ';')+',';
        	} else {
        		var obj = $form.find( 'input[name="'+fds[i]+'"]' );        	
        		if (obj.val())
        			vls += tps[i]+replaceAll(obj.val(), ',', ';')+',';
        		else {
        			var obj = $form.find( 'select[name="'+fds[i]+'"]' );        			
        			vls += tps[i]+replaceAll(obj.val(), ',', ';')+',';
        		}
        	}        	 
        }                
                
        cfd = cfd.substring(0, cfd.length-1);
        var __q = __json_autorize_insert(table, cfd, vls, space);
        
        $.ajax({
        	  type: 'POST',
			  url: __q_gw,
			  data: __q,
			  success: function(data) {
				if (data.status == 'error') {
					$('#result-log').html(errorMsg).delay(1200).fadeOut(function() {
				  		$(this).html('');
				  		$(this).fadeIn();
				    });
				} else {
				  	if (imaged)
						saveImage($form.find( 'input[name="code"]' ).val(), table);
						
					$('#result-log').html(successMsg).delay(1200).fadeOut(function() {
				  		$(this).html('');
				  		$(this).fadeIn();			  	
				  		
				  		if (!$form.find('input[name="still"]').attr('checked')) { 			  		
				  			$form.find('input:text, select, textarea').val('');
				  			any_action_after_call_function(form_id);
				  		}
				  	});
				}
			  },
			  error: function(data) {
				  $('#result-log').html(errorMsg).delay(1200).fadeOut(function() {
				  		$(this).html('');
				  		$(this).fadeIn();
				  });
			  },
			  statusCode: {
				  404: function() {
					  $('#result-log').html(errorMsg).delay(1200).fadeOut(function() {
					  		$(this).html('');
					  		$(this).fadeIn();
					  });
				  }
			  }
		});
	});
}

function back_call_function(form_id) {
	if (form_id == 'edit_product') {		
		$('#back').click(function() {
			content_changer(module_xp[form_id]['folder']+'/index.jsp','product', 8);	
		});
	} else
	if (form_id == 'edit_medication') {		
	    $('#back').click(function() {
	    	content_changer(module_xp[form_id]['folder']+'/index.jsp','medication', 4);	
		});
	} else
	if (form_id == 'edit_doctor') {		
	    $('#back').click(function() {
	    	content_changer(module_xp[form_id]['folder']+'/index.jsp','doctor', 5);	
		});
	} else
	if (form_id == 'edit_customer') {		
		$('#back').click(function() {
			content_changer(module_xp[form_id]['folder']+'/index.jsp','customer', 6);	
		});
	}
}

function any_action_after_call_function(form_id) {
	if (form_id == 'edit_product') {
		fill_datas[form_id] = '';		
		content_changer(module_xp[form_id]['folder']+'/index.jsp','product', 8);		
	} else
	if (form_id == 'edit_medication') {
		fill_datas[form_id] = '';
	    content_changer(module_xp[form_id]['folder']+'/index.jsp','medication', 4);
	} else
	if (form_id == 'edit_doctor') {
		fill_datas[form_id] = '';		
	    content_changer(module_xp[form_id]['folder']+'/index.jsp','doctor', 5);	    
	} else
	if (form_id == 'edit_customer') {		
		content_changer(module_xp[form_id]['folder']+'/index.jsp','customer', 6);
	} else
	if (form_id == 'edit_membership') {
		reload_memberships();
	} else
	if (form_id == 'edit_basket') {
		reload_basket();
	} else
	if (form_id == 'edit_membership_medications') {
		reload_memberships();
	} else
	if (form_id == 'edit_faq') {
		reload_faq();
	}
}

function put_module_to_delete_dialog(form_id) {
	$("#delete").click( function() {
		if (logged == 2) {
        	$('#result-log').html(denyMsg).delay(1200).fadeOut(function() {
		  		$(this).html('');
		  		$(this).fadeIn();		  		
		  	});	
        	
        	return;
        }
		
		var element = $(this);
        var I = element.attr("id");	
        var caption = module_xp[form_id]['caption'];
        var table = module_xp[form_id]['table'];
		jConfirm('Сонгосон '+caption+' '+code+' устгах уу ?', 'Confirmation Dialog', function(r) {									
			if(r==true) {
				 $('li#list'+I).fadeOut('slow', function() {$(this).remove();});
				 var __q = __json_autorize_delete(table, mixer_where(form_id, code));
				 
				 $.ajax({
					  type: 'POST',
					  url: __q_gw,
					  data: __q,
					  success: function(data) {
					    $('#result-log').html(successMsg).delay(1200).fadeOut(function() {
	        		  		$(this).html('');
	        		  		$(this).fadeIn();
	        		  		
	        		  		any_action_after_call_function(form_id);
	        			});
					  },
					  error: function(data) {
						  $('#result-log').html(errorMsg).delay(1200).fadeOut(function() {
		        		  		$(this).html('');
		        		  		$(this).fadeIn();
		        		  });
					  },
					  statusCode: {
						  404: function() {
							  $('#result-log').html(errorMsg).delay(1200).fadeOut(function() {
							  		$(this).html('');
							  		$(this).fadeIn();
							  });
						  }
					  }
				});
			}
		});
	});
}

function any_insert_action(form_id, vls) {
	var table = module_xp[form_id]['table'];
	var fields = module_xp[form_id]['fields'];
	var types = module_xp[form_id]['types'];		
	var __q = __json_autorize_insert(table, fields, vls, space);
	
	$.ajax({
		  type: 'POST',
		  url: __q_gw,
		  data: __q,
		  success: function(data) {
			  any_action_after_call_function(form_id);
		  },
		  error: function(data) {
			  jAlert('<b style="color:red">Алдаа гарлаа !</span>', 'Алдаа');
		  },
		  statusCode: {
			  404: function() {
				  $('#result-log').html(errorMsg).delay(1200).fadeOut(function() {
				  		$(this).html('');
				  		$(this).fadeIn();
				  });
			  }
		  }
	});	
}

function any_select_action(form_id, where) {	
	if (form_id == 'edit_customer')
		session = ' TOP 32';
	else
		session = ' TOP 500';
	var table = module_xp[form_id]['table'];
	var fields = module_xp[form_id]['fields'];
	var types = module_xp[form_id]['types'];
	var list = module_xp[form_id]['list'];
	var tmpl = module_xp[form_id]['tmpl'];
	var key = module_xp[form_id]['key'];		
	var __q = __json_autorize(table, fields, types, where);
	var content = '';	
	$.post(__q_gw, __q, function(data) {
		  read_data = data.items;		  
		  $.each(data.items, function(i, item) {
			  content += module_xp[form_id]['tmpl_function'](item);			  
			  //hash[form_id][item.code] = item;			  
		  });
		  
		  if (form_id != 'edit_product')
			  content = replaceAll(tmpl, '%', content);
		  
		  fill_datas[form_id] = content;		  
		  $('#'+list).html(content);
	});
}

updateImage = function(code, table) { //ёоох	
	var dataURL = document.getElementById('uri').value;                                			
	var fd = new FormData();                                			
	var xhr = new XMLHttpRequest();
	fd.append( 'code', code);
	fd.append( 'clinicCode', logged_user.clinicCode);
	fd.append( 'table', table);
	fd.append( 'data', dataURL);
	xhr.open( 'POST', 'ImageReceiver', true );
	xhr.send( fd );
}

saveImage = function(code, table) { //ёоох		
	var dataURL = document.getElementById('uri').value;
	var fd = new FormData();           			
	var xhr = new XMLHttpRequest();
	fd.append( 'code', code);
	var v = '500';

	fd.append( 'clinicCode', v);
	fd.append( 'table', table);
	fd.append( 'data', dataURL);
	current_uri = dataURL;
	xhr.open( 'POST', 'ImageReceiver', true );
	xhr.send( fd );
}