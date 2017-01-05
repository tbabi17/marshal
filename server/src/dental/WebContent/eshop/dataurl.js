function Init(){
	//document.getElementById("cssurl").addEventListener("keyup",URLFieldKeyHandler,true);
	document.getElementById("fileinput").addEventListener("change",HandleFileSelect,false);
	if(HasFileAPIs()){
		var a=document.getElementById("droparea");
		a.addEventListener("dragover",function(b){
			b.stopPropagation();
			b.preventDefault()},true);
			a.addEventListener("drop",handleDrop,false);
			a=document.getElementById("dataurldisplay");
			a.addEventListener("dragover",function(b){
				b.stopPropagation();b.preventDefault()},true);
				a.addEventListener("drop",handleDrop,false);
				$("#droparea").html("<br><br>Drag file here")
	}
	else{
		$("#droparea").html("<br><br>Select file")}
		if(window.location.hash){
			ShowPage(window.location.hash.substring(1))
		}else{			
			ShowPage("about")
		}
}

function HasFileAPIs(){return(window.File&&window.FileReader&&window.FileList&&window.Blob)}
function ShowPage(a){$(".page").css("display","none");$("#body_"+a).css("display","block");window.location.hash="#"+a;$(".litem").attr("id","");$("li[name="+a+"]").attr("id","selected")}function HandleFileSelect(a){if(!HasFileAPIs()){document.getElementById("postframe").onload=DataURLLoaded;$("#upload-form").submit();return}ReadDataFile(a.target.files[0])}function DataURLLoaded(){var dict,contents=$("#postframe").contents().text();if(contents==""){return}dict=eval("("+contents+")");if("error" in dict){$("#droparea").html(dict.error);return}$("#dataurltextarea").html(dict.dataurl);$("#dataurlfilename").html(dict.filename);$("#droparea").css("display","none");$("#dataurlfilesize").html("Data URL Size: "+dict.size+" bytes<br>Gzipped URL size: "+dict.gzipsize+" bytes<br>Original size: "+dict.origsize+" bytes");if(dict.image){$("#dataurlimg").html('<img src="'+dict.dataurl+'">')}else{$("#dataurlimg").html("Not an image")}$("#dataurldisplay").css("display","block")}
function ReadDataFile(b){
	var a=new FileReader();
	a.onload=(function(c){
		return function(f){
			var d=c.name.split(".").pop();
			$("#dataurltextarea").html(f.target.result);
			$("#dataurlfilename").html(c.name);
			$("#droparea").css("display","none");
			$("#dataurlfilesize").html("Data URL Size: "+f.target.result.length+" bytes<br>Original size: "+c.size+" bytes");
			if(/^jpg|png|bmp|gif|jpeg$/i.test(d)){
				$("#dataurlimg").html('<img src="'+f.target.result+'">')
				window.opener.document.getElementById("image").src = f.target.result;
				window.opener.document.getElementById("uri").value = f.target.result;
			}
			else{
				$("#dataurlimg").html("Not an image")
			}
		$("#dataurldisplay").css("display","block")						
	}
	})(b);
	a.readAsDataURL(b)
}
function handleDrop(a){a.preventDefault();a.stopPropagation();ReadDataFile(a.dataTransfer.files[0])}
function ShowLoader(a){if(a){$("#optimizebutton").attr("disabled","disabled");$("#cssurl").attr("disabled","disabled");$("#status_message").css("display","none");$("#css_output_container").css("display","none");$("#ajaxloader_wrapper").css("display","block")}else{$("#optimizebutton").removeAttr("disabled");$("#cssurl").removeAttr("disabled");$("#ajaxloader_wrapper").css("display","none")}}
function OptimizerError(a){$("#status_message").html("<em>ERROR: "+a+"</em>");$("#status_message").css("display","block");ShowLoader(0)}function OptimizeCSS(){var b=Math.round((new Date()).getTime()/1000),d=0,f=ReadCookie("lastRequest"),c=$("#css_sizelimit").val(),a=$("input:checkbox[name=compress]:checked").val(),e="http://dataurl.net/cgi-bin/dataurl.pl?action=optimize&compress="+a+"&size_limit="+c+"&css_file_url="+$("#cssurl").val();if(f!=null){d=parseInt(f)}if(d>b-5){OptimizerError("Cooldown in effect.  Please try again in "+((b-5-d)*-1)+" seconds.");return}ShowLoader(1);SetCookie("lastRequest="+b);$.get(e,function(j){if("error" in j){OptimizerError(j.error);return}var i='<tr><td width="25"><span>Req.</span></td><td width="40%"><span>Remote URL</span></td><td><span>Mime-Type</span></td><td><span>Size</span></td><td width="35%"><span>Status</span></td>';for(var h in j.ext_objects){var l=j.ext_objects[h];var k="<tr><td>"+l.req+'</td><td><a href="'+l.full_url+'">'+h+"</a></td><td>"+l.mime_type+"</td><td>"+l.size+"</td><td>"+StatusStyleExtItem(l.status_msg,l)+" </td></tr>";i+=k}i='<table width="100%">'+i+"</table><br>";$("#css_resources").html(i);$("#css_resources").css("display","block");$("#pre_output").html("");$("#post_output").html("");$("#css_output").html("");var g=CmpVals(j,"requests");$("#pre_output").append("<p>"+g[0]+" requests</p>");$("#post_output").append("<p>"+g[1]+" requests ("+PcDiff(j,"requests")+"%)</p>");$("#post_output").append("<p></p>");$("#pre_output").append("<p></p>");g=CmpVals(j,"ext_objects");$("#pre_output").append("<p>"+g[0]+" ext. objects</p>");$("#post_output").append("<p>"+g[1]+" ext. objects ("+PcDiff(j,"ext_objects")+"%)</p>");g=CmpVals(j,"ext_size");$("#pre_output").append("<p>"+g[0]+" bytes ext. obj. size</p>");$("#post_output").append("<p>"+g[1]+" bytes ext. obj. size ("+PcDiff(j,"ext_size")+"%)</p>");g=CmpVals(j,"img_size");$("#pre_output").append("<p>"+g[0]+" bytes ext. image size</p>");$("#post_output").append("<p>"+g[1]+" bytes ext. image size ("+PcDiff(j,"img_size")+"%)</p>");g=CmpVals(j,"css_size");$("#pre_output").append("<p>"+g[0]+" bytes CSS size</p>");$("#post_output").append("<p>"+g[1]+" bytes CSS size ("+PcDiff(j,"css_size")+"%)</p>");g=CmpVals(j,"total_size");$("#pre_output").append("<p>"+g[0]+" bytes uncompressed</p>");$("#post_output").append("<p>"+g[1]+" bytes uncompressed ("+PcDiff(j,"total_size")+"%)</p>");g=CmpVals(j,"total_gzip_size");$("#pre_output").append("<p>"+g[0]+" bytes gzipped</p>");$("#post_output").append("<p>"+g[1]+" bytes gzipped ("+PcDiff(j,"total_gzip_size")+"%)</p>");$("#css_output").html("<pre>"+j.css_output+"</pre>");$("#css_downloadlink").html('<a href="'+j.css_link+'">⇓ Download Optimized CSS</a>');$("#css_output_container").css("display","block");ShowLoader(0)})}function PcDiff(f,e){var d=f.post[e],c=f.pre[e],g;if(c==0&&d){return"100"}else{if(d==0&&c==0){return"0"}}g=((d/c)-1)*100;g=g.toFixed(1);if(g>=0){g="+"+g}return g}
function StatusStyleExtItem(b,c){var a=c.status,d=c.converted;if(a=="warn"){return"<u>"+b+"</u>"}else{if(a=="err"){return"<em>"+b+"</em>"}else{if(d){return"<strong>"+b+"</strong>"}}}return b}
function CmpVals(h,g){var f=h.pre[g],d=h.post[g],e,c;if(f<d){e="<strong>"+f+"</strong>";c="<em>"+d+"</em>"}else{if(f==d){e=f;c=d}else{c="<strong>"+d+"</strong>";e="<em>"+f+"</em>"}}return[e,c]}
function ReadCookie(b){var e=b+"=",a=document.cookie.split(";"),f,d;for(d=0;d<a.length;d++){f=a[d];while(f.charAt(0)==" "){f=f.substring(1,f.length)}if(f.indexOf(e)==0){return f.substring(e.length,f.length)}}return null}
function SetCookie(a){document.cookie=a+"; expires=Monday, 31-Dec-2081 05:00:00 GMT; path=/"}
function URLFieldKeyHandler(a){if(a.keyCode){keycode=a.keyCode}else{keycode=a.which}if(keycode!=13){return}OptimizeCSS()};