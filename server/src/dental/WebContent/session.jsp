<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	session.setAttribute("user", request.getParameter("user"));
	session.setAttribute("logged", request.getParameter("_group"));		
%>