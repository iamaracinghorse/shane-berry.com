<?php
$con = mysql_connect('localhost', 'root', '');
if (!$con) { die('Could not connect: ' . mysql_error()); }

$db = mysql_select_db("roompicker", $con);

$query = sprintf("UPDATE users SET room='". $_POST["room"] ."' WHERE id=" . $_POST["index"]);
$result = mysql_query($query);

if (!$result) {
    $message  = 'Invalid query: ' . mysql_error() . "\n";
    $message .= 'Whole query: ' . $query;
    die($message);
}

$rquery = sprintf("SELECT * FROM users");
$return = mysql_query($rquery);

mysql_close($con);

?>