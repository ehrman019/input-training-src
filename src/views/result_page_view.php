<?php include_once("components/header.php") ?>
<div class="result-menu">
    <div class="menu-content">
        <div>
            <button type="button" class="menu-button menu-button-long menu-button-inversion" id="result-button" data-menu-button="long">結果に戻る</button>
        </div>
        <p class="result-menu-title"><?= $sheet['name'] ?>
            <?php if ($sheet_number) : ?>
                <span class="number">No.<?= $sheet_number ?></span>
            <?php else : ?>
                <span class="number">No. ---</span>
            <?php endif; ?>
            <span id="score" class="score"></span>
            <span class="score-text">問正解</span><?= ' / ' . count($questions) ?><span class="score-text">問中</span></span>
        </p>

        <div class="sheet-menu">
            <p class="sheet-menu-text"><?= $page ?> / <span id="page-num"></span><span class="page">page</span></p>
            <button type="button" class="menu-button  menu-button-inversion" id="prev-button" data-menu-button="short">戻る</button>
            <button type="button" class="menu-button" id="next-button" data-menu-button="short">次へ</button>
        </div>
    </div>
</div>

<main>
    <div class="result-sheets-flex">
        <div class="result-sheets-item">
            <div class="result-sheet">
                <p class="result-sheet-err">
                    <?php if (!$sheet_number) : ?>
                        No. が未入力のため判定できませんでした
                    <?php endif ?>
                </p>
                <p class="sheet-title">あなたの入力</p>

                <form>
                    <div class="sheet-index">
                        <div class="sheet-index-number" id="sheet-index-number">
                            <label for="" class="sheet-index-label">No.</label>
                            <input type="text" id="sheet-number" class="readonly">
                        </div>
                        <div class="sheet-index-date" id="sheet-index-date">
                            <label for="" class="sheet-index-label">日付</label>
                            <input type="date" id="sheet-date" class="readonly">
                        </div>
                    </div>
                    <?php foreach ($questions as $question) : ?>
                        <div class="question">
                            <?php if (isset($question['name'])) : ?>
                                <p class="question-title"><?= $question['name'] ?></p>
                            <?php endif; ?>
                            <ul class="input-list">
                                <?php $inputs = get_inputs($dbh, $question['sheet_id'], $question['question_id']) ?>
                                <?php foreach ($inputs as $input) : ?>
                                    <?php $kind = $input['kind']; ?>
                                    <li class="input" id="<?= 'input-back-' . $input['question_id'] . '-' . $input['input_id'] ?>">
                                        <?php if (!empty($input['name'])) :  ?>
                                            <label class="input-name<?php if ($kind === 4 || $kind === 5 || $kind === 6) echo 'input-name-inline' ?>"> <?= $input['name'] ?></label>
                                        <?php endif; ?>
                                        <?php $choices = get_choices($dbh, $input['sheet_id'], $input['question_id'], $input['input_id']); ?>
                                        <?php include("components/choices_result.php"); ?>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endforeach; ?>
                </form>
            </div>
        </div>
        <div class="result-sheets-item result-sheets-item-answer">
            <div class="result-sheet">
                <p class="result-sheet-err">
                    <?php if (!$answer_sheet && $sheet_number) : ?>
                        このNo.の回答は存在しません
                    <?php endif ?>
                </p>
                <p class="sheet-title">実際の回答</p>
                <form>
                    <div class="sheet-index">
                        <div class="sheet-index-number">
                            <label for="" class="sheet-index-label">No.</label>
                            <input type="text" id="answer-sheet-number" value="<?php if ($sheet_number) echo $sheet_number ?>" class="readonly">
                        </div>
                        <div>
                            <label for="" class="sheet-index-label">日付</label>
                            <input type="date" id="answer-sheet-date" value="<?php if (isset($answer_sheet)) echo $answer_sheet['sheet_date'] ?>" class="readonly">
                        </div>
                    </div>
                    <?php foreach ($questions as $question) : ?>
                        <div class="question">
                            <?php if (isset($question['name'])) : ?>
                                <p class="question-title"><?= $question['name'] ?></p>
                            <?php endif; ?>
                            <ul class="input-list">
                                <?php $inputs = get_inputs($dbh, $question['sheet_id'], $question['question_id']) ?>
                                <?php foreach ($inputs as $input) : ?>
                                    <?php $kind = $input['kind']; ?>
                                    <li class="input">
                                        <?php if (isset($answer_sheet_id)) $answer = get_answer($dbh, $sheet_id, $sheet_number, $input['question_id'], $input['input_id']); ?>
                                        <?php if (!empty($input['name'])) :  ?>
                                            <label class="input-name<?php if ($kind === 4 || $kind === 5 || $kind === 6) echo 'input-name-inline' ?>"> <?= $input['name'] ?></label>
                                        <?php endif; ?>
                                        <?php $choices = get_choices($dbh, $input['sheet_id'], $input['question_id'], $input['input_id']); ?>
                                        <?php include("components/choices_answer.php"); ?>
                                    </li>
                                <?php endforeach; ?>
                            </ul>
                        </div>
                    <?php endforeach; ?>
                </form>
            </div>
        </div>
    </div>
</main>

<script>
    const sheetId = Number(<?= h($sheet_id) ?>);
    const page = Number(<?= h($page) ?>);
    const question_inputs = <?= json_encode($question_inputs_js, true); ?>;
    const inputs = <?= json_encode($inputs_js, true); ?>;
</script>
<script src="./js/utils.js"></script>
<script src="./js/buttons.js"></script>
<script src="./js/resultPage.js"></script>

</body>

</html>
