<?php
include "connect.php";
session_start();
$where = "";
$filters = [];
$store = $_SESSION["store"];

if (isset($_GET["v"])) {
    $v = htmlentities($_GET['v']);
    $filters[] = "branch = '$v'";
}

if (count($filters) > 0) {
    $where = " AND " . implode(" AND ", $filters);
}

$query = mysqli_query($conn, "SELECT * FROM branches WHERE store='$store' $where");
$data = [];

if (mysqli_num_rows($query) < 1) {
    $data = ["status" => "null"];
} else {
    while ($row = mysqli_fetch_assoc($query)) {
        $branch_name = $row["branch"];
        $get_quantity = mysqli_query($conn, "SELECT SUM(quantity) as total_quantity FROM inventory WHERE branch='$branch_name' AND store='$store'");
        $row2 = mysqli_fetch_assoc($get_quantity);
        $totalQuantity = $row2["total_quantity"];
        $total = $totalQuantity === null ? "0" : $totalQuantity;

        $data[] = [
            "id" => $row["id"],
            "branch" => $row["branch"],
            "store" => $row["store"],
            "address" => $row["address"],
            "manager_name" => $row["manager_name"],
            "manager" => $row["manager"],
            "total" => $total
        ];
    }
}

echo json_encode($data);
?>