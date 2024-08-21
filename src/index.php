<?php
require_once('./functions/db_functions.php');
require_once('./functions/extra_functions.php');

$dbh = get_db_connect();
$sheets = get_sheets($dbh);

$title = "MENU";
include_once("views/index_view.php");
