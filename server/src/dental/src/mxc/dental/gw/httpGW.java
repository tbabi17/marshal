package mxc.dental.gw;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.parsers.DocumentBuilderFactory;

import mxc.data.Variant;
import mxc.dental.erp.constantValues;
import mxc.dental.erp.servletHandler;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.sun.xml.internal.messaging.saaj.util.Base64;

/**
 * Servlet implementation class httpGW
 */
@WebServlet("/httpGW")
public class httpGW extends HttpServlet implements constantValues {
	private static final long serialVersionUID = 1L;
    private static String key = "";   
    /**
     * @see HttpServlet#HttpServlet()
     */
    public httpGW() {
        super();
        // TODO Auto-generated constructor stub
    }
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}
	
	private boolean authenticate(HttpServletRequest req) {
	     String authhead=req.getHeader("Authorization");
	     System.out.println(authhead);
	     authhead = Base64.base64Decode(authhead);	     
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
		//if (!authenticate(request)) return;		
		
		try {			
			request.setCharacterEncoding("UTF-8");
			if (request.getContentLength() == -1) {				
				ServletOutputStream out= response.getOutputStream();	        	
	        	out.write("bad request".getBytes());
	        	out.close();
				return;
			}
			char cbuf[] = new char[request.getContentLength()];  
            request.getReader().read(cbuf);
            String body = new String(cbuf);            
            //body = toUTF8(Base64.base64Decode(body));            
            //body = fromHexString(body);
            //body = toUTF8(Base64.base64Decode(body));            
            //                        
            System.out.println(body);
            body = body.substring(0, body.lastIndexOf(">")+1);            
            DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
            InputStream inputStream = new ByteArrayInputStream(body.getBytes("UTF-8"));
        
			Document doc = documentBuilderFactory.newDocumentBuilder().parse(inputStream);
			doc.getDocumentElement().normalize();			
			String root = doc.getDocumentElement().getNodeName();			
		    NodeList nList = doc.getElementsByTagName(root);
		    
		    response.setHeader("Content-Type", "text/xml; charset=UTF-8");
		    response.setCharacterEncoding("UTF-8");
		    
		    for (int temp = 0; temp < nList.getLength(); temp++) {
		 
		       Node nNode = nList.item(temp);	    
		       if (nNode.getNodeType() == Node.ELEMENT_NODE) {
		 
		          Element eElement = (Element) nNode;
		          Variant w = new Variant();
		          String session = getTagValue("session",eElement);
		          w.put("func", getTagValue("func",eElement));
		          w.put("action", getTagValue("action",eElement));
		          w.put("table", getTagValue("table",eElement));
		          w.put("fields", getTagValue("fields",eElement));
		          w.put("where", getTagValue("where",eElement));
		          w.put("types", getTagValue("types",eElement));
		          w.put("session", session);
		          w.put("clinicCode", getTagValue("clinicCode",eElement));
		          String result = "";
		          
		          /*if (session.length() > 0 && !session.equals(key))
		          {
		        	  ServletOutputStream out= response.getOutputStream();	        	
		        	  out.write("error".getBytes());
		        	  out.close();
					  return;
		          }*/
		          
		          if (root.equals("WebRequest")) {				        	  
		        	  result = servletHandler.distributeHandler(WEB_HANDLER, w);		        	  		        	 
		        	  ServletOutputStream out= response.getOutputStream();
		        	  response.setContentType("text/json");
		        	  response.setContentLength(result.getBytes("UTF-8").length);
		        	  out.write(result.getBytes("UTF-8"));
		        	  out.close();
		          }		         		          	        
		        }
		    }
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private static String getTagValue(String sTag, Element eElement){
	    NodeList nlList= eElement.getElementsByTagName(sTag).item(0).getChildNodes();
	    Node nValue = (Node) nlList.item(0); 
	    if (nValue == null) return "";
	    return nValue.getNodeValue();    
	}
	
	public static String convertDateTimeToString() {        
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
        try {           
            return dateFormat.format(calendar.getTime());            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return "";
    }	
}
