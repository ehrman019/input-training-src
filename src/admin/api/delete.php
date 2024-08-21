<?php
require_once("../functions/db_functions.php");
require_once("../functions/extra_functions.php");
require_once("../utils/index.php");


if (isset_method('POST')) {
    header('Content-Type: application/json; charset=UTF-8');
    $js_data = file_get_contents('php://input');
    $id = json_decode($js_data, true);

    $dbh = get_db_connect();
    delete_sheet($dbh, $id);
    echo true;
}
