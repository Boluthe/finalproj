


<?php
include "connect.php";
session_start();

$store = $_SESSION['store'];
$filters = [];
$order = "";



if (!empty($_SESSION['branch'])) {
    $branch = $_SESSION['branch'];
    $filters[] = "branch = '$branch'";
}







// Check for filters
if (!empty($_GET['supplier'])) {
    $supplier = mysqli_real_escape_string($conn, $_GET['supplier']);
    $filters[] = "supplier = '$supplier'";
}


if (!empty($_GET['category'])) {
    $category = mysqli_real_escape_string($conn, $_GET['category']);
    $filters[] = "category = '$category'";
}



if(isset($_GET["v"])){
    $v = htmlentities($_GET['v']) ;
    $filters[] = "branch = '$v'";
}


if(isset($_GET["q"])){
    $q = $_GET['q'];
    $filters[] = "id = '$q'";
}


if (!empty($_GET['search'])) {
    $search = mysqli_real_escape_string($conn, $_GET['search']);
    $filters[] = "name like '%$search%'";
}

// Build the WHERE clause
$where = "";
if (count($filters) > 0) {
    $where = " AND " . implode(" AND ", $filters);
}



// Handle sorting
if (!empty($_GET['sort_by'])) {
    $sort_by = mysqli_real_escape_string($conn, $_GET['sort_by']);

    $sort_by = $sort_by==="expiry date"?'date':$sort_by;
    $sort_order = isset($_GET['order']) && strtolower($_GET['order']) === 'descending' ? 'DESC' : 'ASC';
    $order = "ORDER BY $sort_by $sort_order";
}

// Query with filters and sorting
$query = mysqli_query($conn, "SELECT * FROM inventory WHERE store='$store'   $where $order");

$data = [];

if(mysqli_num_rows($query)<1){
    $data = [
        "status" => "null"
    ];
}

else{
    while ($row = mysqli_fetch_assoc($query)) {
      
     
     
            $data[] = [
                "status" => "success",
                "name" => $row["name"],
                "id" => $row["id"],
                "supplier" => $row["supplier"],
                "category" => $row["category"],
                "image" => $row["image"],
                "date" => date("d/m/Y", strtotime($row["date"])),
                "quantity" => $row["quantity"]
            ];
        
     
    }
}


echo json_encode($data);
?>
