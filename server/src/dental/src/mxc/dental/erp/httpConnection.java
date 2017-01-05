package mxc.dental.erp;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.util.Random;

import mxc.data.Collection;
import mxc.data.Variant;

public class httpConnection extends toolController {
	systemController shared;		
	public httpConnection(systemController th) {
		shared = th;
		shared.initConnection();
	}
	
	public String jsonData(String query, String fields) {						
		String[] fds = fields.split(",");				
		String data = "{'items':[";				
		int count = 0;						
		try {						
			Connection con = shared.getConnection();
			PreparedStatement ps = con.prepareStatement(query);			
			ResultSet rs = ps.executeQuery();
			ResultSetMetaData rsmd = rs.getMetaData();
			int column = rsmd.getColumnCount();
			for (int i = 0; i < fds.length; i++) {			
				if (fds[i].indexOf(" as ") != -1) {
					fds[i] = fds[i].substring(fds[i].lastIndexOf(" as ")+4, fds[i].length());				
				}
			}
			
			while (rs.next()) {				
				data += "{";
				for (int i = 0; i < column; i++) {
					String type = rsmd.getColumnTypeName(i+1);
					String comma = shared.commaType[(int)type.charAt(0)];			
					if (comma == null) comma = "'";
					String value = rs.getString(i+1);
					if (value == null || value.equals("undefined")) {
						if (comma.length() == 0) value = "0";
						else value = "";
					}									
					value = fix(value, fds[i]);
					data += "'"+fds[i]+"':"+comma+value+comma+",";
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
		//data = data.replace("%", Integer.toString(count));
		data = data.replace("'", "\"");
		data += "]}";		
				
		return data;
	}
	
	public String fix(String val, String field) {
		boolean orson = false;
		if (field.equals("memo")) {
			String v = "";
			for (int i = 0; i < val.length(); i++) {
				char c = val.charAt(i);
				int d = (int)c;
				if (d == 10) continue;
				if ((c == '\n' || c == '\r' || d == 10 || d == 13) && !orson) {
					orson = true;
					v += "$";
				}
				else
				if (c != '\'' && c != '"') {
					v += c;
					orson = false;
				}
			}
						
			return v;
		}		
		
		return val;
	}
	
	public String jsonData(String tableName, String fields, String where, String top) {
		if (tableName == null || fields == null) return "";			
		String fs = fields;
		fields = shared.replaceQueries(fields);				
		return jsonData("SELECT "+top+" "+fields+" FROM "+tableName+" "+where, fs);
	}
	
	public void actionImageData(String code, String ccode, String data, String table) {
		try {
			Connection con = shared.getConnection();									
			PreparedStatement ps = con.prepareStatement("UPDATE "+table+" SET image=? where code=? and clinicCode=?");				
			ps.setString(1, data);
			ps.setString(2, code);
			ps.setString(3, ccode);
			ps.executeUpdate();								
			ps.close();										
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void actionRentgenImageData(String code, String ccode, String field, String data, String table) {
		//data = fix(data, field);
		System.out.println(data);
		try {
			Connection con = shared.getConnection();									
			PreparedStatement ps = con.prepareStatement("UPDATE "+table+" SET "+field+"=? where id=? and clinicCode=?");				
			ps.setString(1, data);
			ps.setInt(2, Integer.parseInt(code));
			ps.setString(3, ccode);
			ps.executeUpdate();								
			ps.close();										
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void actionProductData(String field, String productCode, float total) {
		try {
			Connection con = shared.getConnection();		
			String query = "UPDATE products SET user1=user1-?,"+field+"="+field+"+? WHERE code=?";
			if (field.equals("user1")) 
				query = "UPDATE products SET total=total-?,"+field+"="+field+"+? WHERE code=?";
			PreparedStatement ps = con.prepareStatement(query);
			ps.setFloat(1, total);
			ps.setFloat(2, total);
			ps.setString(3, productCode);
			ps.executeUpdate();								
			ps.close();										
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
		
	public String getImageData(String code, String table) {
		String result = "";
		try {
			Connection con = shared.getConnection();									
			PreparedStatement ps = con.prepareStatement("SELECT image FROM "+table+" where code=?");							
			ps.setString(1, code);
			ResultSet rs = ps.executeQuery();
			if (rs.next())
				result = rs.getString(1);
			rs.close();
			ps.close();										
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	public String getRentgenImageData(String code, String field, String table) {
		String result = "";
		try {
			Connection con = shared.getConnection();									
			PreparedStatement ps = con.prepareStatement("SELECT "+field+" FROM "+table+" where id=?");							
			ps.setInt(1, Integer.parseInt(code));
			ResultSet rs = ps.executeQuery();
			if (rs.next())
				result = rs.getString(1);
			rs.close();
			ps.close();										
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return result;
	}
	
	public int actionData(String action, String tableName, String fields, String values, String where) {
		if (tableName == null || fields == null) return -1;
		
		try {
			Connection con = shared.getConnection();
			if (action.equals("insert")) {				
				String code = "";
				String params = "";				
				int index = 0;
				if (tableName.toLowerCase().equals("customers")) {
					fields = fields.replaceAll("id,", "");
					values = values.substring(3, values.length());				
				}
				String[] fds = fields.split(",");				
				String[] vls = values.split(",");									
				for (int i = index; i < fds.length; i++) {					
					params+="?,";
					
					if (fds[i].equals("code")) {
						code = vls[i];
						if (code.startsWith("s"))
							code = code.substring(1, code.length());						
					}
				}				
				
				if (tableName.toLowerCase().equals("customers") && checkCustomerCode(code)) 
					return 0;
				
				params = params.substring(0, params.length()-1);
				PreparedStatement ps = con.prepareStatement("INSERT INTO "+tableName+" ("+fields+") VALUES ("+params+")");				
				for (int i = 1+index; i <= fds.length; i++) {
					String value = vls[i-1];
					if (value.equals("fundefined")) value = "f0";
					char c = value.charAt(0);					
					value = value.substring(1, value.length());
					value = value.replaceAll(";", ",");
					if (fds[i - 1].equals("code") || (fds[i-1].equals("descr") && tableName.equals("orders"))) code = value;
					switch (c) {
						case 'i': ps.setInt(i, Integer.parseInt(value)); break;
						case 'f': ps.setFloat(i, Float.parseFloat(value)); break;
						case 'd': {
							value = value.trim();
							if (value.length() <= 10) value += " 00:00:00";							
							ps.setTimestamp(i, java.sql.Timestamp.valueOf(value)); break;
						}
						case 'n': case 'v': case 's': ps.setString(i, (value)); break;						
					}
				}
				int r = ps.executeUpdate();						
				ps.close();											
				if (code.length() > 0) {					
					ps = con.prepareStatement("UPDATE customers SET _date=CURRENT_TIMESTAMP WHERE code='"+code+"'");
					ps.executeUpdate();
					ps.close();
				}
				
				if (r > 0 && tableName.toLowerCase().equals("customers"))
					incCode();
			} else 			
			if (action.equals("update")) {
				System.out.println(tableName);
				if (tableName.equals("currents")) {
					try {
						String code = where.split("=")[1];
						System.out.println("INSERT INTO currents (customerCode) VALUES ("+code+")");
						PreparedStatement ps = con.prepareStatement("INSERT INTO currents (customerCode) VALUES ("+code+")");
						ps.executeUpdate();
					} catch (Exception ex) {
						
					}
				}
				
				String params = "";
				String[] fds = fields.split(",");
				String[] vls = values.split(",");		
				for (int i = 0; i < fds.length; i++) {
					params+=fds[i]+"=?,";
					if (vls[i].equals(".") && fds[i].equals("orderID") && tableName.equals("customers"))
						vls[i] = "i0";
					if (vls[i].equals("fundefined")) 
						vls[i] = "f0";										
				}
				params = params.substring(0, params.length()-1);																
				PreparedStatement ps = con.prepareStatement("UPDATE "+tableName+" SET "+params+" WHERE "+where);				
				for (int i = 1; i <= fds.length; i++) {						
					String value = vls[i-1];
					char c = value.charAt(0);
					value = value.substring(1, value.length());					
					System.out.println(c+" "+value);
					switch (c) {
						case 'i': ps.setInt(i, Integer.parseInt(value)); break;
						case 'f': ps.setFloat(i, Float.parseFloat(value)); break;
						case 'd': {
								if (value.length() <= 10) value += " 00:00:00";
								ps.setTimestamp(i, java.sql.Timestamp.valueOf(value));
								break;
						}
						case 'n': case 'v': case 's': ps.setString(i, (value)); break;
					}
				}				

				if (ps.executeUpdate() == 0) {					
					ps.close();
					actionData("insert", tableName, fields, values, where);
				}
			} else
			if (action.equals("delete")) {		
				where = where.replaceAll(":", "=");				
				PreparedStatement ps = con.prepareStatement("DELETE FROM "+tableName+" WHERE "+where);				
				ps.executeUpdate();
				ps.close();			
				
				if (tableName.equals("orders")) 
					deleteOrderHistory(where);
			}
			
			if (tableName.equals("tooths")) {				
				PreparedStatement ps = con.prepareStatement("update customers set balance=(select isnull(SUM(amount-(amount*discount/100)-abs(payment)),0) from tooths where customerCode=code and orderId in (select id from orders))");
				ps.executeUpdate();
				ps.close();				
			}
			
			checkOrder();
		} catch (Exception ex) {
			ex.printStackTrace();
			return -1;
		}
					
		return 0;
	}		
	
	public void deleteOrderHistory(String where) {		
		try {
			String[] wh = where.split("=");
			if (Integer.parseInt(wh[0]) > 0) {
				Connection con = shared.getConnection();
				String query = "delete from tooths where orderID="+wh[1]+" and orderID in (select id from orders where status=0)";
				PreparedStatement ps = con.prepareStatement(query);
				ps.executeUpdate();
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void makeCode(String where) {		
		try {
			String[] wh = where.split(",");
			String query = "update customers set code=(select cast(value as varchar(10)) from settings where name='code_index') where id="+wh[0];
			Connection con = shared.getConnection();
			PreparedStatement ps = con.prepareStatement(query);
			ps.executeUpdate();
			
			query = "update orders set code=(select cast(value as varchar(10)) from settings where name='code_index') where customer_id="+wh[0];
			ps = con.prepareStatement(query);
			ps.executeUpdate();
			
			query = "update tooths set customerCode=(select cast(value as varchar(10)) from settings where name='code_index') where customerCode='"+wh[1]+"'";
			ps = con.prepareStatement(query);
			ps.executeUpdate();
			
			String code = getCode();
			if (code.length() > 0) {
				query = "update orders set descr='"+code+"' where descr='"+wh[1]+"'";
				ps = con.prepareStatement(query);
				ps.executeUpdate();
				ps.close();
			}
			
			incCode();			
			checkOrder();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public String getCode() {
		String code = "";
		try {						
			Connection con = shared.getConnection();			
			String query = "select value from settings where name='code_index'";
			PreparedStatement ps = con.prepareStatement(query);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				code = rs.getInt(1)+"";
			}
						
			ps.close();						
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		return code;
	}
	
	public boolean checkCustomerCode(String code) {
		boolean b = false;
		try {						
			Connection con = shared.getConnection();			
			String query = "select code from customers where code='"+code+"'";
			PreparedStatement ps = con.prepareStatement(query);
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				b = true;
			}
						
			ps.close();						
		} catch (Exception ex) {
			ex.printStackTrace();
		}
		
		return b;
	}
	
	public void incCode() {
		try {						
			Connection con = shared.getConnection();			
			String query = "update settings set value=value+1 where name='code_index'";
			PreparedStatement ps = con.prepareStatement(query);
			ps.executeUpdate();
						
			ps.close();						
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void checkOrder() {
		try {
			Connection con = shared.getConnection();
			PreparedStatement ps = con.prepareStatement("update orders set customer_id=(select top 1 id from customers where orderID=orders.id),code=(select top 1 code from customers where orderID=orders.id),firstName=(select top 1 firstName from customers where orderID=orders.id),lastName=(select top 1 lastName from customers where orderID=orders.id) where code is null or len(code)=0");
			ps.executeUpdate();
			ps.close();
			
			ps = con.prepareStatement("update orders set customer_id=(select top 1 id from customers where code=cast(orders.descr as varchar(20))),code=(select top 1 code from customers where code=cast(orders.descr as varchar(20))),firstName=(select top 1 firstName from customers where code=cast(orders.descr as varchar(20))),lastName=(select top 1 lastName from customers where code=cast(orders.descr as varchar(20))) where code is null or len(code)=0");
			ps.executeUpdate();
			ps.close();			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public String padaanList(String orderID) {		
		String data = "<table style=\"width: 93%;\">"+
						"<tr>"+
							"<td colspan=\"4\">МАРШАЛ Дентал Клиник</td>"+
						"</tr>"+
						"<tr>"+
							"<td colspan=\"1\">Өвчтин</td>"+
							"<td colspan=\"3\">%customer</td>"+
						"</tr>"+
						"<tr>"+
							"<td colspan=\"1\">Огноо</td>"+
							"<td colspan=\"3\">%date</td>"+
						"</tr>"+
						"<tr>" +
							"<td colspan=\"4\"></br></td>" +
						"</tr>"+
						"<tr>"+							
							"<td style=\"width: 50%;\">Үйлчилгээ</td>"+
							"<td style=\"width: 7%; text-align: right;\">Тоо</td>"+
							"<td style=\"width: 15%; text-align: right;\">Үнэ</td>"+	
							"<td style=\"width: 20%; text-align: right;\">Нийт  </td>"+
						"</tr>";						
		try {			
			//checkOrder();
			Connection con = shared.getConnection();			
			PreparedStatement ps = con.prepareStatement("select customerCode,(select top 1 firstName+' '+lastName from customers where code=customerCode) as customerName,(select max(startDate) from orders where orders.id="+orderID+") as _date,(select top 1 firstName+' '+lastName from doctors where code=doctorCode) as doctor,(select top 1 name from medications where code=medicationCode) as medication,sum(qty) as qty,price,sum(amount) as amount,discount,sum(payment) as payment FROM tooths where orderID="+orderID+" group by customerCode,doctorCode,medicationCode,price,discount");						
			ResultSet rs = ps.executeQuery();						
			int count = 1;
			double total = 0, discount = 0, payment = 0;
			while (rs.next()) {
				String customer = rs.getString(1);
				String customerName = rs.getString(2);				
				String _date = rs.getString(3);
				String doctor = rs.getString(4);
				data = data.replaceAll("%customer", customerName);				
				data = data.replaceAll("%card", customer);
				data = data.replaceAll("%date", _date);
				data = data.replaceAll("%doctor", doctor);
				double amount = rs.getFloat("amount");
				String medication = rs.getString(5);
				data += "<tr>"+							
							"<td style=\"width: 55%;\">"+count+"."+medication.substring(0, Math.min(medication.length(), 24))+".."+"</td>"+
							"<td style=\"width: 10%; text-align: right;\">"+rs.getFloat("qty")+"</td>"+
							"<td style=\"width: 15%; text-align: right;\">"+rs.getFloat("price")+"</td>"+	
							"<td style=\"width: 20%; text-align: right;\">"+amount+"  </td>"+
						"</tr>";	
				total += amount;
				discount += (amount * rs.getFloat(9) / 100);
				payment += rs.getFloat(10);
				count++;
			}
			
			data += "<tr>"+
						"<td colspan=\"4\"></br></td>"+
					"</tr>"+
					"<tr>"+
						"<td colspan=\"3\" style=\"text-align: right;\">Дүн</td>"+
						"<td style=\"text-align: right;\">"+Math.round(total)+"  </td>"+
					"</tr>";
			
			if (discount != 0) 
				data += "<tr>"+
					"<td colspan=\"3\" style=\"text-align: right;\">Хөнгөлөлт</td>"+
					"<td style=\"text-align: right;\">"+Math.round(discount)+"  </td>"+
				"</tr>";
			
			data +=
					"<tr>"+
						"<td colspan=\"3\" style=\"text-align: right;\">Төлөх</td>"+
						"<td style=\"text-align: right;\">"+Math.round(total-discount)+"  </td>"+
					"</tr>"+
					"<tr>"+
						"<td colspan=\"3\" style=\"text-align: right;\">Төлсөн</td>"+
						"<td style=\"text-align: right;\">"+payment+"  </td>"+
					"</tr>";
			
			if (total - discount - payment != 0) 
					data += "<tr>"+
						"<td colspan=\"3\" style=\"text-align: right;\">Үлдэгдэл</td>"+
						"<td style=\"text-align: right;\">"+Math.round(total-discount-payment)+"  </td>"+
					"</tr>";
			
			data += "</table>";
			rs.close();
			ps.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}						
		
		return "{\"items\":[{\"xml\":\""+data.replaceAll("\"", "'")+"\"}]}";		
	}
	
	public Collection getDataCollector(String query, String fields, String types) {		
		Collection collect = new Collection();
		try {			
			//checkOrder();
			Connection con = shared.getConnection();
			PreparedStatement ps = con.prepareStatement(query);						
			ResultSet rs = ps.executeQuery();						
			String [] fd = fields.split(",");
			String [] tp = types.split(",");
			while (rs.next()) {
				Variant v = new Variant();
				for (int i = 0; i < fd.length; i++) {
					switch (tp[i].charAt(0)) {
						case 's':
								 v.put(fd[i], rs.getString(fd[i]));
								 break;
						case 'i':
							 	 v.put(fd[i], ""+rs.getLong(fd[i]));
							 	 break;
						case 'f':
						 	 	 v.put(fd[i], ""+rs.getFloat(fd[i]));
						 	 	 break;	 	 
					}
				}
				collect.addCollection(v);
			}
			
			rs.close();
			ps.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}						
		
		return collect;
	}
	
	public String getDataCollectorByJson(String query, String fields, String types) {		
		Collection collection = getDataCollector(query, fields, types);
		
		String data = "{'items':[";
		String[] fd = fields.split(",");
		String[] tp = types.split(",");
		for (int j = 0; j < collection.size(); j++) {
			Variant v = (Variant)collection.elementAt(j);
			data += "{";
			for (int i = 0; i < fd.length; i++) {
				switch (tp[i].charAt(0)) {
					case 's': data += "'" + fd[i] +"':'" + v.get(fd[i]) + "',";  break;
					case 'i': data += "'" + fd[i] +"':" + v.getInt(fd[i]) + ",";  break;
					case 'f': data += "'" + fd[i] +"':" + v.getFloat(fd[i]) + ",";  break;
					case 'b': data += "'" + fd[i] +"':" + (v.getInt(fd[i])>0) + ",";  break;
				}
			}
			
			data = data.substring(0, data.length() - 1);
			data += "},";
		}
		if (collection.size() > 0)
			data = data.substring(0, data.length() - 1);
		data = data.replace("'", "\"");
		data += "]}";						
				
		return data;
	}	
	
	public String jsonTableInfo(String where) {
		String query = "SELECT o.name, ep.value AS descr, c.name AS fname, c.colid AS ordinal, c.xtype AS type, c.length FROM sys.objects o "+ 
					   "INNER JOIN sys.extended_properties ep ON o.object_id = ep.major_id INNER JOIN sys.schemas s ON o.schema_id = s.schema_id LEFT JOIN syscolumns c ON ep.minor_id = c.colid AND ep.major_id = c.id WHERE o.type IN ('V', 'U', 'P') and ep.value<>''"+
					   " ORDER BY o.Name,ordinal";
		
		return jsonData(query, "name,descr,fname,ordinal,type,length");
	}	
}
