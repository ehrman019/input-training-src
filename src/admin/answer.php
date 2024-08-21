<?php
require_once("./functions/db_functions.php");
require_once("./functions/extra_functions.php");
require_once("./utils/index.php");

$dbh = get_db_connect();
if (isset_method("GET")) {
    $sheet_id = $_GET['id'];
    if (isset($_GET['number'])) {
        $sheet_number = $_GET['number'];
    }
    if (isset($_GET['register'])) {
        $register_number = $_GET['register'];
    }
    if (isset($_GET['delete'])) {
        $delete_number = $_GET['delete'];
    }
} else {
    redirect("./index.php");
}

if (isset($sheet_number)) {
    $answer_sheet = get_answer_sheet($dbh, $sheet_id, $sheet_number);
    if ($answer_sheet) {
        $answer_sheet_id = $answer_sheet['id'];
    }
}

$sheet = get_sheet($dbh, $sheet_id);
if (!$sheet) {
    redirect("index.php");
}
if (isset($register_number)) {
    if (!get_answer_sheet($dbh, $sheet_id, $register_number)) {
        redirect("answer.php?id=" . $sheet_id);
    }
}

$questions = get_questions($dbh, $sheet_id);
$inputs_js = [];
foreach ($questions as $question) {
    $tmpInputs = get_inputs($dbh, $sheet_id, $question['question_id']);
    foreach ($tmpInputs as $tmpInput) {
        $inputs_js[] = $tmpInput;
    }
}




$title = "解答の入力";
include_once("./views/answer_view.php");
