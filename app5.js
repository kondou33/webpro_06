const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1: message1, greet2: message2 });
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1: "Hello world", greet2: "Bon jour" });
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename: "./public/Apple_logo_black.svg", alt: "Apple Logo" });
});

app.get("/omikuji1", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';

  res.send('今日の運勢は' + luck + 'です');
});

app.get("/omikuji2", (req, res) => {
  const num = Math.floor(Math.random() * 6 + 1);
  let luck = '';
  if (num == 1) luck = '大吉';
  else if (num == 2) luck = '中吉';

  res.render('omikuji2', { result: luck });
});

app.get("/janken", (req, res) => {
  // accept both 'hand' (from our radio form) and legacy 'value'
  let value = req.query.hand;
  let win = Number(req.query.win) || 0;
  let total = Number(req.query.total) || 0;
  console.log({ value, win, total });
  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = '';
  let judgement = '';
  if (num == 1) cpu = 'グー';
  else if (num == 2) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 以下の数行は人間の勝ちの場合の処理なので，
  // 判定に沿ってあいこと負けの処理を追加する
  if (value == "グー")
    if (cpu == 'チョキ')
      judgement = '勝ち';
    else if (cpu == 'パー')
      judgement = '負け';
    else
      judgement = 'あいこ';
  else if (value == "チョキ")
    if (cpu == 'パー')
      judgement = '勝ち';
    else if (cpu == 'グー')
      judgement = '負け';
    else
      judgement = 'あいこ';
  else if (value == "パー")
    if (cpu == 'グー')
      judgement = '勝ち';
    else if (cpu == 'チョキ')
      judgement = '負け';
    else
      judgement = 'あいこ';

  // 勝ちの場合のみ win を増やす（あいこは win 増加なし）
  if (judgement === '勝ち') {
    win += 1;
  }
  total += 1;
  const display = {
    your: value,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render('janken', display);
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
