<?php
class Database{
 
    // specify your own database credentials
    private $host = "localhost";
    public $db_name = "api_db";
    private $username = "root";
    private $password = "";
    public $conn;
 
    // get the database connection
    public function __construct($name)
    {
        $this->db_name = $name;
    }
    public function getConnection(){
 
        $this->conn = null;
 
        try{
            $this->conn = new PDO("mysql:host=" . $this->host . ";port=3307;dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
 
        return $this->conn;
    }
}


?>