<?php
function get_db_connect()
{
    try {
        $host = 'mysql';
        $dbname = $_ENV['DB_DATABASE'];
        $username = 'root';
        $password = $_ENV['DB_PASSWORD'];

        $dbh = new PDO("mysql:host={$host};dbname={$dbname};charset=utf8", $username, $password);
    } catch (PDOException $e) {
        echo ('接続エラー: ' . $e->getMessage());
        die();
    }
    $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $dbh;
}

function get_sheets($dbh)
{
    $sql = "SELECT * FROM sheets";
    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}

function get_sheet($dbh, $sheet_id)
{
    $sql = "SELECT * FROM sheets WHERE id = :sheet_id";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    return $data;
}

function get_questions($dbh, $sheet_id)
{
    $sql = "SELECT * FROM questions WHERE sheet_id = :sheet_id ORDER BY question_id ASC";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}

function get_inputs($dbh, $sheet_id, $question_id)
{
    $sql = "SELECT * FROM inputs WHERE sheet_id = :sheet_id && question_id = :question_id ORDER BY input_id ASC";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
    $stmt->bindValue(':question_id', $question_id, PDO::PARAM_INT);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}

function get_choices($dbh, $sheet_id, $question_id, $input_id)
{
    $sql = "SELECT * FROM choices WHERE sheet_id = :sheet_id && question_id = :question_id && input_id = :input_id ORDER BY choice_id ASC";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
    $stmt->bindValue(':question_id', $question_id, PDO::PARAM_INT);
    $stmt->bindValue(':input_id', $input_id, PDO::PARAM_INT);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}

function get_answer_sheet($dbh, $sheet_id, $sheet_number)
{
    $sql = "SELECT * FROM answer_sheets WHERE sheet_id = :sheet_id && sheet_number = :sheet_number";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
    $stmt->bindValue(':sheet_number', $sheet_number, PDO::PARAM_STR);
    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    return $data;
}

function get_answer($dbh, $sheet_id, $sheet_number, $question_id, $input_id)
{
    $sql = "SELECT * FROM answer_sheets JOIN answers ON answer_sheets.id = answers.answer_sheet_id WHERE answer_sheets.sheet_id = :sheet_id && answer_sheets.sheet_number = :sheet_number && answers.question_id = :question_id && answers.input_id = :input_id";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
    $stmt->bindValue(':sheet_number', $sheet_number, PDO::PARAM_STR);
    $stmt->bindValue(':question_id', $question_id, PDO::PARAM_INT);
    $stmt->bindValue(':input_id', $input_id, PDO::PARAM_INT);
    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    return $data;
}

function get_input($dbh, $sheet_id, $question_id, $input_id)
{
    $sql = "SELECT * FROM inputs WHERE sheet_id = :sheet_id && question_id = :question_id && input_id = :input_id";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
    $stmt->bindValue(':question_id', $question_id, PDO::PARAM_INT);
    $stmt->bindValue(':input_id', $input_id, PDO::PARAM_INT);
    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    return $data;
}
