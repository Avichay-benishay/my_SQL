<?php
require_once('DBconnect.php');
require_once('product.php');
$ProDB = new Product($DBCon);

//sand data in post to update
$date = $_POST['dataup'];
$ProDB->update((int)$date['id'], $date['name'], $date['description'], (int)$date['price'], $date['picture'], (int)$date['oldId']);


