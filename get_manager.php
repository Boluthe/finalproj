<?php

    include "connect.php";

    $filters=[];
    session_start();
    $store=$_SESSION["store"];

    if(isset($_GET["v"])){
        $v = $_GET['v'];
        $filters[] = "id = '$v'";
    }
    $where="";

    if (count($filters) > 0) {
        $where = " AND " . implode(" AND ", $filters);
    }



    $query=mysqli_query($conn, "SELECT * from managers where  store='$store' $where");
    $data=[];
  

    if(mysqli_num_rows($query)<1){
        $data=[
             "status"=>"null"  
            ];

            
    }

    else{
        while( $row=mysqli_fetch_assoc($query)){

         
            $manager=$row["email"];

            $get_branch=mysqli_query($conn, "SELECT * from branches where manager='$manager' and store='$store'");

          

            if (!$get_branch || mysqli_num_rows($get_branch) < 1) {
                // If no branch found, set branch to "no branch"
                $branch = "no branch";
            } else {
                $row2 = mysqli_fetch_assoc($get_branch);
                $branch = $row2["branch"];
            }



                $data[]=[
                    "id"=>$row["id"],
                    "branch"=>$branch,
                    "name"=>$row["name"],
                    "email"=>$row["email"],
                    "phone"=>$row["phone"],     
                ];
            

          
        }
    
    }

   

    echo json_encode($data);
?>

