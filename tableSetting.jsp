<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <title>绩效评价录入表设置</title>
    <link rel="stylesheet" href="common.css" media="all" />
    <link rel="stylesheet" href="content-box.css">
    
    <script language="javascript" src="jquery-1.10.2.min.js"></script>
    
    <link rel="stylesheet" href="layui.css" media="all" />
    <script src="layui.all.js"></script>
    
    <!-- jquery UI -->
    <link rel="stylesheet" href="jquery-ui.min.css" type="text/css" />
    <script src="jquery-ui.min.js"></script>
    <script src="tableSetting.js"></script>
    <style>
        html, body{
       	    width: 100%;
    		height: 96%;
    		overflow: hidden;
        }
        .body-main{
        	width: 100%;
        	height: 100%;
        	overflow: hidden;
        }
		#list {
		    width: 100%;
		    height: 93%;
		    overflow: auto;
		    position: static;
		}
		.layui-nav-item{/* li */
		    color: #000;
        	width: 95%;
        	line-height: 40px;
		    background: #fefefe;
			border-bottom: 2px solid rgb(189, 213, 241);
			position: static;
			cursor: move;
		}
		#leftList{
	        width: 50%;
	        height: 100%;
		    margin: 18px 0 0 218px;
		    border: 3px solid rgb(189, 213, 241);
		    float: left;
		    background: #CCC;
		}
		#rightTable {
		    width: 30%;
		    height: 100%;
		    border: 3px solid #3178cc;
		    float: left;
		    margin: 18px 0 0 20px;
		    background: #CCC;
		}
        .layui-table tr {/* tr拖动速度 */
            -webkit-transition: none;
            transition: none;
        }
        .layui-table {
            margin: 0;
            color: #4E4E4E;
        }
        .layui-table th{
           display: none;
        }
        .li_span {
		    display: block;
		    float: left;
		    width: 7%;
		    color: #000;
		    line-height: 45px;
		    background: #e5f0f3;
		    text-align: center;
		}
		.layui-table-view {
		    margin: 0;
		    border: none;
		}
		.title_div {
		    background: #DAF1FF;
		    height: 35px;
		    color: #676161;
		    font-size: 16px;
		    text-align: center;
		    line-height: 35px;
		    font-weight: bold;
		    border-bottom: 2px solid #c2ccd6;
		}
		.saveBtn {
		    float: right;
		    margin: 5px 10px;
		}
		.layui-table-view .layui-table td {
			border: none;
			border-bottom: 2px solid #c2ccd6;
			cursor: move;
		}
    </style>
</head>

<body>
     <div class="body-main">
     	<div id="leftList">
     		<div class="title_div">已选录入表
     			<button type="button" class="ycdpw-footer-button saveBtn" onclick="save()"><i class="ycd-icon-ok"></i>保存</button>
     		</div>
			<ul id="list" class="layui-nav layui-nav-tree" lay-filter="test">
			</ul>
		</div>
        <div id="rightTable" >
        	<div class="title_div">可选录入表</div>
            <table id="table" class="layui-table" lay-filter="tabfilter">
            </table>
        </div>
    </div>
</body>

</html>