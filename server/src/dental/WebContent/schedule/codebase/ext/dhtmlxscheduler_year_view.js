/*
This software is allowed to use under GPL or you need to obtain Commercial or Enterise License
to use it in not GPL project. Please contact sales@dhtmlx.com for details
*/
scheduler.config.year_x=4;scheduler.config.year_y=3;scheduler.config.year_mode_name="year";scheduler.xy.year_top=0;scheduler.templates.year_date=function(c){return scheduler.date.date_to_str(scheduler.locale.labels.year_tab+" %Y")(c)};scheduler.templates.year_month=scheduler.date.date_to_str("%F");scheduler.templates.year_scale_date=scheduler.date.date_to_str("%D");scheduler.templates.year_tooltip=function(c,o,p){return p.text};
(function(){var c=function(){return scheduler._mode==scheduler.config.year_mode_name};scheduler.dblclick_dhx_month_head=function(a){if(c()){var b=a.target||a.srcElement;if(b.parentNode.className.indexOf("dhx_before")!=-1||b.parentNode.className.indexOf("dhx_after")!=-1)return!1;var d=this.templates.xml_date(b.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("date"));d.setDate(parseInt(b.innerHTML,10));var u=this.date.add(d,1,"day");!this.config.readonly&&this.config.dblclick_create&&
this.addEventNow(d.valueOf(),u.valueOf(),a)}};var o=scheduler.changeEventId;scheduler.changeEventId=function(){o.apply(this,arguments);c()&&this.year_view(!0)};var p=scheduler.render_data,v=scheduler.date.date_to_str("%Y/%m/%d"),w=scheduler.date.str_to_date("%Y/%m/%d");scheduler.render_data=function(a){if(!c())return p.apply(this,arguments);for(var b=0;b<a.length;b++)this._year_render_event(a[b])};var x=scheduler.clear_view;scheduler.clear_view=function(){if(!c())return x.apply(this,arguments);for(var a=
0;a<j.length;a++)j[a].className="dhx_month_head",j[a].setAttribute("date","");j=[]};scheduler.hideToolTip=function(){if(this._tooltip)this._tooltip.style.display="none",this._tooltip.date=new Date(9999,1,1)};scheduler.showToolTip=function(a,b,d,c){if(this._tooltip){if(this._tooltip.date.valueOf()==a.valueOf())return;this._tooltip.innerHTML=""}else{var k=this._tooltip=document.createElement("DIV");k.className="dhx_tooltip";document.body.appendChild(k);k.onclick=scheduler._click.dhx_cal_data}for(var h=
this.getEvents(a,this.date.add(a,1,"day")),l="",f=0;f<h.length;f++){var m=h[f],e=m.color?"background-color:"+m.color+";":"",g=m.textColor?"color:"+m.textColor+";":"";l+="<div class='dhx_tooltip_line' style='"+e+""+g+"' event_id='"+h[f].id+"'>";l+="<div class='dhx_tooltip_date' style='"+e+""+g+"'>"+(h[f]._timed?this.templates.event_date(h[f].start_date):"")+"</div>";l+="<div class='dhx_event_icon icon_details'>&nbsp;</div>";l+=this.templates.year_tooltip(h[f].start_date,h[f].end_date,h[f])+"</div>"}this._tooltip.style.display=
"";this._tooltip.style.top="0px";this._tooltip.style.left=document.body.offsetWidth-b.left-this._tooltip.offsetWidth<0?b.left-this._tooltip.offsetWidth+"px":b.left+c.offsetWidth+"px";this._tooltip.date=a;this._tooltip.innerHTML=l;this._tooltip.style.top=document.body.offsetHeight-b.top-this._tooltip.offsetHeight<0?b.top-this._tooltip.offsetHeight+c.offsetHeight+"px":b.top+"px"};scheduler._init_year_tooltip=function(){dhtmlxEvent(scheduler._els.dhx_cal_data[0],"mouseover",function(a){if(c()){var a=
a||event,b=a.target||a.srcElement;if(b.tagName.toLowerCase()=="a")b=b.parentNode;(b.className||"").indexOf("dhx_year_event")!=-1?scheduler.showToolTip(w(b.getAttribute("date")),getOffset(b),a,b):scheduler.hideToolTip()}});this._init_year_tooltip=function(){}};scheduler.attachEvent("onSchedulerResize",function(){return c()?(this.year_view(!0),!1):!0});scheduler._get_year_cell=function(a){var b=a.getMonth()+12*(a.getFullYear()-this._min_date.getFullYear())-this.week_starts._month,d=this._els.dhx_cal_data[0].childNodes[b],
a=this.week_starts[b]+a.getDate()-1;return d.childNodes[2].firstChild.rows[Math.floor(a/7)].cells[a%7].firstChild};var j=[];scheduler._mark_year_date=function(a,b){var d=this._get_year_cell(a);d.className="dhx_month_head dhx_year_event "+this.templates.event_class(b.start_date,b.end_date,b);d.setAttribute("date",v(a));j.push(d)};scheduler._unmark_year_date=function(a){this._get_year_cell(a).className="dhx_month_head"};scheduler._year_render_event=function(a){for(var b=a.start_date,b=b.valueOf()<this._min_date.valueOf()?
this._min_date:this.date.date_part(new Date(b));b<a.end_date;)if(this._mark_year_date(b,a),b=this.date.add(b,1,"day"),b.valueOf()>=this._max_date.valueOf())break};scheduler.year_view=function(a){if(a){var b=scheduler.xy.scale_height;scheduler.xy.scale_height=-1}scheduler._els.dhx_cal_header[0].style.display=a?"none":"";scheduler.set_sizes();if(a)scheduler.xy.scale_height=b;scheduler._table_view=a;if(!this._load_mode||!this._load())a?(scheduler._init_year_tooltip(),scheduler._reset_year_scale(),scheduler.render_view_data()):
scheduler.hideToolTip()};scheduler._reset_year_scale=function(){this._cols=[];this._colsS={};var a=[],b=this._els.dhx_cal_data[0],d=this.config;b.scrollTop=0;b.innerHTML="";var c=Math.floor(parseInt(b.style.width)/d.year_x),k=Math.floor((parseInt(b.style.height)-scheduler.xy.year_top)/d.year_y);k<190&&(k=190,c=Math.floor((parseInt(b.style.width)-scheduler.xy.scroll_width)/d.year_x));for(var h=c-11,l=0,f=document.createElement("div"),m=this.date.week_start(new Date),e=0;e<7;e++)this._cols[e]=Math.floor(h/
(7-e)),this._render_x_header(e,l,m,f),m=this.date.add(m,1,"day"),h-=this._cols[e],l+=this._cols[e];f.lastChild.className+=" dhx_scale_bar_last";for(var g=this.date[this._mode+"_start"](this.date.copy(this._date)),j=g,e=0;e<d.year_y;e++)for(var r=0;r<d.year_x;r++){var i=document.createElement("DIV");i.style.cssText="position:absolute;";i.setAttribute("date",this.templates.xml_format(g));i.innerHTML="<div class='dhx_year_month'></div><div class='dhx_year_week'>"+f.innerHTML+"</div><div class='dhx_year_body'></div>";
i.childNodes[0].innerHTML=this.templates.year_month(g);for(var p=this.date.week_start(g),t=this._reset_month_scale(i.childNodes[2],g,p),n=i.childNodes[2].firstChild.rows,q=n.length;q<6;q++){n[0].parentNode.appendChild(n[0].cloneNode(!0));for(var s=0;s<n[q].childNodes.length;s++)n[q].childNodes[s].className="dhx_after",n[q].childNodes[s].firstChild.innerHTML=scheduler.templates.month_day(t),t=scheduler.date.add(t,1,"day")}b.appendChild(i);i.childNodes[1].style.height=i.childNodes[1].childNodes[0].offsetHeight+
"px";var o=Math.round((k-190)/2);i.style.marginTop=o+"px";this.set_xy(i,c-10,k-o-10,c*r+5,k*e+5+scheduler.xy.year_top);a[e*d.year_x+r]=(g.getDay()-(this.config.start_on_monday?1:0)+7)%7;g=this.date.add(g,1,"month")}this._els.dhx_cal_date[0].innerHTML=this.templates[this._mode+"_date"](j,g,this._mode);this.week_starts=a;a._month=j.getMonth();this._min_date=j;this._max_date=g}})();
