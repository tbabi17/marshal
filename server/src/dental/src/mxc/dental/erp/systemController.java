package mxc.dental.erp;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.PreparedStatement;
import java.util.Hashtable;

import mxc.cache.cacheManager;
import mxc.data.Collection;
import mxc.data.Variant;

public class systemController extends sharedProcedures {
	private httpConnection httpConn;
	private mobileConnection mobileConn;
	
	public cacheManager cacheMan;
	
	public systemController() {
		httpConn = new httpConnection(this);		
		mobileConn = new mobileConnection(this);
		cacheMan = new cacheManager(this);
	}					
	
	public String anyJSON(Variant w) {
		String tableName = w.get("table");
		String fd = w.get("fields");
		String where = w.get("where");
		String top = w.get("session");
		where = where.replace("!", "<");
		where = where.replace("@", ">");	
		where = where.replace('.', '%');
		if (where == null) where = "";
		String wh = where;
		if (where.endsWith(":")) {
			where = where.substring(1, where.length());
			String[] wise = where.split(",");
			if (wise[wise.length-1].equals("customer:")) {
				if (wise[0].length() == 0 || wise[0].equals("ndefined")) wise[0] = "0";
				if (wise[1].equals("undefined")) wise[1] = "80";
				if (wise[2].equals("undefined")) wise[2] = "0";
				if (wise[4].equals("undefined")) wise[4] = "";//firstName like N'%"+wise[5]+"%'
				String[] vs = wise[5].split(" ");
				if (vs.length > 1)
					where = " WHERE (DATEDIFF(yy, birthdate, CURRENT_TIMESTAMP)>="+wise[0]+" and DATEDIFF(yy, birthdate, CURRENT_TIMESTAMP)<= "+wise[1]+") and (gender="+wise[2]+" or "+wise[2]+"=0) and (country='"+wise[3]+"' or '"+wise[3]+"'='0') and (membershipCode='"+wise[4]+"' or '"+wise[4]+"'='0') and (code like '%"+wise[5].trim()+"%' or (firstName like N'%"+vs[0].trim()+"%' and lastName like N'%"+vs[1].trim()+"%') or phone like '%"+wise[5].trim()+"%' or phone1 like '%"+wise[5].trim()+"%' or phone2 like '%"+wise[5].trim()+"%')";
				else
					where = " WHERE (DATEDIFF(yy, birthdate, CURRENT_TIMESTAMP)>="+wise[0]+" and DATEDIFF(yy, birthdate, CURRENT_TIMESTAMP)<= "+wise[1]+") and (gender="+wise[2]+" or "+wise[2]+"=0) and (country='"+wise[3]+"' or '"+wise[3]+"'='0') and (membershipCode='"+wise[4]+"' or '"+wise[4]+"'='0') and (code like '%"+wise[5].trim()+"%' or firstName like N'%"+wise[5].trim()+"%' or phone like '%"+wise[5].trim()+"%' or phone1 like '%"+wise[5].trim()+"%' or phone2 like '%"+wise[5].trim()+"%')";
			}
		} else
		if (where.equals("active"))
			where = " WHERE DATEDIFF(mm, _date, CURRENT_TIMESTAMP) <= 1 and _date is not null";
		
		where = clinicWhere(w, where);
		if (tableName.equals("customers")) where += " order by _date desc";
		String result = httpConn.jsonData(tableName, fd, where, top);		
		cacheMan.saveCache(tableName+wh+top, result);		
		cacheMan.saveAlternateCache(tableName, result);
		
		return result;
	}		
	
	public String mobileHandler(Variant w) {
		if (w.get("func").equals("_order_list")) {
			String where = w.get("where");
			String[] wh = where.split(",");
			String date = wh[0];
			String query = "SELECT id,code,firstName+' '+lastName as fullname,medicationCode,startDate,endDate,_dateStamp,userCode,descr,status,doctorCode,completedDate,contactPhone,customer_id FROM orders as a WHERE DATEADD(dd, 0, DATEDIFF(dd, 0, startDate))='"+date+"'";
			if (wh.length == 2 && wh[1].equals("week"))
				query = "SELECT id,code,firstName+' '+lastName as fullname,medicationCode,startDate,endDate,_dateStamp,userCode,descr,status,doctorCode,completedDate,contactPhone,customer_id FROM orders as a WHERE DATEADD(dd, 0, DATEDIFF(dd, 0, startDate))>='"+date+"' and DATEADD(dd, 0, DATEDIFF(dd, 0, startDate))<=DATEADD(dd, 7, '"+date+"')";
			if (wh.length == 2 && wh[1].equals("month"))
				query = "SELECT id,code,firstName+' '+lastName as fullname,medicationCode,startDate,endDate,_dateStamp,userCode,descr,status,doctorCode,completedDate,contactPhone,customer_id FROM orders as a WHERE DATEADD(dd, 0, DATEDIFF(dd, 0, startDate))>='"+date+"' and DATEADD(dd, 0, DATEDIFF(dd, 0, startDate))<=DATEADD(dd, 30, '"+date+"')";
			
			//SELECT id,(select code from customers where orderID=a.id or customers.code=convert(varchar, a.descr)) as code,(select firstName+' '+lastName from customers where orderID=a.id or customers.code=convert(varchar, a.descr)) as fullname,medicationCode,startDate,endDate,_dateStamp,userCode,descr,status,doctorCode,completedDate,contactPhone FROM dental.dbo.orders as a WHERE DATEADD(dd, 0, DATEDIFF(dd, 0, startDate))='"+where+"'"
			Collection collect = httpConn.getDataCollector(query, "id,code,fullName,medicationCode,startDate,endDate,_dateStamp,userCode,descr,status,doctorCode,completedDate,contactPhone,customer_id", "i,s,s,s,s,s,s,s,s,i,s,s,s,i");
			String json = "[";
			for (int i = 0; i < collect.size(); i++) {
				Variant v = (Variant)collect.elementAt(i);													
				json += "{'start_date':'"+v.get("startDate")+"',";
				json += "'end_date':'"+v.get("endDate")+"',";
				json += "'id':'"+v.get("id")+"',";
				json += "'customer_id':'"+v.get("customer_id")+"',";
				json += "'fullName':'"+v.get("fullName")+"',";
				json += "'doctor_id':'"+v.get("doctorCode")+"',";
				json += "'medication_id':'"+v.get("medicationCode")+"',";
				json += "'contactPhone':'"+v.get("contactPhone")+"',";
				json += "'type':"+v.get("status")+",";							
				json += "'img':'<img src=../customers/images/men.jpg width=32 height=32></img>',";							
				json += "'text':'"+v.get("descr")+"'},";														
			}
			
			if (collect.size() > 0)
				json = json.substring(0, json.length() - 1);
			json = json.replace("'", "\"");
			json += "]";			
			return json;
		}
		
		return "";
	}
	
	public String clinicWhere(Variant w, String where) {
		String fields = w.getString("fields");
		if (fields.indexOf("clinicCode") == -1 || where.indexOf("clinicCode") != -1) return where;
		where = where.trim();
		if (where.equals("active")) where = "";
		if (where.length() > 2) where = where + " and clinicCode='"+w.getString("clinicCode")+"'";
		else where = " WHERE clinicCode='"+w.getString("clinicCode")+"'";
		return where;
	}
	
	public String imageHandler(Variant w) {
		httpConn.actionImageData(w.get("code"), w.get("clinicCode"), w.get("data"), w.get("table"));
		return "";
	}
	
	public String imageVHandler(Variant w) {
		return httpConn.getImageData(w.get("code"), w.get("table"));		
	}
	
	public String imageSHandler(Variant w) {
		return httpConn.getRentgenImageData(w.get("id"), w.get("field"), w.get("table"));		
	}
		
	public String imageRHandler(Variant w) {		
		httpConn.actionRentgenImageData(w.get("id"), w.get("clinicCode"), w.get("field"), w.get("data"), w.get("table"));
		return "";
	}
	
	public String webHandler(Variant w) {				
		String action = w.get("action");
		if (action.equals("WRITER")) {
			String func = w.get("func");
			String tableName = w.get("table");
			cacheMan.manageCache(tableName, action);			
			if (func.equals("form_action")) {
				String params = w.get("where");
				if (params != null) {									
					if (tableTypes == null || tableTypes.size() == 0) {
						getAllTablesParameters();						
					}					
					Hashtable<String, String> temp = (Hashtable<String, String>)tableTypes.get(tableName);
					
					if (temp != null) {

						String[] fv = params.split(";");			
						String fields = "", values = "";
						String where = "";
						int mod = 0;
						for (int i = 0; i < fv.length; i++) {
							String fd = fv[i].substring(0, fv[i].indexOf("="));
							if (fd.equals("id") || fd.toLowerCase().endsWith("id")) { 
								mod = i;
								break;
							}
						}
						
						for (int i = 0; i < fv.length; i++) {									
							String fd = fv[i].substring(0, fv[i].indexOf("="));							
							if (temp.get(fd) == null) { continue; }
							String tp = temp.get(fd).toString();
							
							if (i == mod) {
								where = fd + "=" + getComma(tp)+fv[i].substring(fv[i].indexOf("=")+1, fv[i].length())+getComma(tp); 
							} else {
								fields += fd+",";
								String v = fv[i].substring(fv[i].indexOf("=")+1, fv[i].length());
								if (tp.charAt(0) == 'i' && (v.equals("on") || v.equals("off"))) 
									v = v.equals("on")?"1":"0";
								
								v = v.replaceAll(",", ";");
								values += tp + v+",";
							}
						}				
						
						fields = fields.substring(0, fields.length() - 1);
						values = values.substring(0, values.length() - 1);						
						httpConn.actionData("update", tableName, fields, values, where);
						return "{\"items\":[]}";
					}
				}
			} else
			if (func.equals("_order_accept")) {				
				String[] wh = w.getString("where").split(",");
				String query = "SELECT productCode,sum(quantity) as quantity,userCode,(select top 1 userID from doctors where code=userCode) as userID from baskets WHERE clinicCode='"+w.getString("clinicCode")+"' and userCode='"+wh[0]+"' and flag=0 group by userCode,productCode";
				String fields = "productCode,quantity,userCode,userID";
				String types = "s,i,s,s";
				Collection collection = httpConn.getDataCollector(query, fields, types);							
				for (int i = 0; i < collection.size(); i++) {
					Variant q = (Variant)collection.elementAt(i);
					httpConn.actionProductData(q.getString("userID"), q.getString("productCode"), q.getFloat("quantity"));
					httpConn.actionData("update", "baskets", "flag", "i1", "productCode='"+q.getString("productCode")+"' and userCode='"+wh[0]+"' and flag=0");
				}
				
				return "{\"items\":[]}";				
			} else
			if (func.equals("_order_cancel")) {				
				String[] wh = w.getString("where").split(",");
				String query = "SELECT productCode,sum(quantity) as quantity,userCode,(select top 1 userID from doctors where code=userCode) as userID from baskets WHERE clinicCode='"+w.getString("clinicCode")+"' and userCode='"+wh[0]+"' and flag=0 group by userCode,productCode";
				String fields = "productCode,quantity,userCode,userID";
				String types = "s,i,s,s";
				Collection collection = httpConn.getDataCollector(query, fields, types);							
				for (int i = 0; i < collection.size(); i++) {
					Variant q = (Variant)collection.elementAt(i);
					httpConn.actionData("delete", "baskets", "", "", "productCode='"+q.getString("productCode")+"' and userCode='"+wh[0]+"' and flag=0");
				}
				return "{\"items\":[]}";				
			} else
			if (func.equals("_make_code")) {				
				httpConn.makeCode(w.get("where"));
				return "{\"items\":[]}";				
			} else
			if (func.equals("_update_settings")) {
				
				String where = w.get("where");
				String values = w.get("types");
				
				String[] wh = where.split(",");
				String[] vl = values.split(",");
				
				for (int i = 0; i < wh.length; i++) 
					httpConn.actionData("update", "settings", "value", vl[i], " name='"+wh[i]+"'");
			} else
			if (func.equals("_save_pic")) {
				String where = w.get("where");				
				byte[] btDataFile;
				try {
					btDataFile = new sun.misc.BASE64Decoder().decodeBuffer(where);				  
					File of = new File("c:/dental/images/files/yourFile.png");
					FileOutputStream osf = new FileOutputStream(of);  
					osf.write(btDataFile);
					osf.flush();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			} else
			{ //any update action							
				action = func;
				tableName = w.get("table");
				String fields = w.get("fields");
				String values = w.get("types");
				String where = w.get("where");
				values = values.replaceAll("CURRENT_TIMESTAMP", mobileConnection.convertDateTimeToString());
				int result = httpConn.actionData(action, tableName, fields, values, where);
				
				if (result == 0)
					return "{\"items\":[]}";
				else
					return "{\"status\":\"error\"}";
			}
		} else
		if (action.equals("SELECT")) {
			String func = w.get("func");
			String tableName = w.get("table");
			String where = w.get("where");
			System.out.println("start "+func+" "+System.currentTimeMillis());			
			
			String result = "";
				/*if (!func.startsWith("_") && (result = cacheMan.loadCache(tableName+where)).length() > 0) {
					System.out.println("cached");
					return result;																			
				}*/
			
				if (!func.startsWith("_")) {
					System.out.println("end "+func+" "+System.currentTimeMillis());
					return anyJSON(w);
				}
				
				if (result.length() > 0) 
					return result;
				else
				{	
					if (func.equals("_report_doctor_list")) {
						if (where.equals("0")) where = " WHERE 1=1 ";
						if (where.equals("1")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=DATEADD(dd, 0, DATEDIFF(dd, 0, CURRENT_TIMESTAMP))";
						if (where.equals("7")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=DATEADD(wk, DATEDIFF(wk, 6, CURRENT_TIMESTAMP), -7)";
						if (where.equals("30")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=convert(varchar, DATEADD(dd,-(DAY(CURRENT_TIMESTAMP)-1), CURRENT_TIMESTAMP), 111)";
						if (where.equals("120")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=convert(varchar, DATEADD(dd,-(DAY(CURRENT_TIMESTAMP)-1), CURRENT_TIMESTAMP), 111)";
						if (where.equals("365")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=DATEADD(yy, DATEDIFF(yy,0,getdate()), 0)";												
						
						Collection collect = httpConn.getDataCollector("SELECT doctorCode,count(code) as count,(select sum(price) from tooths where doctorCode=orders.doctorCode) as total,(select sum(price*discount/100) from tooths where doctorCode=orders.doctorCode) as discount,(select sum(payment) from tooths where doctorCode=orders.doctorCode) as payment FROM orders "+where+" and code is not null GROUP by doctorCode", "doctorCode,count,total,discount,payment", "s,i,f,f,f");
						String json = "{'items':[";
						for (int i = 0; i < collect.size(); i++) {
							Variant v = (Variant)collect.elementAt(i);													
							json += "{'count':"+v.get("count")+",";							
							json += "'total':"+v.get("total")+",";
							json += "'discount':"+v.get("discount")+",";
							json += "'payment':"+v.get("payment")+",";
							json += "'doctorCode':'"+v.get("doctorCode")+"'},";														
						}
						
						if (collect.size() > 0)
							json = json.substring(0, json.length() - 1);
						json = json.replace("'", "\"");
						json += "]}";	
												
						return json;
					} else
					if (func.equals("_report_customer_list")) {
						if (where.equals("0")) where = "";
						if (where.equals("1")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=DATEADD(dd, 0, DATEDIFF(dd, 0, CURRENT_TIMESTAMP))";
						if (where.equals("7")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=DATEADD(wk, DATEDIFF(wk, 6, CURRENT_TIMESTAMP), -7)";
						if (where.equals("30")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=convert(varchar, DATEADD(dd,-(DAY(CURRENT_TIMESTAMP)-1), CURRENT_TIMESTAMP), 111)";
						if (where.equals("120")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=convert(varchar, DATEADD(dd,-(DAY(CURRENT_TIMESTAMP)-1), CURRENT_TIMESTAMP), 111)";
						if (where.equals("365")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=DATEADD(yy, DATEDIFF(yy,0,getdate()), 0)";												
						if (where.length() > 0) where = where+" and status>0";
						else where = "WHERE status>0";
						Collection collect = httpConn.getDataCollector("SELECT TOP 150 lastName+' '+firstName as fullName,_dateStamp,(select sum(price) from tooths where orderID=orders.id) as total,(select sum(price*discount/100) from tooths where orderID=orders.id) as discount,(select sum(payment) from tooths where orderID=orders.id) as payment,paymentType,userCode,startDate,endDate,descr,isnull(isnull(code, (select top 1 code from customers where orderid=orders.id)),descr) as code,isnull((select top 1 datediff(year, birthdate, CURRENT_TIMESTAMP) from customers where orderid=orders.id or code=orders.code),0) as age,doctorCode,contactPhone,status,id,(select top 1 image from customers where code=orders.code or orderID=orders.id or code=convert(varchar,orders.descr)) as image FROM orders "+where+" and code is not null ORDER by startDate desc", "fullName,_dateStamp,total,discount,payment,paymentType,userCode,startDate,endDate,descr,code,age,doctorCode,contactPhone,status,id,image", "s,s,f,f,f,s,s,s,s,s,s,i,s,s,i,i,s");
						System.out.println(where);
						String json = "{'items':[";
						for (int i = 0; i < collect.size(); i++) {
							Variant v = (Variant)collect.elementAt(i);													
							json += "{'startDate':'"+v.get("startDate")+"',";
							json += "'endDate':'"+v.get("endDate")+"',";
							json += "'code':'"+(v.get("code").length() == 0 ? v.get("descr"):v.get("code"))+"',";
							json += "'fullName':'"+v.get("fullName")+"',";
							json += "'_dateStamp':'"+v.get("_dateStamp")+"',";
							json += "'age':"+v.get("age")+",";
							json += "'paymentType':'"+v.get("paymentType")+"',";
							json += "'total':"+v.get("total")+",";
							json += "'discount':"+v.get("discount")+",";	
							json += "'payment':"+v.get("payment")+",";							
							json += "'doctorCode':'"+v.get("doctorCode")+"',";
							json += "'contactPhone':'"+v.get("contactPhone")+"',";
							json += "'descr':'"+v.get("descr")+"',";
							json += "'status':"+v.get("status")+",";							
							json += "'image':'"+v.get("image")+"',";
							json += "'userCode':'"+v.get("userCode")+"',";
							json += "'id':"+v.get("id")+"},";														
						}
						
						if (collect.size() > 0)
							json = json.substring(0, json.length() - 1);
						json = json.replace("'", "\"");
						json += "]}";	
												
						return json;
					} else
					if (func.equals("_medication_list")) {						
						if (where.equals("0")) where = "";
						if (where.equals("1")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=DATEADD(dd, 0, DATEDIFF(dd, 0, CURRENT_TIMESTAMP))";
						if (where.equals("3")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=DATEADD(dd, DATEDIFF(dd, 0, CURRENT_TIMESTAMP), -3)";
						if (where.equals("7")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=DATEADD(wk, DATEDIFF(wk, 6, CURRENT_TIMESTAMP), -7)";
						if (where.equals("30")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=convert(varchar, DATEADD(dd,-(DAY(CURRENT_TIMESTAMP)-1), CURRENT_TIMESTAMP), 111)";
						if (where.equals("120")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=convert(varchar, DATEADD(dd,-(DAY(CURRENT_TIMESTAMP)-1), CURRENT_TIMESTAMP), 111)";
						if (where.equals("365")) where = " WHERE clinicCode='"+w.getString("clinicCode")+"' and startDate>=DATEADD(yy, DATEDIFF(yy,0,getdate()), 0)";												
						
						Collection collect = httpConn.getDataCollector("SELECT firstName+' '+lastName as fullName,startDate,endDate,descr,isnull(isnull(code, (select top 1 code from customers where orderid=orders.id)),descr) as code,isnull((select top 1 recareDelay*1000+cast(datediff(MINUTE, birthdate, CURRENT_TIMESTAMP) / (365.25 * 24 * 60) as int) from customers where (orderid=orders.id or code=orders.code) and _date is not null),0) as age,doctorCode,contactPhone,status,id,(select top 1 image from customers where code=orders.code or orderID=orders.id or code=convert(varchar,orders.descr)) as image FROM orders "+where+" ORDER by startDate", "fullName,startDate,endDate,descr,code,age,doctorCode,contactPhone,status,id,image", "s,s,s,s,s,i,s,s,i,i,s");						
						String json = "{'items':[";
						for (int i = 0; i < collect.size(); i++) {
							Variant v = (Variant)collect.elementAt(i);
							String fullName = v.get("fullName");
							String ag = v.get("age");
							int val = Integer.parseInt(ag);
							int age = val % 1000;
							int recare = val / 1000;					
							if (fullName.length() > 18)
								fullName = fullName.substring(0, 18)+"..";
							json += "{'startDate':'"+v.get("startDate")+"',";
							json += "'endDate':'"+v.get("endDate")+"',";
							json += "'code':'"+(v.get("code").length() == 0 ? v.get("descr"):v.get("code"))+"',";
							json += "'fullName':'"+fullName+"',";
							json += "'age':"+age+",";
							json += "'recare':"+recare+",";
							json += "'doctorCode':'"+v.get("doctorCode")+"',";
							json += "'contactPhone':'"+v.get("contactPhone")+"',";
							json += "'descr':'"+v.get("descr")+"',";
							json += "'status':"+v.get("status")+",";							
							json += "'image':'"+v.get("image")+"',";
							json += "'id':"+v.get("id")+"},";														
						}
						
						if (collect.size() > 0)
							json = json.substring(0, json.length() - 1);
						json = json.replace("'", "\"");
						json += "]}";	
												
						return json;
					} else
					if (func.equals("_order_list")) {
						httpConn.checkOrder();
						where = clinicWhere(w, where);
						Collection collect = httpConn.getDataCollector("SELECT id,(select code from customers where clinicCode='"+w.getString("clinicCode")+"' and orderID=a.id or customers.code=convert(varchar, a.descr)) as code,(select firstName+' '+lastName from customers where clinicCode='"+w.getString("clinicCode")+"' and orderID=a.id or customers.code=convert(varchar, a.descr)) as fullName,medicationCode,startDate,endDate,_dateStamp,userCode,descr,status,doctorCode,completedDate,contactPhone FROM orders as a"+where+" ORDER BY startDate", "id,code,fullName,medicationCode,startDate,endDate,_dateStamp,userCode,descr,status,doctorCode,completedDate,contactPhone", "i,s,s,s,s,s,s,s,s,i,s,s,s");
						//System.out.println("SELECT id,(select code from customers where clinicCode='"+w.getString("clinicCode")+"' and orderID=a.id or customers.code=convert(varchar, a.descr)) as code,(select firstName+' '+lastName from customers where clinicCode='"+w.getString("clinicCode")+"' and orderID=a.id or customers.code=convert(varchar, a.descr)) as fullName,medicationCode,startDate,endDate,_dateStamp,userCode,descr,status,doctorCode,completedDate,contactPhone FROM dental.dbo.orders as a"+where);
						String json = "[";
						for (int i = 0; i < collect.size(); i++) {
							Variant v = (Variant)collect.elementAt(i);													
							json += "{'start_date':'"+v.get("startDate")+"',";
							json += "'end_date':'"+v.get("endDate")+"',";
							json += "'id':'"+v.get("id")+"',";
							json += "'fullName':'"+v.get("fullName")+"',";
							json += "'doctor_id':'"+v.get("doctorCode")+"',";
							json += "'medication_id':'"+v.get("medicationCode")+"',";
							json += "'contactPhone':'"+v.get("contactPhone")+"',";
							json += "'type':'"+v.get("status")+"',";							
							json += "'img':'<img src=../customers/images/men.jpg width=32 height=32></img>',";							
							json += "'text':'"+v.get("descr")+"'},";														
						}
						
						if (collect.size() > 0)
							json = json.substring(0, json.length() - 1);
						json = json.replace("'", "\"");
						json += "]";				
						System.out.println("end "+func+" "+System.currentTimeMillis());
						return json;
					} else
					if (func.equals("_customer_tooth_list")) {	 		
						where = clinicWhere(w, where);
						Collection collect = httpConn.getDataCollector("SELECT medicationCode,doctorCode,max(_dateStamp) as _date,orderID,ud,direction,toothID,toothSide,service,newToothID FROM tooths where customerCode='"+where+"' and orderID in (select id from orders group by id) group by orderID, medicationCode, doctorCode, ud,direction,toothID,toothSide,service,newToothID order by orderID", "medicationCode,doctorCode,_date,orderID,ud,direction,toothID,toothSide,service,newToothID", "s,s,s,i,i,i,i,i,i,i");
						System.out.println("SELECT medicationCode,doctorCode,max(_dateStamp) as _date,orderID,ud,direction,toothID,toothSide,service,newToothID FROM tooths where customerCode='"+where+"' and orderID in (select id from orders group by id) group by orderID, medicationCode, doctorCode, ud,direction,toothID,toothSide,service,newToothID order by orderID");
						String json = "{'items':[";
						for (int i = 0; i < collect.size(); i++) {
							Variant v = (Variant)collect.elementAt(i);
							json += "{'id':0,";
							json += "'code':'"+where+"',";
							json += "'medicationCode':'"+v.get("medicationCode")+"',";
							json += "'ud':"+v.getInt("ud")+",";
							json += "'direction':"+v.getInt("direction")+",";
							json += "'toothID':"+v.getInt("toothID")+",";
							json += "'toothSide':"+v.getInt("toothSide")+",";
							json += "'service':"+v.getInt("service")+",";
							json += "'newToothID':"+v.getInt("newToothID")+",";
							json += "'doctorCode':'"+v.get("doctorCode")+"',";
							json += "'_date':'"+v.get("_date")+"',";
							String val = httpConn.getRentgenImageData(v.get("orderID"), "rentgen1", "orders");
							if (val != null && val.length() > 100) val = "Рентгэн зурагтай";
							else val = "";
							json += "'file':'"+val+"',";
							json += "'orderID':"+v.get("orderID")+"},";														
						}
						
						if (collect.size() > 0)
							json = json.substring(0, json.length() - 1);
						json = json.replace("'", "\"");
						json += "]}";						
						return json;
					} else
					if (func.equals("_customer_history_text")) {			
						where = clinicWhere(w, where);
						Collection collect = httpConn.getDataCollector("SELECT startDate,memo FROM orders where code='"+where+"' and memo is not null and DATALENGTH(memo)>5 order by startDate", "startDate,memo", "s,s");
						System.out.println("SELECT startDate,memo FROM orders where code='"+where+"' and memo is not null and DATALENGTH(memo)>5 order by startDate");
						String json = "{'items':[";
						String value = "";
						for (int i = 0; i < collect.size(); i++) {
							Variant v = (Variant)collect.elementAt(i);
							json += "{'startDate':'"+v.get("startDate")+"',";
							String memo = httpConn.fix(v.get("memo"), "memo");
							String code = where;
							json += "'code':'"+code+"','memo':'"+memo+"'},";
							
							value = v.get("start_date")+"\n\n"+v.get("memo");
						}
						
						if (collect.size() > 0)
							json = json.substring(0, json.length() - 1);
						json = json.replace("'", "\"");
						json += "]}";						
						return json;
					} else
					if (func.equals("_recare_customer_list")) {						
						Collection collect = httpConn.getDataCollector("select id,code, firstName, lastName, phone, image, DATEADD(dd, recareDelay, _date) as ddd from customers as b where recareDelay>1 and b.clinicCode='"+w.getString("clinicCode")+"' and DATEADD(dd, recareDelay, _date)>=GETDATE() ORDER BY ddd ASC", "id,code,firstName,lastName,phone,image,ddd", "i,s,s,s,s,s,s");
						System.out.println("ergej duudah owchton: select id,code, firstName, lastName, phone, image, DATEADD(dd, recareDelay, _date) as ddd from customers as b where recareDelay>1 and b.clinicCode='"+w.getString("clinicCode")+"' and DATEADD(dd, recareDelay, _date)>=GETDATE()");
						String json = "{'items':[";
						for (int i = 0; i < collect.size(); i++) {
							Variant v = (Variant)collect.elementAt(i);					
							String fullName = v.get("firstName")+" "+v.get("lastName");
							if (fullName.length() > 18)
								fullName = fullName.substring(0, 18)+"..";
							json += "{'id':"+v.getInt("id")+",'code':'"+v.get("code")+"',";
							json += "'fullName':'"+fullName+"',";
							json += "'phone':'"+v.get("phone")+"',";
							json += "'recare':'"+v.get("ddd").split(" ")[0]+"',";
							json += "'image':'"+v.get("image")+"'},";														
						}
						
						if (collect.size() > 0)
							json = json.substring(0, json.length() - 1);
						json = json.replace("'", "\"");
						json += "]}";						
						return json;
					} else
					if (func.equals("_last_customer_list")) {								
						Collection collect = httpConn.getDataCollector("select top 8 (select top 1 id from customers where code=customerCode) as id,customerCode as code, (select top 1 firstName+' '+lastName+','+phone+','+CONVERT(nvarchar(30), birthdate, 20) from customers where code=customerCode) as fullName, max(doctorCode) as doctorCode, MAX(_dateStamp) as _date  from tooths where clinicCode='"+w.getString("clinicCode")+"' group by customerCode order by max(_dateStamp) desc", "id,code,fullName,doctorCode,_date", "i,s,s,s,s");
						String json = "{'items':[";
						for (int i = 0; i < collect.size(); i++) {
							Variant v = (Variant)collect.elementAt(i);			
							String param = v.get("fullName");
							String[] p = param.split(",");
							String birthdate = "";
							String phone = "";
							if (p.length > 1) phone = p[1];
							if (p.length > 2) birthdate = p[2];
							String fullName = p[0];
							if (fullName.length() > 18)
								fullName = fullName.substring(0, 18)+"..";
							json += "{'id':"+v.get("id")+",'code':'"+v.get("code")+"','fullName':'"+fullName+"','birthdate':'"+birthdate+"','phone':'"+phone+"','doctorCode':'"+v.get("doctorCode")+"','_date':'"+v.get("_date")+"'},";
																					
						}
						
						if (collect.size() > 0)
							json = json.substring(0, json.length() - 1);
						json = json.replace("'", "\"");
						json += "]}";												
						return json;
					} else
					if (func.equals("_search_content")) {
						String[] wh = where.split(" ");
						Collection collect = new Collection();
						
						if (wh.length <= 1)
							collect = httpConn.getDataCollector("select top 8 id,code,'people' as type,firstName+','+lastName+','+isnull(phone,'') as data from customers where clinicCode='"+w.getString("clinicCode")+"' and code like '"+where+"%' or firstName like N'"+where+"%' or phone like '"+where+"%' or phone1 like '"+where+"%' or phone2 like '"+where+"%'" +
															    "union select top 5 id,code,'product' as type,'' as data from products where code like '%"+where+"%' or name like N'%"+where+"%' or company like N'%"+where+"%' "+
															    "union select top 5 id,code,case when area=2 then 'diagnostic' else 'medication' end as type,'' as data from medications where clinicCode='"+w.getString("clinicCode")+"' and code like '%"+where+"%' or name like N'%"+where+"%'"
																,"id,code,type,data", "i,s,s,s");
						else
							collect = httpConn.getDataCollector("select top 8 id,code,'people' as type,firstName+','+lastName+','+isnull(phone,'') as data from customers where clinicCode='"+w.getString("clinicCode")+"' and code like '"+wh[0]+"%' or (firstName like N'"+wh[0]+"%' and lastName like N'"+wh[1]+"%') or phone like '"+wh[0]+"%' or phone1 like '"+wh[0]+"%' or phone2 like '"+wh[0]+"%'" +
								    "union select top 5 id,code,'product' as type,'' as data from products where code like '%"+where+"%' or name like N'%"+where+"%' or company like N'%"+wh[0]+"%' "+
								    "union select top 5 id,code,case when area=2 then 'diagnostic' else 'medication' end as type,'' as data from medications where clinicCode='"+w.getString("clinicCode")+"' and code like '%"+wh[0]+"%' or name like N'%"+wh[0]+"%'"
									,"id,code,type,data", "i,s,s,s");
						
						String json = "{'items':[";
						for (int i = 0; i < collect.size(); i++) {
							Variant v = (Variant)collect.elementAt(i);													
							json += "{'id':"+v.getInt("id")+",'code':'"+v.get("code")+"','type':'"+v.get("type")+"','data':'"+v.get("data")+"'},";
						}
						
						if (collect.size() > 0)
							json = json.substring(0, json.length() - 1);
						json = json.replace("'", "\"");
						json += "]}";						
						return json;
					} else
					if (func.equals("_search_product")) {											
						Collection collect = httpConn.getDataCollector("select top 10 id,code,'product' as type from products where code like '%"+where+"%' or name like N'%"+where+"%' or company like N'%"+where+"%'", "id,code,type", "i,s,s");			
						String json = "{'items':[";
						for (int i = 0; i < collect.size(); i++) {
							Variant v = (Variant)collect.elementAt(i);													
							json += "{'id':"+v.getInt("id")+",'code':'"+v.get("code")+"','type':'"+v.get("type")+"'},";
						}
						
						if (collect.size() > 0)
							json = json.substring(0, json.length() - 1);
						json = json.replace("'", "\"");
						json += "]}";						
						return json;
					} else
					if (func.equals("_search_customer")) {											
						Collection collect = httpConn.getDataCollector("select top 10 code,'people' as type,firstName+','+lastName+','+phone as data from customers where clinicCode='"+w.getString("clinicCode")+"' and code like '%"+where+"%' or firstName like N'"+where+"%' or phone like '"+where+"%' ", "code,type,data", "s,s,s");			
						String json = "{'items':[";
						for (int i = 0; i < collect.size(); i++) {
							Variant v = (Variant)collect.elementAt(i);													
							json += "{'code':'"+v.get("code")+"','type':'"+v.get("type")+"','data':'"+v.get("data")+"'},";
						}
						
						if (collect.size() > 0)
							json = json.substring(0, json.length() - 1);
						json = json.replace("'", "\"");
						json += "]}";						
						return json;
					} else
					if (func.equals("_search_medication")) {
						String query = "select code,'medication' as type from medications where clinicCode='"+w.getString("clinicCode")+"' and area=1 and code like '%"+where+"%' or name like N'%"+where+"%' order by area";
						if (where == null || where.trim().length() == 0)
							query = "select code,'medication' as type from medications where clinicCode='"+w.getString("clinicCode")+"' and area=1 order by area";
						Collection collect = httpConn.getDataCollector(query, "code,type", "s,s");			
						String json = "{'items':[";
						for (int i = 0; i < collect.size(); i++) {
							Variant v = (Variant)collect.elementAt(i);				
							json += "{'code':'"+v.get("code")+"','type':'"+v.get("type")+"'},";
						}
						
						if (collect.size() > 0)
							json = json.substring(0, json.length() - 1);
						json = json.replace("'", "\"");
						json += "]}";
						return json;
					} else
					if (func.equals("_search_onosh")) {
						String query = "select code,'diagnostic' as type from medications where clinicCode='"+w.getString("clinicCode")+"' and area=2 and code like '%"+where+"%' or name like N'%"+where+"%' order by area";
						if (where == null || where.trim().length() == 0)
							query = "select code,'diagnostic' as type from medications where clinicCode='"+w.getString("clinicCode")+"' and area=2 order by area";
						Collection collect = httpConn.getDataCollector(query, "code,type", "s,s");			
						String json = "{'items':[";
						for (int i = 0; i < collect.size(); i++) {
							Variant v = (Variant)collect.elementAt(i);				
							json += "{'code':'"+v.get("code")+"','type':'"+v.get("type")+"'},";
						}
						
						if (collect.size() > 0)
							json = json.substring(0, json.length() - 1);
						json = json.replace("'", "\"");
						json += "]}";
						return json;
					} else
					if (func.equals("_un_customer_list")) {
						String query = "SELECT id,contactPhone,_dateStamp,descr,startDate,endDate from ORDERS WHERE clinicCode='"+w.getString("clinicCode")+"' and id not in (select isnull(orderID,0) from customers) and convert(varchar, descr) not in (select code from customers)";
						String fields = "id,contactPhone,_dateStamp,descr,startDate,endDate";
						String types = "i,s,s,s,s,s";
						String json = httpConn.getDataCollectorByJson(query, fields, types);							
												
						return json;
					} else
					if (func.equals("_basket_list")) {
						String[] wh = w.getString("where").split(",");
						String query = "SELECT productCode,(select top 1 name from products where code=productCode) as name, sum(quantity) as quantity from baskets WHERE clinicCode='"+w.getString("clinicCode")+"' and userCode='"+wh[0]+"' and flag=0 group by productCode";
						String fields = "productCode,name,quantity";
						String types = "s,s,i";
						String json = httpConn.getDataCollectorByJson(query, fields, types);													
						return json;
					} else					
					if (func.equals("_check_auth") || func.equals("_check_auth_after")) {						
						String[] wh = w.get("where").split(",");
						String query = "SELECT code as userCode,firstName,lastName,clinicCode,jobStatus as _group,userID from doctors WHERE code='"+wh[0]+"'"+
									   (func.equals("_check_auth")?" and password='"+wh[1]+"'":"");
						
						String fields = "userCode,firstName,lastName,clinicCode,_group,userID";
						String types = "s,s,s,s,i,s";
						 
						String json = httpConn.getDataCollectorByJson(query, fields, types);			
						System.out.println("end "+func+" "+System.currentTimeMillis());
						return json;
					} else
					if (func.equals("_notify_counts")) {						
						String query = "SELECT (select count(flag) from messages where clinicCode='"+w.getString("clinicCode")+"' and flag=1) as mc, (select count(status) from orders where clinicCode='"+w.getString("clinicCode")+"' and status=0) as oc, (SELECT COUNT(*) from ORDERS WHERE clinicCode='"+w.getString("clinicCode")+"' and id not in (select isnull(orderID,0) from customers where clinicCode='"+w.getString("clinicCode")+"') and convert(varchar, descr) not in (select code from customers where clinicCode='"+w.getString("clinicCode")+"')) as uc";									   
						String fields = "mc,oc,uc";
						String types = "i,i,i";
						 
						String json = httpConn.getDataCollectorByJson(query, fields, types);											
						return json;
					} else
					if (func.equals("_module_list")) {																		  															 
						String fields = "module,fields,tableName,types,caption,folder,keyz,insertAction,tmpl,list,wtmpl,topRows,imaged";												 
						String json = httpConn.jsonData("schemas", fields, "", "");						
						return json;
					} else					
					if (func.equals("_config_list")) {																		  															 
						String fields = "name,value";
						String json = httpConn.jsonData("configs", fields, "", "");						
						return json;
					} else					
					if (func.equals("_padaan_list")) {						
						String json = httpConn.padaanList(w.getString("where"));						
						return json;
					}
				}
			}		
		
		return "";
	}		
}
