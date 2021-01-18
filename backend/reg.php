<?php

class Reg {

    private static function validator($data){
        $error = false;
        global $mysql;
        $user = $mysql->query("SELECT * from `user` WHERE `email` = '$data[email]'");
        if ($user->num_rows){
            $error = 'email exist';
        }
        if (empty($data['name'])){
            $error =  'name must not be empty';
        }
        if (empty($data['surname'])){
            $error =  'surame must not be empty';
        }
        if (empty($data['email'])){
            $error =  'email must not be empty';
        }
        if (strlen($data['password']) < 6){
            $error = 'the password must be more than 6 characters';
        }
        if ($error){
            return [
                'status' => false,
                'message' => $error
            ];
        }else{
            return [
                'status' => true,
            ];
            return ;
        }

    }
    public static function run($data){
        global $mysql;
        $res = self::validator($data);

        if ($res['status']){
            $password = md5($data['password']);
            $res = $mysql->query("INSERT INTO `user` (`name`, `surname`, `email`, `password`, `date`) 
                                        VALUES ('$data[name]', '$data[surname]', '$data[email]', '$password', current_timestamp())");
            echo json_encode(['status' => $res]);
        }else{
            echo json_encode($res);
        }

    }
}