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

function get_sheet($dbh, $sheet_id)
{
    $sql = "SELECT * FROM sheets WHERE id = :sheet_id";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    return $data;
}

function get_sheets($dbh)
{
    $sql = "SELECT * FROM sheets";
    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}

function get_sheet_id($dbh)
{
    $sql = "SELECT MAX(id) FROM sheets";
    $stmt = $dbh->prepare($sql);
    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    return $data["MAX(id)"];
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


function insert_sheet($dbh, $name)
{
    $sql = "INSERT INTO sheets(name) VALUE (:name)";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':name', $name, PDO::PARAM_STR);
    $stmt->execute();
}

function insert_question($dbh, $data, $id)
{
    $sql = "INSERT INTO questions(sheet_id,question_id,name) VALUE(:id,:question_id,:name)";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->bindValue(':question_id', $data['question_id'], PDO::PARAM_INT);
    $stmt->bindValue(':name', $data['name'], PDO::PARAM_STR);
    $stmt->execute();
}

function insert_input($dbh, $data, $id)
{
    $sql = "INSERT INTO inputs(sheet_id,question_id,input_id,kind,name) VALUE(:id,:question_id,:input_id,:kind,:name)";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->bindValue(':question_id', $data['question_id'], PDO::PARAM_INT);
    $stmt->bindValue(':input_id', $data['input_id'], PDO::PARAM_INT);
    $stmt->bindValue(':kind', $data['kind'], PDO::PARAM_INT);
    $stmt->bindValue(':name', $data['name'], PDO::PARAM_STR);
    $stmt->execute();
}

function insert_choice($dbh, $data, $id)
{
    $sql = "INSERT INTO choices(sheet_id,question_id,input_id,choice_id,name) VALUE(:id,:question_id,:input_id,:choice_id,:name)";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $stmt->bindValue(':question_id', $data['question_id'], PDO::PARAM_INT);
    $stmt->bindValue(':input_id', $data['input_id'], PDO::PARAM_INT);
    $stmt->bindValue(':choice_id', $data['choice_id'], PDO::PARAM_INT);
    $stmt->bindValue(':name', $data['name'], PDO::PARAM_STR);
    $stmt->execute();
}

function update_sheet($dbh, $sheet)
{
    $sql = "UPDATE sheets SET name=:name WHERE id = :id";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':id', $sheet['id'], PDO::PARAM_INT);
    $stmt->bindValue(':name', $sheet['name'], PDO::PARAM_STR);
    $stmt->execute();
}

function update_question($dbh, $question)
{
    $sql = "UPDATE questions SET name=:name WHERE id = :id";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':id', $question['id'], PDO::PARAM_INT);
    $stmt->bindValue(':name', $question['name'], PDO::PARAM_STR);
    $stmt->execute();
}

function update_input($dbh, $input)
{
    $sql = "UPDATE inputs SET name=:name WHERE id = :id";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':id', $input['id'], PDO::PARAM_INT);
    $stmt->bindValue(':name', $input['name'], PDO::PARAM_STR);
    $stmt->execute();
}

function update_choice($dbh, $choice)
{
    $sql = "UPDATE choices SET name=:name WHERE id = :id";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':id', $choice['id'], PDO::PARAM_INT);
    $stmt->bindValue(':name', $choice['name'], PDO::PARAM_STR);
    $stmt->execute();
}

function delete_sheet($dbh, $sheet_id)
{
    $sql = "DELETE FROM sheets WHERE id = :sheet_id";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
    $stmt->execute();
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

function get_answers($dbh, $sheet_id, $sheet_number)
{
    $sql = "SELECT * FROM answer_sheets JOIN answers ON answer_sheets.id = answers.answer_sheet_id  WHERE answer_sheets.sheet_id = :sheet_id && answer_sheets.sheet_number = :sheet_number";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
    $stmt->bindValue(':sheet_number', $sheet_number, PDO::PARAM_STR);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}

function get_answer($dbh, $answer_sheet_id,  $question_id, $input_id)
{
    $sql = "SELECT * FROM answers WHERE answer_sheet_id = :answer_sheet_id && question_id = :question_id && input_id = :input_id";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':answer_sheet_id', $answer_sheet_id, PDO::PARAM_INT);
    $stmt->bindValue(':question_id', $question_id, PDO::PARAM_INT);
    $stmt->bindValue(':input_id', $input_id, PDO::PARAM_INT);
    $stmt->execute();
    $data = $stmt->fetch(PDO::FETCH_ASSOC);
    return $data;
}

function insert_answer_sheet($dbh, $answer_sheet)
{
    $sql = "INSERT INTO answer_sheets(sheet_id,sheet_number,sheet_date)VALUE(:sheet_id,:sheet_number,:sheet_date)";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':sheet_id', $answer_sheet['sheet_id'], PDO::PARAM_INT);
    $stmt->bindValue(':sheet_number',  $answer_sheet['sheet_number'], PDO::PARAM_STR);
    $stmt->bindValue(':sheet_date', $answer_sheet['sheet_date'], PDO::PARAM_STR);
    $stmt->execute();
}

function insert_answer($dbh, $answer)
{
    $sql = "INSERT INTO answers(answer_sheet_id,question_id,input_id,answer,answer_text) VALUE(:answer_sheet_id,:question_id,:input_id,:answer,:answer_text)";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':answer_sheet_id', $answer['answer_sheet_id'], PDO::PARAM_INT);
    $stmt->bindValue(':question_id', $answer['question_id'], PDO::PARAM_INT);
    $stmt->bindValue(':input_id', $answer['input_id'], PDO::PARAM_INT);
    $stmt->bindValue(':answer', $answer['answer'], PDO::PARAM_STR);
    $stmt->bindValue(':answer_text', $answer['answer_text'], PDO::PARAM_STR);
    $stmt->execute();
}

function update_answer($dbh, $answer)
{
    $sql = "UPDATE answers SET answer = :answer ,answer_text = :answer_text WHERE id = :id";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':id', $answer['id'], PDO::PARAM_INT);
    $stmt->bindValue(':answer', $answer['answer'], PDO::PARAM_STR);
    $stmt->bindValue(':answer_text', $answer['answer_text'], PDO::PARAM_STR);
    $stmt->execute();
}

function get_answer_list($dbh, $sheet_id)
{
    $sql = "SELECT * FROM answer_sheets WHERE sheet_id = :sheet_id";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $data;
}

function delete_answer_sheet($dbh, $sheet_id, $sheet_number)
{
    $sql = "DELETE FROM answer_sheets WHERE sheet_id = :sheet_id && sheet_number = :sheet_number";
    $stmt = $dbh->prepare($sql);
    $stmt->bindValue(':sheet_id', $sheet_id, PDO::PARAM_INT);
    $stmt->bindValue(':sheet_number', $sheet_number, PDO::PARAM_STR);
    $stmt->execute();
}
