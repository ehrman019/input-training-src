<?php
require_once("./functions/db_functions.php");
require_once("./functions/extra_functions.php");
require_once("./utils/index.php");

$dbh = get_db_connect();
if (isset_method("GET")) {
    $sheet_id = $_GET['id'];
} else {
    redirect('./index.php');
}
$sheet = get_sheet($dbh, $sheet_id);
$answer_list = get_answer_list($dbh, $sheet_id);
$title = "解答一覧";
include_once("./views/answer_list_view.php");
