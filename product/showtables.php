<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database and object files
include_once '../config/showspecificdb.php';
/*include_once '../object/dataanalysis.php';*/
 
// get database connection

$data = json_decode(file_get_contents("php://input"));

$dbname = $data->dbname;

/*echo '<script>';
  echo 'console.log('. json_encode( $dbname ) .')';
  echo '</script>';*/
$database = new Database($dbname);
$db = $database->getConnection();


$str1 = 'Tables_in_';

$output1 = $str1.$dbname;
 /*echo 'console.log('. json_encode( $output1 ) .')';*/
 $sql = "SHOW TABLES";

 $stmt = $db->prepare($sql);
 $stmt->execute();

 $databasename = array();
 $products_arr["database_table"]=array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
 extract($row);
/*echo '<script>';
  echo 'console.log('. json_encode( $row ) .')';
  echo '</script>';*/
$databasename = array(
    "dbname" =>  $row[$output1]
);

 array_push($products_arr["database_table"], $databasename);
 


    //echo $row['Database'] . "\n";
}

echo json_encode($products_arr);


?>