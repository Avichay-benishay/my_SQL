<?php
require_once('DBconnect.php');
require_once('product.php');
$ProDB = new Product($DBCon);

//make json
$arr = $ProDB->getProduct();
echo json_encode($arr);