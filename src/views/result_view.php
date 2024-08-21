<?php include_once("components/header.php") ?>
<main>
    <div class="result-flex">
        <div class="result-canvas">
            <canvas id="canvas" width=700" height="990">

            </canvas>
        </div>
        <div class="result-page-button">
            <a href="#" download="result.jpg" id="result-img" class="result-img">
                <div class="result-img-download">
                    <span>画像ダウンロード</span><?php include_once("svg/download.svg") ?>
                </div>
            </a>
            <div class="result-page-button-content">
                <p id="result-text">お疲れ様でした！</p>
                <button class="button" id="result-page-button" data-button="">詳細を見る</button>
            </div>
        </div>
    </div>
</main>

<script>
    const sheetId = Number(<?= h($sheet_id) ?>);
    const prev = Number(<?= $prev ?>);
</script>
<script src="./js/utils.js"></script>
<script src="./js/buttons.js"></script>
<script src="./js/resultCanvas.js"></script>
<script src="./js/result.js"></script>

</body>

</html>
