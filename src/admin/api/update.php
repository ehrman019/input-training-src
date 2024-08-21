<?php
require_once("../functions/db_functions.php");
require_once("../functions/extra_functions.php");
require_once("../utils/index.php");

if (isset_method("POST")) {
    header('Content-Type: application/json; charset=UTF-8');
    $js_data = file_get_contents('php://input');
    $data = json_decode($js_data, true);

    $dbh = get_db_connect();

    $sheet = $data['sheet'];
    $questions = $data['questions'];
    $inputs = $data['inputs'];
    $choices = $data['choices'];

    update_sheet($dbh, $sheet);
    foreach ($questions as $question) {
        update_question($dbh, $question);
    }
    foreach ($inputs as $input) {
        update_input($dbh, $input);
    }
    foreach ($choices as $choice) {
        update_choice($dbh, $choice);
    }
    echo true;
}
