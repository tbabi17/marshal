package mxc.dental.gw;

import java.io.IOException;

import javax.servlet.Servlet;
import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mxc.data.Variant;
import mxc.dental.erp.constantValues;
import mxc.dental.erp.servletHandler;

import com.sun.org.apache.xml.internal.security.exceptions.Base64DecodingException;
import com.sun.org.apache.xml.internal.security.utils.Base64;

/**
 * Servlet implementation class fileGW
 */
@WebServlet("/rentGW")
public class rentGW extends HttpServlet implements constantValues {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public rentGW() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Servlet#init(ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String id = request.getParameter("id");
		String field = request.getParameter("fd");		
		if (id == null) return;	
		Variant w = new Variant();
		w.put("table", "orders");
		w.put("id", id);
		w.put("field", field);
		String result = servletHandler.distributeHandler(IMAGE_SHANDLER, w);		
		byte[] imageBytes;								
		try {
			if (field.equals("memo")) {
				response.getOutputStream().write(result.getBytes("UTF-8"));
			} else {				
				result = result.substring(result.indexOf(",")+1, result.length());
				imageBytes = Base64.decode(result);
				response.setContentType("image/bmp");
				response.setContentLength(imageBytes.length);
				
				response.getOutputStream().write(imageBytes);
			}
		} catch (Exception e) {

		}								
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
