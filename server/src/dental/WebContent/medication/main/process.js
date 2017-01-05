var medi_actions = [];
var medi_bool = [];
var medi_actions_1 = [];
var medi_bool_1 = [];
var dts;
var baby_age = 5;
var isbaby = false;
var balance = 0;
var dent_status = [];
var furca_status = [];
var main_status = [];
var calculus_status = [];
var gingival_status = [];
var flag_current_status = true;
var flag_dental_status = true;
var flag_peno_status = true;

function check_baby(e) {
	isbaby = e.checked;
	un_render_tooth_chart_all();		
}

function reset_values() {
	medi_actions = [];
	medi_bool = [];
	if (!isundefined(data))
		dts = data.split(",");
	for (i = 0; i < 3; i++) { medi_bool[i] = []; medi_actions[i] = [];
		for (j = 0; j <= 18; j++)
			medi_actions[i][j] = [];
	}				
}

function reset_values_1() {
	medi_actions_1 = [];
	medi_bool_1 = [];
	if (!isundefined(data))
		dts = data.split(",");
	for (i = 0; i < 3; i++) { medi_bool_1[i] = []; medi_actions_1[i] = [];
		for (j = 0; j <= 18; j++)
			medi_actions_1[i][j] = [];
	}		
}

function render_status() {	
	var c = document.getElementById("dent_chart").getContext('2d');
	var x, y;		
	
	for (i = 1; i < 100; i++) 
	 for (j = 0; j <= 5; j++) {		
		var e = dent_status[i][j];		
		if (e && parseInt(e.v) > 0 && flag_peno_status) {				
			c.font = 'bold 10pt Calibri';			
			c.fillStyle = e.c;
			c.fillText(e.v, e.x, e.y);			
		}
		
		var f = furca_status[i][j];
		if (f && parseInt(f.v) > 0 && flag_peno_status) {				
			c.font = 'bold 10pt Calibri';			
			c.fillStyle = f.c;
			c.fillText(f.v, f.x, f.y);
		}
		
		var a = calculus_status[i][j];
		if (a && a.v) {
			render_tooth_chart_status(a, 'dent_chart');
		}
		
		var m = main_status[i][j];
		if (m && m.v) {
			render_tooth_chart_status(m, 'dent_chart');
		}
		
		var g = gingival_status[i][j];
		if (g && g.v) {//89030555
			c.font = 'bold 12pt Calibri';			
			c.fillStyle = 'red';
			c.fillText(g.v, getX(g.id, g.s), getY(g.id, g.s));			
		}
	}
}

function getX(toothID, side) {
	var blockX = [13, 51, 89, 127, 162, 196, 230, 265, 299, 334, 368, 403, 437, 471, 510, 547];
	var index = 0;	
	var ud = 0;
	if (toothID >= 11 && toothID <= 18) {
		ud = 0;
		index = 18 - toothID;
	} else
	if (toothID >= 21 && toothID <= 28) {
		ud = 0;
		index = toothID - 21 + 8;
	} else
	if (toothID >= 41 && toothID <= 48) {
		ud = 1;
		index = 48 - toothID;
	} else
	if (toothID >= 31 && toothID <= 38) {
		ud = 1;
		index = toothID - 31 + 8;
	}
	
	if (side == 1)
		return blockX[index]+12;
	if (side == 2)
		return blockX[index]+12;
	if (side == 3)
		return blockX[index];	
	if (side == 4)
		return blockX[index]+26;
	
	return blockX[index];
}

function getY(toothID, side) {
	var blockX = [13, 51, 89, 127, 162, 196, 230, 265, 299, 334, 368, 403, 437, 471, 510, 547];
	var index = 0;	
	var ud = 0;
	if (toothID >= 11 && toothID <= 18) {
		ud = 0;
		index = 18 - toothID;
	} else
	if (toothID >= 21 && toothID <= 28) {
		ud = 0;
		index = toothID - 21 + 8;
	} else
	if (toothID >= 41 && toothID <= 48) {
		ud = 1;
		index = 48 - toothID;
	} else
	if (toothID >= 31 && toothID <= 38) {
		ud = 1;
		index = toothID - 31 + 8;
	}
	
	if (ud == 0) {
		if (side == 1)
			return 80-8;
		if (side == 2)
			return 80+8;		
		
		return 80;
	}
	else {
		if (side == 1)
			return 155+8;
		if (side == 2)
			return 155-8;
		
		return 155;
	}
}

function receive_status(code) {
	for (i = 0; i < 100; i++) {		  	
		dent_status[i] = [];		 
		furca_status[i] = [];
		main_status[i] = [];
		calculus_status[i] = [];
		gingival_status[i] = [];
	}
	
	var xp = module_xp['edit_status'];
	var where = ' WHERE '+replaceAll(xp['wtmpl'], '#', code);
	var __q = __json_autorize(xp['table'], xp['fields'], xp['types'], where);	
	$.post(__q_gw, __q, function(data) {
		  
		  $.each(data.items, function(i, item) {			  
			  	if (item.status == 'mobility') {			  		
			  		dent_status[item.toothID][item.toothSide] = {id: item.toothID, s: item.toothSide, v: item.value, x: item.x, y: item.y, c: "red"};
			  	}
			  	if (item.status == 'furca') {			  		
			  		furca_status[item.toothID][item.toothSide] = {id: item.toothID, s: item.toothSide, v: item.value, x: item.x, y: item.y, c: "blue"};
			  	}
			  	if (item.status == 'dental') {			  		
			  		main_status[item.toothID][item.toothSide] = {id: item.toothID, s: item.toothSide, v: item.value, x: item.x, y: item.y, c: "black"};
			  	}
			  	if (item.status == 'calculus') {			  		
			  		calculus_status[item.toothID][item.toothSide] = {id: item.toothID, s: item.toothSide, v: item.value, x: item.x, y: item.y, c: "black"};
			  	}
			  	if (item.status == 'g_pocket') {			  		
			  		gingival_status[item.toothID][item.toothSide] = {id: item.toothID, s: item.toothSide, v: item.value, x: item.x, y: item.y, c: "black"};
			  	}
		  });
		  		  
		  reload_customer_tooth_data('dent_chart');		  
	});
}

function send_status(e, field) {
	var vls = 's'+code+',i'+e.id+',i'+e.s+',i'+e.x+',i'+e.y+',i'+e.v+',s'+field;
	var __q = __json_autorize_delete('status', " customerCode='"+code+"' and toothID="+e.id+" and toothSide="+e.s+" and status='"+field+"'");								     					
		
	$.ajax({
		  type: 'POST',
		  url: __q_gw,
		  data: __q,
		  success: function(data) {	
			  if (e.v != '' && e.v != ' ') {				  
				  var vls = 's'+code+',i'+e.id+',i'+e.s+',i'+e.x+',i'+e.y+',s'+e.v+',s'+field;
				  var __q = __json_autorize_insert('status', 'customerCode,toothID,toothSide,x,y,value,status', vls, space);									     					
						
				  $.ajax({
					  type: 'POST',
					  url: __q_gw,
					  data: __q,
					  success: function(data) {				  
						  $('#result-log').html(successMsg).delay(2000).fadeOut(function() {
						  	$(this).html('');
						  	$(this).fadeIn();
						  });
						  receive_status(code);
					  },
					  error: function(data) {																	  
						  $('#result-log').html(errorMsg).delay(2000).fadeOut(function() {
					  		$(this).html('');
					  		$(this).fadeIn();
						  });
					  }
				  });
			  } else
				  receive_status(code);
		  },
		  error: function(data) {																	  
			  $('#result-log').html(errorMsg).delay(2000).fadeOut(function() {
		  		$(this).html('');
		  		$(this).fadeIn();
			  });
		  }
	});	
}

function remove_all_status(e) {
	var __q = __json_autorize_delete('status', " customerCode='"+e+"'");								     						
	$.ajax({
		  type: 'POST',
		  url: __q_gw,
		  data: __q,
		  success: function(data) {		
			  reload_customer_tooth_data('dent_chart');	
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

function un_render_tooth_chart_all(chart) {
	if (!chart) chart = "dent_chart"; 
	var c=document.getElementById(chart);
	var ctx=c.getContext("2d");
	var img = new Image();
	img.onload = function(){
		ctx.drawImage(img,0,0);
	};	
	if (!isbaby)
		img.src="medication/main/images/dent_chart.png";
	else
		img.src="medication/main/images/dent_chart.png";	
}

function avg(p1, p2, p3) {
	return (p1+p2+p3)/3;
}

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

function un_render_tooth_chart(item, chart) {
	if (!chart) chart = "dent_chart"; 
	var blockX = [13, 51, 89, 127, 162, 196, 230, 265, 299, 334, 368, 403, 437, 471, 510, 547];
	var blockY = [90, 136];
	
	var block = 0;
	var max = (!isbaby?0:0);
	if (item.tooth >= 6) block = 1;
	var index = 0;
	if (item.dir == 1) index = (8-max)-parseInt(item.tooth);
	else index = (7-max) + parseInt(item.tooth);        						     		
	        					     		
	var c=document.getElementById(chart);
	var ctx=c.getContext("2d");
	
	var blank = new Image();
	blank.onload = function(){
		ctx.drawImage(blank,blockX[index],blockY[item.ud]);
	};
	blank.src="medication/main/images/toothBlock"+block+".png";					     							     						     							     	
}

function render_tooth_chart(item, chart) {	
	if (item.service == 0)
		render_tooth_chart_fix(item, chart);
	if (item.service == 1)
		render_tooth_chart_replace(item, chart);
}

function render_tooth_chart_fix(item, chart) {
	var blockX = [13, 51, 89, 127, 162, 196, 230, 265, 299, 334, 368, 403, 437, 471, 510, 547];
	var blockY = [90, 136];
	
	var block = 0;
	var max = (!isbaby?0:0);
	if (item.tooth >= 6) block = 1;
	var index = 0;
	if (item.dir == 1) index = (8-max)-parseInt(item.tooth);
	else index = (7-max) + parseInt(item.tooth);					     		
	if (!chart) chart = "dent_chart"; 
	
	var c=document.getElementById(chart);
	var ctx=c.getContext("2d");					     		
	var img = new Image();
	img.onload = function(){					     			
		ctx.drawImage(img,blockX[index],blockY[item.ud]);		
	};
						     		
	var side = 'top';
	if (item.toothSide == 1) side = 'top';
	if (item.toothSide == 2) side = 'bottom';
	console.log(item.id);
	if ((item.id < 20 && item.id > 10) || (item.id < 50 && item.id > 40)) {
		if (item.toothSide == 3) side = 'left';
		if (item.toothSide == 4) side = 'right';	
	} else {
		if (item.toothSide == 3) side = 'right';
		if (item.toothSide == 4) side = 'left';
	}
	if (item.toothSide == 5) side =  'center';	
		
	img.src="medication/main/images/toothBlock"+block+''+side+".png";
}

function render_tooth_chart_status(item, chart) {
	var blockX = [13, 51, 89, 127, 162, 196, 230, 265, 299, 334, 368, 403, 437, 471, 510, 547];
	var blockY = [90, 136];
	
	var block = 1;
	var index = 0;	
	
	if (item.id >= 11 && item.id <= 18) {
		item.ud = 0;
		index = 18 - item.id;
	} else
	if (item.id >= 21 && item.id <= 28) {
		item.ud = 0;
		index = item.id - 21 + 8;
	} else
	if (item.id >= 41 && item.id <= 48) {
		item.ud = 1;
		index = 48 - item.id;
	} else
	if (item.id >= 31 && item.id <= 38) {
		item.ud = 1;
		index = item.id - 31 + 8;
	}	
	
	if (!chart) chart = "dent_chart"; 
	
	var c=document.getElementById(chart);
	var ctx=c.getContext("2d");					     		
	var img = new Image();
	img.onload = function(){					     			
		ctx.drawImage(img,blockX[index],blockY[item.ud]);		
	};
						     		
	var side = 'top';
	if (item.s == 1) side = 'top';
	if (item.s == 2) side = 'bottom';

	if ((item.id < 20 && item.id > 10) || (item.id < 50 && item.id > 40)) {
		if (item.s == 3) side = 'right';
		if (item.s == 4) side = 'left';	
	} else {
		if (item.s == 3) side = 'left';
		if (item.s == 4) side = 'right';
	}
		
	if (item.s == 5) side =  'center';
	
	if (item.id > 30 && item.s == 1) side = "bottom";
	if (item.id > 30 && item.s == 2) side = "top";
	var status = '', oldside = side;
	if (flag_dental_status && main_status[item.id][item.s] && main_status[item.id][item.s].v == '-') {
		status = '_';
		side = '';
	} else	
	if (flag_dental_status && main_status[item.id][item.s] && main_status[item.id][item.s].v == 'O') {
		status = 'O';	
		side = '';
	} else			
	if (flag_dental_status && main_status[item.id][item.s] && main_status[item.id][item.s].v.indexOf('Cr') != -1) {
		status = main_status[item.id][item.s].v;	
		side = '';
	} else	
	if (flag_dental_status && main_status[item.id][item.s] && main_status[item.id][item.s].v && main_status[item.id][item.s].s == item.s)
		status = '_'+main_status[item.id][item.s].v;		
	
	if (flag_peno_status && calculus_status[item.id][item.s] && calculus_status[item.id][item.s].v && calculus_status[item.id][item.s].s == item.s) {
		status = '_'+calculus_status[item.id][item.s].v;		
		side = oldside;
	}
	if (status != '')
		img.src="medication/main/images/toothBlock"+block+''+side+status+".png";
}

function render_tooth_chart_replace(item, chart) {
	var blockX = [13, 51, 89, 127, 162, 196, 230, 265, 299, 334, 368, 403, 437, 471, 510, 547];
	var blockY = [5, 175];
	
	var block = 0;
	var max = (isbaby?0:0);
	if (item.tooth >= 6) block = 1;
	var index = 0;
	if (item.dir == 1) index = (8-max)-parseInt(item.tooth);
	else index = (7-max) + parseInt(item.tooth);        						     		
	if (!chart) chart = "dent_chart";        					     		
	var c=document.getElementById(chart);
	var ctx=c.getContext("2d");					     		
	var img = new Image();
	img.onload = function(){
		ctx.drawImage(img,blockX[index]-3,blockY[item.ud]);
	};
						     							     							     	
	img.src="medication/main/images/toothBlockR"+item.ud+".png";					     							     		
}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i].id === obj.id &&
    	   a[i].ud === obj.ud &&
    	   a[i].direction === obj.direction &&
    	   a[i].toothID === obj.toothID &&
    	   a[i].service === obj.service &&
    	   a[i].medCode === obj.medCode &&
    	   a[i].qty === obj.qty &&
    	   a[i].price === obj.price) {
           return true;
       }
    }
    return false;
}

function reload_customer_tooth_data_chart(id, chart) {	
	un_render_tooth_chart_all(chart);
	var xp = module_xp['edit_tooth'];
	var where = ' WHERE '+replaceAll(xp['wtmpl'], '#', id);
	var __q = __json_autorize(xp['table'], xp['fields'], xp['types'], where);	
	$.post(__q_gw, __q, function(data) {				
		  reset_values();
		  $.each(data.items, function(i, item) {
//			  medi_actions[parseInt(item.ud)][parseInt(item.direction)*8+parseInt(item.toothID)] = [];
			  var item1 = {id: item.id, ud: item.ud, dir: item.direction, tooth: item.toothID, service: item.service, medCode: item.medicationCode, toothSide: item.toothSide, qty: item.qty, price: item.price, amount: item.amount, doctorCode: item.doctorCode, payment: item.payment, discount: item.discount};
			  if (!contains(medi_actions[parseInt(item.ud)][parseInt(item.direction)*8+parseInt(item.toothID)], item1))
				  medi_actions[parseInt(item.ud)][parseInt(item.direction)*8+parseInt(item.toothID)].push(item1);	        					     		
	     	  medi_bool[parseInt(item.ud)][parseInt(item.direction)*8+parseInt(item.toothID)] = true;
	     	  if (item.ud != 2 && item.direction != 2)
	     		  render_tooth_chart(item1, chart);	        					     	  
		  });
		  render_status();
		  render_medi_table();
	});		
}

function reload_customer_tooth_data_chart_1(id, chart) {	
	var xp = module_xp['edit_tooth'];
	var where = ' WHERE '+replaceAll(xp['wtmpl'], '#', id);
	var __q = __json_autorize(xp['table'], xp['fields'], xp['types'], where);	
	$.post(__q_gw, __q, function(data) {				
		  reset_values_1();
		  $.each(data.items, function(i, item) {
			  var item1 = {id: item.id, ud: item.ud, dir: item.direction, tooth: item.toothID, service: item.service, medCode: item.medicationCode, toothSide: item.toothSide, qty: item.qty, price: item.price, amount: item.amount, doctorCode: item.doctorCode, payment: item.payment, discount: item.discount};
			  if (!contains(medi_actions_1[parseInt(item.ud)][parseInt(item.direction)*8+parseInt(item.toothID)], item1))
				  medi_actions_1[parseInt(item.ud)][parseInt(item.direction)*8+parseInt(item.toothID)].push(item1);	        					     		
	     	  medi_bool_1[parseInt(item.ud)][parseInt(item.direction)*8+parseInt(item.toothID)] = true;
	     	  if (item.ud != 2 && item.direction != 2)
	     		  render_tooth_chart(item1, chart);	        					     	  
		  });
		  
		  //render_medi_table();
	});
}

function reload_customer_tooth_data(chart) {
	if (!chart) chart = 'dent_chart';
	reset_values();
	reload_customer_tooth_data_chart(dts[2], chart);		
	balance = 0;//hash['edit_customer'][dts[0]].balance;
	//render_medi_table();
}

function toothIndexTitle(item) {	
		if (item.ud == 2 && item.dir == 2)
			return 'Бүх шүд';
		
		if (!isbaby) {
	 		if (item.ud == 0 && item.dir == 0)
	 			return 20+parseInt(item.tooth);
	 		
	 		if (item.ud == 0 && item.dir == 1)
	 			return 10+parseInt(item.tooth);
	 		
	 		if (item.ud == 1 && item.dir == 0)
	 			return 30+parseInt(item.tooth);
	 		
	 		if (item.ud == 1 && item.dir == 1)
	 			return 40+parseInt(item.tooth);
		} else {
			if (item.ud == 0 && item.dir == 0)
				return 60+parseInt(item.tooth);
 		
	 		if (item.ud == 0 && item.dir == 1)
	 			return 50+parseInt(item.tooth);
	 		
	 		if (item.ud == 1 && item.dir == 0)
	 			return 70+parseInt(item.tooth);
	 		
	 		if (item.ud == 1 && item.dir == 1)
	 			return 80+parseInt(item.tooth);
		}
			
		return item.tooth;
}


function toothIndexTitle1(item) {					     			
		return item.tooth;
}

function getSideTitle(item) {
	switch (item) {
		case 1: return 'BUC';
		case 2: return 'LING';
		case 3: return 'MES';
		case 4: return 'DIS';
		case 5: return 'OCC';		
	}
	
	return item;
}

function toothSideTitle(item) {
	item = parseInt(item);
	if (item < 6) {
		switch (item) {
			case 1: return 'BUC';
			case 2: return 'LING';
			case 3: return 'MES';
			case 4: return 'DIS';
			case 5: return 'OCC';		
		}
	} else {
		var r = '';
		while (item > 0) {
			v = item % 10;
			if (v > 0)
				r += getSideTitle(v)+'|';
			item /= 10;
			item = parseInt(item);
		}
		return r;
	}
	
	return item;
}

function serviceCheck(v) {
	var $form = $("#tooth_form");
	
	if (v == 1) {
		$form.find( 'select[name="toothSide"]' ).attr("disabled", "disabled");
	}
	else {
		$form.find( 'select[name="toothSide"]' ).removeAttr("disabled");
	}
}


var z = -40;
// The number of images to display
var maxFiles = 5;
var errMessage = 0;
var rloaded = 1;
// Get all of the data URIs and put them in an array
var dataArray = [];

function deleteRentgen() {
	jConfirm('Зургийг устгах уу ?', 'Confirmation Dialog', function(r) {									
		if(r==true) {			
			var fd = new FormData();           			
			var xhr = new XMLHttpRequest();
			rloaded = $('#loaded').val();
			fd.append( 'id', dts[2]);
			fd.append( 'clinicCode', logged_user.clinicCode);
			fd.append( 'table', 'orders');
			fd.append( 'data', '');
			fd.append( 'field', 'rentgen'+(parseInt(rloaded)-1));			
			xhr.open( 'POST', 'rentgenGW', true );		
			xhr.send( fd );
			reloadRentgen();
		} else {
			
		}
	});
}
var tload = 1;
function load() {
	if (tload == 7) return;	
	$('#rentgen_'+tload).attr('src', 'rentGW?fd=rentgen'+tload+'&id='+dts[2]).load(function() {
		if ($(this).attr('src')) {
			rloaded = parseInt($(this).attr('value'));
			$('#loaded').val(rloaded);						
		}
		tload++;
		load();
	});
}

function reloadRentgen() {	
	rloaded = 1;
	$('#loaded').val(rloaded);
	tload = 1;
	load();
	for (i = 1; i <=6; i++) {			
		$('#rentgen_'+i).hover(function(){
		    $('#selected_rentgen').attr('src', $(this).attr('src'));
		    $('#selected_rentgen').show();
		},function(){
			$('#selected_rentgen').hide(); 
		});
	}		
}

function upload() {	
	jQuery.event.props.push('dataTransfer');
	
	reloadRentgen();
	$('#drop-files').bind('drop', function(e) {				
		var files = e.originalEvent.dataTransfer.files;
		$('#uploaded-holder').show();
		
		$.each(files, function(index, file) {			
			if (!files[index].type.match('image.*')) {
				
				if(errMessage == 0) {
					$('#drop-files').html('Hey! Images only');
					++errMessage
				}
				else if(errMessage == 1) {
					$('#drop-files').html('Stop it! Images only!');
					++errMessage
				}
				else if(errMessage == 2) {
					$('#drop-files').html("Can't you read?! Images only!");
					++errMessage
				}
				else if(errMessage == 3) {
					$('#drop-files').html("Fine! Keep dropping non-images.");
					errMessage = 0;
				}
				return false;
			}
			
			// Check length of the total image elements
			
			if($('#dropped-files > .image').length < maxFiles) {
				// Change position of the upload button so it is centered
				var imageWidths = ((320 + (40 * $('#dropped-files > .image').length)) / 2) - 20;
				$('#upload-button').css({'left' : imageWidths+'px', 'display' : 'block'});
			}
			
			// Start a new instance of FileReader
			var fileReader = new FileReader();
				
				// When the filereader loads initiate a function
				fileReader.onload = (function(file) {
					
					return function(e) { 
						
						// Push the data URI into an array
						dataArray.push({name : file.name, value : this.result});
						
						// Move each image 40 more pixels across
						z = z+40;
						// This is the image
						var image = this.result;
						
						
						// Just some grammatical adjustments
						if(dataArray.length == 1) {
							$('#upload-button span').html("1 file to be uploaded");
						} else {
							$('#upload-button span').html(dataArray.length+" зураг нэмэгдлээ.");
						}
						// Place extra files in a list
						if($('#dropped-files > .image').length < maxFiles) { 
							// Place the image inside the dropzone
							$('#dropped-files').append('<div class="image" style="left: '+z+'px; background: url('+image+'); background-size: cover;"> </div>');
							
						}
						else {
							
							$('#extra-files .number').html('+'+($('#file-list li').length + 1));
							// Show the extra files dialogue
							$('#extra-files').show();
							
							// Start adding the file name to the file list
							$('#extra-files #file-list ul').append('<li>'+file.name+'</li>');
							
						}
					}; 
					
				})(files[index]);
				
			// For data URI purposes
			fileReader.readAsDataURL(file);
	
		});		
	});
	
	
	
	$('#upload-button .upload').click(function() {
		
		// Show the loading bar
		$("#loading").show();
		// How much each element will take up on the loading bar
		var totalPercent = 100 / dataArray.length;
		// File number being uploaded
		var x = 0;
		var y = 0;
		
		// Show the file name
		$('#loading-content').html('Uploading '+dataArray[0].name);
		
		
		// Upload each file separately
		$.each(dataArray, function(index, file) {
			var dataURL = dataArray[index].value;
			var fd = new FormData();           			
			var xhr = new XMLHttpRequest();
			rloaded = parseInt($('#loaded').val());
			fd.append( 'id', dts[2]);
			fd.append( 'clinicCode', logged_user.clinicCode);
			fd.append( 'table', 'orders');
			fd.append( 'data', dataURL);
			fd.append( 'field', 'rentgen'+(rloaded+index));
			current_uri = dataURL;
			xhr.open( 'POST', 'rentgenGW', true );
			xhr.onreadystatechange = function() {
				// The name of the file
				var fileName = dataArray[index].name;
				++x;
				
				// Change the loading  bar to represent how much has loaded
				$('#loading-bar .loading-color').css({'width' : totalPercent*(x)+'%'});
				
				if(totalPercent*(x) == 100) {
					// Show the upload is complete
					$('#loading-content').html('Хуулж дууслаа !');
					
					// Reset everything when the loading is completed
					setTimeout(restartFiles, 500);
					
				} else if(totalPercent*(x) < 100) {
				
					// Show that the files are uploading
					$('#loading-content').html('Хуулж байна '+fileName);
				
				}
				
				// Show a message showing the file URL.
				var dataSplit = data.split(':');
				if(dataSplit[1] == 'uploaded successfully') {
					var realData = '<li><a href="images/'+dataSplit[0]+'">'+fileName+'</a> '+dataSplit[1]+'</li>';
					
					$('#uploaded-files').show();
					
					$('#uploaded-files').append('<li><a href="images/'+dataSplit[0]+'">'+fileName+'</a> '+dataSplit[1]+'</li>');
				
					// Add things to local storage 
					if(window.localStorage.length == 0) {
						y = 0;
					} else {
						y = window.localStorage.length;
					}
					
					// We set this item in the local storage
					window.localStorage.setItem(y, realData);
				
				} else {
					$('#uploaded-files').append('<li><a href="images/'+data+'. File Name: '+dataArray[index].name+'</li>');
				}
				
				reloadRentgen();
			};
			xhr.send( fd );			
		});
		
		return false;
	});
	
	// Just some styling for the drop file container.
	$('#drop-files').bind('dragenter', function() {
		$(this).css({'box-shadow' : 'inset 0px 0px 20px rgba(0, 0, 0, 0.1)', 'border' : '4px dashed #bb2b2b'});
		return false;
	});
	
	$('#drop-files').bind('drop', function() {
		$(this).css({'box-shadow' : 'none', 'border' : '4px dashed rgba(0,0,0,0.2)'});
		return false;
	});
	
	// For the file list
	$('#extra-files .number').toggle(function() {
		$('#file-list').show();
	}, function() {
		$('#file-list').hide();
	});
	
	// Restart files when the user presses the delete button
	$('#dropped-files #upload-button .delete').click(restartFiles);
	
	// Append the localstorage the the uploaded files section
	if(window.localStorage.length > 0) {
		$('#uploaded-files').show();
		for (var t = 0; t < window.localStorage.length; t++) {
			var key = window.localStorage.key(t);
			var value = window.localStorage[key];
			// Append the list items
			if(value != undefined || value != '') {
				$('#uploaded-files').append(value);
			}
		}
	} else {
		$('#uploaded-files').hide();
	}
}

function restartFiles() {
	
	// This is to set the loading bar back to its default state
	$('#loading-bar .loading-color').css({'width' : '0%'});
	$('#loading').css({'display' : 'none'});
	$('#loading-content').html(' ');
	// --------------------------------------------------------
	
	// We need to remove all the images and li elements as
	// appropriate. We'll also make the upload button disappear
	
	$('#upload-button').hide();
	$('#dropped-files > .image').remove();
	$('#extra-files #file-list li').remove();
	$('#extra-files').hide();
	$('#uploaded-holder').hide();

	// And finally, empty the array/set z to -40
	dataArray.length = 0;
	z = -40;
	
	return false;
}