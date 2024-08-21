<?php
require_once("./functions/db_functions.php");
require_once("./functions/extra_functions.php");
require_once("./utils/index.php");


$dbh = get_db_connect();
$sheetId = get_sheet_id($dbh) + 1;
$unfinished = 1;
$questionNum = 1;
$y = 0;

if (isset_method("POST")) {
    $questionNum = get_post("question-num");
    $unfinished = get_post("unfinished");
    $y = get_post("scroll-top");
}

$title = "新規アンケート登録";
include_once("./views/register_view.php");
