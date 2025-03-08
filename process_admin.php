<?php

    include "connect.php";
    include "functions.php";




    header('Content-Type: application/json');


    try {
        // Check if required fields are set
      
    
        // Retrieve and sanitize form data
        $username = htmlspecialchars($_POST['name']);
        $email = htmlspecialchars($_POST['email']);
        $phone = htmlspecialchars($_POST['phone']);
        $store = htmlspecialchars($_POST['store']);
        $password = $_POST['password']; // Securely hash the password
    
        // Connect to the database

    
        if (!$conn) {
            throw new Exception('Database connection failed: ' . mysqli_connect_error());
        }



       
        



        $query="SELECT * FROM admin WHERE email=?";
    
        $stmt=mysqli_stmt_init($conn);

        if(!mysqli_stmt_prepare($stmt, $query)){
          
            exit();
        }
    
        
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $result= mysqli_stmt_get_result($stmt);
    
        if($row=mysqli_fetch_assoc($result)){
            echo json_encode(['status' => 'used_email']);
            exit();
           
            
        }



        $query2="SELECT * FROM admin WHERE store=?";
    
        $stmt=mysqli_stmt_init($conn);

        if(!mysqli_stmt_prepare($stmt, $query2)){
          
            exit();
        }
    
        
        mysqli_stmt_bind_param($stmt, "s", $store);
        mysqli_stmt_execute($stmt);
        $result2= mysqli_stmt_get_result($stmt);
    
        if($row2=mysqli_fetch_assoc($result2)){
            echo json_encode(['status' => 'used_store']);
            exit();
           
            
        }




        else if (invalid_password($password)) {
            echo json_encode(['status' => 'invalid_password']);
            exit();
            
 
        }

        else{

            $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
          
            $stmt = mysqli_prepare($conn, 'INSERT INTO admin (name, email, phone, password, store) VALUES (?, ?, ?, ?,?)');
            if (!$stmt) {
                throw new Exception('Failed to prepare statement: ' . mysqli_error($conn));
            }
        
            // Bind the parameters
            mysqli_stmt_bind_param($stmt, 'sssss', $username, $email, $phone, $password, $store);
        
            // Execute the statement
            if (!mysqli_stmt_execute($stmt)) {
                throw new Exception('Failed to execute statement: ' . mysqli_stmt_error($stmt));
            }
        
            // Close the statement and connection
            mysqli_stmt_close($stmt);
            mysqli_close($conn);
        
            // Send success response
            echo json_encode(['status' => 'success']);
        }

  



        // Prepare the SQL statement
       
    } catch (Exception $e) {
        // Send error response
        echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
    }

?>