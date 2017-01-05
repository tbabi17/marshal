package mxc.dental.erp;

import mxc.data.Variant;

public class servletHandler extends toolController implements constantValues {
	public static systemController system;
	public static String serverProcessId = "null_time"; 
	
	public static String distributeHandler(int mode, Variant w) {
		if (system == null) { 
			system = new systemController();
			serverProcessId = convertDateTimeToString();
		}
				
		switch (mode) {
			case WEB_HANDLER: 
				return system.webHandler(w);
			case MOBILE_HANDLER: 
				return system.mobileHandler(w);
			case IMAGE_HANDLER: 
				return system.imageHandler(w);
			case IMAGE_VHANDLER: 
				return system.imageVHandler(w);
			case IMAGE_SHANDLER: 
				return system.imageSHandler(w);
			case IMAGE_RHANDLER: 
				return system.imageRHandler(w);
		}
		
		return "";
	}
}
