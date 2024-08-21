<?php
require_once('../functions/db_functions.php');
require_once('../functions/extra_functions.php');

$dbh = get_db_connect();
if (isset_method('POST')) {
    header('Content-Type: application/json; charset=UTF-8');
    $js_data = file_get_contents('php://input');
    $data = json_decode($js_data, true);

    $sheet_id = $data['sheet_id'];
    $input_data_list = $data['list'];
    $questions = get_questions($dbh, $sheet_id);
    $sheet_name = get_sheet($dbh, $sheet_id)['name'];

    $results = [];
    $pages = [];

    function getKey($results, $page, $question_id, $input_id)
    {
        foreach ($results as $key =>  $result) {
            if ($result['page'] === $page && $result['question_id'] === $question_id && $result['input_id'] === $input_id) {
                return $key;
            }
        }
        return count($results);
    }

    foreach ($input_data_list as $input_data) {
        $page = $input_data['page'];
        $pages[] = $page;
        $sheet_number = $input_data['answer_sheet']['sheet_number'];
        foreach ($input_data['answers'] as $input) {
            $key = getKey($results, $page, $input['question_id'], $input['input_id']);
            if ($key === count($results)) {
                $results[] = ['page' => $page, 'question_id' => $input['question_id'], 'input_id' => $input['input_id'], 'correct' => true];
            }
            $kind = get_input($dbh, $sheet_id, $input['question_id'], $input['input_id'])['kind'];
            $answer = get_answer($dbh, $sheet_id, $sheet_number, $input['question_id'], $input['input_id']);
            if (!$answer) {
                $results[$key]['correct'] = false;
            } else {
                if ($kind === 6 || $kind === 7) {
                    if ($answer['answer_text'] && !$input['answer_text']) {
                        $results[$key]['correct'] = false;
                    } elseif (!$answer['answer_text'] && $input['answer_text']) {
                        $results[$key]['correct'] = false;
                    }
                } elseif ($answer['answer'] !== $input['answer']) {

                    $results[$key]['correct'] = false;
                }
            }
        }
    }

    echo json_encode(["sheet_id" => $sheet_id, "sheet_name" => $sheet_name, "pages" => $pages, "questions" => $questions, "results" => $results]);
}
