<?php
//connection
$DBConInfo = [
    'server' => '127.0.0.1',
    'username' => 'root',
    'password' => '',
    'name' => 'test',
];
$DBCon = new mysqli(
    $DBConInfo['server'],
    $DBConInfo['username'],
    $DBConInfo['password'],
    $DBConInfo['name']
);
//Check that the connection is correct
if ($DBCon->connect_errno) {
    echo "failed to connect" . $DBCon->connect_error;
    exit();
}
