package mxc.cache;

import java.util.Enumeration;
import java.util.Hashtable;

import mxc.dental.erp.systemController;

public class cacheManager {		
	public Hashtable<String, String> jsonCache = new Hashtable<String, String>();
	public Hashtable<String, String> jsonAlternateCache = new Hashtable<String, String>();
	public systemController system;	
	
	public cacheManager(systemController sm) {
		system = sm;
	}
	
	public void manageCache(String tableName, String action) {
		if (action.equals("WRITER")) {
			Enumeration<String> e = jsonCache.keys();
			while(e.hasMoreElements()) {
				String key = (String)(e.nextElement());
				if (key.startsWith(tableName))
					jsonCache.remove(key);
			}
		}
	}
	
	public void saveCache(String key, String value) {
		jsonCache.put(key, value);		
	}
	
	public void saveAlternateCache(String key, String value) {
		jsonAlternateCache.put(key, value);
	}
	
	public String loadCache(String key) {
		if (jsonCache.containsKey(key)) {			
			return jsonCache.get(key);	
		}
		
		return "";
	}
	
	public String loadAlternateCache(String key) {
		if (jsonAlternateCache.containsKey(key)) {			
			return jsonAlternateCache.get(key);	
		}
		
		return "";
	}
}
