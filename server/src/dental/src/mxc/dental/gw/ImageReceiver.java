package mxc.dental.gw;

import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mxc.data.Variant;
import mxc.dental.erp.constantValues;
import mxc.dental.erp.servletHandler;

import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;

@WebServlet("/ImageReceiver")
public class ImageReceiver extends HttpServlet implements constantValues {
	private static final long serialVersionUID = 1L;
       
    public ImageReceiver() {
        super();    
    }

    private static final String TMP_DIR_PATH = "c:/dental/images";
	private File tmpDir;
	private static final String DESTINATION_DIR_PATH ="c:/dental/images/files/";
	private File destinationDir;
 
	public void init(ServletConfig config) throws ServletException {
		super.init(config);
		tmpDir = new File(TMP_DIR_PATH);
		if(!tmpDir.isDirectory()) {
			throw new ServletException(TMP_DIR_PATH + " is not a directory");
		}
		String realPath = DESTINATION_DIR_PATH;
		destinationDir = new File(realPath);
	}
	
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {			    
		
	    PrintWriter out = response.getWriter();
	    response.setContentType("text/plain");
	    out.println("<h1>Servlet File Upload Example using Commons File Upload</h1>");
	    out.println();
	    System.out.println("images recieving");
		DiskFileItemFactory  fileItemFactory = new DiskFileItemFactory ();		
		fileItemFactory.setSizeThreshold(5*1024*1024); //1 MB
		
		fileItemFactory.setRepository(tmpDir);
		
		ServletFileUpload uploadHandler = new ServletFileUpload(fileItemFactory);
		uploadHandler.setSizeMax(1*1024*1024);
		Variant w = new Variant();
		try {			
			List<?> items = uploadHandler.parseRequest(request);
			Iterator<?> itr = items.iterator();			
			while(itr.hasNext()) {
				FileItem item = (FileItem) itr.next();
				
				if(item.isFormField()) {
					w.put(item.getFieldName(), item.getString());									
				} else {
										
				}
				out.close();
			}
			servletHandler.distributeHandler(IMAGE_HANDLER, w);
		}catch(FileUploadException ex) {
			ex.printStackTrace();
		} catch(Exception ex) {
			ex.printStackTrace();
		} 						
	}

	class Filename {
		  private String fullPath;
		  private char pathSeparator, extensionSeparator;

		  public Filename(String str, char sep, char ext) {
		    fullPath = str;
		    pathSeparator = sep;
		    extensionSeparator = ext;
		  }

		  public String extension() {
		    int dot = fullPath.lastIndexOf(extensionSeparator);
		    return fullPath.substring(dot + 1);
		  }

		  public String filename() { 
		    int dot = fullPath.lastIndexOf(extensionSeparator);
		    int sep = fullPath.lastIndexOf(pathSeparator);
		    return fullPath.substring(sep + 1, dot);
		  }

		  public String path() {
		    int sep = fullPath.lastIndexOf(pathSeparator);
		    return fullPath.substring(0, sep);
		  }
	}
}
