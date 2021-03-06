<?php
session_start();
ini_set("display_errors", 0);
include_once("website_a_include.php");
include_once($CFG["include_path"] . "/lib/file/uploadImage.php");

$response = array();
try {
	/*** common secure : prevent url hack from hack tool ***/
	include_once("website_a_secure.php");

	
	$schema = array();
	$schema["mode"] 	= $_REQUEST["mode"];
	$schema["imgid"] 	= $_REQUEST["imgid"];
	
	$upload = new DOWNLOADIMAGE($db, $schema, $DLang);
	$upload->ImageHTML($_REQUEST["imgid"], $_REQUEST["mode"]);

	
} catch(Exception $e ) {
	$response["errorCode"] 		    = $e->getCode();
	$response["errorMessage"] 	    = $e->getMessage();
	$response["errorLine"] 		    = sprintf("File[file:%s, line:%s]", $e->getFile(), $e->getLine());
	$response["errorField"]		   	= $e->getField();
	echo json_encode($response);
}
?>