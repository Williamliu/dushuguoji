<?php
session_start();
ini_set("display_errors", 0);
include_once("website_a_secure.php");
include_once("website_a_auth.php");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<?php require("website_a_include.php")?>

		<!-- Bootstrap3.3 -->
		<link 	href='<?php echo $CFG["web_domain"]?>/theme/bootstrap4.0/css/bootstrap.min.css' type='text/css' rel='stylesheet' />
		<script src="<?php echo $CFG["web_domain"]?>/theme/mdb4.0/js/tether.js" type="text/javascript"></script>
		<script src="<?php echo $CFG["web_domain"]?>/theme/bootstrap4.0/js/bootstrap.min.js" type="text/javascript"></script>    
		<!-- //Bootstrap -->
		
		<!-- MD Bootstrap 4.0 -->
		<link href='<?php echo $CFG["web_domain"]?>/theme/mdb4.0/css/mdb.wliu.css' type='text/css' rel='stylesheet' />
		<link href='<?php echo $CFG["web_domain"]?>/theme/font-awesome-4.6.3/css/font-awesome.min.css' type='text/css' rel='stylesheet' />
		<!--
		<link href='<?php echo $CFG["web_domain"]?>/theme/mdb_pro/css/woocommerce.css' rel='stylesheet' type='text/css'>
		<link href='<?php echo $CFG["web_domain"]?>/theme/mdb_pro/css/woocommerce-layout.css' rel='stylesheet' type='text/css'>
		<link href='<?php echo $CFG["web_domain"]?>/theme/mdb_pro/css/woocommerce-smallscreen.css' rel='stylesheet' type='text/css'>
		-->
		<!-- //MD Bootstrap -->

		<!-- 3rd Party Component -->
        <script src="jquery/plugin/ckeditor_full/ckeditor.js" type="text/javascript"></script>


		<script src="<?php echo $CFG["web_domain"]?>/js/wliu/wliu.common.js" type="text/javascript"></script>
		<script src="<?php echo $CFG["web_domain"]?>/js/wliu/wliu.table.js" type="text/javascript"></script>
		<script src="<?php echo $CFG["web_domain"]?>/js/wliu/wliu.table.common.js" type="text/javascript"></script>
		<script	src="<?php echo $CFG["web_domain"]?>/angularjs/wliu/wliu.table.js" type="text/javascript"></script>
		<script	src="<?php echo $CFG["web_domain"]?>/angularjs/wliu/wliu.table.filter.js" type="text/javascript"></script>

		<script src="<?php echo $CFG["web_domain"]?>/jquery/wliu/diag/wliu.jquery.diag.js" type="text/javascript"></script>
		<link 	href='<?php echo $CFG["web_domain"]?>/jquery/wliu/diag/wliu.jquery.diag.css' type='text/css' rel='stylesheet' />
		<script src="<?php echo $CFG["web_domain"]?>/jquery/wliu/popup/wliu.jquery.popup.js" type="text/javascript"></script>
		<link 	href='<?php echo $CFG["web_domain"]?>/jquery/wliu/popup/wliu.jquery.popup.css' type='text/css' rel='stylesheet' />
		<script src="<?php echo $CFG["web_domain"]?>/jquery/wliu/loading/wliu.jquery.loading.js" type="text/javascript"></script>
		<link 	href="<?php echo $CFG["web_domain"]?>/jquery/wliu/loading/wliu.jquery.loading.css" type='text/css' rel='stylesheet' />


		<link href='<?php echo $CFG["web_domain"]?>/theme/wliu/wliu.common.css' type='text/css' rel='stylesheet' />
		<link href='<?php echo $CFG["web_domain"]?>/theme/wliu/wliu.buttons.css' type='text/css' rel='stylesheet' />

        <script language="javascript" type="text/javascript">
 		   	var col1 = new WLIU.COL({key:1, coltype:"hidden", 		name:"id", 			colname:"contact us ID",  coldesc:""});
		   	var col2 = new WLIU.COL({key:0, coltype:"text", 		name:"full_name",	colname: words["full_name"], coldesc:"User Name", 	sort:"ASC", need:1, notnull: 1});
		   	var col3 = new WLIU.COL({key:0, coltype:"text", 		name:"email", 	    colname: words["email"], 	 coldesc:"Email Address",  	sort:"ASC", notnull:1});
		   	var col4 = new WLIU.COL({key:0, coltype:"textbox", 		name:"subject", 	colname: words["subject"], 	 coldesc:"Subject",  	sort:"ASC", notnull:1});
		   	var col5 = new WLIU.COL({key:0, coltype:"textarea", 	name:"detail", 		colname:words["detail"],  coldesc:"Message", notnull:1});
		   	var col6 = new WLIU.COL({key:0, coltype:"text", 		name:"created_time", colname:words["created_time"], coldesc:"Submission Time", sort:"DESC"});
            
            var cols = [];
            cols.push(col1);
            cols.push(col2);
            cols.push(col3);
            cols.push(col4);
            cols.push(col5);
            cols.push(col6);
            
			var filter1 = new WLIU.FILTER({name:"sname", coltype:"textbox", cols:"full_name",	    colname: words["full_name"], 	coldesc:"Search by Name"});
			var filter2 = new WLIU.FILTER({name:"keyword", coltype:"textbox", cols:"subject,detail",	colname: words["keyword"], 	    coldesc:"Search by Keyword"});
			var filters = [];
			filters.push(filter1);
			filters.push(filter2);

		    var table = new WLIU.TABLE({
				scope: 	"mytab",
				url:   	"ajax/website_contactus_action.php",
				wait:   "#tabwait",
				taberror:"#taberror",
				tooltip:"#tabtip",
				tips: 	"#tabtips",
				rights: {detail:1, add:1, save:1, cancel:1, clear:1, delete:1, print:1, output:1},
				navi:   {pagesize:20, match: 1, orderby:"created_time", sortby:"DESC"},
				filters: filters,
				cols: 	cols,
                lists: {}
			});

            
            var app = angular.module("myApp", ["wliuTable"])
            app.controller("webAdmin", function ($scope) {
				table.setScope( $scope );
				table.getRows();
            });
        </script>
</head>
<body ng-app="myApp"  ng-controller="webAdmin">
<?php 
	require("website_a_header.php");
	require("website_a_menu.php");
	LANG::hit("Admin", "公共网站搜索引擎", "公共网站搜索引擎"." :".$admin_user["user_name"]);
?>
<div class="main-content"><div class="frame-center">
<!------------------------------------------------ Begin of website content --------------------------------------------->

    <div>
    <fieldset>
    	<legend><?php echo $words["search criteria"]; ?></legend>
		<filter.label table="table" name="sname"></filter.label> : <filter.textbox class="input-medium" table="table" name="sname"></filter.textbox>
		<filter.label table="table" name="keyword"></filter.label> :  <filter.textbox class="input-medium" table="table" name="keyword"></filter.textbox>
        <br><br>
		<table.tablebutton table="table" name="search" actname="Search" outline=1></table.tablebutton>
    </fieldset>

			<br>
			<table.navi table="table" tooltip=""></table.navi>
			<table class="table table-condensed">
				<tr style="background-color:#efefef;"> 
					<td width=20>
						<table.hgroup table="table" actname="DO All">
							<table.hlink table="table" name="save" 		actname="Save" 	action=""></table.hlink>
							<table.hlink table="table" name="cancel" 	actname="Undo" 	action=""></table.hlink>
						</table.hgroup>
					</td>
					<td width=30 align="center">
						<table.head table="table" name="SN" tooltip="#mytips"></table.head>
					</td>
					<td>
						<table.head table="table" name="full_name" tooltip="#mytips"></table.head>
					</td>
					<td>
						<table.head table="table" name="email" tooltip="#mytips"></table.head>
					</td>
					<td>
						<table.head table="table"  name="subject" tooltip="1"></table.head>
					</td>
					<td>
						<table.head table="table"  name="detail" tooltip="1"></table.head>
					</td>
					<td>
						<table.head table="table" name="created_time" tooltip="1"></table.head>
					</td>
				</tr>	
				<tr ng-repeat="row in table.rows">
					<td style="white-space:nowrap; width:20px;padding-right:10px;">
						<table.bgroup table="table" actname="Action" rowsn="{{$index}}">
						<table.blink table="table" name="save"  	actname="Save" 		rowsn="{{$index}}" 	action=""></table.blink>
						<table.blink table="table" name="cancel"	actname="Cancel" 	rowsn="{{$index}}" 	action=""></table.blink>
						<table.blink table="table" name="delete" 	actname="Delete" 	rowsn="{{$index}}" 	action=""></table.blink>
						</table.bgroup>
					</td>
					<td width=30 align="center">
						<table.rowno table="table"  rowsn="{{$index}}" tooltip="#mytips"></table.rowno>
					</td>
					<td align="center">
						<table.text table="table" name="full_name" rowsn="{{$index}}" tooltip="#mytips"></table.text>
					</td>
					<td>
						<table.textbox table="table" name="email" rowsn="{{$index}}" tooltip="#mytips"></table.textbox>
					</td>
					<td>
						<table.textbox table="table" name="subject" rowsn="{{$index}}" tooltip="#mytips"></table.textbox>
					</td>
					<td>
						<table.textarea table="table" name="detail" rowsn="{{$index}}" tooltip="#mytips"></table.textarea>
					</td>
					<td>
						<table.intdate class="input-small" table="table" name="created_time" rowsn="{{$index}}" tooltip="#mytips"></table.intdate>
					</td>
				</tr>
			</table>

	</div>

<!------------------------------------------------ End of website content --------------------------------------------->
</div></div>

<table.taberror table="table" targetid="taberror"></table.taberror>
<table.tooltip table="table" targetid="tabtip"></table.tooltip>
<table.wait table="table" targetid="tabwait"></table.wait>
<table.tips table="table" targetid="tabtips" halign="right" valign="bottom"></table.tips>

<?php include_once("website_a_common.php");?>
</body>
</html>
