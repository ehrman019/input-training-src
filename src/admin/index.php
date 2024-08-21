<?php
require_once("./functions/db_functions.php");
require_once("./functions/extra_functions.php");
require_once("./utils/index.php");

$dbh = get_db_connect();
$sheets = get_sheets($dbh);

$title = "HOME";
include_once("views/index_view.php");
