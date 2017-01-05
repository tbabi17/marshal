package mxc.dental.erp;

import java.io.UnsupportedEncodingException;
import java.text.NumberFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import mxc.data.Collection;
import mxc.data.Variant;

import org.json.JSONArray;
import org.json.JSONObject;

public class toolController {			
	public static String[] monthName = {"Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"};
	public static int langid = 0;
		
	public int getInt(String value) {
		return Integer.parseInt(value.substring(1, value.length()));
	}
	
	public String getString(String value) {
		return value.substring(1, value.length());
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
	
	public static String beforeDay(String date) {        
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); 
        try {                   	
        	calendar.setTime(java.sql.Date.valueOf(date));
        	calendar.add(Calendar.DATE, -1);
            return dateFormat.format(calendar.getTime());            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return "";
    }
	
	public static String convertDateToString() {        
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); 
        try {           
            return dateFormat.format(calendar.getTime());            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return "";
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
	
	public static String convertTimeToString() {        
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat dateFormat = new SimpleDateFormat("HH:mm:ss"); 
        try {           
            return dateFormat.format(calendar.getTime());            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return "";
    }
	
	public static String getWeekDay(String date) {		
		date = date.replaceAll("/", "-");
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(java.sql.Date.valueOf(date));
		String[] weekdays = {"sun", "mon", "thue", "wed", "thur", "fri", "sat"};
		int weekday = calendar.get(Calendar.DAY_OF_WEEK);
		
		return weekdays[weekday-1];
	}		
	
	public static String today() {        
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd"); 
        try {           
            return dateFormat.format(calendar.getTime());            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return "";
    }
	
	public static String dayNumber() {        
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd"); 
        try {           
            return dateFormat.format(calendar.getTime());            
        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return "";
    }
	
	public Collection getCollection(String fields, String types, String json) {
		Collection collection = new Collection();
		String[] fd = fields.split(",");
        String[] tp = types.split(",");
        try {
            JSONObject outer = new JSONObject(json);
            if (outer != null) {
            	int count = outer.getInt("results");            	
                JSONArray inner = outer.getJSONArray("items");
                if (inner != null) {
	                for (int i = 0; i < count; i++) {
	                	Variant v = new Variant();	                	
	                	JSONObject item = inner.getJSONObject(i);	                	
	                	for (int j = 0; j < fd.length; j++) {	                		
	                		if (fd[j].indexOf("%20as%20") != -1)
	    						fd[j] = fd[j].substring(fd[j].lastIndexOf('0')+1, fd[j].length());		                		
	                		switch (tp[j].charAt(0)) {
	                			case 's': {		                				
	                				String aString = item.getString(fd[j]);
	                				if (aString == null) aString = "";	                				
	                				v.put(fd[j], aString);
	                			} break;
	                			case 'i': {		                			                				
	                				Integer aInt = item.getInt(fd[j]);	                				
	                				v.put(fd[j], aInt.toString());		                				
	                			} break;
	                			case 'f': {		                			                				
	                				Double aFloat = item.getDouble(fd[j]);	                				
	                				v.put(fd[j], aFloat.toString());		                				
	                			} break;
	                		}
	                	}		                	
	                	collection.addCollection(v);	
	                }
                }
            }
        } catch (Exception e) {        	
        	e.printStackTrace();        	
        	return new Collection();
        }
        
        return collection;
	}
	
	public static String convertCurrency(long value) {	
		double payment = value;		
		NumberFormat nf = NumberFormat.getCurrencyInstance();
		String st = nf.format(payment);
		return st.substring(1, st.length());			  
	}
	
	public static void main(String [] arg) {
		System.out.println(convertDateTimeToString());
	}
}
