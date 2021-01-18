<?php

class Contact {
    private static function get($id){
        global $mysql;
        $contact = [];
        $res = $mysql->query("SELECT * FROM `contacts` WHERE `user_id` = $id");

        if ($res->num_rows){
            foreach ($res as $val){
                $contact[] = $val;
            }

            echo json_encode([
                'status' => true,
                'contact' => $contact
            ]);
        }else{
            echo json_encode([
                'status' => false
            ]);
        }


    }
    private static function add($data){
        global $mysql;
        $res = $mysql->query("INSERT INTO `contacts` (`user_id`, `contact`, `date`) 
                                VALUES ('$data[id]', '$data[contact]', current_timestamp())");
        if($res){
            self::get($data['id']);
        }
    }
    private static function delete($data){
        global $mysql;
        $res = $mysql->query("DELETE FROM `contacts` WHERE `contacts`.`id` = $data[id]");
        if($res){
            self::get($data['user_id']);
        }
    }
    private static function edit($data){
        global $mysql;
        $data['contact_id'] = (int)$data['contact_id'];
        $res = $mysql->query("UPDATE `contacts` SET `contact` = '$data[contact]', `date` = current_timestamp() WHERE `contacts`.`id` = $data[contact_id]");
        if($res){
            self::get($data['id']);
        }
    }
    public static function run($post) {
        $post['id'] = (int)$post['id'];
        switch ($_POST['method']){
            case 'GET':
                self::get($post['id']);
            break;
            case 'POST':
                self::add($post);
            break;
            case 'DELETE':
                self::delete($post);
            break;
            case 'PUT':
                self::edit($post);
            break;
        }
    }


}
