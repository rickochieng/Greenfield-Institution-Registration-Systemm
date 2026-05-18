<?php
session_start();
include 'includes/db.php';

/* -------------------------
   SECURITY CHECK
-------------------------- */
if (!isset($_SESSION['admin_id'])) {
    header("Location: login.php");
    exit();
}

/* -------------------------
   ADD / UPDATE COURSE
-------------------------- */
if (isset($_POST['save_course'])) {

    $id = $_POST['course_id'] ?? null;
    $code = $_POST['course_code'];
    $name = $_POST['course_name'];
    $credits = $_POST['course_credits'];
    $instructor = $_POST['course_instructor'];
    $capacity = $_POST['course_capacity'];

    if ($id) {
        // UPDATE
        $stmt = mysqli_prepare($conn,
            "UPDATE courses 
             SET code=?, name=?, credits=?, instructor=?, capacity=? 
             WHERE id=?"
        );
        mysqli_stmt_bind_param($stmt, "ssissi", $code, $name, $credits, $instructor, $capacity, $id);
        mysqli_stmt_execute($stmt);

    } else {
        // INSERT
        $stmt = mysqli_prepare($conn,
            "INSERT INTO courses (code, name, credits, instructor, capacity)
             VALUES (?, ?, ?, ?, ?)"
        );
        mysqli_stmt_bind_param($stmt, "ssisi", $code, $name, $credits, $instructor, $capacity);
        mysqli_stmt_execute($stmt);
    }

    header("Location: admin-manage-courses.php");
    exit();
}

/* -------------------------
   DELETE COURSE
-------------------------- */
if (isset($_GET['delete'])) {

    $id = intval($_GET['delete']);

    mysqli_query($conn, "DELETE FROM courses WHERE id=$id");

    header("Location: admin-manage-courses.php");
    exit();
}

/* -------------------------
   FETCH COURSES + ENROLLMENT COUNT
-------------------------- */

$sql = "
SELECT 
    c.*,
    (SELECT COUNT(*) FROM registrations r WHERE r.course_id = c.id) AS enrolled
FROM courses c
";

$courses = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Manage Courses</title>

<link rel="stylesheet" href="assets/css/base.css">
<link rel="stylesheet" href="assets/css/admin-courses.css">
</head>

<body>

<!-- NAV -->
<nav class="navbar">
    <div class="nav-container">
        <a href="admin-dashboard.php" class="logo">Greenfield<span>Institute</span></a>

        <ul class="nav-links">
            <li><a href="admin-dashboard.php">Dashboard</a></li>
            <li><a href="admin-manage-courses.php" class="active">Courses</a></li>
            <li><a href="logout.php">Logout</a></li>
        </ul>
    </div>
</nav>

<main>
<div class="container">

<h1>Course Management</h1>

<!-- TABLE -->
<table class="data-table">

<thead>
<tr>
    <th>Code</th>
    <th>Name</th>
    <th>Credits</th>
    <th>Instructor</th>
    <th>Capacity</th>
    <th>Enrolled</th>
    <th>Actions</th>
</tr>
</thead>

<tbody>

<?php while($row = mysqli_fetch_assoc($courses)): ?>

<tr>
    <td><?= $row['code'] ?></td>
    <td><?= $row['name'] ?></td>
    <td><?= $row['credits'] ?></td>
    <td><?= $row['instructor'] ?></td>
    <td><?= $row['capacity'] ?></td>
    <td><?= $row['enrolled'] ?></td>

    <td>
        <a href="?delete=<?= $row['id'] ?>" onclick="return confirm('Delete course?')">
            Delete
        </a>
    </td>
</tr>

<?php endwhile; ?>

</tbody>

</table>


<!-- SIMPLE ADD COURSE FORM (REAL BACKEND) -->
<h2>Add Course</h2>

<form method="POST">

    <input type="hidden" name="course_id" id="course_id">

    <input type="text" name="course_code" placeholder="Code" required>
    <input type="text" name="course_name" placeholder="Name" required>

    <select name="course_credits">
        <option value="2">2 Credits</option>
        <option value="3">3 Credits</option>
        <option value="4">4 Credits</option>
    </select>

    <input type="text" name="course_instructor" placeholder="Instructor" required>
    <input type="number" name="course_capacity" placeholder="Capacity" required>

    <button type="submit" name="save_course">
        Save Course
    </button>

</form>

</div>
</main>

</body>
</html>