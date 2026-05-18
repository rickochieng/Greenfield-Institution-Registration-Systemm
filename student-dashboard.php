<?php
session_start();
include 'includes/db.php';

/* -----------------------------
   AUTH CHECK
------------------------------ */
if(!isset($_SESSION['student_id'])){
    header("Location: login.php");
    exit();
}

$student_id = $_SESSION['student_id'];

/* -----------------------------
   GET STUDENT INFO
------------------------------ */
$sql = "SELECT * FROM students WHERE id = '$student_id'";
$result = mysqli_query($conn, $sql);
$student = mysqli_fetch_assoc($result);

/* -----------------------------
   GET ENROLLED COURSES
------------------------------ */

$courses_sql = "
    SELECT c.*
    FROM courses c
    INNER JOIN registrations r ON c.id = r.course_id
    WHERE r.student_id = '$student_id'
";

$courses_result = mysqli_query($conn, $courses_sql);

$enrolled_courses = [];
$total_credits = 0;

while($row = mysqli_fetch_assoc($courses_result)){
    $enrolled_courses[] = $row;
    $total_credits += $row['credits'];
}

$courses_count = count($enrolled_courses);

/* -----------------------------
   BASIC METRICS (demo logic)
------------------------------ */

$completion_rate = ($courses_count > 0)
    ? round(($courses_count / 6) * 100) . "%"
    : "0%";

$gpa = ($courses_count > 0)
    ? number_format(2.5 + ($courses_count * 0.2), 1)
    : "0.0";

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Dashboard - Greenfield Institute</title>

    <link rel="stylesheet" href="assets/css/base.css">
    <link rel="stylesheet" href="assets/css/student-dashboard.css">

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>

<body>

<!-- NAVBAR -->
<nav class="navbar">
    <div class="nav-container">

        <a href="index.php" class="logo">
            Greenfield<span>Institute</span>
        </a>

        <ul class="nav-links">
            <li><a href="student-dashboard.php" class="active">Dashboard</a></li>
            <li><a href="courses.php">Browse Courses</a></li>
            <li><a href="logout.php">Logout</a></li>
        </ul>

    </div>
</nav>

<main>
<div class="container">

    <!-- WELCOME -->
    <div class="welcome-banner">

        <div>
            <h1>
                Welcome back,
                <?php echo htmlspecialchars($student['name']); ?>!
            </h1>

            <p>Your learning journey is in motion 🚀</p>

            <div class="student-badge">

                <i class="fas fa-id-card"></i>
                ID: <?php echo $student['id']; ?>

                |

                <i class="fas fa-envelope"></i>
                <?php echo $student['email']; ?>

            </div>

        </div>

    </div>

    <!-- STATS -->
    <div class="stats-grid">

        <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-book"></i></div>
            <div class="stat-info">
                <div class="stat-number"><?php echo $courses_count; ?></div>
                <div class="stat-label">Enrolled Courses</div>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-star"></i></div>
            <div class="stat-info">
                <div class="stat-number"><?php echo $total_credits; ?></div>
                <div class="stat-label">Total Credits</div>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-chart-line"></i></div>
            <div class="stat-info">
                <div class="stat-number"><?php echo $completion_rate; ?></div>
                <div class="stat-label">Completion Rate</div>
            </div>
        </div>

        <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-trophy"></i></div>
            <div class="stat-info">
                <div class="stat-number"><?php echo $gpa; ?></div>
                <div class="stat-label">Current GPA</div>
            </div>
        </div>

    </div>

    <!-- QUICK ACTIONS -->
    <div class="quick-actions">

        <button onclick="location.href='courses.php'" class="btn btn-primary">
            <i class="fas fa-plus"></i> Register for Courses
        </button>

        <button class="btn btn-secondary">
            <i class="fas fa-download"></i> Download Schedule
        </button>

    </div>

    <!-- MAIN CONTENT -->
    <div style="display:grid; grid-template-columns:1fr 1fr; gap:2rem;">

        <!-- MY COURSES -->
        <div>

            <h2>My Current Courses</h2>

            <div class="card">

                <?php if($courses_count == 0): ?>

                    <p>No courses enrolled yet.</p>

                <?php else: ?>

                    <ul>

                        <?php foreach($enrolled_courses as $course): ?>

                            <li>
                                <?php echo $course['name']; ?>
                                (<?php echo $course['code']; ?>)
                            </li>

                        <?php endforeach; ?>

                    </ul>

                <?php endif; ?>

            </div>

        </div>

        <!-- RIGHT SIDE -->
        <div>

            <h2>Today's Schedule</h2>

            <div class="card">

                <?php foreach($enrolled_courses as $course): ?>
                    <p>
                        📘 <?php echo $course['name']; ?> - 10:00 AM
                    </p>
                <?php endforeach; ?>

            </div>

            <h2 style="margin-top:2rem;">Upcoming Assignments</h2>

            <div class="card">
                <p>📌 Web Project - Friday</p>
                <p>📌 Quiz Submission - Monday</p>
            </div>

        </div>

    </div>

    <!-- ANNOUNCEMENTS -->
    <div style="margin-top:2rem;">

        <h2>Announcements</h2>

        <div class="card">

            <p>📢 Mid-semester exams scheduled next month.</p>
            <p>📢 Course registration closing soon.</p>
            <p>📢 New AI workshop available.</p>

        </div>

    </div>

</div>
</main>

<!-- FOOTER -->
<footer class="footer">

    <div class="footer-content">

        <div class="footer-section">
            <h3>Greenfield Institute</h3>
            <p>Empowering futures through quality education.</p>
        </div>

    </div>

</footer>

<script src="../js/main.js"></script>

</body>
</html>