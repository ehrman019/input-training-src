<?php
require_once("../functions/db_functions.php");
require_once("../functions/extra_functions.php");
require_once("../utils/index.php");


if (isset_method('POST')) {
    header('Content-Type: application/json; charset=UTF-8');
    $js_data = file_get_contents('php://input');
    $data = json_decode($js_data, true);
    $answer_sheet = $data['answer_sheet'];
    $answers = $data['answers'];

    $dbh = get_db_connect();

    $prev_answer_sheet = get_answer_sheet($dbh, $answer_sheet['sheet_id'], $answer_sheet['sheet_number']);

    if (!$data['update'] && $prev_answer_sheet) {
        foreach ($answers as $key => $answer) {
            $prev_answer = get_answer($dbh, $prev_answer_sheet['id'], $answer['question_id'], $answer['input_id']);
            $answers[$key]['id'] = $prev_answer['id'];
        }
        $answer_sheet['id'] = $prev_answer_sheet['id'];
        $data['update'] = true;
        $data['answer_sheet'] = $answer_sheet;
        $data['answers'] = $answers;
        echo json_encode($data);
    } elseif ($data['update']) {
        foreach ($answers as $answer) {
            update_answer($dbh, $answer);
        }
        echo json_encode(['sheet_id' => $answer_sheet['sheet_id'], 'sheet_number' => $answer_sheet['sheet_number']]);
    } elseif (!$data['update']) {
        insert_answer_sheet($dbh, $answer_sheet);
        $answer_sheet = get_answer_sheet($dbh, $answer_sheet['sheet_id'], $answer_sheet['sheet_number']);
        foreach ($answers as $answer) {
            $answer["answer_sheet_id"] = $answer_sheet['id'];
            insert_answer($dbh, $answer);
        }
        echo json_encode(['update' => false]);
    } else {
        redirect("./index.php");
    }
}
