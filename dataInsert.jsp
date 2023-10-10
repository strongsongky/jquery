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
		
 	 String sql= "insert into message values (0,?,?,now())";
 	 pstmt=conn.prepareStatement(sql);
		
 	 pstmt.setString(1,userID);
		pstmt.setString(2,userMessage);
		out.println("성공");
 	 pstmt.executeUpdate();
 	 
 	 out.println("member 테이블에 새로운 레코드를 추가했습니다.");

 	}catch(Exception e){ 
 		e.printStackTrace();
 		out.println("member 테이블에 새로운 레코드를 추가에 실패했습니다...");
		
 	}finally{
 		if(pstmt != null) 
 			try{pstmt.close();}catch(SQLException sqle){}
 		if(conn != null) 
 			try{conn.close();}catch(SQLException sqle){}
 	}
 %>