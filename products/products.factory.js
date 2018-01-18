app.factory("productsFactory", function($http){
 
    var factory = {};
 
  

    factory.getbasicdatabase = function()
    {
        return $http({

                method: 'GET',
                url: 'http://localhost:8009/api test/product/showalldatabase.php'

        })
    };
     
 

// read one product
factory.readOneProduct = function(id){
    return $http({
        method: 'GET',
        url: 'http://localhost:8009/api test/product/read_one.php?id=' + id
    });
};
 


 //open database
 factory.opendatabase = function($scope){
    console.log( $scope.dbname);
    return $http({
        method: 'POST',
        data: {
            
            'dbname' : $scope.dbname,
            
        },
        url: 'http://localhost:8009/api test/product/showtables.php'
    });
};
 
 // show all data of selected table

 factory.show_table_alldata = function($scope){
    console.log($scope.table_name);
    return $http({
        method: 'POST',
        data: {
            
            'dbname' : $scope.dbname,
            'table_name' : $scope.table_name
            
        },
        url: 'http://localhost:8009/api test/product/showallcolum.php'
    });
};


//join_table

 factory.join_table = function($scope){
    console.log($scope.first_colum_name , $scope.second_colum_name);
      console.log($scope.dbname,$scope.table_name1, $scope.table_name2);
      console.log($scope.order_by, $scope.order_type)

    return $http({
        method: 'POST',
        data: {
            
            'dbname' : $scope.dbname,
            'first_table_name' : $scope.table_name1,
            'second_table_name': $scope.table_name2,
            'first_colum_name':$scope.first_colum_name,
            'second_colum_name': $scope.second_colum_name,
            'order_by':$scope.order_by,
            'order_type':$scope.order_type
            
        },
        url: 'http://localhost:8009/api test/product/export_csv.php'
    });
};
 

  factory.join_table_simple = function($scope){
    console.log($scope.first_colum_name , $scope.second_colum_name);
      console.log($scope.dbname,$scope.table_name1, $scope.table_name2);
      console.log($scope.order_by, $scope.order_type)

    return $http({
        method: 'POST',
        data: {
            
            'dbname' : $scope.dbname,
            'first_table_name' : $scope.table_name1,
            'second_table_name': $scope.table_name2,
            'first_colum_name':$scope.first_colum_name,
            'second_colum_name': $scope.second_colum_name,
            'order_by':$scope.order_by,
            'order_type':$scope.order_type
            
        },
        url: 'http://localhost:8009/api test/product/join_table.php'
    });
};
 // url: 'http://localhost:8009/api test/product/join_table.php'



 
// searchProducts will be here

// search all products
factory.searchProducts = function(keywords){
    return $http({
        method: 'GET',
        url: 'http://localhost:8009/api test/product/search.php?s=' + keywords
    });
};
     
    return factory;
});