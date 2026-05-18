    <?php
include 'includes/db.php';

$name = "Super Admin";
$email = "admin@greenfield.com";
$password = password_hash("admin123", PASSWORD_DEFAULT);

$sql = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, "sss", $name, $email, $password);

if(mysqli_stmt_execute($stmt)){
    echo "Admin created successfully";
} else {
    echo "Failed";
}
?>