<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="description" content="Reflect Template" />
		<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
        <title>DentalSoft</title>
        <link rel="stylesheet" href="css/style_all.css" type="text/css" media="screen" />
        
        
        
        <!-- to choose another color scheme uncomment one of the foloowing stylesheets and wrap styl1.css into a comment -->
        <link rel="stylesheet" href="css/style1.css" type="text/css" media="screen" />
   
        
        
        <link rel="stylesheet" href="css/jquery-ui.css" type="text/css" media="screen" />
        <link rel="stylesheet" href="css/jquery.wysiwyg.css" type="text/css" media="screen" />
        
    
        
        <script type='text/javascript' src='js/jquery.js'></script>
        <script type='text/javascript' src='js/jquery-ui.js'></script>
        <script type='text/javascript' src='js/jquery.wysiwyg.js'></script>
        <script type='text/javascript' src='js/custom.js'></script>
    </head>
    
    <body class="nobackground">
    	
        <div id="login">
        
        	<h1 class="logo">
            	<a href="">dental.mn</a>
            </h1>
            <h2 class="loginheading">Нэвтрэх</h2>
            <div class="icon_login ie6fix"></div>
                
        	<form id="login-form" action="index.jsp" method="post">
            <p>
            	<label for="name">Хэрэглэгч</label>
            	<input class="input-medium" type="text" value="" name="name" id="name"/>
        	</p>
        	<p>
            	<label for="password">Нууц үг</label>
            	<input class="input-medium" type="password" value="" name="password" id="password" autocomplete="off"/>
        	</p>
                	
        	<div class="forgot_pw"><a href="index.html">Нууц үгээ мартсан ?</a></div>
        	<p class="clearboth">
            	<input class="button" name="submit" type="submit" value="Нэвтрэх"/>
        	</p>
            </form>
        </div>
        
        <!-- 
        <div class="login_message message error">
          <p>Wrong Username or password.</p>
        </div>
         -->
    </body>
    
</html>