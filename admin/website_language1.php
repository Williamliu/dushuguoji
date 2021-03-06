<?php
session_start();
ini_set("display_errors", 0);
$menuKey="W121";
include_once("website_a_secure.php");
include_once("website_a_auth.php");
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
        <?php require("website_a_include.php")?>

		<script type="text/javascript" 	src="<?php echo $CFG["web_domain"]?>/angularjs/myAngularjs/angular.wmliu.search.js"></script>
		<script type="text/javascript" 	src="<?php echo $CFG["web_domain"]?>/angularjs/myAngularjs/angular.wmliu.tableview.js"></script>
    	<link type="text/css" 			href="<?php echo $CFG["web_domain"]?>/angularjs/myAngularjs/css/light/angular.wmliu.tableview.css" rel="stylesheet" />

		<script type="text/javascript" 	src="<?php echo $CFG["web_domain"]?>/jquery/myplugin/jquery.lwh.diagbox.js"></script>
        <link 	type="text/css" 	  	href="<?php echo $CFG["web_domain"]?>/jquery/myplugin/css/light/jquery.lwh.diagbox.css" rel="stylesheet" />

		<script type="text/javascript" 	src="<?php echo $CFG["web_domain"]?>/jquery/myplugin/jquery.lwh.imageajax.js"></script>
        <link 	type="text/css" 	   	href="<?php echo $CFG["web_domain"]?>/jquery/myplugin/css/light/jquery.lwh.imageajax.css" rel="stylesheet" />

		<script type="text/javascript" 	src="<?php echo $CFG["web_domain"]?>/jquery/myplugin/jquery.lwh.imageshow.js"></script>
        <link 	type="text/css" 	   	href="<?php echo $CFG["web_domain"]?>/jquery/myplugin/css/light/jquery.lwh.imageshow.css" rel="stylesheet" />

        <script language="javascript" type="text/javascript">
            var app = angular.module("myApp", ["wmliuTableview", "wmliuSearch"])
            app.controller("webAdmin", function ($scope, wmliuTableviewService, wmliuSearchService) {
                $scope.table = {
                    buttons: {
                        rights: 	GUserRight,
                        head: {
                            wait: 1,
                            icon: [
                                        { key: "add", title: "Add", desc: "Add New" },
                                        { key: "save", title: "Save", desc: "Save All" },
                                        { key: "cancel", title: "Cancel", desc: "Cancel All" }
                                  ]
                        },
                        row: {
                            wait: 1,
                            icon: [
                                        { key: "detail", title: "Detail", desc: "Detail" },
                                        { key: "save", title: "Save", desc: "Save" },
                                        { key: "cancel", title: "Cancel", desc: "Cancel Change" },
                                        { key: "delete", title: "Delete", desc: "Delete" }
                                        ]
                        }
                    },
                    schema: {
                        table: {
                            sstable: { name: "website_language", col: "id", val: "" }
                        },
                        cols:
                            [
                                    { col: "", type: "rowno", title: words["sn"], align: "center", css: "" },
                                    { col: "thumb", type: "thumb", title: words["project"], sort: "asc", css: "", align: "left", valign: "top", width: 0 },
                                    { col: "project", type: "textbox", title: words["project"], sort: "asc", css: "", align: "left", valign: "top", width: 120, maxlength: 256 },
                                    { col: "filter", type: "textbox", title: words["filter"], sort: "asc", align: "left", valign: "top", width: 120, required: 0, maxlength: 256 },
                                    { col: "keyword", type: "textbox", title: words["keyword"], sort: "asc", align: "left", valign: "top", width: 120, required: 1, maxlength: 256 },
                                    { col: "en", type: "textarea", title: words["lang.en"], sort: "asc", align: "left", valign: "top", width: 200, required: 1, maxlength: 1024 },
                                    { col: "cn", type: "textarea", title: words["lang.cn"], sort: "asc", align: "left", valign: "top", width: 200, required: 0, maxlength: 1024 },
                                    { col: "", type: "icon", title: words["action"], align: "left", nowrap: 1 }
                            ]
                    },
                    navi: {
                        head: {
                            lang: "cn",
                            action: "view",
                            loading: 0,
							imgsettings: {
								filter: "admin photo"
							},
							
                            orderBY: "created_time",
                            orderSN: "DESC",
                            pageNo: 1,
                            pageSize: 20,
                            totalNo: 0
                        }
                    },
                    rows: []
                }


                wmliuSearchService.setButtonClick("lwh", function () {
                    wmliuTableviewService.load["lwh"]();
                }, "search");
            });

        </script>
</head>
<body ng-app="myApp">
<?php require("website_a_header.php")?>
<?php require("website_a_menu.php")?>
<div class="main-content"><div class="frame-center">
<!------------------------------------------------ Begin of website content --------------------------------------------->

    <div ng-controller="webAdmin" >
    <fieldset>
    	<legend><?php echo $words["search criteria"]; ?></legend>
              <search.form table="table">
              <table cellpadding="2" cellspacing="2">
                  <tr>
                      <td align="right"><?php echo $words["keyword"];?>: </td>
                      <td><search.textbox style="width:120px;" table="table" name="sstable" search="keyword" datatype="string" compare="%"></search.textbox></td>
                      <td align="right"><?php echo $words["content"];?>: </td>
                      <td><search.textbox style="width:120px;" table="table" name="sstable" search="content" cols="en,cn" datatype="string" compare="%"></search.textbox></td>
                      <td align="right"><?php echo $words["project"];?>: </td>
                      <td><search.textbox style="width:120px;" table="table" name="sstable" search="project" datatype="string" compare="%"></search.textbox></td>
                      <td align="right"><?php echo $words["filter"];?>: </td>
                      <td><search.textbox style="width:120px;" table="table" name="sstable" search="filter" datatype="string" compare="%"></search.textbox></td>
                  </tr>
                  <tr>
                      <td align="right">
                            <search.button table="table" name="<?php echo $words["search"];?>" action="search"></search.button>                      
                      </td>
                      <td>
                      </td>
                  </tr>
              </table>
              </search.form>
    </fieldset>
    <wmliu.tableview name="lwh" table="table" loading="1"></wmliu.tableview>
	</div>

<!------------------------------------------------ End of website content --------------------------------------------->
</div></div>
<?php include_once("website_a_common.php");?>
</body>
</html>
