## 概要

アンケート入力訓練の Web アプリケーション

## 要件

#### 利用者

紙に記入されたアンケート用紙を元に、数十枚分を Web アプリのフォームに入力する。入力後にアンケート用紙と同じように入力出来ているかを判定し、正答率を表示する。

#### 管理者

紙のアンケートを元に、フォームを作成する。その後回答を入力する。

## 仕様

#### 利用者

- 入力
  - 入力データはローカルストレージに保存する。保存するタイミングは「戻る」「次へ」「最初にもどる」「入力完了」のいずれかがクリックされたとき。
  - 選択したシートの入力データがローカルストレージに残っている（結果が表示されていない）場合、再開 or 新規のモーダルを表示する。
  - 入力ページが最終ページの時のみページの削除ができる。
  - トレーニング目的のため、バリデーションはなし。
- 結果
  - 入力データを新たに結果表示用のキーに保存しなおし、元のデータは消去する（該当するシート分のみ）。
  - 結果を計算し、その情報をローカルストレージに保存する。
  - 自由記入の input,textarea の判定は、null or 記入あり の基準のみで判定する（表記ゆれなどに対応できないため）。
  - No.の右隣の日付欄は、採点には含まれない。
  - No.が未入力、もしくは No.に該当する回答の登録がない場合、すべて誤答として判定される。
  - 結果の画像は JS の Canvas で描写し、クリックでダウンロードできるようにする。
  - 次の入力がスタートしたとき、ローカルストレージの結果の情報を消去する。

#### 管理者

- 新規フォーム登録
  - 入力等の変更ごとにローカルストレージに反映し、作成途中でページから離れてもデータが消えないようにする。再度ページを開いた際に、データの復元 or 破棄をモーダルで確認する。
  - ラベルの文字数などのバリデーションの後、DB に保存する。
- 編集
  - タイトルやラベルのテキストのみ行える。（回答を入力済みの場合、整合性が取れなくなるため）
- 回答の登録
  - 回答のシート No.が登録済みの時、モーダルで上書きして良いかアラートを出す。
  - 様々な回答を想定し、バリデーションはシート No.のみ行う。
- 削除
  - DB において外部キーを使用し、該当シートのフォームと回答がすべて削除されるようにする。

## 開発環境

#### Docker

- Nginx 1.27
- PHP 8.1
- MySQL 8.0

#### クローン後の構築

```
cp .env.sample .env
```

```
docker compose up -d
```

```
docker compose cp ./tmp/dump.sql mysql:./tmp/dump.sql
docker compose exec mysql bash -c 'mysql $MYSQL_DATABASE -u $MYSQL_USER -p$MYSQL_PASSWORD < ./tmp/dump.sql'
```

## Tips

#### データベースのバックアップ

```
docker compose exec mysql bash -c 'mysqldump --no-tablespaces -u $MYSQL_USER -p$MYSQL_PASSWORD $MYSQL_DATABASE > /tmp/dump.sql'
docker compose cp mysql:./tmp/dump.sql ./tmp/dump.sql
```

#### データベースのインポート

```
docker compose cp ./tmp/dump.sql mysql:./tmp/dump.sql
docker compose exec mysql bash -c 'mysql $MYSQL_DATABASE -u $MYSQL_USER -p$MYSQL_PASSWORD < ./tmp/dump.sql'
```
