<?php include_once("components/header.php") ?>
<main>
    <div class="home">
        <?php if ($sheets) : ?>
            <p class="home-title">入力するアンケートを選択してください</p>
            <div class="home-select">
                <select name="" id="select-sheet">
                    <?php foreach ($sheets as $sheet) : ?>
                        <option value="<?= $sheet['id'] ?>"><?= $sheet['name'] ?></option>
                    <?php endforeach; ?>
                </select>
            </div>
            <div><button type="button" id="start-button" class="button" data-button="">START</button></div>
            <div class="home-result-button"><button type="button" id="result-button" class="button button-inversion" data-button="">前回の結果</button></div>
        <?php else : ?>
            <p class="home-title">登録されているアンケートが存在しません</p>
        <?php endif; ?>

    </div>
</main>
<aside class="modal" id="index-modal">
    <div class="modal-content">
        <p class="modal-title">入力途中のデータがあります。再開しますか？</p>
        <div class="modal-buttons-flex">
            <button class="button" data-button="" id="modal-restart-button">再開</button>
            <button class="button button-inversion" data-button="" id="modal-start-button">新規</button>
        </div>
    </div>
</aside>
<script src="./js/utils.js"></script>
<script src="./js/index.js"></script>
<script src="./js/buttons.js"></script>
</body>

</html>
