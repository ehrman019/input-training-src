<?php if ($kind === 1) : ?>
    <?php foreach ($choices as $key => $choice) : ?>
        <?php $checked = null;
        if (isset($answer) && getSelected((int)$answer['answer'], $choice['choice_id']) || $key === 0) {
            $checked = 'checked';
        } ?>
        <div class="choices-item">
            <input type="radio" name="answer-<?= $question['question_id'] . '-' . $input['input_id'] ?>" value="<?= $choice['choice_id'] ?>" id="<?= $choice['choice_id'] ?>" class="readonly" <?= $checked ?>>
            <label for="<?= $choice['choice_id'] ?>" id="<?= $choice['choice_id'] ?>" class="readonly"><?= $choice['name'] ?></label>
        </div>
    <?php endforeach; ?>
<?php elseif ($kind === 2) : ?>
    <?php foreach ($choices as $key => $choice) : ?>
        <?php if (isset($answer)) $numbers = explode(',', $answer['answer']) ?>
        <div class="choices-item">
            <input type="checkbox" name="answer-<?= $question['question_id'] . '-' . $input['input_id'] ?>" value="<?= $choice['choice_id'] ?>" id="<?= $choice['choice_id'] ?>" class="readonly" <?php if (isset($numbers) && getCheckboxSelected($numbers, $choice['choice_id'])) echo 'checked' ?>> <label for="<?= $choice['choice_id'] ?>" id="<?= $choice['choice_id'] ?>" class="readonly"><?= $choice['name'] ?></label>
        </div>
    <?php endforeach; ?>
<?php elseif ($kind === 3) : ?>
    <select name="answer-<?= $question['question_id'] . '-' . $input['input_id'] ?>" id="<?= $question['question_id'] . '-' . $input['input_id'] ?>" class="readonly">
        <?php foreach ($choices as $key => $choice) : ?>
            <option value="<?= $choice['choice_id'] ?>" <?php if (isset($answer) && getSelected((int)$answer['answer'], $choice['choice_id']) || $key === 0) echo 'selected' ?>><?= $choice['name'] ?></option>
        <?php endforeach; ?>
    </select>

<?php elseif ($kind === 4) : ?>
    <input type="date" id="<?= $question['question_id'] . '-' . $input['input_id'] ?>" name="answer-<?= $question['question_id'] . '-' . $input['input_id'] ?>" value="<?php if (isset($answer)) echo $answer['answer'] ?>" class="readonly">
<?php elseif ($kind === 5) : ?>
    <input type="time" id="" list="select-time" name="answer-<?= $question['question_id'] . '-' . $input['input_id'] ?>" value="<?php if (isset($answer)) echo $answer['answer'] ?>" class="readonly" />
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
    <input type="text" id="<?= $question['question_id'] . '-' . $input['input_id'] ?>" name="answer-<?= $question['question_id'] . '-' . $input['input_id'] ?>" value="<?php if (isset($answer)) echo $answer['answer_text'] ?>" class="readonly">
<?php elseif ($kind === 7) : ?>
    <textarea id="<?= $question['question_id'] . '-' . $input['input_id'] ?>" name="answer-<?= $question['question_id'] . '-' . $input['input_id'] ?>" class="readonly"><?php if (isset($answer)) echo $answer['answer_text'] ?></textarea>
<?php endif; ?>
