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

/*echo '<script>';
  echo 'console.log('. json_encode( $data ) .')';
  echo '</script>';*/
$dbname = $data->dbname;
$first_table_name = $data->first_table_name;
$second_table_name = $data->second_table_name;
$first_colum_name = $data->first_colum_name;
$second_colum_name = $data->second_colum_name;
$order_by = $data->order_by;
$order_type = $data->order_type;



/*echo '<script>';
  echo 'console.log('. json_encode( $dbname ) .')';
  echo '</script>';*/
$database = new Database($dbname);
$db = $database->getConnection();



 //SELECT * FROM categories, products WHERE categories.id = products.id
 $sql = "SELECT * FROM `$first_table_name`,`$second_table_name` WHERE `$first_table_name`.`$first_colum_name` =`$second_table_name`.`$second_colum_name` ORDER BY  `$first_table_name`.`$order_by` $order_type";

/*echo '<script>';
  echo 'console.log('. json_encode( $sql ) .')';
  echo '</script>';
*/
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