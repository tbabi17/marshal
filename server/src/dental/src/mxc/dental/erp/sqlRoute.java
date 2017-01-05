package mxc.dental.erp;

public class sqlRoute {
	private java.sql.Connection  con = null;
    private final String url = "jdbc:microsoft:sqlserver://";
    private final String serverName= "localhost";
    private final String portNumber = "1433";
    private final String databaseName= "dental";
    private final String userName = "sa";
    private final String password = "qWerty!@#123";     
    private final String selectMethod = "cursor";     	                    
      
    public sqlRoute() {
   	 initConnection();
    }
   
    private String getConnectionUrl(){
        return url+serverName+":"+portNumber+";databaseName="+databaseName+";selectedMethod="+selectMethod+";";
    }
   
    public void initConnection() {       
  	   if (con == null) {
  		  System.out.println("SQL initialized.");
         try{        	  
       	  try {				 
       		  Class.forName("com.microsoft.jdbc.sqlserver.SQLServerDriver");
       	  } catch (ClassNotFoundException e) {
       		  System.err.println( "Driver not found: " + e + "\n" + e.getMessage() );
       	  }	                 			      			  
             con = java.sql.DriverManager.getConnection(getConnectionUrl(), userName, password);     
         } catch(Exception e){        	   
              System.out.println("SQL Server not found !");             
         }
	   }              
    }
   
    public java.sql.Connection getConnection() {
    	return con;
    }
}
