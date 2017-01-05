package mxc.dental.gw;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import mxc.data.Variant;
import mxc.dental.erp.constantValues;
import mxc.dental.erp.servletHandler;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import com.sun.xml.internal.messaging.saaj.util.Base64;

import sun.misc.BASE64Decoder;


/**
 * Servlet implementation class today
 */
@WebServlet("/postGW")
public class postGW extends HttpServlet implements constantValues {
	private static final long serialVersionUID = 1L;	
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public postGW() {
        super();

    }
    
    public static String decode (String source) {
		  BASE64Decoder enc = new sun.misc.BASE64Decoder();
		  try {
			byte[] b = enc.decodeBuffer(source);
			return new String(b);
		} catch (IOException e) {		
		}
		
		return source;
	}
    
    private boolean authenticate(HttpServletRequest req)
    {
     String authhead=req.getHeader("Authorization");          
     if(authhead!=null)
     {
      String usernpass = authhead.substring(6, authhead.length());      
      String user=usernpass.substring(0,usernpass.indexOf(":"));
      String password=usernpass.substring(usernpass.indexOf(":")+1);
            
      	if (user.equals("voltam_llc") && password.equals("Twi1ig#7@3cli8$E")) {
      		
      		return true;
      	}
     }

     return false;
    }

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
	
	public static String fromHexString(String hex) {
		ByteArrayOutputStream bas = new ByteArrayOutputStream();
		for (int i = 0; i < hex.length(); i+=2) {
			int b = Integer.parseInt(hex.substring(i, i + 2), 16);
			bas.write(b);
		}
		return bas.toString();
	}
	
	public static String toUTF8(String src) {
		if (src == null) return src;
		
		try {
			byte[] bytes = src.getBytes("ISO8859_1");
			return new String(bytes, "UTF-8");
		} catch (UnsupportedEncodingException e) { 
			e.printStackTrace();
		}
		return src;
    }
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {		
		/*if (authenticate(request))*/ {
			try {
				ServletOutputStream out= response.getOutputStream();								
	            /*char cbuf[] = new char[request.getContentLength()];  
	            request.getReader().read(cbuf);*/  
	            //String body = new String(cbuf); 
				request.setCharacterEncoding("UTF-8");
	            String body = request.getParameter("xml");
	            if (body == null) body = "";	         
	            
	            //body = toUTF8(Base64.base64Decode(body));            
	            //body = fromHexString(body);
	           // body = toUTF8(Base64.base64Decode(body));            
	            
	            body = body.substring(0, body.lastIndexOf(">")+1);
	            
				body = "<?xml version='1.0' encoding='UTF-8'?>"+body;							
				body = body.replaceAll("&",";");				
	            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
	            InputStream inputStream = new ByteArrayInputStream(body.getBytes());
            
				Document doc = documentBuilderFactory.newDocumentBuilder().parse(inputStream);
				doc.getDocumentElement().normalize();
								
			    NodeList nList = doc.getElementsByTagName("WebRequest");			    
			    response.setHeader("Content-Type", "text/xml; charset=UTF-8");
			    response.setCharacterEncoding("UTF-8");
			    
			    for (int temp = 0; temp < nList.getLength(); temp++) {
			 
			       Node nNode = nList.item(temp);	    
			       if (nNode.getNodeType() == Node.ELEMENT_NODE) {
			 
			          Element eElement = (Element) nNode;			 			          
			          
			          Variant w = new Variant();
			          w.put("func", getTagValue("func",eElement));
			          w.put("action", getTagValue("action",eElement));
			          w.put("table", getTagValue("table",eElement));
			          w.put("fields", getTagValue("fields",eElement));
			          w.put("where", getTagValue("where",eElement));
			          w.put("types", getTagValue("types",eElement));
			          String result = servletHandler.distributeHandler(MOBILE_HANDLER, w);
			          System.out.println(servletHandler.serverProcessId+" "+result);
			          			          			         
			          out.write(result.getBytes("UTF-8"));			          
			        }
			    }
			} catch (SAXException e) {

			} catch (ParserConfigurationException e) {

			}
			
		}/* else
		{
		   response.setHeader("WWW-Authenticate","Basic realm=\"Authorisation need\"");
		   response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "");
		}*/
			
	}
	
	private static String getTagValue(String sTag, Element eElement){
	    NodeList nlList= eElement.getElementsByTagName(sTag).item(0).getChildNodes();
	    Node nValue = (Node) nlList.item(0); 
	    return nValue.getNodeValue();    
	}	
}
