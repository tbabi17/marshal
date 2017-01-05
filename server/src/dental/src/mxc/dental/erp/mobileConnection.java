package mxc.dental.erp;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;

import mxc.data.Collection;
import mxc.data.Variant;

public class mobileConnection extends httpConnection {	
	
	public mobileConnection(systemController th) {
		super(th);
	}
	
	public String jsonOrderData(String tableName, String fields, String where) {		
		if (tableName == null || fields == null) return "";
		
		if (fields.indexOf("requestCount") != -1) {									
			fields = fields.replaceAll("requestCount", "sum(case confirmedCount WHEN 0 THEN 1 ELSE 0 END * requestCount) as requestCount");
		}
		
		if (fields.indexOf("lastCount") != -1) {
			String userCode = where.substring(where.indexOf("userCode"), where.indexOf("userCode")+14);			
			fields = fields.replaceAll("lastCount", "(SELECT TOP 1 lastCount FROM Orders WHERE "+userCode+" and productCode=B.productCode and requestCount=0 and flag=0 ORDER BY id DESC) as lastCount");			
		}
		
		if (fields.indexOf("flagStatus") != -1) {
			String userCode = where.substring(where.indexOf("userCode"), where.indexOf("userCode")+14);			
			fields = fields.replaceAll("flagStatus", "(SELECT TOP 1 inCount FROM Orders WHERE "+userCode+" and productCode=B.productCode and requestCount=0 and flag>0 ORDER BY id DESC) as flagStatus");			
		}
		
		if (fields.indexOf("price") != -1)
			fields = fields.replaceAll("price", "(select top 1 [price] from Orders where customerCode=b.customerCode and productCode=b.productCode order by _date desc) as price");
				
		String data = "{'results':%, 'success': 'true', 'items':[";
		int count = 0;				
		String[] fds = fields.split(",");
		try {
			Connection con = shared.getConnection();
			PreparedStatement ps = con.prepareStatement("SELECT "+fields+" FROM "+tableName+where);
			System.out.println("SELECT "+fields+" FROM "+tableName+where);
			ResultSet rs = ps.executeQuery();
			ResultSetMetaData rsmd = rs.getMetaData();
			int column = rsmd.getColumnCount();			
			while (rs.next()) {		
				data += "{";
				for (int i = 0; i < column; i++) {				
					String type = rsmd.getColumnTypeName(i+1); 
					String comma = shared.commaType[(int)type.charAt(0)];
					if (fds[i].indexOf(" as ") != -1)
						fds[i] = fds[i].substring(fds[i].lastIndexOf(' ')+1, fds[i].length());
					String v = rs.getString(i+1);
					if (v == null) v="0";
					data += "'"+fds[i]+"':"+comma+v+comma+",";
				}
				data = data.substring(0, data.length() - 1);
				data += "},";
				count++;
			}
			if (count > 0)
				data = data.substring(0, data.length() - 1);
			rs.close();
			ps.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		data = data.replace("%", Integer.toString(count));
		data += "]}";		
		
		System.out.println(data);
		return data;
	}
	
	public String jsonData(String tableName, String fields, String where) {
		if (tableName == null || fields == null) return "";
		
		if (fields.indexOf("customerName") != -1)			
			fields = fields.replaceAll("customerName", shared.specialQuery.get("customerName"));					
		if (fields.indexOf("priceTag") != -1)
			fields = fields.replaceAll("priceTag", shared.specialQuery.get("priceTag"));
		if (fields.indexOf("parentID") != -1)
			fields = fields.replaceAll("parentID", shared.specialQuery.get("parentID"));		
		if (fields.indexOf("payed") != -1)
			fields = fields.replaceAll("payed", shared.specialQuery.get("payedLast"));
		if (fields.indexOf("lat") != -1)
			fields = fields.replaceAll("lat", shared.specialQuery.get("lat"));
		if (fields.indexOf("lng") != -1)
			fields = fields.replaceAll("lng", shared.specialQuery.get("lng"));
		
		if (fields.indexOf("daydate") != -1)
			fields = fields.replaceAll("daydate", shared.specialQuery.get("daydate"));
		
		if (fields.indexOf("dist") != -1)
			fields = fields.replaceAll("dist", "discount as dist");
		else
		if (fields.indexOf("discount") != -1)
			fields = fields.replaceAll("discount", shared.specialQuery.get("discount"));
		
		
		if (tableName.startsWith("Orders")) 
			return jsonOrderData(tableName, fields, where);				
						
				
		String data = "{'results':%, 'success': 'true', 'items':[";
		int count = 0;				
		String[] fds = fields.split(",");
		fields = fields.replaceAll(";", ",");
		
		try {
			Connection con = shared.getConnection();
			System.out.println("SELECT "+fields+" FROM "+tableName+where);
			PreparedStatement ps = con.prepareStatement("SELECT "+fields+" FROM "+tableName+where);		
			ResultSet rs = ps.executeQuery();
			ResultSetMetaData rsmd = rs.getMetaData();
			int column = rsmd.getColumnCount();			
			while (rs.next()) {		
				data += "{";
				for (int i = 0; i < column; i++) {				
					String type = rsmd.getColumnTypeName(i+1); 
					String comma = shared.commaType[(int)type.charAt(0)];
					if (fds[i].indexOf(" as ") != -1)
						fds[i] = fds[i].substring(fds[i].lastIndexOf(' ')+1, fds[i].length());
								
					data += "'"+fds[i]+"':"+comma+rs.getString(i+1)+comma+",";
				}
				data = data.substring(0, data.length() - 1);
				data += "},";
				count++;
			}
			if (count > 0)
				data = data.substring(0, data.length() - 1);
			rs.close();
			ps.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		data = data.replace("%", Integer.toString(count));
		data += "]}";		
		System.out.println(data);
		return data;
	}	
	
	public String jsonDataTouch(String tableName, String fields, String where) {
		if (tableName == null || fields == null) return "";								
				
		String data = "{\"results\":\"%\", \"items\":[";
		int count = 0;						
		String[] fds = fields.split(",");
		fields = shared.replaceQueries(fields);
		try {
			Connection con = shared.getConnection();			
			System.out.println("SELECT "+fields+" FROM "+tableName+where);
			PreparedStatement ps = con.prepareStatement("SELECT "+fields+" FROM "+tableName+where);						
			ResultSet rs = ps.executeQuery();
			ResultSetMetaData rsmd = rs.getMetaData();
			int column = rsmd.getColumnCount();			
			while (rs.next()) {		
				data += "{";
				for (int i = 0; i < column; i++) {				
					String type = rsmd.getColumnTypeName(i+1); 
					String comma = shared.commaType[(int)type.charAt(0)];
					if (comma.equals("'")) comma = "\"";
					if (fds[i].indexOf(" as ") != -1)
						fds[i] = fds[i].substring(fds[i].lastIndexOf(' ')+1, fds[i].length());
					data += "\""+fds[i]+"\":"+comma+rs.getString(i+1)+comma+",";
				}
				data = data.substring(0, data.length() - 1);
				data += "},";
				count++;
			}
			if (count > 0)
				data = data.substring(0, data.length() - 1);
			rs.close();
			ps.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}		
		data = data.replace("%", Integer.toString(count));
		data += "]}";		
		
		return data;
	}
	
	public int actionOrderData(String action, String tableName, String fields, String values, String where) {
		if (tableName == null || fields == null) return -1;
		
		try {
			Connection con = shared.getConnection();
			if (action.equals("insert")) {												
				String[] vls = values.split(",");				
				int[] indexes = {2, 3, 7};
				
				PreparedStatement ps = con.prepareStatement("SELECT TOP 1 lastCount FROM Orders WHERE (inCount<>0 or soldCount<>0) and userCode=? and productCode=? and flag=0 ORDER by id DESC");//
				ps.setString(1, vls[indexes[0]].substring(1, vls[indexes[0]].length()));
				ps.setString(2, vls[indexes[1]].substring(1, vls[indexes[1]].length()));
				ResultSet rs = ps.executeQuery();
				int lastCount = 0;
				if (rs.next()) {
					lastCount = rs.getInt(1);
				}
				
				ps = con.prepareStatement("INSERT INTO Orders (_date,userCode,productCode,soldCount,lastCount,flag) VALUES (CURRENT_TIMESTAMP,?,?,?,?,0)");				
				for (int i = 1; i <= 3; i++) 				
				{
					String value = vls[indexes[i-1]];
					char c = value.charAt(0);					
					value = value.substring(1, value.length());						
					switch (c) {
						case 'i': ps.setInt(i, Integer.parseInt(value)); break;
						case 'f': ps.setFloat(i, Float.parseFloat(value)); break;			
						case 'n': case 'v': case 's': ps.setString(i, toUTF8(value)); break;						
					}
				}
				ps.setInt(4, lastCount-Integer.parseInt(vls[7].substring(1, vls[7].length())));
				ps.executeUpdate();								
				ps.close();
			} 
		} catch (Exception ex) {
			ex.printStackTrace();
		}
					
		return 0;
	}
	
	public int actionOneSaleData(String fields, String values) {		
		try {
			Connection con = shared.getConnection();			
			String[] fds = fields.split(",");
			String[] vls = values.split(",");
			String params = "";							
			for (int i = 0; i < fds.length; i++)
				params+="?,";		
			params = params.substring(0, params.length()-1);
			PreparedStatement ps = con.prepareStatement("INSERT INTO Sales ("+fields+") VALUES ("+params+")");				
			for (int i = 1; i <= fds.length; i++) {
				String value = vls[i-1];
				char c = value.charAt(0);					
				value = value.substring(1, value.length());						
				switch (c) {
					case 'i': ps.setInt(i, Integer.parseInt(value)); break;
					case 'f': ps.setFloat(i, Float.parseFloat(value)); break;
					case 'd': {
						if (value.length() <= 10) value += " 00:00:00";
						ps.setTimestamp(i, java.sql.Timestamp.valueOf(value)); break;
					}
					case 'n': case 'v': case 's': ps.setString(i, toUTF8(value)); break;						
				}
			}
			ps.executeUpdate();								
			ps.close();			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
					
		return 0;
	}
	
	public int actionRentData(String date, String userCode, String customerCode, int parentID, String productCodes, float amount) {				
		float totalAmount = amount;
		try {									
			Connection con = shared.getConnection();			
			PreparedStatement ps = con.prepareStatement("SELECT id,flag,productCode,price,customerCode,userType FROM Sales WHERE userCode=? and discount=? and type=1 and flag>0 ORDER by _dateStamp");
			ps.setString(1, userCode);
			ps.setInt(2, parentID);
			ResultSet rs = ps.executeQuery();			
			while (rs.next()) {
					String productCode = rs.getString(3);
					float price = rs.getFloat(4);
					if (productCodes.equals("nul") || (productCodes.length() == 0 || productCodes.indexOf(productCode+":") != -1)) { // baigaa productsuudaas
						PreparedStatement ps1 = con.prepareStatement("UPDATE Sales SET flag=? WHERE type=1 and flag>0 and id=?");
						float t = rs.getFloat(2);
						float dec = Math.max(0, t-amount);
						ps1.setFloat(1, dec);						
						ps1.setInt(2, rs.getInt(1));
						ps1.executeUpdate();
						ps1.close();
						
						if (parentID < 100000) {//zeeliin borluulagchaas busad
							int quantity = (int)(Math.min(amount, rs.getFloat(2)) / price);
							if (date.endsWith("_TIMESTAMP")) date = convertDateTimeToString();
							int userType = rs.getInt(6);
							String values = "d"+date+",s"+customerCode+",s"+userCode+",s"+productCode+",i0,i0,i3,i"+quantity+",f"+price+",f"+(quantity*price)+",i"+parentID+",i"+userType;
							actionOneSaleData("_dateStamp,customerCode,userCode,productCode,posX,posY,type,quantity,price,amount,discount,userType", values);
						}
							
						amount = amount - t;						
						if (amount <= 0) break; 
					}
			}
			rs.close();
			ps.close();
			
			if (parentID >= 100000) {//zeeliinhen
				String values = "d"+convertDateTimeToString()+",s"+customerCode+",s"+userCode+",snul,i0,i0,i3,i0,f0,f"+totalAmount+",i"+parentID;
				actionOneSaleData("_dateStamp,customerCode,userCode,productCode,posX,posY,type,quantity,price,amount,discount", values);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
			return -1;
		}
		
		return 0;
	}
	
	public boolean checkRecord(String values) {
		boolean result = false;
		try {
			Connection con = shared.getConnection();
						
			String[] vls = values.split(",");
			int[] indexes = {1, 2, 3, 6, 7, 13};
			PreparedStatement ps = con.prepareStatement("SELECT * FROM Sales WHERE customerCode=? and userCode=? and productCode=? and type=? and quantity=? and (abs(DATEDIFF(second, current_timestamp, _dateStamp))<5 or ticketID=?)");//
			ps.setString(1, vls[indexes[0]].substring(1, vls[indexes[0]].length()));
			ps.setString(2, vls[indexes[1]].substring(1, vls[indexes[1]].length()));
			ps.setString(3, vls[indexes[2]].substring(1, vls[indexes[2]].length()));
			ps.setInt(4, Integer.parseInt(vls[indexes[3]].substring(1, vls[indexes[3]].length())));
			ps.setInt(5, Integer.parseInt(vls[indexes[4]].substring(1, vls[indexes[4]].length())));
			ps.setInt(6, Integer.parseInt(vls[indexes[5]].substring(1, vls[indexes[5]].length())));
			ResultSet rs = ps.executeQuery();		
			System.out.println("found row = "+rs.getRow());
			if (rs.next()) {
				result = true;
			}
			rs.close();
			ps.close();
		} catch (Exception ex) {
			result = false;			
		}
					
		return result;
	}
	
	public boolean checkRecordForOrder(String values) {
		boolean result = false;
		try {
			Connection con = shared.getConnection();
						
			String[] vls = values.split(",");
			int[] indexes = {1, 3, 4};
			PreparedStatement ps = con.prepareStatement("SELECT * FROM Orders WHERE userCode=? and productCode=? and requestCount=? and abs(DATEDIFF(second, current_timestamp, _date))<5");//			
			ps.setString(1, vls[indexes[0]].substring(1, vls[indexes[0]].length()));
			ps.setString(2, vls[indexes[1]].substring(1, vls[indexes[1]].length()));
			ps.setInt(3, Integer.parseInt(vls[indexes[2]].substring(1, vls[indexes[2]].length())));			
			ResultSet rs = ps.executeQuery();		
			System.out.println("found row = "+rs.getRow());
			if (rs.next()) {
				result = true;
			}
			rs.close();
			ps.close();
		} catch (Exception ex) {
			result = false;
		}
					
		return result;
	}
	
	public int actionData(String action, String tableName, String fields, String values, String where) {		
		if (tableName.equals("Sales")) {
			if (checkRecord(values)) { System.out.println("duplicated record"); return 0; }
			
			String[] vls = values.split(",");
			if (action.equals("rentpayment")) {				
				return actionRentData(getString(vls[0]), getString(vls[2]), getString(vls[1]), getInt(vls[10]), getString(vls[3]), Float.parseFloat(getString(vls[9])));				
			} else
				actionOrderData(action, tableName, fields, values, where); // Orderoos hasah			
		}
		if (tableName.equals("Orders")) {
			if (checkRecordForOrder(values)) { System.out.println("duplicated record for Orders"); return 0; }
		}
		
		if (tableName == null || fields == null) return -1;
				
		try {
			Connection con = shared.getConnection();
			if (action.equals("insert")) {
				String[] fds = fields.split(",");
				String[] vls = values.split(",");
				String params = "";							
				for (int i = 0; i < fds.length; i++)
					params+="?,";		
				params = params.substring(0, params.length()-1);
				PreparedStatement ps = con.prepareStatement("INSERT INTO "+tableName+" ("+fields+") VALUES ("+params+")");				
				for (int i = 1; i <= fds.length; i++) {
					String value = vls[i-1];
					char c = value.charAt(0);					
					value = value.substring(1, value.length());						
					switch (c) {
						case 'i': ps.setInt(i, Integer.parseInt(value)); break;
						case 'f': ps.setFloat(i, Float.parseFloat(value)); break;
						case 'd': {
							if (value.length() <= 10) value += " 00:00:00";
							ps.setTimestamp(i, java.sql.Timestamp.valueOf(value)); break;
						}
						case 'n': case 'v': case 's': ps.setString(i, toUTF8(value)); break;						
					}
				}
				ps.executeUpdate();								
				ps.close();
			} else 
			if (action.equals("update")) {				
				if (tableName.equals("current")) {
					String code = where.split("=")[1];
					System.out.println("INSERT INTO current (customerCode) VALUES ("+code+")");
					PreparedStatement ps = con.prepareStatement("INSERT INTO current (customerCode) VALUES ("+code+")");
					ps.executeUpdate();					
				}
				String params = "";
				String[] fds = fields.split(",");
				String[] vls = values.split(",");		
				for (int i = 0; i < fds.length; i++)
					params+=fds[i]+"=?,";		
				params = params.substring(0, params.length()-1);
				PreparedStatement ps = con.prepareStatement("UPDATE "+tableName+" SET "+params+" WHERE "+where);
				for (int i = 1; i <= fds.length; i++) {
					String value = vls[i-1];
					char c = value.charAt(0);
					value = value.substring(1, value.length());					
					switch (c) {
						case 'i': ps.setInt(i, Integer.parseInt(value)); break;
						case 'f': ps.setFloat(i, Float.parseFloat(value)); break;
						case 'd': {
								if (value.length() <= 10) value += " 00:00:00";
								ps.setTimestamp(i, java.sql.Timestamp.valueOf(value));
								break;
						}
						case 'n': case 'v': case 's': ps.setString(i, toUTF8(value)); break;
					}
				}
				if (ps.executeUpdate() == 0) {					
					ps.close();
					actionData("insert", tableName, fields, values, where);
				}
			} else
			if (action.equals("delete")) {
				PreparedStatement ps = con.prepareStatement("DELETE FROM "+tableName+" WHERE "+where);
				ps.executeUpdate();
				ps.close();
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
					
		return 0;
	}			
		
	public int actionPacketData(String action, String tableName, String fields, String values, String where) {		
		String[] vls = values.split(",");
		//code,quantity,userCode,customerCode,posX,posY
		int count = Integer.parseInt(vls[1].substring(1, vls[1].length()));
				
		fields = "_dateStamp,customerCode,userCode,productCode,posX,posY,type,quantity,price,amount";		
		for (int i = 0; i < count; i++) {			
			try {
				Connection con = shared.getConnection();
				PreparedStatement ps = con.prepareStatement("SELECT productCode,quantity,price,quantity*price FROM Packet WHERE code=?");
				ps.setString(1, getString(vls[0]));
				ResultSet rs = ps.executeQuery();
				while (rs.next()) {
					values = "d"+convertDateTimeToString()+","+vls[3]+","+vls[2]+",s"+rs.getString(1)+","+vls[4]+","+vls[5]+",i"+getString(vls[0])+",i"+rs.getInt(2)+",f"+rs.getFloat(3)+",f"+rs.getFloat(4);
					System.out.println(values);
					actionData(action, tableName, fields, values, where);
				}
				rs.close();
				ps.close();
			} catch (Exception ex) {
				ex.printStackTrace();
			}			
		}
		
		return 0;
	}		
	
	public String getTodayWorkInfo(String userCode, String routeID, String today, String weekday) {
		if (weekday.equals("mon")) weekday = "<b>Даваа</b>";
		if (weekday.equals("thue")) weekday = "<b>М�?гмар</b>";
		if (weekday.equals("wed")) weekday = "<b>Лхагва</b>";
		if (weekday.equals("thur")) weekday = "<b>Пүр�?в</b>";
		if (weekday.equals("fri")) weekday = "<b>Баа�?ан</b>";
		if (weekday.equals("sat")) weekday = "<b>Б�?мба</b>";
		if (weekday.equals("sun")) weekday = "<b>�?�?м</b>";
				
		String json = jsonData("Route", "routeName", " WHERE routeID='"+routeID+"'");		
		Collection c = getCollection("routeName", "s", json);		
		String str = "<br><br>Өнөөдөр "+(today==null?"":today)+" "+(weekday==null?"":weekday)+" гараг. Таны �?вах чигл�?л <b>"+
					 (c == null || c.size() == 0 ? "":c.elementAt(0).getString("routeName"))+"</b>.<br>";				
		return str;
	}
	
	public int getAverageSaleAmount(String code) {		
		Collection c = getDataCollector("select ticketID,sum(amount) as amount from Sales where customerCode='"+code+"' and ticketID is not null group by ticketID", "ticketID,amount", "i,i");
		int amount = 0;
		for (int i = 0; i < c.size(); i++) {
			Variant v = c.elementAt(i); 
			amount += (int)v.getInt("amount");
		}
		
		if (c.size() > 0)
			return amount/c.size();
		
		return 0;
	}		
}
