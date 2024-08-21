<?php include_once("components/header.php") ?>
<div class="menu">
    <div class="menu-content">
        <div class="answer-menu">
            <div class="answer-search">
                <div class="sheet-index-number">
                    <label for="" class="sheet-index-label">シートNo.</label>
                    <input type="text" name="sheet-number" id="search-sheet-number" value="">
                </div>
                <button type="submit" class="menu-button" data-menu-button="" id="search-button">検索</button>
            </div>
            <button type="button" class="menu-button menu-button-inversion" data-menu-button="" id="back-button">戻る</button>
        </div>
    </div>
</div>

<main>
    <div class="answer-list">
        <p class="sheet-title"><?= $sheet['name'] ?></p>
        <ul>
            <?php foreach ($answer_list as $answer) : ?>
                <li>
                    <a href="./answer.php?id=<?= $sheet_id ?>&number=<?= $answer['sheet_number'] ?>"><?= $answer['sheet_number'] ?></a>
                </li>
            <?php endforeach; ?>
        </ul>
    </div>
</main>
<script>
    const sheetId = Number(<?= $sheet_id ?>);
</script>
<script src="js/utils.js"></script>
<script src="js/buttons.js"></script>
<script src="js/answerList.js"></script>
</body>

</html>
