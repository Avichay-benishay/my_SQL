<?php
require_once('DBconnect.php');
require_once('product.php');
$ProDB = new Product($DBCon);

//sand data in post to delete
if (isset($_POST['id'])) {
    $ProDB->delete((int)$_POST['id']);
}


