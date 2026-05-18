<?php
session_start();
include 'includes/db.php';

/* =========================
   FUNCTIONS (BUSINESS LOGIC)
========================= */

function emailExists($conn, $email) {
    $sql = "SELECT id FROM students WHERE email = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);

    return mysqli_stmt_num_rows($stmt) > 0;
}

function createStudent($conn, $fullname, $email, $phone, $department, $passwordHash) {
    $sql = "INSERT INTO students (name, email, phone, department, password)
            VALUES (?, ?, ?, ?, ?)";

    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "sssss",
        $fullname,
        $email,
        $phone,
        $department,
        $passwordHash
    );

    return mysqli_stmt_execute($stmt);
}

/* =========================
   REGISTRATION PROCESS
========================= */

$error = "";
$success = "";

if (isset($_POST['register'])) {

    $fullname = trim($_POST['fullname']);
    $email = trim($_POST['email']);
    $phone = trim($_POST['phone']);
    $department = trim($_POST['department']);
    $password = $_POST['password'];
    $confirm = $_POST['confirm_password'];

    if (empty($fullname) || empty($email) || empty($phone) || empty($department)) {
        $error = "All fields are required.";
    }
    elseif ($password !== $confirm) {
        $error = "Passwords do not match.";
    }
    elseif (strlen($password) < 6) {
        $error = "Password must be at least 6 characters.";
    }
    elseif (emailExists($conn, $email)) {
        $error = "Email already exists.";
    }
    else {

        $hash = password_hash($password, PASSWORD_DEFAULT);

        $created = createStudent(
            $conn,
            $fullname,
            $email,
            $phone,
            $department,
            $hash
        );

        if ($created) {
            $success = "Registration successful! Redirecting...";
            header("refresh:2;url=login.php");
        } else {
            $error = "Something went wrong. Try again.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Register - Greenfield Institute</title>

<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/register.css">

<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>

<body>

<!-- NAVBAR -->
<nav class="navbar">
    <div class="nav-container">

        <a href="index.php" class="logo-wrapper">
            <div class="logo-icon">
                <div class="logo-shield"></div>

                <div class="logo-text">
                    <span class="logo-text-main">Greenfield</span>
                    <span class="logo-text-sub">Institute</span>
                </div>
            </div>
        </a>

        <ul class="nav-links">
            <li><a href="index.php">Home</a></li>
            <li><a href="courses.php">Courses</a></li>
            <li><a href="login.php">Login</a></li>
            <li><a href="register.php" class="active">Register</a></li>
        </ul>

    </div>
</nav>

<main>
<div class="container">

<div class="form-wrapper">

    <h2>Create Account</h2>

    <?php if ($error): ?>
        <div class="alert error">✗ <?= $error ?></div>
    <?php endif; ?>

    <?php if ($success): ?>
        <div class="alert success">✓ <?= $success ?></div>
    <?php endif; ?>

    <form method="POST">

        <input type="text" name="fullname" placeholder="Full Name" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="text" name="phone" placeholder="Phone" required>

        <select name="department" required>
            <option value="">Select Department</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Data Science">Data Science</option>
            <option value="Business Analytics">Business Analytics</option>
        </select>

        <input type="password" name="password" placeholder="Password" required>
        <input type="password" name="confirm_password" placeholder="Confirm Password" required>

        <button type="submit" name="register">
            Register
        </button>

    </form>

</div>

</div>
</main>

</body>
</html>