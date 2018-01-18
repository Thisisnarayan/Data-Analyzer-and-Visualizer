<?php
class showalldatabases{
 
    // database connection and table name
    private $conn;
    //private $table_name = "categories";
 
    // object properties
   
 
    public function __construct($db){
        $this->conn = $db;
    }
 
    // used by select drop-down list
    public function allread(){
 
    // select all query
//$dbs = $dbh->query( 'SHOW DATABASES' );
    $query = "SHOW DATABASES";
 
    // prepare query statement
    $stmt = $this->conn->prepare($query);
 
    // execute query
    $stmt->execute();
    
    echo 'console.log('. json_encode( $stmt ) .')';
    return $stmt;
}





}
?>