<?php


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
 


$csv_export = '';
// query to get data from database
$sql = "SELECT * FROM $first_table_name, $second_table_name WHERE $first_table_name.$first_colum_name = $second_table_name.$second_colum_name ORDER BY  $first_table_name.$order_by $order_type";

 $stmt = $db->prepare($sql);
 $stmt->execute();



/*$filename = date('d.m.Y').'.csv';

       $filename = date('d.m.Y').'.csv';

     $list = array ();

            // Append results to array
            array_push($list, array("## START OF USER TABLE ##"));
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                array_push($list, array_values($row));
            }
            array_push($list, array("## END OF USER TABLE ##"));

            // Output array into CSV file
            $fp = fopen('php://output', 'w');
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment; filename="'.$filename.'"');
            foreach ($list as $ferow) {
                fputcsv($fp, $ferow);
            }*/

            //Fetch all of the rows from our MySQL table.
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

 
//Get the column names.
$columnNames = array();
if(!empty($rows)){
    //We only need to loop through the first row of our result
    //in order to collate the column names.
    $firstRow = $rows[0];
    foreach($firstRow as $colName => $val){
        $columnNames[] = $colName;
    }
}

//Setup the filename that our CSV will have when it is downloaded.
$fileName = 'mysql-export.csv';
 
//Set the Content-Type and Content-Disposition headers to force the download.
header('Content-Type: application/excel');
header('Content-Disposition: attachment; filename="' . $fileName . '"');
 
//Open up a file pointer
$fp = fopen('php://output', 'w');
 
//Start off by writing the column names to the file.
fputcsv($fp, $columnNames);
 
//Then, loop through the rows and write them to the CSV file.
foreach ($rows as $row) {
    fputcsv($fp, $row);
}
 
//Close the file pointer.
fclose($fp);


?>