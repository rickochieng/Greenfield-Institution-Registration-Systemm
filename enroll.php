<?php
session_start();
include 'includes/db.php';

/* =========================
   CHECK LOGIN
========================= */

if(!isset($_SESSION['student_id'])){
    header("Location: login.php");
    exit();
}

$student_id = $_SESSION['student_id'];

/* =========================
   GET COURSE ID
========================= */

if(isset($_POST['course_id'])){

    $course_id = $_POST['course_id'];

    /* =========================
       PREVENT DUPLICATE ENROLLMENT
    ========================= */

    $check = mysqli_query(
        $conn,
        "SELECT * FROM registrations 
         WHERE student_id='$student_id'
         AND course_id='$course_id'"
    );

    if(mysqli_num_rows($check) == 0){

        $sql = "
            INSERT INTO registrations(student_id, course_id)
            VALUES('$student_id', '$course_id')
        ";

        mysqli_query($conn, $sql);
    }
}

/* =========================
   REDIRECT BACK
========================= */

header("Location: courses.php");
exit();
?>