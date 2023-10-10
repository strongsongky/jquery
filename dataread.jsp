<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*"%>

<% request.setCharacterEncoding("utf-8");%>

<% 
   Timestamp register=new Timestamp(System.currentTimeMillis());

   Connection conn=null;
   PreparedStatement pstmt=null;
   String str="";
   try{
        String jdbcUrl = "jdbc:mysql://localhost:3306/chatdb";;
      String dbId = "root";
      String dbPass = "1234";
 	 String userID = request.getParameter("userid");
     String userMessage = request.getParameter("message");
 	 Class.forName("com.mysql.jdbc.Driver");
 	 conn=DriverManager.getConnection(jdbcUrl,dbId ,dbPass );
   out.println("제대로 연결되었습니다.");
 	
 	 String sql= "select * from message;";
 	 pstmt=conn.prepareStatement(sql);
   ResultSet rs = pstmt.executeQuery();
   out.prinln("{ 'data':[");
   int length = 0;
   String printStr="";
   while(rs.next()) {
    out.println("{ id : " + rs.getInt("id")+",");
    out.println(rs.getString("userid");)
    out.println(rs.getString("message");)
    out.println(rs.getString("time") + "},";)
    length++;
   }
   out.println(printStr)
   out.println("], 'length;: " + length + "}");

 	}catch(Exception e){ 
 		e.printStackTrace();
    }
 %>