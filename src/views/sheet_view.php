<?php include_once("components/header.php") ?>
<div class="menu">
    <div class="menu-content">
        <div>
            <button type="button" class="menu-button menu-button-long menu-button-inversion" id="first-button" data-menu-button="long">最初に戻る</button>
        </div>
        <div class="sheet-menu">
            <div id="delete-page-button-container">

            </div>

            <p class="sheet-menu-text"><?= $page ?> / <span id="page-num"></span><span class="sheet-menu-page">page</span></p>
            <button type="button" class="menu-button  menu-button-inversion" id="prev-button" data-menu-button="short">戻る</button>
            <button type="button" class="menu-button" id="next-button" data-menu-button="short">次へ</button>
        </div>
    </div>
</div>

<main>
    <div class="sheet">
        <p class="sheet-title"><?= $sheet['name'] ?></p>
        <form>
            <div class="sheet-index">
                <div class="sheet-index-number">
                    <label for="" class="sheet-index-label">No.</label>
                    <input type="text" id="sheet-number">
                </div>
                <div>
                    <label for="" class="sheet-index-label">日付</label>
                    <input type="date" id="sheet-date">
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
        </form>
    </div>
    <div class="sheet-submit">
        <button type="button" class="button" data-button="" id="finish-button">入力完了</button>
    </div>
</main>
<aside class="modal" id="sheet-modal">
    <div class="modal-content">
        <p class="modal-title">入力を終了します</p>
        <div class="modal-buttons-flex">
            <button class="button" data-button="" id="modal-finish-button">結果を見る</button>
            <button class="button button-inversion" data-button="" id="modal-back-button">戻る</button>
        </div>
    </div>
</aside>
<script>
    const sheetId = Number(<?= h($sheet_id) ?>);
    const page = Number(<?= h($page) ?>);
    const inputs = <?= json_encode($inputs_js, true); ?>
</script>

<script src="./js/utils.js"></script>
<script src="./js/buttons.js"></script>
<script src="./js/sheet.js"></script>

</body>

</html>
