jQuery.noConflict();

function jquery_date_elements_init() {
	jQuery(".birthdate, .birthdate_input").datepicker();
	jQuery(".joinedDate, .birthdate_input").datepicker();
}

function jquery_elements_init() {
	kriesi_tab('#content','.jquery_tab_title','.jquery_tab'); /*remove this if you dont want to have jquery tabs*/
	kriesi_navigation(".nav"); /*remove this if you dont want a jquery sidebar menu*/
	kriesi_closeable_divs(".closeable"); /*remove this if you dont want message box to be closeable*/
	
	jQuery(".flexy_datepicker, .flexy_datepicker_input").datepicker({
		onSelect: function(date) {
			current_date = new Date(date);
			content_changer('schedule/index.jsp','schedule', 2);
	    },
	    beforeShowDay: function (date){
	    	var calendarEvents = [];
	    	calendarEvents[0] = [];
	    	calendarEvents[0][0] = 10;
	    	calendarEvents[0][1] = 30;
	    	calendarEvents[0][2] = 2014;
            for (i = 0; i < calendarEvents.length; i++) {
                if (date.getMonth() == calendarEvents[i][0] - 1
                && date.getDate() == calendarEvents[i][1]
                && date.getFullYear() == calendarEvents[i][2]) {
                //[disable/enable, class for styling appearance, tool tip]                	
                return [false, "ui-state-active","Event Name"];
                }
             }
             return [true, ""];//enable all other days
        },
	    monthNames: ['Нэгдүгээр сар', 'Хоёрдугаар сар', 'Гуравдугаар сар', 'Дөрөвдүгээр сар', 'Тавдугаар сар', 'Зургаадугаар сар', 'Долдугаар сар', 'Наймдугаар сар', 'Есдүгээр сар', 'Аравдугаар сар', 'Арваннэгдүгээр сар', 'Арванхоёрдугаар сар']
	}); 	

	jquery_date_elements_init();
	//jQuery("#dialog").dialog(); //pop up dialog window on pageopen.
	jQuery('.richtext').wysiwyg(); //rich text editor for textareas
	choosetab();
}


function kriesi_closeable_divs(element)
{
	jQuery(element).each(function()							  
	{
		jQuery(this).append('<div class="click_to_close"></div>')
	});	
	
	jQuery(".click_to_close").click(function()
	{
		jQuery(this).parent().slideUp(200);	
	});
}



function kriesi_navigation(element)
{
	jQuery(element).each(function()
	{	
		var currentlistitem;
		currentlistitem = jQuery(this).find(">li");
		
		currentlistitem.each(function()
		{	
			if (!jQuery(this).find('ul').hasClass('opened')){
			jQuery(this).find('ul').addClass("closed").css({display:"none"});
			}
		});
		
		currentlistitem.find('a:eq(0)').each(function()
		{
			jQuery(this).click(function()
			{	
				if(jQuery(this).next('ul').hasClass('closed')){
				jQuery(this).next('ul').slideDown(200).removeClass("closed");
				return false;
				}else{
				jQuery(this).next('ul').slideUp(200).addClass("closed");	
				return false;
				}
			});	
		});
	});
}



function kriesi_tab(wrapper, header, content, sub){
	var title = wrapper + " " + header;
	var container_to_hide = wrapper + " " + content;
	var duration = 100;
	if (typeof sub == 'undefined') sub = '';
	
	if (jQuery.browser.msie){
		  duration = 10;
	}
	disable = false;
	

	jQuery(title).each(function(i){			
			if (i == 0){
				jQuery(wrapper).prepend("<div class='jquery_tab_container "+sub+"'><a href='/' class='heading_tab advanced_link active tab"+(i+1)+"'>"+jQuery(this).html()+"</a></div>");
			}else{
				jQuery(".advanced_link:last").after("<a href='/'class='heading_tab advanced_link tab"+(i+1)+"'>"+jQuery(this).html()+"</a>");
			}
	});

	jQuery(container_to_hide).each(function(i){
			jQuery(this).addClass("tablist list_"+i); 
			if(i != 0){
				jQuery(this).css({display: "none"});
			}
	});

	jQuery(".advanced_link").each(function(i){		
			jQuery( this ).bind ("click",function(){							
					if(jQuery(this).hasClass('active')){return false}
					if(disable == false){
						disable = true;
						jQuery(".advanced_link").removeClass("active");
						jQuery(this).addClass("active");
									 
						jQuery(container_to_hide+":visible").fadeOut(duration,function(){																
							jQuery(".list_"+i).fadeIn(duration, function(){disable=false; });
						});
					}
					return false;
			});
	});
}

function setactive() {
	jQuery('.advanced_link:last').trigger('click');
}

function choosetab()
{
	var hash = window.location.hash;
	if(hash.match(/^#tab(\d)$/))
	{
		var tab = hash.replace(/^#tab/,"");
		var select_tab = tab-1;		
		jQuery(".jquery_tab").css({display:"none"}).filter(":eq("+select_tab+")").css({display:"block"});
		jQuery(".jquery_tab_container .active").removeClass('active');
		jQuery(".heading_tab").filter(":eq("+select_tab+")").addClass('active');		
	}
}
