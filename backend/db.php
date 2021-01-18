<?php
$db = [
    'host' => 'localhost',
    'user' => 'id14622875_ocfm_db',
    'password' => ']<X0/@ie1&dfo^4o',
    'db' => 'id14622875_ocfm'
];
$mysql =  new mysqli($db['host'],$db['user'],$db['password'],$db['db']);
if ($mysql -> connect_errno) {
    echo "Error: " . $mysql -> connect_error;
    exit();
}