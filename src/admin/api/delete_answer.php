<?php
require_once("../functions/db_functions.php");
require_once("../functions/extra_functions.php");
require_once("../utils/index.php");


if (isset_method('POST')) {
    header('Content-Type: application/json; charset=UTF-8');
    $js_data = file_get_contents('php://input');
    $data = json_decode($js_data, true);

    $sheet_id = $data['id'];
    $sheet_number = $data['number'];

    $dbh = get_db_connect();
    if (!get_answer_sheet($dbh, $sheet_id, $sheet_number)) {
        echo json_encode(false);
    } else {
        delete_answer_sheet($dbh, $sheet_id, $sheet_number);
        echo true;
    }
}
