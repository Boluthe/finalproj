


<?php
include "connect.php";
session_start();

$store = $_SESSION['store'] ?? "";
$sql = "SELECT * FROM inventory WHERE store = ?";
$types = "s";
$params = [$store];
$order = "";

if ($store === "") {
    echo json_encode(["status" => "null"]);
    exit();
}

if (!empty($_SESSION['branch'])) {
    $sql .= " AND branch = ?";
    $types .= "s";
    $params[] = $_SESSION['branch'];
}

if (!empty($_GET['supplier'])) {
    $sql .= " AND supplier = ?";
    $types .= "s";
    $params[] = $_GET['supplier'];
}

if (!empty($_GET['category'])) {
    $sql .= " AND category = ?";
    $types .= "s";
    $params[] = $_GET['category'];
}

if (isset($_GET["v"]) && $_GET["v"] !== "") {
    $sql .= " AND branch = ?";
    $types .= "s";
    $params[] = $_GET["v"];
}

if (isset($_GET["q"])) {
    $q = filter_input(INPUT_GET, "q", FILTER_VALIDATE_INT);
    if ($q) {
        $sql .= " AND id = ?";
        $types .= "i";
        $params[] = $q;
    }
}

if (!empty($_GET['search'])) {
    $sql .= " AND name LIKE ?";
    $types .= "s";
    $params[] = "%" . $_GET['search'] . "%";
}

if (!empty($_GET['sort_by'])) {
    $sort_by = strtolower(trim($_GET['sort_by']));
    $sort_map = [
        'name' => 'name',
        'supplier' => 'supplier',
        'category' => 'category',
        'quantity' => 'quantity',
        'date' => 'date',
        'expiry date' => 'date',
        'id' => 'id'
    ];
    if (isset($sort_map[$sort_by])) {
        $sort_order = (isset($_GET['order']) && strtolower($_GET['order']) === 'descending') ? 'DESC' : 'ASC';
        $order = " ORDER BY " . $sort_map[$sort_by] . " " . $sort_order;
    }
}

$stmt = mysqli_prepare($conn, $sql . $order);
mysqli_stmt_bind_param($stmt, $types, ...$params);
mysqli_stmt_execute($stmt);
$query = mysqli_stmt_get_result($stmt);

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
mysqli_stmt_close($stmt);
?>
