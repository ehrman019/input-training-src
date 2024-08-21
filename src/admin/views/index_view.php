<?php include_once("components/header.php") ?>
<main>
    <div class="home">
        <section class="register">
            <p class="home-title">アンケート新規登録</p>
            <button type="button" class="button" id="register-button" data-button="">新規登録</button>
        </section>
        <?php if ($sheets) : ?>
            <section class="edit">
                <p class="home-title">アンケート編集</p>
                <select name="" id="select-edit-sheet">
                    <?php foreach ($sheets as $sheet) : ?>
                        <option value="<?= $sheet['id'] ?>"><?= $sheet['name'] ?></option>
                    <?php endforeach; ?>
                </select>
                <div>
                    <button type="button" class="button" id="edit-button" data-button="">編集</button>
                </div>
                <div>
                    <button type="button" class="button" id="answer-button" data-button="">回答を入力</button>
                </div>
                <div>
                    <button type="button" class="button button-inversion" id="delete-button" data-button="">削除</button>
                </div>
            </section>
        <?php endif; ?>
    </div>
</main>
<aside class="modal" id="delete-modal">
    <div class="modal-content">
        <p class="modal-title" id="delete-sheet-name"></p>
        <p class="modal-text">削除してよろしいですか？<br>※該当する解答も削除されます</p>

        <div class="modal-buttons-flex">
            <button type="button" class="button" id="modal-delete-button" data-button="">削除する</button>
            <button type="button" class="button button-inversion" id="top-button" data-button="">TOPへ戻る</button>

        </div>
    </div>
</aside>
<aside class="modal" id="delete-complete-modal">
    <div class="modal-content">
        <p class="modal-title" id="delete-complete-text"></p>

        <div class="modal-buttons-flex">
            <button type="button" class="button button-inversion" id="complete-top-button" data-button="">TOPへ戻る</button>

        </div>
    </div>
</aside>
<script>
    const sheets = <?= json_encode($sheets, true) ?>
</script>
<script src="js/utils.js"></script>
<script src="js/buttons.js"></script>
<script src="js/index.js"></script>


</body>

</html>