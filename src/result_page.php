<?php
require_once('./functions/db_functions.php');
require_once('./functions/extra_functions.php');

$dbh = get_db_connect();
if (isset_method("GET")) {
    $sheet_id = $_GET['id'];
    $page = $_GET['page'];
    $sheet_number = $_GET['number'];
} else {
    redirect("result.php?id=" . $sheet_id);
}

$sheet = get_sheet($dbh, $sheet_id);
$questions = get_questions($dbh, $sheet_id);
$question_inputs_js = [];
$inputs_js = [];
foreach ($questions as $question) {
    $tmpInputs = get_inputs($dbh, $sheet_id, $question['question_id']);
    $question_inputs_js[] = ['question_id' => $question['question_id'], 'inputs' => $tmpInputs];
    foreach ($tmpInputs as $tmpInput) {
        $inputs_js[] = $tmpInput;
    }
}

$answer_sheet = get_answer_sheet($dbh, $sheet_id, $sheet_number);
$answer_sheet && $answer_sheet_id = $answer_sheet['id'];

$title = "結果詳細";
include_once('./views/result_page_view.php');
