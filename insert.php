<?php
require_once('DBconnect.php');
require_once('product.php');
$ProDB = new Product($DBCon);

//sand data in post to insert
$date = $_POST['datain'];
$ProDB->insert((int)$date['id'], $date['name'], $date['description'], (int)$date['price'], $date['picture']);

