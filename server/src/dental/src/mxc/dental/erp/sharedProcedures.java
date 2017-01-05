package mxc.dental.erp;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Hashtable;

import mxc.data.Variant;

public class sharedProcedures extends toolController {
	public sqlRoute sql;
	public String[] commaType; 	
	public Hashtable<String, Hashtable<String, String>> tableTypes;
	public Hashtable<String, String> specialQuery = new Hashtable<String, String>();;
	public String[][] language;
	
	public sharedProcedures() {
		initConnection();
	}
	
	public void initConnection() {
		specialQuery = new Hashtable<String, String>();
		specialQuery.put("customerName", "(SELECT TOP 1 name+'|'+location from Customer WHERE Customer.code=customerCode) as customerName");
		specialQuery.put("lat", "(SELECT TOP 1 posx from Customer WHERE Customer.code=customerCode) as lat");
		specialQuery.put("lng", "(SELECT TOP 1 posy from Customer WHERE Customer.code=customerCode) as lng");
		specialQuery.put("priceTag", "(SELECT TOP 1 pricetag from Customer WHERE Customer.code=customerCode) as priceTag");
		specialQuery.put("parentID", "(SELECT TOP 1 parentID from Customer WHERE Customer.code=customerCode) as parentID");		
		
		if (sql != null) { 
			initSpecialQueries();
			initLanguage();
		}
		
		initData();
		
		if (initComplete()) return;
		
		sql = new sqlRoute();			
		sql.initConnection();								
	}				
	
	public boolean initComplete() {
		return (sql != null && 
				specialQuery != null && 
				tableTypes != null && 
				commaType != null);
	}
	
	public String getLanguageWord(int i) {
		return language[i][toolController.langid];
	}
	
	public void initLanguage() {
		if (language == null) {			
			try {			
				Connection con = sql.getConnection();
				PreparedStatement ps = con.prepareStatement("SELECT * FROM Language");			
				ResultSet rs = ps.executeQuery();			
				language = new String[1000][4];
				while (rs.next()) {												
					language[rs.getInt(1)][0] = rs.getString(2);
					language[rs.getInt(1)][1] = rs.getString(3);
					language[rs.getInt(1)][2] = rs.getString(4);
				}
				
				rs.close();
				ps.close();
			} catch (Exception ex) {
				
			}
		}
	}
	
	public void initSpecialQueries() {
		if (specialQuery == null || specialQuery.size() <= 5) {			
			try {			
				Connection con = sql.getConnection();
				PreparedStatement ps = con.prepareStatement("SELECT * FROM Settings WHERE descr='query' and userCode='15'");			
				ResultSet rs = ps.executeQuery();			
				
				while (rs.next()) {												
					specialQuery.put(rs.getString(1), rs.getString(2));
				}
				
				rs.close();
				ps.close();
			} catch (Exception ex) {
				
			}
		}
	}
	
	public Connection getConnection() {
		return sql.getConnection();
	}		
	
	public String replaceQueries(String fields) {
		String[] fd = fields.split(",");
		String result = "";
		for (int i = 0; i < fd.length; i++) {
			String vl = fd[i];
			
			if (specialQuery.containsKey(vl)) {
				result += specialQuery.get(vl)+",";
			} else
				result += fd[i]+",";
		}
				
		if (result.length() > 1) result = result.substring(0, result.length()-1);
		return result;
	}
	
	public String getComma(String type) {
		return commaType[(int)type.charAt(0)];
	}
	
	public void initData() {
		commaType = new String[256];
		commaType[(int)'n'] = "'";
		commaType[(int)'v'] = "'";
		commaType[(int)'s'] = "'";
		commaType[(int)'d'] = "'";
		commaType[(int)'t'] = "'";
		commaType[(int)'i'] = "";
		commaType[(int)'f'] = "";
		commaType[(int)'m'] = "";						
	}
	
	public void getAllTablesParameters() {
		if (tableTypes != null && tableTypes.size() > 0) return;
		try {			
			tableTypes = new Hashtable<String, Hashtable<String, String>>();
			Connection con = sql.getConnection();
			
			PreparedStatement ps = con.prepareStatement("SELECT name FROM sys.Tables");
			ResultSet rs = ps.executeQuery();
			String table = "";
			while (rs.next()) {
				table = rs.getString(1);		
				if (Character.isLowerCase(table.charAt(0))) continue;
				PreparedStatement ps1 = con.prepareStatement("SELECT column_name,"+
							" case data_type "+
							" when 'datetime' then 'd'"+
							" when 'date' then 'd'"+
							" when 'varchar' then 's'"+
							" when 'nvarchar' then 's'"+
						    " when 'int' then 'i'"+
						    " when 'image' then 's'"+
						    " when 'text' then 's'"+						    
							" when 'float' then 'f'"+
							" when 'double' then 'f'"+
							" when 'bigint' then 'i'"+
							" when 'money' then 'f'"+						
						" end from information_schema.columns WHERE table_name = ?");
				ps1.setString(1, table);
				ResultSet rs1 = ps1.executeQuery();
				Hashtable<String, String> fields = new Hashtable<String, String>();
				while (rs1.next()) {					
					System.out.println(rs1.getString(1)+" "+rs1.getString(2));
					fields.put(rs1.getString(1), rs1.getString(2));					
				}
				rs1.close();
				ps1.close();				
				tableTypes.put(table, fields);				
			}
			rs.close();
			ps.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}		
	}
	
	public String loginRequest(Variant w) {
		int in = 0; 
		try {			
			Connection con = sql.getConnection();
			PreparedStatement ps = con.prepareStatement("SELECT jobStatus FROM doctors WHERE code=? and password=?");
			ps.setString(1, w.getString("user"));
			ps.setString(2, w.getString("password"));
			ResultSet rs = ps.executeQuery();			
			if (rs.next()) {		
				in = rs.getInt(1);				
			}

			rs.close();
			ps.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		return Integer.toString(in);
	}		
}
