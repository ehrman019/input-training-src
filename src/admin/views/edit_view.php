<?php include_once("components/header.php") ?>
<div class="menu">
    <div class="menu-content">
        <div class="register-init">
            <div class="register-init-name">
                <form action="">
                    <label for="">アンケート名 </label>
                    <input type="text" id="sheet-name" value="" placeholder="必須入力">
                </form>
            </div>
        </div>
        <div class="menu-submit">
            <p class="menu-submit-inavlid" id="invalid"></p>
            <button type="button" id="submit-button" class="menu-button" data-menu-button="">更新</button>
        </div>
    </div>
</div>
<main>
    <div class="register-content">
        <div class="register-sheet">
            <form>
                <?php for ($i = 0; $i < $question_num; $i++) : ?>
                    <div class="register-question" id="<?= "question-" . $i + 1 ?>">
                        <div class="register-question-title">
                            <label for="">タイトル <?= $i + 1 ?></label>
                            <input type="text" id="<?= "question-name-" . $i + 1 ?>" placeholder="必須入力">
                        </div>
                        <ul id="<?= "question-inputs-" . $i + 1 ?>">

                        </ul>
                    </div>
                <?php endfor; ?>
            </form>
        </div>
    </div>
</main>
<aside class="modal" id="complete-modal">
    <div class="modal-content">
        <p class="modal-title">アンケートが編集されました</p>
        <div class="modal-buttons-flex">

            <button type="button" class="button" id="answer-button" data-button="">解答を入力する</button>
            <button type="button" class="button button-inversion" id="top-button" data-button="">TOPへ戻る</button>

        </div>
    </div>
</aside>
<script>
    const sheetId = Number(<?= $sheet['id'] ?>);
    let questionNum = Number(<?= $question_num ?>);
    let unfinished = Number(<?= $unfinished ?>);

    let sheet = <?= json_encode($sheet, true); ?>;
    let questions = <?= json_encode($questions, true); ?>;
    let inputs = <?= json_encode($inputs, true); ?>;
    let choices = <?= json_encode($choices, true); ?>
</script>
<script src="js/utils.js"></script>
<script src="js/buttons.js"></script>
<script src="js/editFunctions.js"></script>
<script src="js/validateFunctions.js"></script>
<script src="js/edit.js"></script>

</body>

</html>
