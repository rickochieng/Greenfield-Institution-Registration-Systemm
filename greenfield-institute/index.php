<?php
session_start();
include 'includes/db.php';

/* OPTIONAL: future enhancement - fetch live stats */
$total_students = 5000;
$total_courses = 50;
$total_faculty = 200;

/* SESSION INFO */
$isLoggedIn = isset($_SESSION['student_id']) || isset($_SESSION['admin_id']);
$username = $_SESSION['student_name'] ?? $_SESSION['admin_name'] ?? null;
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Greenfield Institute | Premier Educational Institution</title>

    <link rel="stylesheet" href="assets/css/base.css">
    <link rel="stylesheet" href="assets/css/index.css">

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>

<body>

<canvas id="particleCanvas"></canvas>

<div class="orb orb-1"></div>
<div class="orb orb-2"></div>
<div class="orb orb-3"></div>
<div class="orb orb-4"></div>

<!-- NAVBAR -->
<nav class="navbar">
    <div class="nav-container">

        <a href="index.php" class="logo-wrapper">
            <div class="logo-icon">
                <div class="logo-shield"></div>

                <div class="logo-text">
                    <span class="logo-text-main">GREENFIELD</span>
                    <span class="logo-text-sub">INSTITUTE</span>
                </div>
            </div>
        </a>

        <ul class="nav-links">

            <li><a href="index.php" class="active">Home</a></li>
            <li><a href="courses.php">Courses</a></li>

            <?php if($isLoggedIn): ?>

                <?php if(isset($_SESSION['student_id'])): ?>
                    <li><a href="student-dashboard.php">Dashboard</a></li>
                <?php elseif(isset($_SESSION['admin_id'])): ?>
                    <li><a href="admin-dashboard.php">Dashboard</a></li>
                <?php endif; ?>

                <li><a href="logout.php">Logout</a></li>

            <?php else: ?>

                <li><a href="login.php">Login</a></li>
                <li><a href="register.php">Register</a></li>

            <?php endif; ?>

        </ul>

        <div class="mobile-menu-btn">
            <i class="fas fa-bars"></i>
        </div>

    </div>
</nav>

<!-- HERO -->
<section class="hero">

    <div class="hero-container">

        <div class="hero-content">

            <div class="hero-badge">
                <span class="badge-dot"></span>
                Since 2010
            </div>

            <h1>
                Shape Your Future at
                <span class="gradient-text">Greenfield</span>
            </h1>

            <!-- WELCOME USER -->
            <?php if($username): ?>
                <div class="welcome-user">
                    Welcome back,
                    <strong><?php echo htmlspecialchars($username); ?></strong> 👋
                </div>
            <?php endif; ?>

            <!-- LIVE STATS (can later connect to DB) -->
            <div class="hero-stats">

                <div class="stat-item">
                    <span class="stat-number"><?php echo $total_students; ?></span>
                    <span class="stat-label">Students</span>
                </div>

                <div class="stat-divider"></div>

                <div class="stat-item">
                    <span class="stat-number"><?php echo $total_faculty; ?></span>
                    <span class="stat-label">Faculty</span>
                </div>

                <div class="stat-divider"></div>

                <div class="stat-item">
                    <span class="stat-number"><?php echo $total_courses; ?></span>
                    <span class="stat-label">Programs</span>
                </div>

            </div>

            <p>
                Join a community of innovators, creators, and leaders.
                Learn skills that shape tomorrow’s careers.
            </p>

            <div class="hero-buttons">

                <a href="register.php" class="btn btn-primary btn-glow">
                    <i class="fas fa-arrow-right"></i>
                    Get Started
                </a>

                <a href="courses.php" class="btn btn-outline">
                    <i class="fas fa-play-circle"></i>
                    Explore Courses
                </a>

            </div>

        </div>

        <!-- VISUAL SECTION (UNCHANGED UI) -->
        <div class="hero-visual">

            <div class="floating-card card-1">
                <i class="fas fa-chalkboard-user"></i>
                <div class="card-content">
                    <h4>Expert Faculty</h4>
                    <p>Learn from industry leaders</p>
                </div>
            </div>

            <div class="floating-card card-2">
                <i class="fas fa-laptop-code"></i>
                <div class="card-content">
                    <h4>Modern Curriculum</h4>
                    <p>Industry-aligned courses</p>
                </div>
            </div>

            <div class="floating-card card-3">
                <i class="fas fa-globe"></i>
                <div class="card-content">
                    <h4>Global Recognition</h4>
                    <p>Certificates worldwide</p>
                </div>
            </div>

            <div class="floating-card card-4">
                <i class="fas fa-clock"></i>
                <div class="card-content">
                    <h4>Flexible Learning</h4>
                    <p>Online & on-campus</p>
                </div>
            </div>

            <div class="hero-glow-effect"></div>

        </div>

    </div>

</section>

<script src="js/main.js"></script>
<script src="js/index-animations.js"></script>

</body>
</html>