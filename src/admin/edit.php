<?php
require_once("./functions/db_functions.php");
require_once("./functions/extra_functions.php");
require_once("./utils/index.php");

$dbh = get_db_connect();
$question_num = 0;
$unfinished = 1;
$y = 0;

if (isset_method("POST")) {
    $sheet_id = get_post("sheet-id");
    $unfinished = get_post("unfinished");
    $y = get_post("scroll-top");
} elseif (isset_method("GET")) {
    $sheet_id = $_GET['id'];
} else {
    redirect("./index.php");
}

$sheet = get_sheet($dbh, $sheet_id);
$questions = get_questions($dbh, $sheet_id);
$inputs = [];
$choices = [];
foreach ($questions as $question) {
    $tmpInputs = get_inputs($dbh, $sheet_id, $question['question_id']);
    foreach ($tmpInputs as $tmpInput) {
        $inputs[] = $tmpInput;
    }
}
foreach ($inputs as $input) {
    $tmpChoices = get_choices($dbh, $sheet_id, $input['question_id'], $input['input_id']);
    foreach ($tmpChoices as $tmpChoice) {
        $choices[] = $tmpChoice;
    }
}

$question_num = count($questions);

$title = "アンケート編集";
include_once("./views/edit_view.php");
