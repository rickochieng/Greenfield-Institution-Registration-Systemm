<?php
session_start();

// Clear all session data
$_SESSION = [];

// Destroy session
session_destroy();

// Redirect to home or login
header("Location: index.php");
exit();