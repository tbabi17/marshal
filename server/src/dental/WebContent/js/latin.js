var keySpace = 32;var keySingleQuote = 222;var keyBackQuote = 192;var keyBackSlash = 92;var keyPeriod = 46;var keyQuestionMark = 63;var keyLF = 10;var keyExclamationMark = 33;var keyA = 65;var keyB = 66;var keyC = 67;var keyD = 68;
    var keyE = 69;var keyF = 70;var keyG = 71;var keyH = 72;var keyI = 73;var keyJ = 74;var keyK = 75;var keyL = 76;var keyM = 77;var keyN = 78;var keyO = 79;var keyP = 80;var keyQ = 81;var keyR = 82;var keyS = 83;var keyT = 84;var keyU = 85;var keyV = 86;var keyW = 87;var keyX = 88;var keyY = 89;var keyZ = 90;
    var keyCyrD = 1044;var keyCyrd = 1076;var keyCyrA = 1040;var keyCyra = 1072;var keyCyrYa = 1071;var keyCyrya = 1103;var keyCyrH = 1061;var keyCyrh = 1093;var keyCyrO = 1054;var keyCyro = 1086;var keyCyrYe = 1045;var keyCyrye = 1077;var keyCyrB = 1041;var keyCyrb = 1073;var keyCyrYu = 1070;var keyCyryu = 1102;var keyCyrZ = 1047;var keyCyrz = 1079;var keyCyrT = 1058;var keyCyrt = 1090;
    var keyCyrYo = 1025;var keyCyryo = 1105;var keyCyrV = 1042;var keyCyrv = 1074;var keyCyrK = 1050;var keyCyrk = 1082;var keyCyrSh = 1064;var keyCyrsh = 1096;var keyCyrYi = 1067;var keyCyryi = 1099;var keyCyrJ = 1046;var keyCyrj = 1078;var keyCyrG = 1043;var keyCyrg = 1075;var keyCyrP = 1055;var keyCyrp = 1087;var keyCyrM = 1052;var keyCyrm = 1084;var keyCyrI = 1048;var keyCyri = 1080;
    var keyCyrIi = 1049;var keyCyrii = 1081;var keyCyrE = 1069;var keyCyre = 1101;var keyCyrN = 1053;var keyCyrn = 1085;var keyCyrU = 1059;var keyCyru = 1091;var keyCyrR = 1056;var keyCyrr = 1088;
    var BrowserName=navigator.userAgent;var isIE=(BrowserName.indexOf('MSIE')>-1)?true:false;
    var keyCyrL = 1051;var keyCyrl = 1083;var keyCyrTs = 1062;var keyCyrts = 1094;var keyCyrUi = 1198;var keyCyrui = 1199;var keyCyrCh = 1063;var keyCyrch = 1095;var keyCyrYii = 1066;var keyCyryii = 1098;var keyCyrOi = 1256;var keyCyroi = 1257;var keyCyrS = 1057;var keyCyrs = 1089;var keyCyrF = 1060;var keyCyrf = 1092;var keyCyrShi = 1065;var keyCyrshi = 1097;var keyCyrIii = 1068;var keyCyriii = 1100;
    
	function fGetConverted(keyCode,lastCode,keyShift,caretLeftText){
    	var retCode;
    	switch(keyCode){
   		case keyA: switch(lastCode){
 	   			case keyCyrYi: retCode=keyCyrYa+10000; break;
    			case keyCyryi: retCode=((keyShift)?keyCyrYa:keyCyrya)+10000; break;
    			default: retCode=(keyShift)?keyCyrA:keyCyra;
    			} break;
   		case keyB: retCode=(keyShift)?keyCyrB:keyCyrb; break;
   		case keyC: switch(lastCode){
   				case keyCyrSh: retCode=keyCyrShi+10000; break;
   				case keyCyrsh: retCode=((keyShift)?keyCyrShi:keyCyrshi)+10000; break;
   				default: retCode=(keyShift)?keyCyrTs:keyCyrts;
   				} break;
   		case keyS: switch(lastCode){
   				case keyBackSlash: retCode=((keyShift)?keyCyrS:keyCyrs)+10000; break;
				default: retCode=(keyShift)?keyCyrS:keyCyrs;
				} break;
   			
   		case keyD: retCode=(keyShift)?keyCyrD:keyCyrd; break;
   		case keyE: switch(lastCode){
   				case keyCyrYi: retCode=keyCyrYe+10000; break;
   				case keyCyryi: retCode=((keyShift)?keyCyrYe:keyCyrye)+10000; break;
   				default: retCode=(keyShift)?keyCyrE:keyCyre;
   				} break;  				
   		case keyF: retCode=(keyShift)?keyCyrF:keyCyrf; break;
   		case keyG: retCode=(keyShift)?keyCyrG:keyCyrg; break;
   		case keyH: switch (lastCode){
   				case keyCyrTs: retCode=keyCyrCh+10000; break;
   				case keyCyrts: retCode=((keyShift)?keyCyrCh:keyCyrch)+10000; break;
   				case keyCyrS: retCode=keyCyrSh+10000; break;
   				case keyCyrs: retCode=((keyShift)?keyCyrSh:keyCyrsh)+10000; break;
   				case keyBackSlash: retCode=((keyShift)?keyCyrH:keyCyrh)+10000; break;
   				default: retCode=(keyShift)?keyCyrH:keyCyrh;
   				} break;
   		case keyI: switch(lastCode){
   				case keyCyrA: case keyCyra: case keyCyrYe: case keyCyrye: case keyCyrYo: case keyCyryo:
   				case keyCyrI: case keyCyri: case keyCyrO: case keyCyro: case keyCyrOi: case keyCyroi:
   				case keyCyrU: case keyCyru: case keyCyrUi: case keyCyrui: case keyCyrE: case keyCyre:
   				case keyCyrYu: case keyCyryu: case keyCyrYa: case keyCyrya: retCode=(keyShift)?keyCyrIi:keyCyrii; break;
   				default: retCode=(keyShift)?keyCyrI:keyCyri;
   				} break;
   		case keyJ: retCode=(keyShift)?keyCyrJ:keyCyrj; break;
   		case keyK: retCode=(keyShift)?keyCyrK:keyCyrk; break;
   		case keyL: retCode=(keyShift)?keyCyrL:keyCyrl; break;
   		case keyM: retCode=(keyShift)?keyCyrM:keyCyrm; break;
   		case keyN: retCode=(keyShift)?keyCyrN:keyCyrn; break;
   		case keyO: switch(lastCode){
   				case keyCyrOi: case keyCyroi: retCode=(keyShift)?keyCyrOi:keyCyroi; break;
   				case keyCyrYi: retCode=keyCyrYo+10000; break;
   				case keyCyryi: retCode=((keyShift)?keyCyrYo:keyCyryo)+10000; break;
   				default: if(fCheckErEm(caretLeftText)){
   							retCode=(keyShift)?keyCyrOi:keyCyroi;
		   				} else{
   							retCode=(keyShift)?keyCyrO:keyCyro;
   						}
   				} break;
   		case keyP: retCode=(keyShift)?keyCyrP:keyCyrp; break;
   		case keyQ: retCode=(keyShift)?keyCyrOi:keyCyroi; break;
   		case keyR: retCode=(keyShift)?keyCyrR:keyCyrr; break;
   		case keyS: retCode=(keyShift)?keyCyrS:keyCyrs; break;
   		case keyT: retCode=(keyShift)?keyCyrT:keyCyrt; break;
   		case keyU: switch (lastCode){
   				case keyCyrUi: case keyCyrui: retCode=(keyShift)?keyCyrUi:keyCyrui; break;
   				case keyCyrYi: retCode=keyCyrYu+10000; break;
   				case keyCyryi: retCode=((keyShift)?keyCyrYu:keyCyryu)+10000; break;
				default: if (fCheckErEm(caretLeftText)){
							retCode=(keyShift)?keyCyrUi:keyCyrui;
						} else{
							retCode=(keyShift)?keyCyrU:keyCyru;
						}
				} break;
		case keyV: retCode=(keyShift)?keyCyrV:keyCyrv; break;
		case keyW: retCode=(keyShift)?keyCyrUi:keyCyrui; break;
		case keyX: retCode=(keyShift)?keyCyrH:keyCyrh; break;
		case keyY: retCode=(keyShift)?keyCyrYi:keyCyryi; break;
		case keyZ: retCode=(keyShift)?keyCyrZ:keyCyrz; break;
		case keyBackQuote: switch(lastCode){
				case keyCyrB: case keyCyrV: case keyCyrG: case keyCyrD: case keyCyrJ:
				case keyCyrZ: case keyCyrK: case keyCyrL: case keyCyrM: case keyCyrN:
				case keyCyrP: case keyCyrR: case keyCyrS: case keyCyrT: case keyCyrF:
				case keyCyrH: case keyCyrTs: case keyCyrCh: case keyCyrSh: case keyCyrShi: retCode=keyCyrYii; break;
				case keyCyrb: case keyCyrv: case keyCyrg: case keyCyrd: case keyCyrj:
				case keyCyrz: case keyCyrk: case keyCyrl: case keyCyrm: case keyCyrn:
				case keyCyrp: case keyCyrr: case keyCyrs: case keyCyrt: case keyCyrf:
				case keyCyrh: case keyCyrts: case keyCyrch: case keyCyrsh: case keyCyrshi: retCode=keyCyryii; break;
				case keyCyrYii: case keyCyryii: retCode=10034; break;
				default: retCode=0;
				} break;
		case keySingleQuote: switch (lastCode){
				case keyCyrO: retCode=keyCyrOi+10000; break; 
				case keyCyro: retCode=keyCyroi+10000; break;
				case keyCyrOi: retCode=keyCyrOi+10000; break; 
				case keyCyroi: retCode=keyCyroi+10000; break;
				case keyCyrU: retCode=keyCyrUi+10000; break;
				case keyCyru: retCode=keyCyrui+10000; break;
				case keyCyrUi: retCode=keyCyrUi+10000; break;
				case keyCyrui: retCode=keyCyrui+10000; break;
				case keyCyrI: retCode=keyCyrYi+10000; break;
				case keyCyri: retCode=keyCyryi+10000; break;
				case keyCyrB: case keyCyrV: case keyCyrG: case keyCyrD: case keyCyrJ: 
				case keyCyrZ: case keyCyrK: case keyCyrL: case keyCyrM: case keyCyrN:
				case keyCyrP: case keyCyrR: case keyCyrS: case keyCyrT: case keyCyrF:
				case keyCyrH: case keyCyrTs: case keyCyrCh: case keyCyrSh: case keyCyrShi: retCode=keyCyrIii; break;
				case keyCyrb: case keyCyrv: case keyCyrg: case keyCyrd: case keyCyrj: 
				case keyCyrz: case keyCyrk: case keyCyrl: case keyCyrm: case keyCyrn:
				case keyCyrp: case keyCyrr: case keyCyrs: case keyCyrt: case keyCyrf:
				case keyCyrh: case keyCyrts: case keyCyrch: case keyCyrsh: case keyCyrshi: retCode=keyCyriii; break;
				case keyCyrIii: case keyCyriii: retCode=10039; break;
				default: retCode=0;
				}break;
		default: retCode=0;
		}
		return retCode;
	}
	
	function fCheckErEm(str){
		var idx=0;
		var len=0;
		var arTemdegt=new Array(keySpace,keyPeriod,keyQuestionMark,keyLF,keyExclamationMark);
		var arUseg=new Array(keyCyrE,keyCyre,keyCyrOi,keyCyroi,keyCyrUi,keyCyrui);
		str=''+str;
		for (i=0; i<arTemdegt.length; i++){
			len=str.lastIndexOf(String.fromCharCode(arTemdegt[i]));
			if (len>idx){
				idx=len;
			}
		}
		str=str.substring(idx+1,str.length);
		for (i=0; i<arUseg.length; i++){
			len=str.indexOf(String.fromCharCode(arUseg[i]));
			if (len>-1){
				return true;
			}
		}
		return false;
	}
	
	function fOnKeyDown2(evt, t){
		var rad= false; //document.getElementById('latin');
		//if (rad.checked){
//			return false;
		//}
		evt=(evt)?evt:window.event;
		var keyCtrl=evt.ctrlKey;
		var keyAlt=evt.altKey;
		if (keyCtrl || keyAlt){
			return false;
		}
		var keyShift=evt.shiftKey;
		var keyCode=(isIE)?evt.keyCode:evt.which;
		if ((keyCode<keyA || keyCode>keyZ) && keyCode!=keySingleQuote 
			&& keyCode!=keyBackQuote){
			return false;
		}
		var obj=document.getElementById(t.id);
		var posScroll=obj.scrollTop;obj.focus();
		var caretPos=fGetCaretPos(obj);
		var caretLeftText;
		var caretRightText;
		if (caretPos>-1){
			caretLeftText=obj.value.substring(0,caretPos);
			caretRightText=obj.value.substring(caretPos,obj.value.length);
		} else{
			caretLeftText=obj.value;
			caretRightText='';
		}
		var lengthLeftText=caretLeftText.length;
		var lastCode=caretLeftText.charCodeAt(lengthLeftText-1);
		var retCode=fGetConverted(keyCode,lastCode,keyShift,caretLeftText);
		if (retCode==0){
			return false;
		}
		fCancelEvent(evt);
		if (retCode>=10000){
			retCode-=10000;
			lengthLeftText-=1;
			caretLeftText=caretLeftText.substring(0,lengthLeftText);
		}
		obj.value=caretLeftText+String.fromCharCode(retCode)+caretRightText;
		obj.scrollTop=posScroll;
		var cnt=caretLeftText.split('\r\n').length-1;
		fSetCaretTo(obj,lengthLeftText+1-cnt,0);
	}
	
	function fSetCaretTo(obj,pos,cnt){
		if(obj.createTextRange){
			var range = obj.createTextRange();
			range.move('character',pos-cnt);
			range.select();
		} else if (obj.selectionStart){
			obj.focus();obj.setSelectionRange(pos, pos);
		}
	}
	
	function fGetCaretPos(node){
		if (node.selectionStart) 
			return node.selectionStart;
		else if (!document.selection) 
			return 0;
		var c='\001';
		var sel=document.selection.createRange();
		var dul=sel.duplicate();
		var len=0;
		dul.moveToElementText(node);
		sel.text=c;
		len=(dul.text.indexOf(c));
		sel.moveStart('character',-1);
		sel.text='';
		return len;
	}
	
	function fKeyDownOnBody(evt){
		evt=(evt)?evt:window.event;
		if (evt.ctrlKey==1){
			var codeIn=(isIE)?evt.keyCode:evt.which;
			if (codeIn==75){
				var krill=document.getElementById('krill');
				var latin=document.getElementById('latin');
				if (krill.checked){
					latin.checked = true;
				} else{
					krill.checked = true;
				}
				fCancelEvent(evt);
			}
		}
	}
	
	function fCancelEvent(evt){
		if (isIE)evt.returnValue=false;
		if (!isIE)evt.preventDefault();
	} 
	
	function fOnFocus(){
		var obj=document.getElementById('txt');
		var str='Латин үсгээр монгол үг галиглан бичдэг шигээ бич, шууд криллээр гарах болно....';
		if (obj.value.indexOf(str)>-1){
			obj.value=obj.value.replace(str,'');
		}
	}