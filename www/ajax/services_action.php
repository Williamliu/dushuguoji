<?php 
session_start();
ini_set("display_errors", 0);
include_once("../../include/config/config.php");
include_once($CFG["include_path"] . "/wliu/database/database.php");
include_once($CFG["include_path"] . "/wliu/email/email.php");
define("DEBUG", 1);
$response = array();
try {
	$rights = array("view"=>1, "save"=>1, "add"=>1, "delete"=>1);

	/*** common secure : prevent url hack from hack tool ***/
	$db = new cMYSQL($CFG["mysql"]["host"], $CFG["mysql"]["user"], $CFG["mysql"]["pwd"], $CFG["mysql"]["database"]);
	$table = $_REQUEST["table"]; 
	$table["rights"] = $rights;

	// 2) list table : list1, list2, list3, cate1, cate2, cate3
	//  table1.name == table2.name ;  fkey is parent_id started from 0  as tree root 


	// 3) table metadata
	// medium table:   medium.keys->primary.keys   medium.fkeys->second.keys   
	// colname using js-meta name, even keys, fkeys
	// primary, second, medium  using js colname
	// checkbox relationship  using database colname,  checkbox:  keys[0] is value col;  fkeys is mapping to parent table(primary-keys, second->keys, medium->keys+fkeys) 
	$tableMeta = array(
		"type"=>"one",   
		"primary"=>array(	
							"name"=>"dsgj_studentform", 
							"keys"=>array("id"),  
							"fkeys"=>array(), 
							"cols"=>array(
								"id","school_name", "school_address", "ck_service", "rd_service", "stu_fname", "stu_lname", "stu_oname", "passport","passport_copy", "en_score",
								"stu_address","stu_state", "stu_postal", "stu_email", "stu_phone", "stu_wechat", 
								"dad_fname","dad_email", "dad_phone", "dad_wechat", "dad_birth", "mom_fname", "mom_email", "mom_phone", "mom_wechat", "mom_birth", 
								"par_address","par_state", "par_city", "par_postal", "airline", "flight", "pickup_datetime", "destination", "homestay_start", "homestay_end", 
								"health_medicine","health_horby", "per_character", "per_horby", "per_sport", "per_music", "per_food", "per_vegit", "homestay_child", "homestay_envir", 
								"homestay_other","homestay_letter", "homestay_concern"								
							), 
							"insert"=>array("status"=>1), 
							"update"=>array()  
					),
		"second"=>array( ),
		"medium"=>array( ),
		//checkbox maping keys, fkeys using  database colname.  keys is value col,  fkeys is relational cols; 
		//Javascript ,  don't need to define keys, fkeys for checkbox mapping 
		"ck_service"=>array("name"=>"dsgj_student_service", "keys"=>array("service_id"), "fkeys"=>array("stu_id") ), 
		"homestay_child"=>array("name"=>"dsgj_student_homestay", "keys"=>array("homestay_type"), "fkeys"=>array("stu_id") ) 
	);
	$table["metadata"] = $tableMeta; 	

	// 4) action 
	cACTION::formFilter($table);
	cACTION::action($db, $table);

	// 5) if success ,  to do other thing
	// 5) if success ,  to do other thing
	if(false || $table["success"] && $table["action"]=="save" ) {
		$rows = $table["rowsArray"];
		$info = $rows[0];
		$a["from"] 		= $info["stu_email"];
		$a["reply"] 	= $info["stu_email"];

		$b				= "info@dushuguoji.com";
		$subject 		= "DSGJ - 精品境外服务表格";
		$content        = "网站管理员你好,<br><br>";
		$content        .= "有人在读书国际网站填写了精品服务表格， 详细信息请到网站管理平台查询，学生信息如下:<br><br>";
		$content        .= "姓名： " . $info["stu_fname"] . " " . $info["stu_lname"]  . "<br>";
		$content        .= "电话： " . $info["stu_phone"] . "<br>";
		$content        .= "邮件： <a href='mailto:" . $info["stu_email"] . "'>" . $info["stu_email"] . "</a><br><br>";
		$content        .= "学校: " . $info["school_name"] . "<br><br>";
		$content        .= "详情可以到后台管理查看：<a href='http://admin.dushuguoji.com'>http://admin.dushuguoji.com</a><br><br>";
		$content        .= "谢谢关注!";

		$e = new cEMAIL($a, $b, $subject, $content);
		$e->send();
		//mail($b[0], $subject, $content );
	}


	// 6) return 
	if(!DEBUG) cACTION::clearRows($table);  // clear save case rows value but keys 
	$response["table"] = $table;


	echo json_encode($response);
	
} catch(Exception $e ) {
	$table 							= $_REQUEST["table"];
	$table["navi"]["loading"]       = 0;
	$table["error"]["errorCode"] 	= $e->getCode();
	$table["error"]["errorMessage"] = $e->getMessage();
	$response["table"] 				= $table; 

	$response["errorCode"] 		    			= $e->getCode();
	$response["errorMessage"] 	    			= $e->getMessage();
	$response["errorLine"] 		    			= sprintf("File[file:%s, line:%s]", $e->getFile(), $e->getLine());
	$response["errorField"]		   	 			= $e->getField();
	echo json_encode($response);
}
?>