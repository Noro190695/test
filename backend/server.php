<?php
header('Access-Control-Allow-Origin: *');

error_reporting(E_ALL);
ini_set('display_errors', 1);


require_once "./db.php";

if(!empty($_POST)){
    if ($_POST['rest'] === 'login'){
        require './login.php';
        Login::run($_POST);
    }
    if ($_POST['rest'] === 'reg'){
        require './reg.php';
        Reg::run($_POST);
    }
    if ($_POST['rest'] === 'contact'){

        require './contact.php';
        Contact::run($_POST);
    }
}
