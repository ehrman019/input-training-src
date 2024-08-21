<?php
function h($word)
{
    return htmlspecialchars($word, ENT_QUOTES, 'UTF-8');
}

function isset_method($key)
{
    if ($_SERVER['REQUEST_METHOD'] === $key) {
        return true;
    } else {
        return false;
    }
}

function get_post($key)
{
    if (isset($_POST[$key])) {
        return $_POST[$key];
    }
}

function redirect($url)
{
    header('Location: ' . $url);
}

function getSelected($number, $choice_id)
{
    if ($number === $choice_id) {
        return true;
    }
}

function getCheckboxSelected($numbers, $choice_id)
{
    $check = false;
    foreach ($numbers as $number) {
        if (getSelected((int)$number, $choice_id)) {
            $check = true;
        }
    }
    return $check;
}
