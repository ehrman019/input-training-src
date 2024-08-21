/* Canvas */

const draw = (score, sum, sheetName, questionScore, date) => {
  if (canvas.getContext) {
    const ctx = canvas.getContext("2d");
    const graphWidth = 360;
    const graphHeight = 40;
    const graphHeightShort = 25;
    const time = 10;
    const titleColor = "#597f35";
    const textColor = "#1B1B1B";
    const graphColor = "#A8D27E";
    const borderColor = "#EEE";
    const paddingX = 170;
    const paddingY = 80;
    const graphY = 100;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, 700, 990);

    ctx.fillStyle = textColor;
    ctx.font = "500 24px 'Noto sans JP', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(sheetName, paddingX + graphWidth / 2, paddingY);
    ctx.font = "500 16px 'Noto sans JP', sans-serif";
    ctx.fillText(date, paddingX + graphWidth / 2, paddingY + 30);

    if (sum) {
      ctx.fillStyle = titleColor;
      ctx.font = "600 20px 'Noto sans JP', sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`正答率：`, paddingX + 10, paddingY + graphY);
      ctx.font = "600 40px 'Noto sans JP', sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(
        `${((score / sum) * 100).toFixed(1)}`,
        paddingX + 195,
        paddingY + graphY
      );
      ctx.font = "600 20px 'Noto sans JP',sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`% (${score}/${sum})`, paddingX + 200, paddingY + graphY);

      ctx.fillStyle = borderColor;
      ctx.fillRect(paddingX, paddingY + graphY + 5, graphWidth, graphHeight);

      let num = questionScore.length;
      for (let i = 0; i < num; i++) {
        const score = questionScore[i].score;
        const sum = questionScore[i].sum;
        ctx.fillStyle = textColor;
        ctx.font = "18px sans-serif";
        ctx.fillText(
          `第${i + 1}問：${((score / sum) * 100).toFixed(
            1
          )}%  (${score}/${sum})`,
          paddingX + 10,
          paddingY + graphY + 30 + (i + 1) * 60
        );

        ctx.fillStyle = borderColor;
        ctx.fillRect(
          paddingX,
          paddingY + graphY + 35 + (i + 1) * 60,
          graphWidth,
          graphHeightShort
        );
      }

      drawRect(
        ctx,
        paddingX,
        paddingY + graphY + 5,
        graphWidth * (score / sum),
        graphHeight,
        time,
        graphColor
      );

      for (let i = 0; i < num; i++) {
        const score = questionScore[i].score;
        const sum = questionScore[i].sum;
        drawRect(
          ctx,
          paddingX,
          paddingY + graphY + 35 + (i + 1) * 60,
          graphWidth * (score / sum),
          graphHeightShort,
          time,
          graphColor
        );
      }
    }
  }
};

const drawRect = (ctx, x, y, width, height, s, color) => {
  let w = 0;
  ctx.fillStyle = color;
  const callback = setInterval(() => {
    ctx.fillRect(x, y, w, height);

    if (w < width * 0.8) {
      w += width / s;
    } else if (w < width * 0.9) {
      w += width / (s * 5);
    } else if (w < width * 0.95) {
      w += width / (s * 10);
    } else if (w <= width) {
      w += width / (s * 15);
    } else {
      clearInterval(callback);
    }
  }, 30);
};
