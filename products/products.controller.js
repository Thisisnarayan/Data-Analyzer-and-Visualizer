

app.directive('fileModel', [
    '$parse',
    function ($parse) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind('change', function(){
            scope.$apply(function(){
              if (attrs.multiple) {
                modelSetter(scope, element[0].files);
              }
              else {
                modelSetter(scope, element[0].files[0]);
              }
            });
          });
        }
      };
    }
  ]);

//datashowController

app.controller('datashowController', function($scope,$rootScope, productsFactory,$modal,$rootScope,$modalInstance,$timeout){
  
  console.log($rootScope.show_all_data);
  $scope.alldata = $rootScope.show_all_data;
 // $scope.xx = Object.keys($scope.alldata[0]);
  //console.log($scope.xx);

   $scope.cancel = function()
     {
         $modalInstance.dismiss();
     }
$scope.CreateTableFromJSON = function () {
        

        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 0; i < $scope.alldata.length; i++) {
            for (var key in $scope.alldata[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < $scope.alldata.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = $scope.alldata[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }

    $timeout(function(){
$scope.CreateTableFromJSON(); 
    },1000);
    });

app.controller('newctrl', function($scope, productsFactory,$modal,$rootScope){
   
//alert('controller hit');
$scope.pro = {};
$scope.u ={};
$scope.user = {};
$scope.user.title = "root";
$scope.user.name = "localhost";
$scope.user.pass ="";
$scope.oneAtATime = true;
$scope.Transformhide = false;
$scope.finalresult = false;

$scope.username = 'root';
$scope.password ='';
$scope.host = 'localhost';

//$scope.hide_because_of_sql = false;
//$scope.hide_because_of_csv = true;

$scope.sql_show = function()
{
  
$scope.hide_because_of_sql = false;
$scope.hide_because_of_csv = true;
}
$scope.show_csv_content = function()
{   $scope.hide_because_of_sql = true;
$scope.hide_because_of_csv = false;
  
   var fileUpload = document.getElementById("fileUpload");
   console.log(fileUpload);
    var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            var reader = new FileReader();
            reader.onload = function (e) {
                var table = document.createElement("table");
                var rows = e.target.result.split("\n");
                for (var i = 0; i < rows.length; i++) {
                    var row = table.insertRow(-1);
                    var cells = rows[i].split(",");
                    for (var j = 0; j < cells.length; j++) {
                        var cell = row.insertCell(-1);
                        cell.innerHTML = cells[j];
                    }
                }
                var dvCSV = document.getElementById("dvCSV");
                dvCSV.innerHTML = "";
                dvCSV.appendChild(table);
            }
            reader.readAsText(fileUpload.files[0]);
        } else {
            alert("This browser does not support HTML5.");
        }
    } else {
        alert("Please upload a valid CSV file.");
    }
}


$scope.modalOpen = function(size, header, body, footer) {
        $scope.items = [header, body, footer]
        var modalInstance = $modal.open({
            show: false,
            
            keyboard: true,
            scope: $scope,
            templateUrl: './product/datashow.html',
            controller: 'datashowController',
            size: size,
            resolve: {
                items: function() {
                    return $scope.items;
                }
            }
        });

    };

$scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
  };

  $scope.oneAtATime = true;

  

 //see specific database
$scope.content_type = function(value)
{
   console.log(value);
   $scope.contenttype = value;
}

$scope.selected_column_to_sort = function(value)
{
   console.log(value);
  
   
            
   $scope.order_by = value.table_name;


   console.log($scope.order_by);


}

 $scope.platformchange = function(value)
 {
   console.log(value);

   $scope.order_type = value;
   console.log($scope.order_type);

   
 }


 $scope.getfinalresult = function()
 {  


    console.log($scope.first_colum_name , $scope.second_colum_name);
      console.log($scope.dbname,$scope.table_name1, $scope.table_name2);
      console.log($scope.order_by, $scope.order_type);

    if($scope.contenttype == 'Csv')
    {
        
         console.log('going to Transform');


     
                          
                         

     productsFactory.join_table($scope).then(function successCallback(response){
 
        
        

        var anchor = angular.element('<a/>');
     anchor.attr({
         href: 'data:attachment/csv;charset=utf-8,' + encodeURI(response.data),
         target: '_blank',
         download: 'joindata.csv'
     })[0].click();
 
    },
    function errorCallback(response) {
        //$scope.showToast("Unable to update record.");
        console.log("Unable to update record.");
    });
    }
    else
    {
        
    productsFactory.join_table_simple($scope).then(function successCallback(response){
       
         console.log(response.data);

         $rootScope.show_all_data = response.data;
         $scope.modalOpen('lg','','','')

    },
    function errorCallback(response) {
        //$scope.showToast("Unable to update record.");
        console.log("Unable to update record.");
    });

    }
 }
 $scope.Transform = function()
 {
   
$scope.finalresult = true;



 }

  $scope.handleDrop = function(item, bin) {

        console.log(item,bin);

         $scope.table_name = item;
   
        $scope.tookthebin1 = [];
        $scope.tookthebin2 = [];
    



   
    console.log('api call');
    console.log($scope.tookthebin1.length);
     console.log($scope.tookthebin2.length);
    if($scope.tookthebin1.length == 0 && bin == "bin1")
    {    
        $scope.table_name1 = item;
        productsFactory.show_table_alldata($scope).then(function successCallback(response){
 
    
         console.log(response.data);
          $scope.showkeys = [];
           $scope.forbin1keys  = [];
           for(var k in response.data[0]) 
           {

            $scope.showkeys.push(k);

           } 

         console.log($scope.showkeys);
          

        for(var i =0 ; i < $scope.showkeys.length ; i++)
        {
            $scope.forbin1keys.push(
            {
                "id" : i,
                "table_name":$scope.showkeys[i]

            })
        }
        console.log( $scope.forbin1keys);
            //$scope.forbin1keys = $scope.showkeys;
            $scope.tookthebin1.push[1];
         
         
        console.log('table4 open');
 
    },
    function errorCallback(response) {
        //$scope.showToast("Unable to update record.");
        console.log("Unable to update record.");
    });

    }
    else
    {
        console.log('alredy used bin1');
    }

    if($scope.tookthebin2.length == 0 && bin == "bin2")
    {  

         $scope.table_name2 = item;
        productsFactory.show_table_alldata($scope).then(function successCallback(response){
 
    
         console.log(response.data);
          $scope.showkeys = [];
           $scope.forbin2keys = [];
           for(var k in response.data[0]) 
           {

            $scope.showkeys.push(k);

           } 

         console.log($scope.showkeys);
          
 for(var i =0 ; i < $scope.showkeys.length ; i++)
        {
            $scope.forbin2keys.push(
            {
                "id" : i,
                "table_name":$scope.showkeys[i]

            })
        }
        console.log( $scope.forbin2keys);
         
            //$scope.forbin2keys = $scope.showkeys;
            $scope.tookthebin2.push[1];
         
         
        console.log('table4 open');
 
    },
    function errorCallback(response) {
        //$scope.showToast("Unable to update record.");
        console.log("Unable to update record.");
    });

    }
    else
    {
        console.log('alredy used bin2');
    }
      
   

  }
    
  
$scope.show = false;
  $scope.setjoinvalue = function()
  {
    $scope.show = true;
  }


$scope.select_first_column = function(value)
{
  $scope.column1 = value;

} 

$scope.select_second_column = function(value)
{
  $scope.column2 = value;
  
} 

  $scope.go_do_join = function(column1, column2)
  {   

      console.log($scope.column1, $scope.column2);

      for(var i =0 ; i < $scope.forbin1keys.length ; i++)
      {
            if($scope.column1 == $scope.forbin1keys[i].id)
            {
                $scope.first_colum_name = $scope.forbin1keys[i].table_name;
            }
      }

      for(var i =0 ; i < $scope.forbin2keys.length ; i++)
      {
        if($scope.column2 == $scope.forbin2keys[i].id)
            {
                $scope.second_colum_name = $scope.forbin2keys[i].table_name;
            }
      }

      console.log($scope.first_colum_name , $scope.second_colum_name);
      console.log($scope.dbname,$scope.table_name1, $scope.table_name2);

     $scope.Transformhide = true;
     //api call is inside the transform function

  }
 $scope.getthevalueofdatabase = function(value)
 {
     $scope.dbname = value; 
   productsFactory.opendatabase($scope).then(function successCallback(response){
 
    
         console.log(response.data);
         $scope.tabletoshow=response.data.database_table;
        console.log('database open');
 
    },
    function errorCallback(response) {
        //$scope.showToast("Unable to update record.");
        console.log("Unable to update record.");
    });
 }

//selected table


 // see all databses

 $scope.searchProducts = function(){
 
    // use products factory

    console.log('get databses');
    productsFactory.getbasicdatabase().then(function successCallback(response){
        
        $scope.products = response.data.records;
    }, function errorCallback(response){
        $scope.showToast("Unable to read record.");
    });
}
$scope.searchProducts();

$scope.pro.showfiles = "";
console.log($scope.pro.showfiles);
 $scope.$watch('pro.showfiles', function() {
        
        console.log('watch file');
        console.log( $scope.pro.showfiles);
        
        var filedetails = $scope.pro.showfiles;
        if (filedetails !== undefined) {
            $scope.u.fileName = filedetails.name;
            $scope.u.fileSize = filedetails.size;
        }

    })
   

  $scope.parsethefile = function()
  {
    console.log($scope.pro.showfiles);
    //e.preventDefault();
     $scope.u.fileName.parse({
        config: {
            delimiter: "auto",
            complete: displayHTMLTable,
        },
        before: function(file, inputElem)
        {
            console.log("Parsing file...", file);
        },
        error: function(err, file)
        {
            console.log("ERROR:", err, file);
        },
        complete: function()
        {
            console.log("Done with all files");
        }
    });
  }

 

 });

app.directive('draggable', function() {
  return function(scope, element) {
    // this gives us the native JS object
    var el = element[0];
   // console.log(el);
    el.draggable = true;
    
    el.addEventListener(
      'dragstart',
      function(e) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('Text', this.id);
        this.classList.add('drag');
        return false;
      },
      false
    );
    
    el.addEventListener(
      'dragend',
      function(e) {
        this.classList.remove('drag');
        return false;
      },
      false
    );
  }
});

app.directive('droppable', function() {
  return {
    scope: {
      drop: '&',
      bin: '='
    },
    link: function(scope, element) {
      // again we need the native object
      var el = element[0];
        //console.log(el);
      el.addEventListener(
        'dragover',
        function(e) {
          e.dataTransfer.dropEffect = 'move';
          // allows us to drop
          if (e.preventDefault) e.preventDefault();
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragenter',
        function(e) {
          this.classList.add('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'dragleave',
        function(e) {
          this.classList.remove('over');
          return false;
        },
        false
      );
      
      el.addEventListener(
        'drop',
        function(e) {
          // Stops some browsers from redirecting.
          if (e.stopPropagation) e.stopPropagation();
          
          this.classList.remove('over');
          
          var binId = this.id;
          var item = document.getElementById(e.dataTransfer.getData('Text'));
          console.log(item);
          this.appendChild(item);
          
          // call the passed drop function
          scope.$apply(function(scope) {
            var fn = scope.drop();
            if ('undefined' !== typeof fn) {            
              fn(item.id, binId);
            }
          });
          
          return false;
        },
        false
      );
    }
  }
});
