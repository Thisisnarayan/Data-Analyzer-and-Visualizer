<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Usage without mysql_list_dbs()
$host = "localhost:3307";
$db_name = "api_db";
$username = "root";
 $password = "";
 $conn;
$link = mysql_connect($host, $username, $password);
$res = mysql_query("SHOW DATABASES");
$databasename = array();
 $products_arr["records"]=array();
while ($row = mysql_fetch_assoc($res)) {

$databasename = array(
    "name" =>  $row['Database']
);

 array_push($products_arr["records"], $databasename);
 


    //echo $row['Database'] . "\n";
}

echo json_encode($products_arr);
?>