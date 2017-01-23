<!DOCTYPE html>
<html>
<head>
<?php include("public_head.php"); ?>


</head>
<body ng-app="myApp">
<?php include("public_menu.php"); ?>

<script language="javascript" type="text/javascript">
	var col1 = new WLIU.COL({key:1, coltype:"hidden", 		name:"id", 			colname:"ID" });
	var col2 = new WLIU.COL({key:0, coltype:"textbox", 		name:"first_name",	colname:"First Name 名", need:1,  notnull: 1});
	var col3 = new WLIU.COL({key:0, coltype:"textbox", 		name:"last_name",	colname:"Subname 姓",	need:1,  notnull: 1});
	var col4 = new WLIU.COL({key:0, coltype:"textbox", 		name:"other_name", 	colname:"Other Name 其他名字" });
	var col5 = new WLIU.COL({key:0, coltype:"textbox", 		name:"email", 	  	colname:"E-mail 电子邮箱", need:1, notnull: 1, datatype:"email" });
	var col6 = new WLIU.COL({key:0, coltype:"textbox", 		name:"city", 		colname:"City/Town 城市" });
	var col7 = new WLIU.COL({key:0, coltype:"textbox", 		name:"province",   	colname:"Province/Territory 省" });
	var col8 = new WLIU.COL({key:0, coltype:"textbox", 		name:"postal", 	  	colname:"Postal Code 邮箱" });
	var col9 = new WLIU.COL({key:0, coltype:"textbox", 		name:"phone", 	  	colname:"Phone 电话" });
	var col10 = new WLIU.COL({key:0, coltype:"textarea", 	name:"wechat", 		colname:"WeChat 微信"});
	var col11 = new WLIU.COL({key:0, coltype:"textarea", 	name:"school_name", 	colname:"Name of School 学校名称 (英文)" });
	var col12 = new WLIU.COL({key:0, coltype:"textarea", 	name:"school_address", 	colname:"Address of School 学校地址 (英文)" });

	var cols = [];
	cols.push(col1);
	cols.push(col2);
	cols.push(col3);
	cols.push(col4);
	cols.push(col5);
	cols.push(col6);
	cols.push(col7);
	cols.push(col8);
	cols.push(col9);
	cols.push(col10);

	var student_table = new WLIU.TABLE({
		scope: 	"contactus",
		url:   	"ajax/service_action.php",
		
		wait:   	"#mywait",
		tips: 		"#tabtips",
		rowerror:   "#taberror",
		rights: {detail:1, add:1, save:1, cancel:1, clear:1, delete:1, print:1, output:1},
		navi:   {pagesize:20, match: 1, orderby:"", sortby:""},
		cols: 	cols
	});

	app.controller("dsgj_studentform", function ($scope) {
		student_table.setScope( $scope );
		student_table.editRow();
	});
</script>

<div style="clear:both;"></div>
<br><br>
<br><br>

<div ng-controller="dsgj_studentform" class="container" style="border:0px solid red; padding:0px;">
	<div class="panel panel-default">
		<div class="panel-body" style="background-color:#eeeeee;">
			<center>
			<span style="font-size:24px; color:#666666;">
			Study Abroad Service Application Forms<br>
			</span>
			<span style="font-size:32px; color:#666666;">
			加拿大留学精品境外服务申请表
			</span>
			</center>
		</div>
	</div>

	<br><br>

	<div class="row">
		<div class="col-md-4">
				<table.label table="table" name="school_name"></table.label>
		</div>
		<div class="col-md-8">
				<table.textbox table="student_table" name="school_name" rowsn="{{ table.rowno() }}"></table.textbox>
		</div>
	</div>
	<div class="row">
		<div class="col-md-4">
				<table.label table="table" name="school_address"></table.label>
		</div>
		<div class="col-md-8">
				<table.textbox table="student_table" name="school_address" rowsn="{{ table.rowno() }}"></table.textbox>
		</div>
	</div>

</div>

<?php include("public_foot.php"); ?>
</body>
</html>