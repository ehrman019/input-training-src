<?php
require_once("../functions/db_functions.php");
require_once("../functions/extra_functions.php");
require_once("../utils/index.php");


if (isset_method('POST')) {
    header('Content-Type: application/json; charset=UTF-8');
    $js_data = file_get_contents('php://input');
    $data = json_decode($js_data, true);

    $dbh = get_db_connect();

    $sheet = $data['sheet'];
    $questions = $data['questions'];
    $inputs = $data['inputs'];
    $choices = $data['choices'];

    insert_sheet($dbh, $sheet['name']);
    $sheet_id = get_sheet_id($dbh);
    foreach ($questions as $question) {
        insert_question($dbh, $question, $sheet_id);
    }
    foreach ($inputs as $input) {
        insert_input($dbh, $input, $sheet_id);
    }
    foreach ($choices as $choice) {
        insert_choice($dbh, $choice, $sheet_id);
    }
    echo json_encode($sheet_id);
}
