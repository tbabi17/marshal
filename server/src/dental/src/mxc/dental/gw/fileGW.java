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
@WebServlet("/fileGW")
public class fileGW extends HttpServlet implements constantValues {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public fileGW() {
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
		String fileName = request.getParameter("fn");
		if (fileName == null) return;
		
		/*
		String filename = "c:/dental/images/"+fileName;
		String original_filename = fileName;
		File                f        = new File(filename);		
		if (!f.exists()) return;
        int                 length   = 0;
        ServletOutputStream op       = response.getOutputStream();
        ServletContext      context  = getServletConfig().getServletContext();
        String              mimetype = context.getMimeType( filename );              
        
        response.setContentType((mimetype != null) ? mimetype : "application/octet-stream");//"application/vnd.ms-excel");		
		response.setContentLength( (int)f.length() );
        response.setHeader( "Content-Disposition", "attachment; filename=\"" + original_filename + "\"" );

        byte[] bbuf = new byte[1024];
        DataInputStream in = new DataInputStream(new FileInputStream(f));

        while ((in != null) && ((length = in.read(bbuf)) != -1))
        {
            op.write(bbuf,0,length);
        }

        in.close();
        op.flush();
        op.close();*/
		Variant w = new Variant();
		w.put("table", "products");
		w.put("code", fileName);
		String result = servletHandler.distributeHandler(IMAGE_VHANDLER, w);				
		byte[] imageBytes;				
		
		
			try {
				result = result.substring(result.indexOf(",")+1, result.length());
				imageBytes = Base64.decode(result);
				response.setContentType("image/bmp");
				response.setContentLength(imageBytes.length);

				response.getOutputStream().write(imageBytes);
			} catch (Base64DecodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		
		
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
