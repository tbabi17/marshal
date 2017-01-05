<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
	<script src="schedule/codebase/dhtmlxscheduler_debug.js" type="text/javascript" charset="utf-8"></script>
	<script src="schedule/codebase/ext/dhtmlxscheduler_units.js" type="text/javascript" charset="utf-8"></script>
	<script src="schedule/codebase/ext/dhtmlxscheduler_serialize.js" type="text/javascript" charset="utf-8"></script>
	<link rel="stylesheet" href="schedule/codebase/dhtmlxscheduler.css" type="text/css" title="no title" charset="utf-8">
		
		<style>
		    /*event in day or week view*/
			.dhx_cal_event.past_event div{
				background-color:OliveDrab  !important; 
				color:black !important;
			}
		    /*multi-day event in month view*/
			.dhx_cal_event_line.past_event{
				background-color:OliveDrab  !important; 
				color:black !important;
			}
		    /*event with fixed time, in month view*/
			.dhx_cal_event_clear.past_event{
				color:black  !important;
			}
			
			/*event in day or week view*/
			.dhx_cal_event.current_event div{
				background-color: #dbf073 !important; 				
				color:black !important;
			}
		    /*multi-day event in month view*/
			.dhx_cal_event_line.current_event{
				background-color: #dbf073 !important; 
				color:black !important;
				border: #fff;
			}
		    /*event with fixed time, in month view*/
			.dhx_cal_event_clear.current_event{
				color:black !important;
			}			
			
			/*event in day or week view*/
			.dhx_cal_event.canceled_event div{
				background-color:#b2b2b2  !important; 
				color:black !important;
			}
		    /*multi-day event in month view*/
			.dhx_cal_event_line.canceled_event{
				background-color: #b2b2b2  !important; 
				color:black !important;
			}
		    /*event with fixed time, in month view*/
			.dhx_cal_event_clear.canceled_event{
				color:black !important;
			}
		</style>
        <div id="content">
        
            <div class="jquery_tab">            
                <div class="content_block">
                    <h2 class="jquery_tab_title">Цагийн хүснэгт</h2>                                    									

					<div class="my_zfull_form_box">
						<div class="fillform">
		                    <div id="scheduler_here" class="dhx_cal_container" style='width:100%; height:593px;'>
							<div class="dhx_cal_navline">
								<div class="dhx_cal_prev_button">&nbsp;</div>
								<div class="dhx_cal_next_button">&nbsp;</div>
								<div class="dhx_cal_today_button"></div>
								<div class="dhx_cal_date"></div>
								<div class="dhx_cal_tab" name="day_tab" style="right:204px;"></div>
								<div class="dhx_cal_tab" name="week_tab" style="right:140px;"></div>
								<div class="dhx_cal_tab" name="unit_tab" style="right:280px;"></div>
								<div class="dhx_cal_tab" name="month_tab" style="right:76px;"></div>
								</div>
								<div class="dhx_cal_header">
								</div>
								<div class="dhx_cal_data">
								</div>											
							</div>		  				
		                </div>
		                <div class="my_bottom_box">		                	
		            		<div id="bottom_bar">
		                		<div id='permission_bar'></div>
		                		<div id='update_save_bar'><input class="button" name="submit" type="submit" value="Хадгалах" onclick="save_schedule()"/></div>
		                		<input class="button-gray" name="restore" type="reset" value="Сэргээх"/>
		                		<div id="result-log"></div>
		             		</div>
		                </div>
		            </div>                    
                </div><!--end content_block-->    
           </div><!-- end jquery_tab -->                                                                                      
        </div><!--end content-->
                        
		