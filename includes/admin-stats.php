<?php
// includes/admin-stats.php

require_once 'db.php';

/* -----------------------------
   TOTAL STUDENTS
------------------------------ */
$studentsQuery = "SELECT COUNT(*) AS total_students FROM students";
$studentsResult = mysqli_query($conn, $studentsQuery);
$totalStudents = mysqli_fetch_assoc($studentsResult)['total_students'];

/* -----------------------------
   TOTAL COURSES
------------------------------ */
$coursesQuery = "SELECT COUNT(*) AS total_courses FROM courses";
$coursesResult = mysqli_query($conn, $coursesQuery);
$totalCourses = mysqli_fetch_assoc($coursesResult)['total_courses'];

/* -----------------------------
   TOTAL REGISTRATIONS
------------------------------ */
$regQuery = "SELECT COUNT(*) AS total_registrations FROM registrations";
$regResult = mysqli_query($conn, $regQuery);
$totalRegistrations = mysqli_fetch_assoc($regResult)['total_registrations'];

/* -----------------------------
   OPTIONAL: MOCK REVENUE
   (since you didn't define payments table yet)
------------------------------ */
$revenue = $totalRegistrations * 500;
?>