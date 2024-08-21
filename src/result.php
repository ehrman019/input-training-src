<?php
require_once('./functions/db_functions.php');
require_once('./functions/extra_functions.php');


if (isset_method("GET")) {
    $sheet_id = $_GET['id'];
    if (isset($_GET['prev'])) {
        $prev = true;
    } else {
        $prev = false;
    }
} else {
    redirect("index.php");
}

$title = "結果発表";
include_once('./views/result_view.php');
