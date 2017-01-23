<?php 
$temp_name = substr($_SERVER["SCRIPT_NAME"],  strrpos($_SERVER["SCRIPT_NAME"], "/")!==false?strrpos($_SERVER["SCRIPT_NAME"], "/")+1:0 );
?>

<nav id="main_menu" class="navbar navbar-default navbar-fixed-top" role="navigation">
	<div class="container">
		<div class="navbar-header">
			<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
			<span class="sr-only">Toggle navigation</span>
			<i class="icon-menu"></i> 
            	网站菜单
			</button>
			<a class="navbar-brand" style="padding:5px;" href="/"><img src="theme/light/logo/readings-logo.png" /></a>
		</div>
 
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
                <li>
					<a href="index.php" title="读书国际首页">首页</a>
				</li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" title="学校介绍">官方代理</a>
					<ul class="dropdown-menu">
						<li>
							<a href="university.php" title="关于大学"><i class="icon-layers fa-fw"></i>关于大学</a>
						</li>
						<li>
							<a href="schoolzone.php" title="关于学区"><i class="icon-star fa-fw"></i>关于学区</a>
						</li>
						<li>
							<a href="glenlyonnorfolk.php" title="GNS贵族学校"><i class="icon-star fa-fw"></i>GNS贵族学校</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="nxservice.php" title="家长放心服务">家长放心服务</a>
				</li>
				<li>
					<a href="services.php" title="精品境外服务">精品境外服务</a>
				</li>
				<li>
					<a href="javascript:void(0);" title="联系我们" wliu-diag  diag-target="#contactus" diag-toggle="click">联系我们</a>
				</li>
            </ul>
            <ul class="nav navbar-nav navbar-right">
				<li><a href="#" style="padding-left:5px;padding-right:5px;"><span class="glyphicon glyphicon-user"></span> 注册账号</a></li>
        		<li><a href="#" style="padding-left:5px;padding-right:5px;"><span class="glyphicon glyphicon-log-in"></span> 登录</a></li>                
            </ul>
		</div>
	</div>
</nav>



<div ng-controller="DSGJ_ContactUS">
<div id="contactus" style="width:480px;"  >
	<div class="wliu-diag-content">
		<div class="row">
			<div class="col-md-3 text-nowrap">
				<table.label table="table" name="full_name"></table.label>
		    </div>
			<div class="col-md-9">		
				<table.textbox table="table" name="full_name" rowsn="{{ table.rowno() }}"></table.textbox>
			</div>
		</div>

		<div class="row">
			<div class="col-md-3 text-nowrap">
				<table.label table="table" name="email"></table.label>
		    </div>
			<div class="col-md-9">		
				<table.textbox table="table" name="email" rowsn="{{ table.rowno() }}"></table.textbox>
			</div>
		</div>
		<div class="row">
			<div class="col-md-3">
				<table.label table="table" name="phone"></table.label>
		    </div>
			<div class="col-md-9">		
				<table.textbox table="table" name="phone" rowsn="{{ table.rowno() }}"></table.textbox>
			</div>
		</div>
		<div class="row">
			<div class="col-md-3">
				<table.label table="table" name="detail"></table.label>
		    </div>
			<div class="col-md-9">		
				<table.textarea table="table" name="detail" style="height:160px;width:100%;" rowsn="{{ table.rowno() }}"></table.textarea>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12">
				<center>
					<table.singlebutton table="table"	name="save" 		rowsn="{{ table.rowno() }}"	actname="提交"></table.singlebutton>
					<table.singlebutton table="table"	name="cancel" 		rowsn="{{ table.rowno() }}"	actname="重写"></table.singlebutton>
				</center>
		    </div>
		</div>
	</div>
</div>

<table.rowerror table="table" rowsn="{{ table.rowno() }}" targetid="taberror" maskable=0></table.rowerror>
<table.wait table="table" targetid="mywait"></table.wait>
<table.tips table="table" targetid="tabtips" halign="right" valign="bottom"></table.tips>
</div>


<script language="javascript" type="text/javascript">
	var col1 = new WLIU.COL({key:1, coltype:"hidden", 		name:"id", 			colname:"ID",  			coldesc:"Contact US ID" });
	var col2 = new WLIU.COL({key:0, coltype:"textbox", 		name:"full_name",	colname:"姓名", 		  coldesc:"Full Name", 	  need:1,  notnull: 1});
	var col3 = new WLIU.COL({key:0, coltype:"textbox", 		name:"email", 	  	colname:"电子邮件", 	coldesc:"Email Address", need:1, notnull: 1, datatype:"EMAIL" });
	var col4 = new WLIU.COL({key:0, coltype:"textbox", 		name:"phone", 	  	colname:"电话", 		  coldesc:"Phone" });
	var col5 = new WLIU.COL({key:0, coltype:"textarea", 	name:"detail", 		colname:"咨询内容", 	 coldesc:"Detail",       need: 1, notnull:1});

	var cols = [];
	cols.push(col1);
	cols.push(col2);
	cols.push(col3);
	cols.push(col4);
	cols.push(col5);

	var table = new WLIU.TABLE({
		scope: 	"contactus",
		url:   	"ajax/contactus_action.php",
		
		wait:   	"#mywait",
		tips: 		"#tabtips",
		rowerror:   "#taberror",
		rights: {detail:1, add:1, save:1, cancel:1, clear:1, delete:1, print:1, output:1},
		navi:   {pagesize:20, match: 1, orderby:"", sortby:""},
		cols: 	cols,
		callback: {
			ajaxSuccess: function( theTable ) {
				$("#contactus").trigger("hide");
			}
		}

	});

	app.controller("DSGJ_ContactUS", function ($scope) {
		table.setScope( $scope );
		table.editRow();
	});


	$(function(){
		$("li a[href='<?php echo $temp_name; ?>']", "#main_menu ul").parents("ul > li").addClass("active");

		$("#contactus").wliuDiag({
							title:		"联系我们",
							maskable: 	true,
							movable: 	true
		});
	});
</script>

