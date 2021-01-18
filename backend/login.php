<?php

class Login {

    public static function run($data){
        global $mysql;
            $password = md5($data['password']);
            $res = $mysql->query("SELECT * FROM `user` WHERE `email` = '$data[email]' AND `password` = '$password'");
            if ($res->num_rows){
                echo json_encode([
                    'status' => true,
                    'data' => $res->fetch_assoc()
                ]);
            }else{
                echo json_encode([
                    'status' => false,
                    'message' => 'Incorrect login or password'
                ]);
            }

    }

}