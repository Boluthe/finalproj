<?php
include "connect.php";
session_start();
$store = $_SESSION["store"];

$filters = [];
if (isset($_GET["v"])) {
    $v = $_GET['v'];
    $filters[] = "id = '$v'";
}
$where = "";

if (count($filters) > 0) {
    $where = " AND " . implode(" AND ", $filters);
}

$query = mysqli_query($conn, "SELECT * FROM managers WHERE store='$store' $where");
$data = [];

if (mysqli_num_rows($query) < 1) {
    $data = ["status" => "null"];
} else {
    while ($row = mysqli_fetch_assoc($query)) {
        $manager = $row["email"];
        $get_branch = mysqli_query($conn, "SELECT * FROM branches WHERE manager='$manager' AND store='$store'");

        if (!$get_branch || mysqli_num_rows($get_branch) < 1) {
            $branch = "no branch";
        } else {
            $row2 = mysqli_fetch_assoc($get_branch);
            $branch = $row2["branch"];
        }

        $data[] = [
            "id" => $row["id"],
            "branch" => $branch,
            "name" => $row["name"],
            "email" => $row["email"],
            "phone" => $row["phone"],
        ];
    }
}

echo json_encode($data);
?>