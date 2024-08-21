<?php include_once("components/header.php") ?>
<div class="menu">
    <div class="menu-content">
        <div class="answer-menu">
            <button type="button" class="menu-button" data-menu-button="" id="list-button">一覧表示</button>
            <div class="answer-search">
                <div class="sheet-index-number">
                    <label for="" class="sheet-index-label">シートNo.</label>
                    <input type="text" name="sheet-number" id="search-sheet-number" value="<?php if (isset($sheet_number)) echo $sheet_number ?>">
                </div>
                <button type="submit" class="menu-button" data-menu-button="" id="search-button">検索</button>
            </div>
            <button type="button" class="menu-button menu-button-inversion" data-menu-button="" id="delete-button">削除</button>


            <p class="menu-submit-inavlid" id="menu-submit-invalid">
                <?php if (isset($sheet_number) && !$answer_sheet) : ?>
                    <?= "このNo.のシートは存在しません" ?>
                <?php elseif (isset($delete_number)) : ?>
                    <?= "No." . $delete_number . "を削除しました" ?>
                <?php endif; ?>
            </p>

        </div>

        <div class="menu-submit">

            <p class="menu-submit-inavlid menu-submit-register" id="invalid">
                <?php if (isset($register_number)) : ?>
                    <?= "No." . $register_number . "を登録しました" ?>
                <?php endif; ?>
            </p>


            <button type="button" id="submit-button" class="menu-button" data-menu-button="">登録</button>
        </div>
    </div>
</div>

<main>
    <div class="sheet">
        <p class="sheet-title"><?= $sheet['name'] ?></p>
        <div class="sheet-index">
            <div class="sheet-index-number">
                <label for="" class="sheet-index-label">No.</label>
                <input type="text" id="sheet-number" value="<?php if (isset($sheet_number) && $answer_sheet) echo $sheet_number ?>">
            </div>
            <div>
                <label for="" class="sheet-index-label">日付</label>
                <input type="date" id="sheet-date" value="<?php if (isset($answer_sheet)) echo $answer_sheet['sheet_date'] ?>">
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
                            <?php if (isset($answer_sheet_id)) $answer = get_answer($dbh, $answer_sheet_id, $input['question_id'], $input['input_id']); ?>
                            <?php if (!empty($input['name'])) :  ?>
                                <label class="input-name<?php if ($kind === 4 || $kind === 5 || $kind === 6) echo 'input-name-inline' ?>"> <?= $input['name'] ?></label>
                            <?php endif; ?>
                            <?php $choices = get_choices($dbh, $input['sheet_id'], $input['question_id'], $input['input_id']); ?>
                            <?php include("components/choices.php"); ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
            </div>
        <?php endforeach; ?>
    </div>
</main>
<aside class="modal" id="complete-modal">
    <div class="modal-content">
        <p class="modal-title">解答が登録されました</p>
        <div class="modal-buttons-flex">

            <button type="button" class="button" id="answer-button" data-button="">続けて入力する</button>
            <button type="button" class="button" id="top-button" data-button="">TOPへ戻る</button>

        </div>
    </div>
</aside>
<aside class="modal" id="update-modal">
    <div class="modal-content">
        <p class="modal-title">登録済みのNo.です。上書きしますか？</p>
        <div class="modal-buttons-flex">
            <button type="button" class="button" id="update-button" data-button="">上書きする</button>
            <button type="button" class="button button-inversion" id="correct-button" data-button="">戻る</button>

        </div>
    </div>
</aside>
<script>
    const sheetId = Number(<?= $sheet['id'] ?>);
    const inputs = <?= json_encode($inputs_js, true); ?>
</script>
<script src="js/utils.js"></script>
<script src="js/buttons.js"></script>
<script src="js/answer.js"></script>

</body>

</html>
