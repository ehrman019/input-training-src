<?php if ($kind === 1) : ?>
    <?php foreach ($choices as $key => $choice) : ?>
        <div class="choices-item">
            <input type="radio" name="<?= $question['question_id'] . '-' . $input['input_id'] ?>" value="<?= $choice['choice_id'] ?>" id="<?= $choice['choice_id'] ?>" class="readonly" <?php if ($key === 0) echo 'checked' ?>>
            <label for="<?= $choice['choice_id'] ?>" id="<?= $choice['choice_id'] ?>" class="readonly"><?= $choice['name'] ?></label>
        </div>
    <?php endforeach; ?>
<?php elseif ($kind === 2) : ?>
    <?php foreach ($choices as $key => $choice) : ?>
        <div class="choices-item">
            <input type="checkbox" name="<?= $question['question_id'] . '-' . $input['input_id'] ?>" value="<?= $choice['choice_id'] ?>" id="<?= $choice['choice_id'] ?>" class="readonly">
            <label for="<?= $choice['choice_id'] ?>" id="<?= $choice['choice_id'] ?>" class="readonly"><?= $choice['name'] ?></label>
        </div>
    <?php endforeach; ?>
<?php elseif ($kind === 3) : ?>
    <select name="<?= $question['question_id'] . '-' . $input['input_id'] ?>" id="<?= $question['question_id'] . '-' . $input['input_id'] ?>" class="readonly">
        <?php foreach ($choices as $key => $choice) : ?>
            <option value="<?= $choice['choice_id'] ?>" ><?= $choice['name'] ?></option>
        <?php endforeach; ?>
    </select>

<?php elseif ($kind === 4) : ?>
    <input type="date" name="<?= $question['question_id'] . '-' . $input['input_id'] ?>" class="readonly">
<?php elseif ($kind === 5) : ?>
    <input type="time" name="<?= $question['question_id'] . '-' . $input['input_id'] ?>" list="select-time" class="readonly" />
    <datalist id="select-time">
        <?php for ($i = 4; $i <= 27; $i++) : ?>
            <?php for ($j = 0; $j <= 45; $j += 15) : ?>
                <?php $h = substr('0' . $i % 24, -2);
                $m = substr('0' . $j, -2); ?>
                <option value="<?= $h . ':' . $m ?>" class="choices-item"><?= $h . ':' . $m ?></option>
            <?php endfor; ?>
        <?php endfor; ?>
    </datalist>
<?php elseif ($kind === 6) : ?>
    <input type="text" name="<?= $question['question_id'] . '-' . $input['input_id'] ?>" class="readonly">
<?php elseif ($kind === 7) : ?>
    <textarea name="<?= $question['question_id'] . '-' . $input['input_id'] ?>" class="readonly"></textarea>
<?php endif; ?>
