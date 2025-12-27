"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let station = [
  { id: 1, code: "JE01", name: "東京駅" },
  { id: 2, code: "JE07", name: "舞浜駅" },
  { id: 3, code: "JE12", name: "新習志野駅" },
  { id: 4, code: "JE13", name: "幕張豊砂駅" },
  { id: 5, code: "JE14", name: "海浜幕張駅" },
  { id: 6, code: "JE05", name: "新浦安駅" },
  { id: 7, code: "JE09", name: "検見川浜駅" }
];

let station2 = [
  { id: 1, code: "JE01", name: "東京駅", change: "総武本線，中央線，etc", passengers: 403831, distance: 0 },
  { id: 2, code: "JE02", name: "八丁堀駅", change: "日比谷線", passengers: 31071, distance: 1.2 },
  { id: 3, code: "JE05", name: "新木場駅", change: "有楽町線，りんかい線", passengers: 67206, distance: 7.4 },
  { id: 4, code: "JE07", name: "舞浜駅", change: "舞浜リゾートライン", passengers: 76156, distance: 12.7 },
  { id: 5, code: "JE12", name: "新習志野駅", change: "", passengers: 11655, distance: 28.3 },
  { id: 6, code: "JE17", name: "千葉みなと駅", change: "千葉都市モノレール", passengers: 16602, distance: 39.0 },
  { id: 7, code: "JE18", name: "蘇我駅", change: "内房線，外房線", passengers: 31328, distance: 43.0 },
];

// キャラクター情報の配列
let character = [
  { chara_id: 1, chara_name: "刻晴", element: "雷", limited_chara: "恒常", levelbonus_name: "会心ダメージ", levelbonus_value: 38.4, weapon_type: "片手剣", level: 60, nomal_talent_level: 6, skill_talent_level: 6, burst_talent_level: 6, role: "メインアタッカー", totu: 1},
  { chara_id: 2, chara_name: "七七", element: "氷", limited_chara: "恒常", levelbonus_name: "与える治癒効果", levelbonus_value: 22.2, weapon_type: "片手剣", level: 80, nomal_talent_level: 8, skill_talent_level: 8, burst_talent_level: 8, role: "ヒーラー" , totu: 3},
  { chara_id: 3, chara_name: "フリーナ", element: "水", limited_chara: "限定", levelbonus_name: "会心率", levelbonus_value: 19.2, weapon_type: "片手剣", level: 90, nomal_talent_level: 4, skill_talent_level: 10, burst_talent_level: 9, role: "サブアタッカー/バッファー" , totu: 0},
  { chara_id: 4, chara_name: "ディルック", element: "炎", limited_chara: "恒常", levelbonus_name: "会心率", levelbonus_value: 19.2, weapon_type: "両手剣", level: 70, nomal_talent_level: 7, skill_talent_level: 7, burst_talent_level: 7, role: "メインアタッカー" , totu: 2},
  { chara_id: 5, chara_name: "シグウィン", element: "水", limited_chara: "限定", levelbonus_name: "HP", levelbonus_value: 28.8, weapon_type: "弓", level: 90, nomal_talent_level: 10, skill_talent_level: 13, burst_talent_level: 13, role: "ヒーラー/サポーター/サブアタッカー" ,totu: 6},
];

app.get("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('keiyo2', { data: station2 });
});

app.get("/keiyo2/create", (req, res) => {
  res.redirect('/public/keiyo2_new.html');
});

app.get("/keiyo2/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[number];
  res.render('keiyo2_detail', { data: detail });
});

// Delete
app.get("/keiyo2/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2.splice(req.params.number, 1);
  res.redirect('/keiyo2');
});

// Create
app.post("/keiyo2", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = station2.length + 1;
  const code = req.body.code;
  const name = req.body.name;
  const change = req.body.change;
  const passengers = req.body.passengers;
  const distance = req.body.distance;
  station2.push({ id: id, code: code, name: name, change: change, passengers: passengers, distance: distance });
  console.log(station2);
  res.render('keiyo2', { data: station2 });
});

// Edit
app.get("/keiyo2/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = station2[number];
  res.render('keiyo2_edit', { id: number, data: detail });
});

// Update
app.post("/keiyo2/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  station2[req.params.number].code = req.body.code;
  station2[req.params.number].name = req.body.name;
  station2[req.params.number].change = req.body.change;
  station2[req.params.number].passengers = req.body.passengers;
  station2[req.params.number].distance = req.body.distance;
  console.log(station2);
  res.redirect('/keiyo2');
});

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

app.get("/keiyo", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('db2', { data: station });
});

app.get("/keiyo_add", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station.push(newdata);
  res.render('db2', { data: station });

});

app.get("/keiyo_add2", (req, res) => {
  let id = req.query.id;
  let code = req.query.code;
  let name = req.query.name;
  let newdata = { id: id, code: code, name: name };
  station2.push(newdata);
  res.render('keiyo2', { data: station2 });
});




// キャラクター一覧表示
app.get("/chara", (req, res) => {
  res.render('chara', {data: character});
});

// キャラクター新規作成ページへリダイレクト
app.get("/chara/create", (req, res) => {
  res.redirect('/public/chara_new.html');
});

// キャラクター詳細表示
app.get("/chara/:id", (req, res) => {
  const id = req.params.id;
  const detail = character.find(chara => chara.chara_id == id);
  res.render('chara_detail', { data: detail });
});

// キャラクター新規作成処理
app.post("/chara_add", (req, res) => {
  const id = character.length + 1;
  const name = req.body.chara_name;
  const element = req.body.element;
  const limited_chara = req.body.limited_chara;
  const levelbonus_name = req.body.levelbonus_name;
  const levelbonus_value = req.body.levelbonus_value;
  const weapon_type = req.body.weapon_type;
  const level = req.body.level;
  const nomal_talent_level = req.body.nomal_talent_level;
  const skill_talent_level = req.body.skill_talent_level;
  const burst_talent_level = req.body.burst_talent_level;
  const role = req.body.role;
  const totu = req.body.totu;
  let newdata = { chara_id: id, chara_name: name, element: element, limited_chara: limited_chara, levelbonus_name: levelbonus_name, levelbonus_value: levelbonus_value, weapon_type: weapon_type, level: level, nomal_talent_level: nomal_talent_level, skill_talent_level: skill_talent_level, burst_talent_level: burst_talent_level, role: role, totu: totu };
  character.push(newdata);
  res.redirect('/chara');
});

// キャラクター編集ページ表示
app.get("/chara/edit/:id", (req, res) => {
  const id = req.params.id;
  const detail = character.find(chara => chara.chara_id == id);
  res.render('chara_edit', { data: detail });
});

// キャラクター更新処理
app.post("/chara_update/:id", (req, res) => {
  const id = req.params.id;
  const chara = character.find(chara => chara.chara_id == id);
  chara.chara_name =  req.body.chara_name;
  chara.element =  req.body.element;
  chara.limited_chara =  req.body.limited_chara;
  chara.levelbonus_name =  req.body.levelbonus_name;
  chara.levelbonus_value =  req.body.levelbonus_value;
  chara.weapon_type =  req.body.weapon_type;
  chara.level =  req.body.level;
  chara.nomal_talent_level =  req.body.nomal_talent_level;
  chara.skill_talent_level =  req.body.skill_talent_level;
  chara.burst_talent_level =  req.body.burst_talent_level;
  chara.role =  req.body.role;
  chara.totu =  req.body.totu;
  res.redirect('/chara/:id');
});

// キャラクター削除処理
app.post("/chara_delete/:id", (req, res) => {
  const id = req.params.id;
  character = character.filter(chara => chara.chara_id != id);
  res.redirect('/chara');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
