<?php
require_once('./functions/db_functions.php');
require_once('./functions/extra_functions.php');

$dbh = get_db_connect();
if (isset_method("GET")) {
    $sheet_id = $_GET['id'];
    $page = $_GET['page'];
} else {
    redirect("index.php");
}

$sheet = get_sheet($dbh, $sheet_id);
$questions = get_questions($dbh, $sheet_id);
$inputs_js = [];
foreach ($questions as $question) {
    $tmpInputs = get_inputs($dbh, $sheet_id, $question['question_id']);
    foreach ($tmpInputs as $tmpInput) {
        $inputs_js[] = $tmpInput;
    }
}

$title = "入力画面";
include_once('views/sheet_view.php');
