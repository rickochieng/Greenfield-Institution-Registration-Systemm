<?php
session_start();
include 'includes/db.php';

/* -----------------------------
   FETCH COURSES FROM DATABASE
------------------------------ */

$sql = "
    SELECT 
        c.id,
        c.code,
        c.name,
        c.credits,
        c.instructor,
        c.capacity,
        COUNT(r.id) AS enrolled
    FROM courses c
    LEFT JOIN registrations r 
        ON c.id = r.course_id
    GROUP BY c.id
";

$result = mysqli_query($conn, $sql);

$courses = [];

while($row = mysqli_fetch_assoc($result)){
    $courses[] = $row;
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>
        Course Catalog - Greenfield Institute
    </title>

    <!-- CSS -->
    <link rel="stylesheet"
          href="assets/css/base.css">

    <link rel="stylesheet"
          href="assets/css/courses.css">

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap"
          rel="stylesheet">

    <!-- Icons -->
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">

    <!-- EXTRA BUTTON STYLE -->
    <style>

        .dashboard-btn-wrapper{
            margin-top: 1.5rem;
            display: flex;
            justify-content: center;
        }

        .dashboard-btn{
            background: #16a34a;
            color: white;
            padding: 12px 24px;
            border-radius: 10px;
            text-decoration: none;
            font-weight: 600;
            transition: 0.3s ease;
        }

        .dashboard-btn:hover{
            background: #15803d;
            transform: translateY(-2px);
        }

    </style>

</head>

<body>

<!-- NAVBAR -->
<nav class="navbar">

    <div class="nav-container">

        <a href="index.php" class="logo-wrapper">

            <div class="logo-icon">

                <div class="logo-shield"></div>

                <div class="logo-text">

                    <span class="logo-text-main">
                        GREENFIELD
                    </span>

                    <span class="logo-text-sub">
                        INSTITUTE
                    </span>

                </div>

            </div>

        </a>

        <ul class="nav-links">

            <li>
                <a href="index.php">Home</a>
            </li>

            <li>
                <a href="courses.php" class="active">
                    Courses
                </a>
            </li>

            <?php if(isset($_SESSION['student_id'])): ?>

                <li>
                    <a href="student-dashboard.php">
                        Dashboard
                    </a>
                </li>

                <li>
                    <a href="logout.php">
                        Logout
                    </a>
                </li>

            <?php else: ?>

                <li>
                    <a href="login.php">Login</a>
                </li>

                <li>
                    <a href="register.php">
                        Register
                    </a>
                </li>

            <?php endif; ?>

        </ul>

    </div>

</nav>

<!-- MAIN -->
<main>

<div class="container">

    <!-- HEADER -->
    <div class="page-header">

        <h1>Course Catalog</h1>

        <p>
            Explore available courses
            and enroll instantly
        </p>

        <!-- DASHBOARD BUTTON -->
        <?php if(isset($_SESSION['student_id'])): ?>

            <div class="dashboard-btn-wrapper">

                <a href="student-dashboard.php"
                   class="dashboard-btn">

                    <i class="fas fa-arrow-left"></i>

                    Back to Dashboard

                </a>

            </div>

        <?php endif; ?>

    </div>

    <!-- SEARCH -->
    <div class="search-section">

        <div class="search-container">

            <div class="search-wrapper">

                <i class="fas fa-search"></i>

                <input type="text"
                       id="searchInput"
                       placeholder="Search courses...">

            </div>

        </div>

    </div>

    <!-- COURSES -->
    <div class="courses-grid"
         id="courses-container">

        <?php foreach($courses as $course): ?>

            <?php

            /* =========================
               CHECK IF STUDENT ENROLLED
            ========================= */

            $student_id =
                $_SESSION['student_id'] ?? 0;

            $checkEnroll = mysqli_query(
                $conn,
                "SELECT * FROM registrations
                 WHERE student_id='$student_id'
                 AND course_id='{$course['id']}'"
            );

            $alreadyEnrolled =
                mysqli_num_rows($checkEnroll) > 0;

            ?>

            <div class="course-card"
                 data-name="<?php echo strtolower($course['name']); ?>">

                <h3>
                    <?php echo $course['name']; ?>
                </h3>

                <p>
                    <strong>Code:</strong>
                    <?php echo $course['code']; ?>
                </p>

                <p>
                    <strong>Instructor:</strong>
                    <?php echo $course['instructor']; ?>
                </p>

                <p>
                    <strong>Credits:</strong>
                    <?php echo $course['credits']; ?>
                </p>

                <p>
                    <strong>Enrolled:</strong>

                    <?php echo $course['enrolled']; ?>

                    /

                    <?php echo $course['capacity']; ?>
                </p>

                <!-- ENROLL BUTTON -->
                <?php if(isset($_SESSION['student_id'])): ?>

                    <?php if($alreadyEnrolled): ?>

                        <button class="btn"
                                disabled>

                            Already Enrolled

                        </button>

                    <?php else: ?>

                        <form method="POST"
                              action="enroll.php">

                            <input type="hidden"
                                   name="course_id"
                                   value="<?php echo $course['id']; ?>">

                            <button type="submit"
                                    class="btn btn-primary">

                                Enroll

                            </button>

                        </form>

                    <?php endif; ?>

                <?php else: ?>

                    <a href="login.php"
                       class="btn btn-primary">

                        Login to Enroll

                    </a>

                <?php endif; ?>

            </div>

        <?php endforeach; ?>

    </div>

</div>

</main>

<!-- FOOTER -->
<footer class="footer">

    <div class="footer-content">

        <div class="footer-section">

            <h3>Greenfield Institute</h3>

            <p>
                Empowering futures
                through quality education.
            </p>

        </div>

    </div>

</footer>

<!-- JS -->
<script src="js/main.js"></script>

<script>

const searchInput =
    document.getElementById("searchInput");

const cards =
    document.querySelectorAll(".course-card");

searchInput.addEventListener("input", function() {

    let value =
        this.value.toLowerCase();

    cards.forEach(card => {

        let name =
            card.dataset.name;

        card.style.display =
            name.includes(value)
                ? "block"
                : "none";

    });

});

</script>

</body>
</html>