<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<html>
	<head>
		<title>Зураг дарах</title>

		<meta charset="utf-8">
		<style>
			.button, p.form-submit, #content-960 input[type="submit"] {
				border-width: 1px;
				border-style: solid;
				padding: 4px 10px;
				font-size: 12px;
				text-decoration: none;
				line-height: 19px;
				margin-right: 6px;
				display: inline-block;
				-webkit-border-radius: 2px;
				-moz-border-radius: 2px;
				-ms-border-radius: 2px;
				-o-border-radius: 2px;
				border-radius: 2px;
				color: white !important;
				text-shadow: none;
				background-color: #F56C13 !important;
				background: url(data:image/png;base64,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) repeat-x scroll 100% 0px transparent;
				-webkit-box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
				-moz-box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
				box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);	
				border-color: #C95910 !important;		
				float: left;
				cursor: url("../icons/hand.cur"), default;
			}
			
			.button:hover{
				
			}
		</style>		
		<script language="JavaScript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>		
		<script language="JavaScript" src="jquery.swfobject.1-1-1.min.js"></script>
		<script language="JavaScript" src="../lv.js"></script> 
		<script language="JavaScript" src="scriptcam.js"></script> 
		<script> 

			$(document).ready(function() {
				$("#webcam").scriptcam({
					appID:'D1AC48A0-49',
					showMicrophoneErrors:false,
					onError:onError,
					onWebcamReady:onWebcamReady
				});
			});

			function base64_tofield() {
				$('#formfield').val($.scriptcam.getFrameAsBase64());
			};

			function base64_toimage() {
				//$('#image').attr("src", "data:image/jpeg;base64,"+$.scriptcam.getFrameAsBase64());
				
				window.opener.$('#image').attr("src","data:image/jpeg;base64,"+$.scriptcam.getFrameAsBase64());								
				window.opener.$('#uri').val("data:image/jpeg;base64,"+$.scriptcam.getFrameAsBase64());
				
				$('#uimage').attr("src", "data:image/jpeg;base64,"+$.scriptcam.getFrameAsBase64());
				$('#uuri').val("data:image/jpeg;base64,"+$.scriptcam.getFrameAsBase64());
				
				saveImage();
			};

			function changeCamera() {
				$.scriptcam.changeCamera($('#cameraNames').val());
			}

			function onError(errorId,errorMsg) {
				$( "#btn1" ).attr( "disabled", true );
				$( "#btn2" ).attr( "disabled", true );
			}			

			function onWebcamReady(cameraNames,camera,microphoneNames,microphone,volume) {

				$.each(cameraNames, function(index, text) {
					$('#cameraNames').append( $('<option></option>').val(index).html(text) )
				}); 

				$('#cameraNames').val(camera);

			}

		</script> 

	</head>

	<body>

		<div style="width:330px;float:left;">

			<div id="webcam">

			</div>

			<div style="margin:5px;">

				<img src="webcamlogo.png" style="vertical-align:text-top"/>

				<select id="cameraNames" size="1" onChange="changeCamera()" style="width:245px;font-size:10px;height:25px;">

				</select>

			</div>

		</div>

		<div style="width:200px;float:left;">		
			<input type="submit" class="button" id="btn2" onclick="base64_toimage()" value="Зураг дарах"></input>
			<br/><br/>
			<p><img id="uimage" style="width:160px;height:180px;"/></p>
		</div>

	</body>

</html>


