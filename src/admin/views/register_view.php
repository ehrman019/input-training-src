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
            <div class="register-init-question">
                <div>
                    <form action="" method="post" id="add-question-form">
                        <label for="">質問追加</label>
                        <input type="hidden" name="question-num" value="<?= $questionNum + 1 ?>">
                        <input type="hidden" name="scroll-top" id="add-question-top" value="">
                        <button type="sutmit" id="add-question-button" class="register-init-button register-init-button-add">＋</button>
                    </form>
                </div>
                <div>
                    <form action="" method="post" id="dec-question-form">
                        <?php if ($questionNum > 0) : ?>
                            <input type="hidden" name="question-num" value="<?= $questionNum - 1 ?>">
                        <?php else : ?>
                            <input type="hidden" name="question-num" value="<?= $questionNum ?>">
                        <?php endif; ?>
                        <input type="hidden" name="scroll-top" id="dec-question-top" value="">
                        <button type="sutmit" id="dec-question-button" class="register-init-button">ー</button>
                    </form>
                </div>
            </div>
        </div>
        <div class="menu-submit">
            <p class="menu-submit-inavlid" id="invalid"></p>
            <button type="button" id="submit-button" class="menu-button" data-menu-button="">作成</button>
        </div>
    </div>
</div>
<main>
    <div class="register-content">
        <p class="register-required">※文字数は20文字以下 ※質問数は10個まで</p>
        <div class="register-sheet">
            <form>
                <?php for ($i = 0; $i < $questionNum; $i++) : ?>
                    <div class="register-question" id="<?= "question-" . $i + 1 ?>">
                        <div class="register-question-title">
                            <label for="">タイトル <?= $i + 1 ?></label>
                            <input type="text" id="<?= "question-name-" . $i + 1 ?>" placeholder="必須入力">
                        </div>
                        <div class="register-question-kind">
                            <label for="">項目追加</label>
                            <select name="kind" id="<?= "input-kind-" . $i + 1 ?>">
                                <?php foreach ($kinds as $kind) : ?>
                                    <option value=" <?= $kind['id'] ?>"><?= $kind['name'] ?></option>
                                <?php endforeach; ?>
                            </select>
                            <select name="choices-num" id="<?= "choices-num-" . $i + 1 ?>">
                                <?php for ($j = 2; $j <= 10; $j++) : ?>
                                    <option value="<?= $j ?>" <?php if ($j === 5) echo "selected" ?>><?= $j ?></option>
                                <?php endfor; ?>
                            </select>個

                            <button type="button" class="register-question-button register-question-button-add" id="<?= "add-input-button-" . $i + 1 ?>">＋</button>
                            <button type="button" class="register-question-button" id="<?= "remove-input-button-" . $i + 1 ?>">－</button>
                        </div>
                        <ul id="<?= "question-inputs-" . $i + 1 ?>">

                        </ul>
                    </div>
                <?php endfor; ?>
            </form>
        </div>
    </div>
</main>
<aside class="modal" id="restore-modal">
    <div class="modal-content">
        <p class="modal-title">作成中のデータがあります。復元しますか？</p>
        <div class="modal-buttons-flex">
            <div>
                <form action="" method="post" id="restore-form">
                    <input type="hidden" name="question-num" value="" id="restore-question-num">
                    <input type="hidden" name="unfinished" value="0">
                    <button type="submit" id="restore-button" class="button" data-button="">復元する</button>
                </form>
            </div>
            <div>
                <form action="" method="post" id="reset-form">
                    <input type="hidden" name="question-num" value="1">
                    <input type="hidden" name="unfinished" value="0">
                    <button type="submit" id="reset-button" class="button button-inversion" data-button="">破棄</button>
                </form>
            </div>
        </div>
    </div>
</aside>
<aside class="modal" id="complete-modal">
    <div class="modal-content">
        <p class="modal-title">アンケートが作成されました</p>
        <div class="modal-buttons-flex">
            <button type="button" class="button" id="answer-button" data-button="">解答を入力する</button>
            <button type="button" class="button button-inversion" id="top-button" data-button="">TOPへ戻る</button>

        </div>
    </div>
</aside>
<script>
    let questionNum = Number(<?= $questionNum ?>);
    let unfinished = Number(<?= $unfinished ?>);
    let y = Number(<?= $y ?>);
</script>
<script src="js/utils.js"></script>
<script src="js/buttons.js"></script>
<script src="js/registerFunctions.js"></script>
<script src="js/validateFunctions.js"></script>
<script src="js/register.js"></script>

</body>

</html>
