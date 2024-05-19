<%@ page language="java" contentType="text/html; charset=UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>API Documentation</title>
    <link rel="stylesheet" type="text/css" href="swagger/swagger-ui.css">
    <link rel="stylesheet" type="text/css" href="css/rest-custom.css">
    <style>
        body {
            display: flex;
            margin: 0;
            font-family: Arial, sans-serif;
        }
        .sidebar {
            width: 250px;
            background-color: #f8f8f8;
            padding: 20px;
            border-right: 1px solid #ddd;
            height: 100vh;
            overflow-y: auto;
            position: fixed;
        }
        .content {
            margin-left: 270px;
            padding: 20px;
            flex-grow: 1;
        }
        .sidebar h2 {
            margin-top: 0;
        }
        .sidebar h3 {
            margin-bottom: 10px;
        }
        .collapsible {
            display: flex;
            align-items: center;
            cursor: pointer;
            padding: 15px;
            font-size: 18px;
            border-radius: 4px;
            transition: background-color 0.3s;
        }
        .collapsible:hover {
            background-color: #e0e0e0;
        }
        .collapsible::before {
            content: '▶';
            display: inline-block;
            margin-right: 10px;
            transition: transform 0.3s;
        }
        .collapsible.open::before {
            transform: rotate(90deg);
        }
        .content-hidden {
            display: none;
            padding-left: 20px;
        }
        .operation-link {
            position: relative;
            padding: 8px 10px;
            margin-left: 10px;
            font-size: 14px;
        }
        .operation-link::before {
            content: '';
            position: absolute;
            left: -10px;
            top: 0;
            bottom: 0;
            width: 2px;
            background-color: #333;
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <h2>/api-docs</h2>
        <h3>SOAP</h3>
        <div id="soap-menu"></div>
        <h3>REST</h3>
        <div id="sidebar-menu"></div>
    </div>
    <div class="content">
        <div id="soap-ui"></div>
        <div id="swagger-ui"></div>
    </div>
    <script src="swagger/swagger-ui-bundle.js"></script>
    <script src="swagger/swagger-ui-standalone-preset.js"></script>
    <script src="js/rest-script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/js-yaml/4.1.0/js-yaml.min.js"></script>
</body>
</html>
