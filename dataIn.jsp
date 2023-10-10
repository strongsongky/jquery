<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page isErrorPage="true"%>
<%@ page import="java.sql.*"%>

<%
    Connection conn=null;
    try{
        String jdbcUrl = "jdbc:mysql://localhost:3306/chatdb";
        String dbId = "root";
        String dbPass = "root";

        Class.forName("com.mysql.jdbc.Driver");
        conn = DriverManager.getConnection(jdbcUrl,dbId ,dbPass );
        out.println("제대로 연결되었습니다.");
        }catch(Exception e){ 
           
        }
    
%>