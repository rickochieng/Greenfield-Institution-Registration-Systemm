<?php
session_start();
include 'includes/db.php';

/* -----------------------------
   SECURITY CHECK (ADMIN ONLY)
------------------------------ */
if (!isset($_SESSION['admin_id'])) {
    header("Location: login.php");
    exit();
}

/* -----------------------------
   DASHBOARD DATA FROM DATABASE
------------------------------ */

// Total students
$studentsResult = mysqli_query($conn, "SELECT COUNT(*) AS total FROM students");
$students = mysqli_fetch_assoc($studentsResult)['total'];

// Total courses
$coursesResult = mysqli_query($conn, "SELECT COUNT(*) AS total FROM courses");
$courses = mysqli_fetch_assoc($coursesResult)['total'];

// Total registrations
$regResult = mysqli_query($conn, "SELECT COUNT(*) AS total FROM registrations");
$registrations = mysqli_fetch_assoc($regResult)['total'];

/* -----------------------------
   RECENT REGISTRATIONS (JOIN)
------------------------------ */

$recentQuery = "
SELECT 
    r.id,
    s.name AS student_name,
    c.name AS course_name
FROM registrations r
JOIN students s ON r.student_id = s.id
JOIN courses c ON r.course_id = c.id
ORDER BY r.id DESC
LIMIT 5
";

$recent = mysqli_query($conn, $recentQuery);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Greenfield Institute</title>

    <link rel="stylesheet" href="assets/css/base.css">
    <link rel="stylesheet" href="assets/css/admin-dashboard.css">

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>

<body>

<!-- NAVBAR -->
<nav class="navbar">
    <div class="nav-container">

        <a href="admin-dashboard.php" class="logo">
            Greenfield<span>Institute</span>
        </a>

        <ul class="nav-links">
            <li><a href="admin-dashboard.php" class="active">Dashboard</a></li>
            <li><a href="admin-manage-courses.php">Manage Courses</a></li>
            <li><a href="logout.php">Logout</a></li>
        </ul>

    </div>
</nav>


<!-- MAIN -->
<main>
<div class="container">

    <!-- HEADER -->
    <div class="admin-header">
        <h1>Admin Dashboard</h1>
    </div>

    <!-- STATS (REAL DATA) -->
    <div class="stats-grid">

        <div class="stat-card">
            <div class="stat-number"><?= $students ?></div>
            <div class="stat-label">Total Students</div>
        </div>

        <div class="stat-card">
            <div class="stat-number"><?= $courses ?></div>
            <div class="stat-label">Active Courses</div>
        </div>

        <div class="stat-card">
            <div class="stat-number"><?= $registrations ?></div>
            <div class="stat-label">Total Registrations</div>
        </div>

        <div class="stat-card">
            <div class="stat-number">KSH 0</div>
            <div class="stat-label">Revenue (Mock)</div>
        </div>

    </div>


    <!-- QUICK ACTIONS -->
    <div style="margin-top: 2rem;">
        <h2>Quick Actions</h2>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;">

            <a href="admin-manage-courses.php" class="quick-action-card">
                <i class="fas fa-plus-circle"></i>
                <h3>Add Course</h3>
                <p>Create new course offering</p>
            </a>

            <a href="#" class="quick-action-card">
                <i class="fas fa-user-graduate"></i>
                <h3>Manage Students</h3>
                <p>View student records</p>
            </a>

            <a href="#" class="quick-action-card">
                <i class="fas fa-chart-line"></i>
                <h3>Reports</h3>
                <p>Analytics dashboard</p>
            </a>

        </div>
    </div>


    <!-- RECENT REGISTRATIONS -->
    <div style="margin-top:2rem;">
        <h2>Recent Registrations</h2>

        <table class="data-table">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Student</th>
                    <th>Course</th>
                </tr>
            </thead>

            <tbody>

                <?php while($row = mysqli_fetch_assoc($recent)): ?>

                <tr>
                    <td><?= $row['id'] ?></td>
                    <td><?= $row['student_name'] ?></td>
                    <td><?= $row['course_name'] ?></td>
                </tr>

                <?php endwhile; ?>

            </tbody>

        </table>

    </div>

</div>
</main>


<!-- FOOTER -->
<footer class="footer">
    <div class="footer-bottom">
        <p>&copy; 2024 Greenfield Institute</p>
    </div>
</footer>

</body>
</html>