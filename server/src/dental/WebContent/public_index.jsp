<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>    
<div id="main_content">
	<div class="jquery_tab">   
  		<div class="content_block">
  			<h2 class="jquery_tab_title">Нэвтрэх</h2>
  			
  			<div style="float:left; display:inline-block; background: url(images/doctors.jpg) no-repeat; width: 840px; height: 560px; margin: 10px"> 
       		
       		</div>
       		<div style="float: right; width: 320px; height: 520px;">
       			<div style="height: 80px; padding-top: 50px;">
       				<span style="font-size:32px">Нэвтрэх</span>
       			</div>
       			<form id="main_login_form">
       				<p>
       				<label for="user" style="width: auto;">Хэрэглэгчийн нэр</label></br>
       				<input class="input-login" type="text" name="user" value="" onkeypress="javascript:init_login_error_check('user')"/>
       				</p>
       				<p>
       				<label for="password" style="width: auto;">Нууц үг</label></br>
       				<input  class="input-login" type="password" name="pass" autocomplete="off" value="" onkeypress="javascript:init_login_error_check('pass')"/>
       				</p>
       				<p>       	       							
       				<a href="">Нэвтэрч чадахгүй байна ?</a>       					
       				</p>
       				<p>    
       					</br>   	       							
       					<input class="button" name="submit" type="submit" value="Нэвтрэх" />
       					<input class="button-gray" name="clear" type="button" value="Тусламж" onclick="reset_tooth_actions()" />
       				</p>
       			</form>
       			<div style="height: 50px;">
       				
       			</div>
       			<div style="height: 150px; valign: bottom; font-size:11px; ">
       				&copy; 2012-2014 Мэдээлэл Харилцааны Систем ХХК</br>
       				<a href="" style="line-height: 20px;">Оптимал Дент</a> v1.0.3 at mxcLab.
       			</div>
       		</div>
  		</div>
	</div>	
	<div class="jquery_tab">   
  		<div class="content_block">
  			<h2 class="jquery_tab_title">Тусламж</h2>
  		</div>
	</div>
</div>	
