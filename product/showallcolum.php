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
$table_name = $data->table_name;

/*echo '<script>';
  echo 'console.log('. json_encode( $dbname ) .')';
  echo '</script>';*/
$database = new Database($dbname);
$db = $database->getConnection();


$str1 = 'Tables_in_';

$output1 = $str1.$dbname;
 /*echo 'console.log('. json_encode( $output1 ) .')';*/
 $sql = "SELECT * FROM  `$table_name`";

 $stmt = $db->prepare($sql);
 $stmt->execute();

 $array = array();
 $products_arr["table_all_record"]=array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
 extract($row);
/*echo '<script>';
  echo 'console.log('. json_encode( $row ) .')';
  echo '</script>';*/

 array_push($array, $row);
 


    //echo $row['Database'] . "\n";
}
echo json_encode($array);
//echo json_encode($products_arr);


?>